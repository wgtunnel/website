---
sidebar_position: 2
---

# Tunnels

WG Tunnel allows you to manage your VPN tunnels easily, supporting both standard WireGuard and AmneziaWG configurations. This screen serves as the central hub for importing, configuring, and organizing your tunnels.

## Key Concepts

Before exploring the features, here's a quick overview of important terms used in tunnel management:

- **WireGuard**: A lightweight, high-performance VPN protocol focused on simplicity and security. It uses standard UDP for communication and is the default backend for most setups.
- **AmneziaWG**: An enhanced version of WireGuard designed for better resistance to censorship and deep packet inspection (DPI). It includes features like obfuscation parameters (Jc, Jmin, Jmax, S1, S2, H1-H4, I1-I5, J1-J3, ITIME) and protocol mimicking to evade detection by firewalls or ISPs.
- **Default Tunnel**: The primary tunnel selected for quick connections or as a fallback in auto-tunneling (covered in the Auto-Tunneling section). Only one tunnel can be set as default at a time.
- **Split Tunneling**: A feature that lets you route specific apps through the VPN while others bypass it, or vice versa, for customized traffic control.
- **App Modes**: WG Tunnel supports four modes, including VPN (standard routing), Lockdown (strict blocking), Proxy (SOCKS5/HTTP proxy), and Kernel (root-based kernel module). These are detailed in the app settings section later.

## Importing

To add new tunnels, tap the plus (+) button in the top navigation bar on the main Tunnels screen. This opens a bottom drawer with various import options. You can import tunnels via:

- **.conf Files**: Select a standard WireGuard configuration file from your device's storage.
- **ZIP Archives**: Import multiple tunnels at once from a ZIP file containing .conf files.
- **QR Code**: Scan a QR code that encodes a WireGuard or AmneziaWG configuration for quick setup.
- **Clipboard**: Paste a configuration directly from your clipboard if you've copied it from another source.
- **URL**: Enter a URL pointing to a .conf file or ZIP archive hosted online for remote import.
- **Create from Scratch**: Use the built-in configuration form to manually enter all tunnel details.

The app uses the AmneziaWG backend by default, which is backwards compatible with standard WireGuard configurations and doesn't enable any Amnezia functionality if no Amnezia values are configured. In this case, it behaves identically to standard WireGuard. If a config includes Amnezia parameters, it will enable Amnezia's DPI resistance.

## Managing Tunnels

On the main Tunnels screen, you can view all your imported tunnels in a list. Key features include:

