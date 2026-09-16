---
sidebar_position: 1
---

# Getting Started

:::info
These docs aren't a comprehensive UI reference as most of the app is meant to be self-explanatory.
They focus on the features and settings that are a bit nuanced or benefit from more explanation than
a screen can give on its own.
:::

:::warning
WG Tunnel is **not** a VPN provider. The project does not provide WireGuard servers for public use.
:::

Similar to the [official WireGuard Android app](https://github.com/WireGuard/wireguard-android), it is expected that
users are already hosting their own server(s) or are exporting client configurations from their VPN service provider
for use in third-party applications like WG Tunnel.

## Recommended Options

### Self-Hosting

The best option is to host your own WireGuard server on a **VPS** (Virtual Private Server) or at home.

Many home routers have built-in WireGuard support. As long as your ISP (Internet Service Provider) does not use
**CGNAT** (Carrier-Grade Network Address Translation), it is straightforward to host your own WireGuard server on a
compatible home router. If you are behind **CGNAT**, WG Tunnel supports **IP4P** endpoints, which let
you self-host without a stable public IP, see
[Self-Hosting Behind CGNAT with IP4P](/docs/guides/ip4p-self-hosting) for a full walkthrough.

There are many suitable VPS hosting providers and guides for hosting your own WireGuard server on a VPS.

### VPN Service Providers

Unfortunately, many VPN service providers are known for using their services to harvest user data.

The following options are recommended based on their privacy reputations and/or support for exporting
WireGuard configurations to third-party applications like WG Tunnel:

**Best overall:** [Mullvad VPN](https://mullvad.net/en)
- Widely regarded as one of the best VPN service providers for privacy
- Strong reputation in the privacy community for not harvesting user data
- Reasonable pricing

[Export WireGuard configurations from Mullvad](https://mullvad.net/en/blog/wireguard-configuration-tool-has-new-function-download-all)

**Best "free" option:** [Proton VPN](https://protonvpn.com/)
- Offers a "free" tier
- "Free" is in quotes because nothing is truly free

[Export WireGuard configurations from Proton](https://protonvpn.com/support/wireguard-configurations)