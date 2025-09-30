# FAQ

This section addresses commonly asked questions about WG Tunnel and provides detailed answers.

## Is WG Tunnel supported on Android TV?

Yes, WG Tunnel is supported on Android TV.

Amazon Fire TV is not officially supported, but the app may work when sideloaded.

## How do I add a tunnel?

To add a tunnel, you need a WireGuard server or a VPN provider that allows exporting tunnel configurations for third-party apps.

These configurations are typically provided as a `.conf` file or a QR code.

## Does WG Tunnel work with Android Auto?

Yes, WG Tunnel is compatible with Android Auto, but it requires specific configuration.

To enable compatibility, use the app’s split tunneling feature to exclude the Android Auto app from the tunnel.

> **Note**: Refer to the [split tunneling configuration guide](#) for detailed instructions. *[TODO: Add link to split tunneling configuration guide.]*

## Why are some features unavailable on Android TV?

Android TV lacks certain capabilities and security features available on mobile Android devices.

As a result, some WG Tunnel features are disabled on Android TV to ensure compatibility and security.

## Why does WG Tunnel require location permissions for auto-tunneling?

Android classifies Wi-Fi SSIDs as precise location information. For WG Tunnel to access the SSID for auto-tunneling, it requires location permissions.

> **Note**: This permission is only needed if you enable the *Tunnel on untrusted Wi-Fi* option in the auto-tunneling settings.

## How do I exclude my local network from the tunnel to access local services and devices?

When editing a tunnel’s configuration, you can use the *Exclude LAN* action button for each peer. This automatically excludes all private IP address blocks from the tunnel by adding only public IP address blocks to the `AllowedIPs` configuration.

> **Tip**: For more precise IP exclusions, use the [AllowedIPs Calculator](https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/) to generate a custom `AllowedIPs` list.

## Can I switch tunnels based on which app is open?

Yes, this is technically possible, but it requires system-level permissions, which are subject to a strict approval process by Google. This feature is not currently supported, but it may be considered for future development.
