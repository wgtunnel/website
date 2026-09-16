---
sidebar_position: 6
---

# Local Proxy Mode

Exposes a tunnel over a local SOCKS5 and/or HTTP proxy instead of routing all system traffic through
it. This doesn't claim the system VPN service, so other apps (like an ad-blocking/firewalling app on
Android, or another VPN app) can own it while forwarding traffic to WG Tunnel's virtual tunnel via the
local proxy. Alternatively, point individual proxy-supporting apps (like a browser) at it directly.

Useful for layered security, or selective proxying without conflicting VPN services.

## Platform Differences

- **Android** calls this the **Proxy** [App Mode](/docs/android/settings#app-mode), one of three selectable modes (alongside VPN and Lockdown).
- **Desktop** calls this the **Proxy** [Backend Mode](/docs/desktop/settings#backend-mode), one of two (alongside VPN), and the kill switch is a separate, independent setting on desktop rather than a third mode.
