---
sidebar_position: 1
---

# Tunnels

The Tunnels screen is the central hub for importing, configuring, and organizing your tunnels on
Android. This page covers Android-specific tunnel behavior; for concepts shared with desktop
(AmneziaWG obfuscation parameters, Dynamic DNS Recovery, Prefer IPv6), see [Common Tunnels](/docs/common/tunnels).

## Key Concepts

- **App Modes**: Android supports three modes: VPN (standard routing), Lockdown (strict, always-on kill switch), and Proxy (SOCKS5/HTTP proxy). These are detailed in the [Settings](/docs/android/settings) section.
- **Split Tunneling**: A feature that lets you route specific apps through the VPN while others bypass it, or vice versa, for customized traffic control.

> **Note:** Kernel mode (root-based, using the device's in-kernel WireGuard module) was removed in
> v5.0.0 in favor of a fully userspace architecture. See the [FAQ](/docs/faq#is-kernel-mode-support-planned-for-android-or-desktop)
> for why.

See [Tunnel Health Indicators](/docs/common/tunnels#tunnel-health-indicators) for how the LED status
icon on each tunnel is determined.

## Tunnel Settings

Each tunnel has various settings to customize its behavior. These apply per tunnel and can be adjusted independently.

### Split Tunneling

Configure which apps route through the VPN:

- **Included Applications**: List app package names (like com.example.app) to force them through the tunnel.
- **Excluded Applications**: List apps to bypass the VPN entirely, allowing them to use your direct internet connection. Common examples include Android Auto (com.google.android.projection.gearhead), Google Chromecast (com.google.android.apps.chromecast.app), or RCS messaging (com.google.android.apps.messaging).

This is ideal for scenarios where certain apps need unrestricted access or perform better without VPN overhead.

### Metered Tunnel

This is an override feature that allows you to designate a tunnel as metered. This is useful if there is a data usage limitation for that tunnel. Otherwise, leave disabled to automatically default to your underlying network's metered status.

## Tunnel Configuration

This section provides a comprehensive form to edit all aspects of your tunnel's .conf file directly in the app. It includes fields for interface settings (Address, PrivateKey, DNS, etc.), peer details (PublicKey, AllowedIPs, Endpoint), and optional advanced options. See [Common Tunnels](/docs/common/tunnels) for the full AmneziaWG obfuscation parameter reference.

### Interface Quick Actions

Access these via the three-dot menu in the Interface section:

- **Enable Amnezia Compatibility Mode**: Automatically fills in a standard set of junk-packet obfuscation values (Jc=4, Jmin=40, Jmax=70, S1=0, S2=0, H1-H4 as distinct values) for use against a plain WireGuard server. This provides basic DPI protection, helping evade network filters that fingerprint the standard WireGuard handshake.
- **Mimic Protocols**: Use AmneziaWG's I1-I5 packets to disguise tunnel traffic as common protocols like DNS, SIP, or QUIC. This further enhances DPI resistance and works with standard WireGuard servers by obfuscating the traffic pattern.

### Peer Quick Actions

Access these via the three-dot menu in the Peer section:

- **Exclude LAN Networks**: Quickly set AllowedIPs to values that bypass all local LAN traffic (all private IP address blocks, like 192.168.0.0/16, 10.0.0.0/8, etc.), ensuring devices on your local network remain accessible without routing through the VPN.

## Android-Specific Configuration Fields

On top of the standard fields covered in [Common Tunnels](/docs/common/tunnels#tunnel-configuration-example), Android `.conf` files support app-based split tunneling fields:

```shell
## Optional Android-specific settings for including/excluding apps by package name
# IncludedApplications = com.example.app1, com.example.app2

## Optional ExcludedApplications: These apps will bypass the VPN tunnel, by package name
## example applications to exclude:
## Android Auto (com.google.android.projection.gearhead)
## Google Chromecast (com.google.android.apps.chromecast.app)
## GoPro (com.gopro.smarty)
## RCS/Jibe messaging services (com.google.android.apps.messaging)
## Sonos (com.sonos.acr and com.sonos.acr2)
# ExcludedApplications = com.google.android.youtube, com.android.chrome, com.google.android.projection.gearhead, com.google.android.apps.chromecast.app
```

See [Pre-Up and Post-Down Scripts](/docs/common/tunnels#pre-up-and-post-down-scripts) for script
support, which works across all app modes (VPN, Lockdown, Proxy) on rooted devices.
