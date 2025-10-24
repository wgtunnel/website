import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const appName = 'WG Tunnel'
const githubUrl = 'https://github.com/wgtunnel/wgtunnel'

const config: Config = {
    title: appName,
    tagline: 'A feature rich, open-source Android client for WireGuard.',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    url: 'https://wgtunnel.com',
    baseUrl: '/',

    organizationName: 'wgtunnel',
    projectName: 'website',

    onBrokenLinks: 'throw',

    markdown: {
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

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

    themes: ['@docusaurus/theme-mermaid'],

    themeConfig: {
        image: 'img/social-card.jpg',
        tableOfContents: {
            minHeadingLevel: 2,
            maxHeadingLevel: 4,
        },
        mermaid: {
            theme: { light: 'neutral', dark: 'dark' },
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
                { to: '/donate', label: 'Donate', position: 'left' },
                {
                    href: githubUrl,
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Getting Started',
                            to: '/docs/getting-started',
                        },
                        {
                            label: 'FAQ',
                            to: '/docs/faq',
                        },
                    ],
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
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'RSS',
                            href: '/blog/rss.xml',
                        },
                        {
                            label: 'Atom',
                            href: '/blog/atom.xml',
                        },
                    ],
                },
                {
                    title: 'Legal',
                    items: [
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
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;