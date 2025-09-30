# Tunnel Configuration

WG Tunnel uses standard WireGuard `.conf` files to define VPN tunnels, supporting both AmneziaWG and WireGuard backends
with additional Android-specific options:

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