# FAQ

This section addresses commonly asked questions about WG Tunnel.

## Is WG Tunnel supported on Android TV?

Yes, WG Tunnel is supported on Android TV.

Amazon Fire TV is not officially supported, but the app works when sideloaded.

## What is the difference between WG Tunnel's app flavors?

WG Tunnel is a fully Free and Open Source Software (FOSS) app across all flavors, meaning users have the right to use, modify, and redistribute it, with the source code publicly available. Unlike some open source apps, none of the flavors include trackers or closed-source dependencies. The main differences lie in distribution channels, enabled features like in-app donation links, and the in-app updater (which allows for easy updates directly within the app).

Comparison of the three flavors:

| Flavor         | Distribution Channels              | In-App Donation Links | In-App Updater              | Notes                                                                                                         |
|----------------|------------------------------------|-----------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------|
| **Google**     | Google Play Store                  | Disabled              | Disabled                    | Required by Google's policies to remove donation links and self-updating mechanisms. Still fully FOSS.        |
| **F-Droid**    | F-Droid Repositories               | Enabled               | Disabled                    | Optimized for open-source ecosystems; updater disabled to comply with F-Droid's build and distribution rules. |
| **Standalone** | Nightly builds and GitHub releases | Enabled               | Enabled (on support screen) | Full-featured version for direct downloads; ideal for users wanting the most flexibility.                     |

## Does WG Tunnel work with Android Auto?

Yes, WG Tunnel is compatible with Android Auto by leveraging the [split tunneling](tunnels#split-tunneling) feature.

To enable compatibility, use [split tunneling](tunnels#split-tunneling) to exclude the Android Auto app package from the tunnel.

## Why are some features unavailable on Android TV?

Android TV lacks certain capabilities and security features available on mobile Android devices.

As a result, some WG Tunnel features are disabled on Android TV to ensure compatibility.

## Why does WG Tunnel require location permissions for auto-tunneling?

Android classifies Wi-Fi SSIDs as precise location information. For WG Tunnel to read the Wi-Fi name (SSID) for auto-tunneling, it requires location permission and location services enabled.

To circumvent this, WG Tunnel supports alternative [Wi-Fi detection methods](auto-tunneling#wi-fi-detection-method) like [Shizuku](https://shizuku.rikka.app/).

## How do I exclude my local network from the tunnel to access local services and devices?

When editing a tunnel’s configuration, you can use the *Exclude LAN* action button for each peer. This automatically excludes all private IP address blocks from the tunnel by adding only public IP address blocks to the `AllowedIPs` configuration.

> **Tip**: For more precise IP exclusions, use the [AllowedIPs Calculator](https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/) to generate a custom `AllowedIPs` list.

## Can I switch tunnels based on which app is open?

This is technically possible via automation apps like [Tasker](https://tasker.joaoapps.com/), but it is not yet built into WG Tunnel. It is planned for future versions.

## Will WG Tunnel ever support other platforms, like desktop?

A long-term goal is to create a desktop app, but this would take an immense amount of effort. This project only has a single developer and no funding for such an endeavor.