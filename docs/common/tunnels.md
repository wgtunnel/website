---
sidebar_position: 1
---

# Tunnels

WG Tunnel manages tunnels the same way on Android and desktop, since both share the same underlying
tunnel engine. This page covers the concepts and settings that work identically on both platforms.
For platform-specific tunnel behavior (app modes, split tunneling), see the
[Android](/docs/android/tunnels) or [Desktop](/docs/desktop/settings) sections.

## Key Concepts

- **WireGuard**: A lightweight, high-performance VPN protocol focused on simplicity and security. It uses standard UDP for communication.
- **AmneziaWG**: An enhanced version of WireGuard designed for better resistance to censorship and deep packet inspection (DPI). WG Tunnel supports AmneziaWG 2.0 through 3.1, including junk-packet obfuscation (Jc/Jmin/Jmax/S1-S4/H1-H4), protocol mimicry (I1-I5), and header protection.
- **Default Tunnel**: The primary tunnel selected for quick connections or as a fallback in auto-tunneling (covered in [Auto-Tunneling](/docs/auto-tunneling)). Only one tunnel can be set as default at a time.

WG Tunnel has a single tunnel engine, built on AmneziaWG, that's fully backward compatible with
standard WireGuard configs, and there's no separate WireGuard-only backend to choose between. If a
tunnel's config has no Amnezia parameters set, it behaves identically to standard WireGuard. Add any
Amnezia parameter to that same config, and it enables Amnezia's DPI resistance for that tunnel.

## Tunnel Health Indicators

Each tunnel shows a colored status indicator (an LED-style icon on Android, a colored dot on desktop):

- **Green**: The backend reports a healthy, established handshake.
- **Red**: The backend reports a handshake failure, or the peer's endpoint failed to resolve.
- **Yellow/Amber**: The tunnel is starting, resolving DNS, or otherwise not fully up yet.
- **Gray**: The tunnel is down.

This comes directly from status callbacks the native WireGuard/AmneziaWG backend reports for each
tunnel (handshake success or failure), combined with endpoint resolution state, not from polling logs,
pings, or transfer stats.

## Per-Tunnel Settings

These settings apply per tunnel and are available on both Android and desktop.

### Dynamic DNS Recovery

