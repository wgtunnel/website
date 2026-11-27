import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const appName = 'WG Tunnel'
const githubUrl = 'https://github.com/wgtunnel'

const config: Config = {
    title: appName,
    tagline: 'An advanced, open-source client for WireGuard and AmneziaWG.',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    url: 'https://wgtunnel.com',
    baseUrl: '/',

    organizationName: 'wgtunnel',
    projectName: 'website',

    onBrokenLinks: 'warn',

    markdown: {
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    headTags: [
        {
            tagName: 'meta',
            attributes: {
                property: 'og:site_name',
                content: appName,
            },
        },
        {
            tagName: 'meta',
            attributes: {
                name: 'application-name',
                content: appName,
            },
        },
    ],

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    editUrl:
                        'https://github.com/wgtunnel/website/tree/master',
                    showLastUpdateTime: true,
                    showLastUpdateAuthor: true,
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    editUrl:
                        'https://github.com/wgtunnel/website/tree/master',
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: [
                        './src/css/global.css',
                        './src/css/custom.css',
                        './src/css/drawer.css',
                        './src/css/footer.css',
                        './src/css/hero.css',
                        './src/css/navbar.css',
                        './src/css/download.css',
                    ],
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        image: 'img/social-card.jpg',
        colorMode: {
            defaultMode: 'dark',
            disableSwitch: true,
            respectPrefersColorScheme: false,
        },
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 4,
        },
        announcementBar: {
            id: 'announcement-v2',
            content:
                '🚀 <strong>WG Tunnel Desktop 2.0 is here! </strong><a href="/blog/desktop-v2">Read more</a>',
            backgroundColor: 'var(--background)',
            textColor: 'var(--text)',
            isCloseable: false,
        },
        navbar: {
            title: appName,
            logo: {
                alt: `${appName} Logo`,
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {to: '/blog', label: 'Blog', position: 'left'},
                { to: '/download', label: 'Download', position: 'left' },
                { to: '/gallery', label: 'Gallery', position: 'left' },
                { to: '/donate', label: 'Donate', position: 'left' },
                { to: '/about', label: 'About', position: 'left' },
                {
                    href: githubUrl,
                    position: 'right',
                    className: 'header-github-link',
                    'aria-label': 'GitHub',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Android',
                    items: [
                        {
                            label: 'Zapstore',
                            href: 'https://zapstore.dev/apps/com.zaneschepke.wireguardautotunnel',
                        },
                        {
                            label: 'IzzyOnDroid',
                            href: 'https://apt.izzysoft.de/fdroid/index/apk/com.zaneschepke.wireguardautotunnel',
                        },
                        {
                            label: 'WGT F-Droid',
                            href: 'https://fdroid.wgtunnel.com',
                        },
                        {
                            label: 'Google Play',
                            href: 'https://play.google.com/store/apps/details?id=com.zaneschepke.wireguardautotunnel',
                        },
                    ],
                },
                {
                    title: 'Linux',
                    items: [
                        {
                            label: 'AUR',
                            href: 'https://aur.archlinux.org/packages/wgtunnel-bin',
                        },
                        {
                            label: 'COPR',
                            href: 'https://copr.fedorainfracloud.org/coprs/zaneschepke/wgtunnel/',
                        },
                        {
                            label: 'apt',
                            href: 'https://apt.wgtunnel.com',
                        },
                    ],
                },
                {
                    title: 'Windows',
                    items: [
                        {
                            label: 'Chocolatey',
                            href: 'https://community.chocolatey.org/packages/wgtunnel'
                        },
                        {
                            label: 'WinGet',
                            href: 'https://winstall.app/apps/WGTunnel.WGTunnel'
                        }
                    ]
                },
                {
                    title: 'macOS',
                    items: [
                        {
                            label: 'Download',
                            to: '/download/?platform=macos'
                        },
                        {
                            label: 'Homebrew',
                            href: 'https://github.com/wgtunnel/homebrew-wgtunnel'
                        }
                    ]
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Telegram',
                            href: 'https://t.me/wgtunnel',
                        },
                        {
                            label: 'Matrix',
                            href: 'https://matrix.to/#/#wg-tunnel-space:matrix.org',
                        },
                        {
                            label: 'Blog RSS',
                            href: '/blog/rss.xml',
                        },
                    ],
                },
                {
                    title: 'Source',
                    items: [
                        {
                            label: 'GitHub',
                            href: githubUrl,
                        },
                        {
                            label: 'ngit (Nostr)',
                            href: 'https://gitworkshop.dev/npub193tl2rc9veyrgfs4zce4jfg7h9gtd9v03tqegq0mzxgf3vwx605sm8e5kc',
                        },
                        {
                            label: 'Translate',
                            href: 'https://translate.wgtunnel.com/project/wgtunnel/invite?h=11b5b7bf2099293095775d4477320c772818907',
                        },
                    ],
                },
                {
                    title: 'Other',
                    items: [
                        {
                            label: 'Getting Started',
                            to: '/docs/getting-started',
                        },
                        {
                            label: 'FAQ',
                            to: '/docs/faq',
                        },
                        {
                            label: 'Privacy Policy',
                            to: '/privacy-policy',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} ${appName}`,
        },
        prism: {
            theme: prismThemes.dracula,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['bash', 'powershell'],
        },
    } satisfies Preset.ThemeConfig,
};

export default config;