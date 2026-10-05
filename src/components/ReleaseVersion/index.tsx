import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

const repos = {
    android: 'https://api.github.com/repos/wgtunnel/android/releases/latest',
    desktop: 'https://api.github.com/repos/wgtunnel/desktop/releases/latest',
    'android-nightly': 'https://api.github.com/repos/wgtunnel/android/releases/tags/nightly',
} as const;

function versionFromRelease(repo: keyof typeof repos, data: {tag_name?: string; assets?: {name?: string}[]}): string {
    if (repo !== 'android-nightly') {
        return typeof data?.tag_name === 'string' ? data.tag_name.replace(/^v/, '') : '';
    }

    const assets = Array.isArray(data?.assets) ? data.assets : [];
    const universal = assets.find((asset) => {
        const name = asset.name ?? '';
        return /^wgtunnel-standalone-v?.+\.apk$/i.test(name) && !/-(?:arm|x86)/i.test(name);
    });
    const match = (universal?.name ?? '').match(/^wgtunnel-standalone-v?(.+)\.apk$/i);
    return match?.[1] ?? '';
}

function readCache(key: string): string | null {
    try {
        return sessionStorage.getItem(key);
    } catch {
        return null;
    }
}

function writeCache(key: string, value: string) {
    try {
        sessionStorage.setItem(key, value);
    } catch {
        // Private mode can reject storage. The pill still renders for this visit.
    }
}

export default function ReleaseVersion({
    repo,
}: {
    repo: keyof typeof repos;
}): React.ReactElement | null {
    const [version, setVersion] = useState<string | null>(null);

    useEffect(() => {
        const key = `wgtunnel.release.${repo}`;
        const cached = readCache(key);
        if (cached) {
            setVersion(cached);
            return;
        }

        let cancelled = false;
        fetch(repos[repo])
            .then((response) => (response.ok ? response.json() : null))
            .then((data) => {
                const tag = data ? versionFromRelease(repo, data) : '';
                if (!tag || cancelled) {
                    return;
                }
                writeCache(key, tag);
                setVersion(tag);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [repo]);

    if (!version) {
        return null;
    }

    return (
        <span className={styles.version} title={`${repo === 'android-nightly' ? 'Nightly' : 'Latest'} release ${version}`}>
            {version}
        </span>
    );
}