When enabled, the app monitors tunnel connectivity, and only when a failure is actually detected does
it check whether the peer's dynamic DNS hostname now resolves to a different IP. This check is
performed using whichever [Peer Resolution](/docs/common/dns#peer-resolution) method you've configured
in DNS Settings, the same method used for the tunnel's initial connection. If the IP has changed, it
updates the peer endpoint automatically via the WireGuard UAPI, without stopping or restarting the
tunnel. This recovers servers with dynamic IPs from the specific failure mode where the tunnel breaks
because the server's address moved out from under it.

### Prefer IPv6 Peer Resolution

Prioritizes IPv6 addresses when first resolving a tunnel's peer endpoints, if the network supports it.
Two behaviors are baked into this single toggle: preferring IPv6 on connect, and automatically falling
back to IPv4 on its own if the network doesn't support IPv6, or if the tunnel is failing on IPv6.

### Restore IPv6

A separate, opt-in toggle available once Prefer IPv6 is enabled above. Where Prefer IPv6's fallback
only reacts to failures, Restore IPv6 runs while the tunnel is healthy. If the tunnel is healthy + using IPv4 + on an
IPv6 supported network, it proactively upgrades the peer endpoint back to IPv6 without dropping the tunnel 
or requiring a restart. This is what recovers a tunnel that fell back to
IPv4 (or started on IPv4 because IPv6 wasn't available yet) once IPv6 becomes available again.

## Tunnel Globals

Lets you override DNS and/or AmneziaWG values across every tunnel at once, instead of editing each
config individually. When enabled, the global values you set here are used for every tunnel, taking
precedence over whatever is actually configured in each tunnel's own config.

This is useful if you want the same DNS or AmneziaWG obfuscation settings applied consistently across
all your tunnels without having to keep them in sync by hand in every config.

> **Platform difference:** On Android, Tunnel Globals also covers
> [split tunneling](/docs/android/tunnels#split-tunneling): a global included/excluded app list that
> overrides each tunnel's individual split tunneling configuration the same way. Desktop has no
> per-app split tunneling, so this only covers DNS and AmneziaWG values there.

## AmneziaWG Obfuscation Parameters

When using AmneziaWG, you can configure these optional parameters for enhanced DPI resistance. With
everything unset, behavior defaults to standard WireGuard. WG Tunnel supports the full AmneziaWG
2.0-3.1 parameter set:

- **Jc (Junk Packet Count)**: Number of junk packets sent before the real handshake, to blur session start timing and size. Junk packets carry no real data and are discarded by the receiver, so this doesn't need to be set (or matched) on the server, and it's recommended to configure it client-side only.
    - Recommended: 4-12

- **Jmin / Jmax (Junk Packet Size Range)**: Minimum/maximum size of those junk packets, in bytes (Jmax must be greater than Jmin). If Jmax is at or above your network's MTU, the junk packet can get fragmented, which itself looks suspicious to a censor, so keep it comfortably under your MTU.
    - Recommended: Jmin 40-50, Jmax 70-100

- **S1 / S2 (Init/Response Packet Junk Size)**: Extra pseudorandom padding bytes added to the initial handshake packet (S1) and its response (S2), to disrupt DPI's fixed-length fingerprinting of the WireGuard handshake. Unlike junk packets, these change the real handshake messages both sides parse, so S1-S4 must match between client and server.
    - Recommended: 0, or 15-64

- **S3 / S4 (Additional Junk Sizes)**: Further padding for AmneziaWG's cookie-reply and transport packets, extending the same size-randomization to more of the protocol's packet types. Must match between client and server, same as S1/S2.

- **H1-H4 (Magic Headers)**: Random 32-bit constants that replace WireGuard's normally-predictable packet-type identifiers for the initiation, response, cookie-reply, and transport packet types respectively. Must be distinct from one another and from any other server on the same endpoint, and must match between client and server.

- **I1-I5 (Custom Signature Packets)**: Up to five packets sent before the handshake, in order, to disguise the tunnel's traffic pattern as another protocol (ex. DNS, QUIC, SIP). Each is built from a sequence of tags: `<b 0xHEX>` for static bytes, `<r N>` for N random bytes, `<rd N>` for N random digits, `<rc N>` for N random letters, and `<t>` for a 4-byte timestamp. There's no packet-counter tag. Like junk packets, these carry no real data, so it's recommended to configure them client-side only.
    - Example: `I1 = <b 0xf6ab3267fa><r 20><t>`

- **HeaderProtectionKey**: A pre-shared key enabling AmneziaWG's additional header-protection layer, further obscuring packet headers beyond the H1-H4 magic values. Must match on both ends, and requires S1-S4 to each be at least 12 when set.

- **ContentPaddingAddition**: Extra padding appended to transport packet payloads, to reduce the usefulness of packet-length analysis. Accepts a single value or a range (ex. `10-50`). Recommended on both sides, but doesn't strictly need to match.

- **RandomTrailers**: Boolean (`true`/`false`), appends random trailing bytes to packets for additional obfuscation.

- **DisableCookies**: Boolean (`true`/`false`), disables WireGuard's cookie-based DoS mitigation. Only disable this if your server configuration requires it.

Exact recommended values vary by server and network, so when in doubt, use the **Enable Amnezia Compatibility Mode** quick action (available in both apps' tunnel configuration editor) for a sane, tested starting point rather than hand-picking values.

## AmneziaWG Timing Obfuscation

Standard WireGuard uses fixed, hardcoded timers, always rekeying after exactly the same interval,
always retrying a handshake after the same timeout. That regularity is itself a DPI fingerprint: a
connection with mechanically constant timing stands out from ordinary traffic. AmneziaWG lets you
replace these fixed timers with a range instead of a single value: `RekeyAfterTime`, `RekeyTimeout`,
`RejectAfterTime`, `KeepaliveTimeout`, and `MaxHandshakeAttempts` (all on the tunnel's Interface), plus
`PersistentKeepalive` (on each Peer). Set to a range (ex. `25-40`), a fresh random value is drawn from
it each time, so the timing pattern is no longer constant and harder to fingerprint. A single fixed
value still works too, which can help on high-latency or unreliable links where the defaults are too
aggressive, but that's a secondary use, the main point of these fields is timing randomization. None
of them need to match between client and server, since each side just runs its own timers independently.

## Pre-Up and Post-Down Scripts

Add custom scripts to a tunnel's config to run before (`PreUp`) or after (`PostUp`) it starts, and
before (`PreDown`) or after (`PostDown`) it stops. Common uses include logging or custom routing
rules:

- `PreUp = echo "Starting WireGuard tunnel at $(date)" >> /var/log/wg.log`
- `PostUp = ip rule add from 192.168.1.0/24 table 200; ip route add default dev wg0 table 200`

> **Platform difference:** On Android, running these scripts requires a rooted device, since they
> execute via a root shell. On desktop, no extra permission is needed, since the daemon already runs as a
> system service with the elevated privileges required to manage routes and firewall rules, so
> scripts run without root.

## Tunnel Configuration Example

WG Tunnel uses standard WireGuard `.conf` files to define VPN tunnels. Since the tunnel engine is fully
backward compatible with plain WireGuard syntax, the same file format works whether or not you add
AmneziaWG parameters:

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
# S3 = 0
# S4 = 0
# H1 = 1
# H2 = 2
# H3 = 3
# H4 = 4
# I1 = <b 0xf6ab3267fa><b 0xf6ab><t><r 10>
# I2 = <r 20><t>
# I3 = <b 0xabcd><rd 15>
# I4 = <t><r 30>
# I5 = <b 0x1234><r 10>
# HeaderProtectionKey = <base64-key>
# ContentPaddingAddition = 0
# Optional, see Pre-Up and Post-Down Scripts above
# PreUp = echo "Starting WireGuard tunnel at $(date)" >> /var/log/wg.log
# PostUp = ip rule add from 192.168.1.0/24 table 200; ip route add default dev wg0 table 200
# PreDown = echo "Stopping WireGuard tunnel at $(date)" >> /var/log/wg.log
# PostDown = ip rule del from 192.168.1.0/24 table 200; ip route flush table 200

[Peer]
PublicKey = fE4xN3zK9pL8mWqT2rYvJ5uX6cD1bA0hG7iZkQ9oP2w=
# Optional, if supported by your server
# PresharedKey = kX9mP2rT5yU7zC0hF3eI6oQ8vJ1nM4kL2wB9xD6tA3u=
AllowedIPs = 0.0.0.0/0
Endpoint = my-server.com:51820
# Optional, not recommended by WG
# PersistentKeepalive = 25
```

For Android's additional per-app split tunneling fields, see [Android Tunnels](/docs/android/tunnels#split-tunneling).
