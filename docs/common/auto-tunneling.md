---
sidebar_position: 2
slug: /auto-tunneling
---

# Auto-Tunneling

Auto-tunneling automatically connects and disconnects tunnels based on your active network. To enable
it, open the Auto-Tunneling screen (the bolt icon in the bottom navigation bar on Android; the
Auto-Tunneling section on desktop) and tap Start. Independently toggle it for Wi-Fi, Ethernet, and (on
Android) mobile data, and optionally stop the active tunnel automatically when no internet is detected.

## Key Concepts

- **Default Tunnel**: The default tunnel you've set as your overall default in the app's main tunnel settings. This is the fallback tunnel used when no specific mapping applies.
- **Mapped Tunnel**: A tunnel specifically assigned to a particular Wi-Fi network. When connected to that network, auto-tunneling prioritizes the mapped tunnel over the default.
- **Preferred Tunnel**: The tunnel that auto-tunneling will use for a given network type. For Wi-Fi, this could be the default or a mapped tunnel. For mobile data or Ethernet, it's typically your default tunnel unless overridden.

## Manual Override

If you manually toggle a tunnel while auto-tunneling is active, for example turning off a tunnel
that auto-tunneling just started, auto-tunneling won't immediately react and turn it back on. Instead,
it pauses its own decisions on the current network and leaves your manual choice in place until the
active network actually changes. Once that happens, the override is cleared and auto-tunneling resumes
normal evaluation from there.

This means you can freely turn a tunnel off by hand without auto-tunneling fighting you and
immediately restarting it, it'll wait for the next network change (switching Wi-Fi networks, moving
to Ethernet, etc.) before it starts making decisions again. This behavior is identical on Android and
desktop.

## Network Priority

Android prioritizes networks for auto-tunneling in this order: Ethernet, then Wi-Fi, then mobile data
(cellular). Desktop has no cellular network type, so only Wi-Fi and Ethernet apply there. This priority
isn't shown anywhere in the UI, so it's worth knowing if you're wondering which tunnel wins when
multiple network types are active at once.

On Android, reading the Wi-Fi network name (SSID) requires location permission, since Android
classifies SSIDs as precise location information, see
[Wi-Fi Detection Method](#wi-fi-detection-method-android-only) below for ways around that.

### Wi-Fi Detection Method (Android only)

Choose how WG Tunnel retrieves Wi-Fi details, such as the network name, for auto-tunneling. Each option has trade-offs:

- **Default**: Uses Android's recommended API based on your device version. It's reliable but may query location data frequently on newer devices.
- **Legacy**: Relies on older Android APIs. This reduces location queries but might not work well on some modern devices.
- **Shizuku**: Leverages [Shizuku](https://shizuku.rikka.app/) to fetch the Wi-Fi name via a shell (no root needed), avoiding location permissions entirely, but requires the Shizuku service to be running.
- **Root**: Uses a root shell for direct access. No location permissions or services are required, but your device must be rooted.

## Trusted Wi-Fi Names, Tunnel Mapping & BSSID Matching

Add trusted Wi-Fi names to prevent auto-tunneling from activating there (any active tunnel is disabled
while connected). Map other Wi-Fi names to specific tunnels so auto-tunneling switches to that tunnel
instead of the default whenever you're on that network, handy for using different tunnels at home,
work, or public spots.

In addition to matching by Wi-Fi name (SSID), both platforms also support matching by BSSID (the access
point's hardware address). This is useful when multiple access points share the same network name (like
a mesh network or enterprise Wi-Fi) and you want a rule to apply to a specific access point rather than
the network name as a whole.

## Use Name Wildcards

Enable this to use wildcard patterns when adding trusted Wi-Fi names, mapped Wi-Fi names, and BSSID
rules. Wildcards support both whitelisting (trusting) and blacklisting (marking as untrusted) networks
for more flexible rules.

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
