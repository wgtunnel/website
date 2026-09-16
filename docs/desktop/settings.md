---
sidebar_position: 1
---

# Settings

The desktop app shares its tunnel/DNS/recovery engine with Android, so most concepts on this page
mirror the [Common Features](/docs/common/tunnels) and [Android Settings](/docs/android/settings)
sections. This page covers what's specific to the desktop app's Settings screen.

## Backend Mode

Choose the operational mode for a tunnel:

- **VPN**: Standard system-wide routing. Captures device traffic and routes it through the WireGuard tunnel.
- **Proxy**: See [Local Proxy Mode](/docs/common/proxy-mode).

Unlike Android, desktop doesn't have a Lockdown "mode", the kill switch is a fully independent
setting (see below) that layers on top of either backend mode.

## DNS Settings

See [Split & Encrypted DNS](/docs/common/dns). Desktop doesn't show the system DNS/Private DNS
conflict banner that Android does, since there's no desktop equivalent to conflict with.

## Tunnel Globals

See [Tunnel Globals](/docs/common/tunnels#tunnel-globals) for DNS/AmneziaWG overrides. Desktop has no
per-app split tunneling, so this screen only covers DNS and AmneziaWG values, unlike Android which
also has a global split tunneling toggle here.

## Kill Switch

See [Kill Switch](/docs/common/kill-switch) for the shared concept and Allow LAN Traffic.

- **Protect on Startup**: Reapplies the kill switch automatically after a reboot, so protection survives a restart. This is desktop's mechanism for boot-time kill switch restoration; Android handles tunnel/auto-tunnel boot restoration separately under [Android Integrations](/docs/android/settings#android-integrations).

## Tunnel Recovery

See [Seamless Recovery](/docs/common/seamless-recovery) and Recovery Bounce Delay.
