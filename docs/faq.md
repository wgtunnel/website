---
sidebar_position: 100
---

# FAQ

This section addresses commonly asked questions about WG Tunnel.

## Is WG Tunnel supported on Android TV?

Yes, WG Tunnel is supported on Android TV.

Amazon Fire TV is not officially supported, but the app works when sideloaded.

## What is the difference between WG Tunnel's app flavors?

WG Tunnel is a fully Free and Open Source Software (FOSS) app across all flavors, meaning users have the right to use, modify, and redistribute it, with the source code publicly available. Unlike some open source apps, none of the flavors include trackers or closed-source dependencies. The main differences lie in distribution channels, enabled features like in-app donation links, and the in-app updater (which allows for easy updates directly within the app).

Comparison of the three flavors:

| Flavor         | Distribution Channels              | In-App Donation Links | In-App Updater              | Notes                                                                                                         |
|----------------|------------------------------------|-----------------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Google**     | Google Play Store                  | Disabled              | Disabled                    | Required by Google's policies to remove donation links and self-updating mechanisms. Still fully FOSS.        |
| **F-Droid**    | F-Droid Repositories               | Enabled               | Disabled                    | Optimized for open-source ecosystems; updater disabled to comply with F-Droid's build and distribution rules. |
| **Standalone** | Nightly builds and GitHub releases | Enabled               | Enabled (on support screen) | Full-featured version for direct downloads; ideal for users wanting the most flexibility.                     |

## Does WG Tunnel work with Android Auto?

Yes, WG Tunnel is compatible with Android Auto by leveraging the [split tunneling](/docs/android/tunnels#split-tunneling) feature.

To enable compatibility, use [split tunneling](/docs/android/tunnels#split-tunneling) to exclude the Android Auto app package from the tunnel.

## Why are some features unavailable on Android TV?

Android TV lacks certain capabilities and security features available on mobile Android devices.

As a result, some WG Tunnel features are disabled on Android TV to ensure compatibility.

## Why does WG Tunnel require location permissions for auto-tunneling?

Android classifies Wi-Fi SSIDs as precise location information. For WG Tunnel to read the Wi-Fi name (SSID) for auto-tunneling, it requires location permission and location services enabled.

To circumvent this, WG Tunnel supports alternative [Wi-Fi detection methods](/docs/auto-tunneling#wi-fi-detection-method-android-only) like [Shizuku](https://shizuku.rikka.app/).

## How do I exclude my local network from the tunnel to access local services and devices?

When editing a tunnel’s configuration, you can use the *Exclude LAN* action button for each peer. This automatically excludes all private IP address blocks from the tunnel by adding only public IP address blocks to the `AllowedIPs` configuration.

> **Tip**: For more precise IP exclusions, use the [AllowedIPs Calculator](https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/) to generate a custom `AllowedIPs` list.

## Can I switch tunnels based on which app is open?

This is technically possible via automation apps like [Tasker](https://tasker.joaoapps.com/), but it is not yet built into WG Tunnel. It is planned for future versions.

## Does WG Tunnel support desktop?

Yes, WG Tunnel ships a native desktop client for Windows and Linux, sharing the same tunnel engine as
the Android app. See the [Download](/download) page for install options. macOS support isn't available
yet, but is planned for a future release.

## Does WG Tunnel support Wayland?

Yes. The desktop app natively supports Wayland on Linux, with automatic fallback to X11 for window
managers or compositors that don't support Wayland yet.

## Does WG Tunnel ship as a Snap, Flatpak, or AppImage?

No, and there's no plan currently to add these. WG Tunnel's daemon runs as a real system service
(systemd on Linux) to manage routes, firewall rules, and boot-time features like the kill switch and
tunnel restoration. Snap and Flatpak's sandboxing isn't built for apps that need to install, update,
and communicate with a system-level daemon: the daemon would have to be shipped and updated entirely
outside the sandbox, which introduces daemon/app version-compatibility handling and a lot of extra
setup friction for very little benefit over the existing native packages. See the
[Download](/download) page for the officially supported install methods per distro.

## Is kernel mode support planned for Android or desktop?

Not currently, for either platform. Android had a root-based kernel mode (using the device's in-kernel
WireGuard module) prior to v5.0.0, but it was removed as the app shifted toward a fully userspace-focused
architecture. Maintaining kernel mode on top of the deeper backend integration introduced in v5 would
have required ongoing effort that wasn't sustainable alongside the features people were actively
requesting, and the official WireGuard Android app already provides a solid kernel mode implementation,
so there wasn't enough unique value in duplicating it. Desktop was built userspace-only from the start
for the same reason.

Kernel mode isn't on the current roadmap for either platform due to its maintenance burden and
limitations (single active tunnel constraints aside, it doesn't fit well with features like the kill
switch, seamless recovery, or deferred endpoint bootstrapping), but it's not permanently ruled out
either if project needs change in the future.
