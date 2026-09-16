---
sidebar_position: 2
---

# Platform & Security Notes

A few facts about the desktop app worth knowing, that aren't settings you configure.

## Encrypted at Rest

Tunnel configs and other sensitive data are stored encrypted (AES-256-GCM) in the local database, with
the encryption key kept in the OS keychain/credential store.

## Wayland and Linux Desktop Support

WG Tunnel's desktop UI natively supports Wayland (with automatic X11 fallback if Wayland isn't
available), ships as a GraalVM native image with no bundled JDK, and requires a `systemd`-based Linux
distribution with `nftables` or `iptables-nft`. See the
[FAQ](/docs/faq#does-wg-tunnel-support-wayland) for details, and the
[Download page](/download) for install instructions per distro.
