---
sidebar_position: 3
---

# Auto-Tunneling

Auto-tunneling is a core feature of WG Tunnel that automatically connects and disconnects from tunnels based on conditions like your active network connection.

To enable auto-tunneling, tap the "Bolt" icon in the app's bottom navigation bar and select "Start".

## Key Concepts

Before diving into the settings, here's a quick overview of important terms used in auto-tunneling:

- **Default Tunnel**: The default tunnel you've set as your overall default in the app's main tunnel settings (covered in a separate section). This is the fallback tunnel used when no specific mapping applies.
- **Mapped Tunnel**: A tunnel specifically assigned to a particular Wi-Fi network. When connected to that network, auto-tunneling prioritizes the mapped tunnel over the default.
- **Preferred Tunnel**: Refers to the tunnel that auto-tunneling will use for a given network type. For Wi-Fi, this could be the default or a mapped tunnel. For mobile data or Ethernet, it's typically your default tunnel unless overridden.

These concepts allow flexible control over which tunnel activates based on your network.

## Network-Based Tunneling

Android prioritizes networks for internet connectivity in this order:

1. Ethernet
2. Wi-Fi
3. Mobile data (cellular)

Auto-tunneling responds to changes in your active network (the one Android is currently using for internet access).

### Active Network Display

This section shows Android's current active network. If it's a Wi-Fi network, you'll also see details like the network name (SSID) and security type.

The goal is to give you clear insight into which network the app detects as active, helping you troubleshoot or verify auto-tunneling behavior.

> **Note:** If the network name appears as `<unknown ssid>`, this is Android's default response when the app lacks permissions to read the Wi-Fi name. This is normal until you add a trusted Wi-Fi name, which will prompt a permission request.

### Tunnel on Wi-Fi

When enabled, auto-tunneling automatically starts your preferred tunnel (default or mapped) whenever an active, internet-capable Wi-Fi connection is detected.

#### Wi-Fi Detection Method

Choose how WG Tunnel retrieves Wi-Fi details, such as the network name, for auto-tunneling. Each option has trade-offs:

- **Default**: Uses Android's recommended API based on your device version. It's reliable but may query location data frequently on newer devices.
- **Legacy**: Relies on older Android APIs. This reduces location queries but might not work well on some modern devices.
- **Shizuku**: Leverages [Shizuku](https://shizuku.rikka.app/) to fetch the Wi-Fi name via a shell (no root needed), avoiding location permissions entirely, but requires the Shizuku service to be running.
- **Root**: Uses a root shell for direct access. No location permissions or services are required, but your device must be rooted.

#### Use Name Wildcards

Enable this to use wildcard patterns when adding trusted Wi-Fi names and mapped Wi-Fi names. Wildcards support both whitelisting (trusting) and blacklisting (marking as untrusted) networks for more flexible rules.

> **Note:** Escape special characters in Wi-Fi names with a leading `\`. For example: `\(5G\) Wifi*`. Characters needing escape include: `.^$+{}[]|()` and `*?` (when they're part of the actual Wi-Fi name).

Supported wildcards:
- `*`: Matches any sequence of characters.
    - Examples:
        - Trust all networks: `*`
        - Trust networks starting with "Home": `Home*`
- `!`: Blacklists a network (marks as untrusted).
    - Example: Blacklist "Guest Wi-Fi": `!Guest Wi-Fi`
- `?`: Matches any single character.
    - Example: Trust "Home" followed by one character: `Home?`

Combine wildcards for advanced rules, like trusting all networks except specific blacklisted ones.

#### Trusted Wi-Fi Names

Add trusted Wi-Fi names here. Auto-tunneling will not activate on these networks, and will disable any active tunnels,
as they are considered trusted and in no need of a tunnel. If wildcards are enabled, use them to create broader rules.

#### Tunnel Mapping

Map specific Wi-Fi names to tunnels. When connected to a mapped network, auto-tunneling uses or switches to that tunnel
instead of the default or currently active tunnel. This is ideal for using different tunnels at home, work, or public spots.
If wildcards are enabled, use them to create broader rules.

### Tunnel on Mobile Data

When enabled, auto-tunneling activates your preferred tunnel on a cellular connection. You can further configure a specific preferred tunnel for mobile data networks instead of using just the default.

### Tunnel on Ethernet

When enabled, auto-tunneling activates your preferred tunnel on an Ethernet connection. You can further configure a specific preferred tunnel for Ethernet networks instead of using just the default.

### Stop Tunnel on No Internet

When enabled, auto-tunneling deactivates the active tunnel if no internet is detected. This helps save battery life by avoiding unnecessary tunnel operation.

## Other Settings

### Start on Boot

Enable this to automatically launch the auto-tunneling service when your device boots up.

### Debounce Delay

This advanced setting controls how long auto-tunneling waits before reacting to rapid network changes.
Leave it at the default unless you want to make auto-tunneling more responsive or attempt to improve the reliability. 