- **Tunnel Sorting**: Tap the sorting button in the top navigation bar to enter a dedicated sorting screen. Here, long-press on a tunnel and drag it up or down to rearrange the order. This is useful for prioritizing frequently used connections.
- **Long-Press Actions**: Long-press on a tunnel to select it and access additional options, such as creating a duplicate copy of the tunnel, deleting it, or downloading the selected tunnel(s). Downloading exports them as a ZIP file and opens a modal where you can choose to export as AmneziaWG or standard WireGuard configs (falling back to WireGuard if no Amnezia properties are configured).
- **Tunnel Health Indicators**: Each tunnel displays an LED status icon: green for healthy, red for unhealthy, gray for unknown, and yellow for stale. Health is determined hierarchically based on [monitoring features](settings#monitoring):
    1. **Logs Check**: If logs show issues (like handshake/UDP failures) within the last 2 minutes, it's unhealthy.
    2. **Ping Check**: If logs are healthy/absent, checks ping reachability if enabled. If unreachable, the tunnel is marked unhealthy.
    3. **Stats Check**: If no logs/pings, uses transfer stats. If zero RX bytes, status unknown. If no recent activity/handshakes, tunnel is stale. Otherwise, the tunnel is healthy.

Tapping on a tunnel opens its detailed view, where you can access settings and configuration options.

## Tunnel Settings

Each tunnel has various settings to customize its behavior. These apply per tunnel and can be adjusted independently. In the top navigation bar of this screen, you'll find two icons:
- **Pencil Icon**: Takes you to the Tunnel Configuration screen for editing the tunnel's details.
- **QR Icon**: Opens a modal to display the tunnel's configuration as a QR code (in either WireGuard or AmneziaWG format, size permitting). This allows easy scanning and import to other devices.

### Set as Default

This marks the tunnel as your default. It will be used as the primary option for manual connections and as a fallback in auto-tunneling scenarios.

### Split Tunneling

Configure which apps route through the VPN:

- **Included Applications**: List app package names (like com.example.app) to force them through the tunnel.
- **Excluded Applications**: List apps to bypass the VPN entirely, allowing them to use your direct internet connection. Common examples include Android Auto (com.google.android.projection.gearhead), Google Chromecast (com.google.android.apps.chromecast.app), or RCS messaging (com.google.android.apps.messaging).

This is ideal for scenarios where certain apps need unrestricted access or perform better without VPN overhead.

### Dynamic DNS Updates

When enabled, the app monitors tunnel connectivity (via the app's [monitoring features](settings#monitoring)). If issues are detected, it checks for IP changes in dynamic DNS endpoints by bypassing a socket from the tunnel (to make a DNS request outside the broken tunnel) and performing a DoH (DNS over HTTPS) request. If a new IP is found, it updates the peer endpoint automatically via the WireGuard UAPI, without stopping or restarting the tunnel. This ensures seamless connectivity for servers with dynamic IPs.

### Prefer IPv6 Peer Resolution

Enable this to prioritize IPv6 addresses when resolving peer endpoints. This can improve performance on IPv6-capable networks but may cause issues if you switch to an IPv4-only environment. Use with caution and only if your setup/network supports it.

### Metered Tunnel

This is an override feature that allows you to designate a tunnel as metered. This is useful if there is a data usage limitation for that tunnel. Otherwise, leave disabled for Android to automatically default to your underlying network's metered status.

## Tunnel Configuration

This section provides a comprehensive form to edit all aspects of your tunnel's .conf file directly in the app. It includes fields for interface settings (Address, PrivateKey, DNS, etc.), peer details (PublicKey, AllowedIPs, Endpoint), and optional advanced options.

### Pre-Up and Post-Up Scripts

Add custom scripts to run before (Pre-Up/Post-Up) or after (Pre-Down/Post-Down) the tunnel starts or stops. Examples include logging or custom routing rules:

- Pre-Up: `echo "Starting WireGuard tunnel at $(date)" >> /data/adb/wg.log`
- Post-Up: `ip rule add from 192.168.1.0/24 table 200; ip route add default dev wg0 table 200`

These scripts require a rooted device but work across all app modes (VPN, Lockdown, Proxy, Kernel).

### Interface Quick Actions

Access these via the three-dot menu in the Interface section:

- **Enable Amnezia Compatibility Mode**: Automatically sets basic AmneziaWG parameters (like Jc=4, Jmin=40, Jmax=70, S1=0, S2=0, H1=1, H2=2, H3=3, H4=4) for compatibility with standard WireGuard servers. This provides basic DPI protection, which helps evade network filters that inspect packet contents to block VPN traffic.
- **Mimic Protocols**: Use AmneziaWG to disguise tunnel traffic as common protocols like DNS, SIP, or QUIC. This further enhances DPI resistance and works with standard WireGuard servers by obfuscating the traffic pattern.

### Peer Quick Actions

Access these via the three-dot menu in the Peer section:

- **Exclude LAN Networks**: Quickly set AllowedIPs to values that bypass all local LAN traffic (all private IP address blocks, like 192.168.0.0/16, 10.0.0.0/8, etc.), ensuring devices on your local network remain accessible without routing through the VPN.

### AmneziaWG Obfuscation Parameters

When using AmneziaWG, you can configure these optional parameters for enhanced DPI resistance. All must match between client and server except Jc, Jmin, and Jmax (which can vary). H1-H4 must be unique from each other. With all parameters set to zero, behavior defaults to standard WireGuard. These include features from AmneziaWG 1.5+ like protocol mimicking.

- **Jc (Junk Packet Count)**: Number of junk packets following the I1-I5 signature chain to blur session start timing and size.
    - Valid Range: 0–10
    - Recommended: 3–5
    - Purpose: Adds noise to evade DPI by making traffic less predictable.

- **Jmin (Junk Packet Minimum Size)**: Smallest size of junk packets.
    - Valid Range: 64–1024 bytes (Jmax > Jmin)
    - Recommended: 40–64
    - Purpose: Ensures junk packets blend with real data; varies sizes to avoid patterns.

- **Jmax (Junk Packet Maximum Size)**: Largest size of junk packets.
    - Valid Range: 64–1024 bytes (Jmin < Jmax)
    - Recommended: 70–80
    - Purpose: Complements Jmin for variable packet sizing.

- **S1 (Init Packet Junk Size)**: Pseudorandom prefix bytes added to initial handshake packets.
    - Valid Range: 0–64 bytes
    - Recommended: 0 or 15–64
    - Purpose: Randomizes length (len(init) = 148 + S1) to disrupt DPI detection.

- **S2 (Response Packet Junk Size)**: Pseudorandom prefix bytes added to response packets.
    - Valid Range: 0–64 bytes
    - Recommended: 0 or 15–64
    - Purpose: Randomizes length (len(resp) = 92 + S2) for pattern disruption.

- **H1 (Init Packet Magic Header)**: Random constant replacing predictable WireGuard identifier for initial packets.
    - Valid Range: 0–2147483647 (unique from H2/H3/H4)
    - Recommended: 1
    - Purpose: Resists DPI filtering by making headers unique per client.

- **H2 (Response Packet Magic Header)**: Random constant for response packets.
    - Valid Range: 0–2147483647 (unique)
    - Recommended: 2
    - Purpose: Obfuscates handshake replies.

- **H3 (Underload Packet Magic Header)**: Random constant for keep-alive packets.
    - Valid Range: 0–2147483647 (unique)
    - Recommended: 3
    - Purpose: Masks minimal data transfer to prevent DPI filtering of short pings.

- **H4 (Transport Packet Magic Header)**: Random constant for data transport packets.
    - Valid Range: 0–2147483647 (unique)
    - Recommended: 4
    - Purpose: Conceals regular traffic patterns.

- **I1-I5 (Obfuscation Packets/Signature Chain)**: Up to five UDP packets sent before special handshakes (every ITIME seconds) to mimic protocols like QUIC, DNS, SIP.
    - Valid Format: Custom Protocol Signature (CPS) as `<b hex_data><c><t><r length>` etc.
    - Tag Types:
        - `<b hex_data>`: Static bytes to emulate protocols (arbitrary length).
        - `<c>`: 32-bit packet counter (network byte order, unique in sequence).
        - `<t>`: 32-bit Unix timestamp (network byte order, unique).
        - `<r length>`: Cryptographically secure random bytes (length ≤ 1000).
    - Recommended: I1 as hex snapshot of a real protocol (like QUIC); I2-I5 for added entropy with counters/timestamps/random.
    - Purpose: Increases entropy and disguises traffic as legitimate UDP protocols. If I1 missing, chain skipped (behaves as AmneziaWG 1.0).
    - Example: `I1 = <b 0xf6ab3267fa><c><b 0xf6ab><t><r 10>`

- **J1-J3 (Junk Packets)**: Up to three custom junk packets in the junk-train following I1-I5, defined similarly to I-packets in CPS format.
    - Valid Format: Same as I1-I5 (CPS with `<b>`, `<c>`, `<t>`, `<r>` tags).
    - Recommended: Use for additional randomization in junk-train.
    - Purpose: Further blurs timing/size profile with pseudorandom packets; complements Jc count.

- **ITIME (Imitation Interval)**: Interval for sending the signature chain (I1-I5 + junk-train) and initiating special handshakes.
    - Valid Range: Seconds (0 to disable).
    - Recommended: 120
    - Purpose: Periodically triggers obfuscation to maintain DPI resistance without constant overhead. Set to 0 on Windows if needed.

## Tunnel Configuration Example

WG Tunnel uses standard WireGuard `.conf` files to define VPN tunnels, supporting both AmneziaWG and WireGuard backends with additional Android-specific options:

```shell
[Interface]
Address = 10.14.0.2/16
PrivateKey = aB3nM9kL2wQ5xP7vJ1rT8yU4zC6mD0hF9eI3oR6tY8u=
DNS = 1.1.1.1
# Optional
# ListenPort = 51820
# Optional
# MTU = 1280
# Optional, for AmneziaWG only
# Jc = 4
# Jmin = 40
# Jmax = 70
# S1 = 0
# S2 = 0
# H1 = 1
# H2 = 2
# H3 = 3
# H4 = 4
# I1 = <b 0xf6ab3267fa><c><b 0xf6ab><t><r 10>
# I2 = <r 20><t>
# I3 = <b 0xabcd><c><r 15>
# I4 = <t><r 30>
# I5 = <b 0x1234><r 10>
# J1 = <r 50>
# J2 = <b 0x5678><c>
# J3 = <t><r 40>
# ITIME = 120
# Optional scripts are supported by WG Tunnel in both Kernel and Userspace modes if your device is rooted
# PreUp = echo "Starting WireGuard tunnel at $(date)" >> /data/adb/wg.log
# PostUp = ip rule add from 192.168.1.0/24 table 200; ip route add default dev wg0 table 200
# PreDown = echo "Stopping WireGuard tunnel at $(date)" >> /data/adb/wg.log
# PostDown = ip rule del from 192.168.1.0/24 table 200; ip route flush table 200

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

[Peer]
PublicKey = fE4xN3zK9pL8mWqT2rYvJ5uX6cD1bA0hG7iZkQ9oP2w=
# Optional, if supported by your server
# PresharedKey = kX9mP2rT5yU7zC0hF3eI6oQ8vJ1nM4kL2wB9xD6tA3u=
AllowedIPs = 0.0.0.0/0
Endpoint = my-server.com:51820
# Optional, not recommended by WG
# PersistentKeepalive = 25
```