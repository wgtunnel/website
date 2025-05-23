+++
weight = 101
date = "2025-04-13T18:42:53-04:00"
lastmod = "2025-04-13T18:42:53-04:00"
draft = false
author = "Zane Schepke"
title = "Tunnel Configuration"
icon = "vpn_key"
toc = true
description = "The backend and tunnel configuration capabilities of WG Tunnel."
tags = ["configuration", "tunnel", "config"]
+++

### Tunnel Configuration

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

[Peer]
PublicKey = fE4xN3zK9pL8mWqT2rYvJ5uX6cD1bA0hG7iZkQ9oP2w=
# Optional, if supported by your server
# PresharedKey = kX9mP2rT5yU7zC0hF3eI6oQ8vJ1nM4kL2wB9xD6tA3u=
AllowedIPs = 0.0.0.0/0
Endpoint = my-server.com:51820
# Optional, not recommended by WG
# PersistentKeepalive = 25

# Optional Android-specific settings for including/excluding apps by package name
# IncludedApplications = com.example.app1, com.example.app2

# Optional ExcludedApplications: These apps will bypass the VPN tunnel, by package name
# ExcludedApplications = com.google.android.youtube, com.android.chrome
```