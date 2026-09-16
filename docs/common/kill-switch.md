---
sidebar_position: 4
---

# Kill Switch

A system-wide kill switch that blocks all traffic outside the tunnel. It has its own lifecycle, on or
off, completely independent of any given tunnel's connection state, see
[Deferred Endpoint Bootstrapping](/docs/deferred-endpoint-bootstrapping) for why that independence
matters for leak protection.

## Allow LAN Traffic

Bypasses local LAN traffic from the kill switch so local devices stay reachable. In rare cases this can
cause leaks depending on your DNS setup, so use with caution.

## Platform Differences

The underlying protection is the same on both platforms, but it's surfaced differently:

- **Android** exposes the kill switch as **Lockdown**, one of three selectable [App Modes](/docs/android/settings#app-mode) (alongside VPN and Proxy). It runs as a dedicated dummy VPN service and includes Android-specific options like Dual Stack and a per-tunnel Metered override. See [Android Settings](/docs/android/settings#lockdown) for the full implementation details.
- **Desktop** exposes it as a fully independent toggle in Settings that layers on top of either backend mode (VPN or Proxy), with its own **Protect on Startup** option to reapply it automatically after a reboot. See [Desktop Settings](/docs/desktop/settings#kill-switch).
