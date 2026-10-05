import React, {useLayoutEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import type {IconType} from 'react-icons';
import styles from './styles.module.css';

export interface PlatformTabProps {
    value: string;
    label: string;
    icon?: IconType;
    children: React.ReactNode;
}

export function PlatformTab(_props: PlatformTabProps): null {
    return null;
}

PlatformTab.displayName = 'PlatformTab';

interface PlatformTabsProps {
    defaultValue?: string;
    /** Maps a linked or detected platform onto a tab that exists on this page. */
    aliases?: Record<string, string>;
    children: React.ReactNode;
}

function isPlatformTab(
    child: React.ReactNode,
): child is React.ReactElement<PlatformTabProps> {
    if (!React.isValidElement(child)) {
        return false;
    }
    if (child.type === PlatformTab) {
        return true;
    }
    const type = child.type as {displayName?: string};
    return type?.displayName === 'PlatformTab';
}

function resolvePlatform(
    value: string | null,
    values: string[],
    aliases: Record<string, string>,
): string | null {
    if (!value) {
        return null;
    }
    const resolved = aliases[value] ?? value;
    return values.includes(resolved) ? resolved : null;
}

function detectDownloadPlatform(): string | null {
    const nav = navigator as Navigator & {userAgentData?: {platform?: string}};
    const platform = (nav.userAgentData?.platform || navigator.platform || '').toLowerCase();
    const ua = navigator.userAgent.toLowerCase();
    const ipadOs = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (platform.includes('android') || ua.includes('android')) {
        return 'android';
    }
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod') || ipadOs) {
        return 'android';
    }
    if (platform.includes('win') || ua.includes('windows')) {
        return 'windows';
    }
    if (platform.includes('mac') || ua.includes('mac os') || ua.includes('macintosh')) {
        return 'macos';
    }
    if (platform.includes('linux') || ua.includes('linux') || platform.includes('cros') || ua.includes('cros')) {
        return 'linux';
    }
    return null;
}

export function InstallMethods({children}: {children: React.ReactNode}): React.ReactElement {
    return <div className={styles.methods}>{children}</div>;
}

export function InstallMethod({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}): React.ReactElement {
    return (
        <section className={styles.method}>
            <p className={styles.methodTitle}>{title}</p>
            {children}
        </section>
    );
}

export default function PlatformTabs({
    defaultValue,
    aliases,
    children,
}: PlatformTabsProps): React.ReactElement {
    const tabs = React.Children.toArray(children).filter(isPlatformTab);
    const values = tabs.map((tab) => tab.props.value);
    const initial =
        defaultValue && values.includes(defaultValue) ? defaultValue : values[0];
    const [selected, setSelected] = useState(initial);
    const valuesRef = useRef(values);
    const aliasesRef = useRef(aliases ?? {});
    aliasesRef.current = aliases ?? {};
    const baseId = React.useId();

    // An explicit ?platform= link wins, including aliases such as windows → desktop.
    // Otherwise pick the system the browser is running on. State starts at the
    // default so server HTML and hydration match. The URL stores the tab value.
    useLayoutEffect(() => {
        const valuesNow = valuesRef.current;
        const map = aliasesRef.current;
        const param = new URLSearchParams(window.location.search).get('platform');
        const detected =
            resolvePlatform(param, valuesNow, map) ??
            resolvePlatform(detectDownloadPlatform(), valuesNow, map);
        if (!detected) {
            return;
        }
        setSelected(detected);
        const url = new URL(window.location.href);
        if (url.searchParams.get('platform') === detected) {
            return;
        }
        url.searchParams.set('platform', detected);
        window.history.replaceState(window.history.state, '', url);
    }, []);

    function select(value: string) {
        setSelected(value);
        const url = new URL(window.location.href);
        if (url.searchParams.get('platform') === value) {
            return;
        }
        url.searchParams.set('platform', value);
        window.history.replaceState(window.history.state, '', url);
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
        const key = event.key;
        if (key !== 'ArrowRight' && key !== 'ArrowLeft' && key !== 'Home' && key !== 'End') {
            return;
        }
        event.preventDefault();
        const next =
            key === 'ArrowRight'
                ? (index + 1) % tabs.length
                : key === 'ArrowLeft'
                  ? (index - 1 + tabs.length) % tabs.length
                  : key === 'Home'
                    ? 0
                    : tabs.length - 1;
        const value = tabs[next].props.value;
        select(value);
        document.getElementById(`${baseId}-tab-${value}`)?.focus();
    }

    return (
        <div className={styles.root}>
            <div className={styles.tablist} role="tablist" aria-label="Platform">
                {tabs.map((tab, index) => {
                    const {value, label, icon: Icon} = tab.props;
                    const active = value === selected;
                    return (
                        <button
                            key={value}
                            id={`${baseId}-tab-${value}`}
                            role="tab"
                            type="button"
                            aria-selected={active}
                            aria-controls={`${baseId}-panel-${value}`}
                            tabIndex={active ? 0 : -1}
                            className={clsx(styles.tab, active && styles.tabActive)}
                            onClick={() => select(value)}
                            onKeyDown={(event) => onKeyDown(event, index)}
                        >
                            {Icon && <Icon className={styles.icon} aria-hidden="true" />}
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>
            {tabs.map((tab) => (
                <div
                    key={tab.props.value}
                    id={`${baseId}-panel-${tab.props.value}`}
                    role="tabpanel"
                    aria-labelledby={`${baseId}-tab-${tab.props.value}`}
                    hidden={tab.props.value !== selected}
                    className={styles.panel}
                >
                    {tab.props.children}
                </div>
            ))}
        </div>
    );
}
