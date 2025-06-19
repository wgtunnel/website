+++
weight = 102
date = "2025-04-13T18:42:53-04:00"
lastmod = "2025-04-13T18:42:53-04:00"
draft = false
author = "Zane Schepke"
title = "Auto-tunneling"
icon = "bolt"
toc = true
description = "A detailed guide to the auto-tunneling features of WG Tunnel."
tags = ["auto", "auto-tunneling", "automation"]
+++

Auto-tunneling is a core feature of WG Tunnel, enabling users to automate the state of their tunnels based on their 
active network connection.

### Auto-tunneling by Wi-Fi

These settings allow you to configure how auto-tunneling behaves for Wi-Fi networks.

> **_NOTE:_** <small>To use specific tunnels under certain network conditions, configure these settings in each tunnel's 
> auto-tunneling settings. Auto-tunneling will respect these preferences, defaulting to the *primary* tunnel or the first 
> tunnel if no specific configuration is set.</small>

#### Tunnel on untrusted Wi-Fi

This setting enables auto-tunneling to activate the tunnel on untrusted Wi-Fi networks. By default, no Wi-Fi networks 
are trusted, so the *primary* or first tunnel will activate automatically when connected to Wi-Fi.

The currently active Wi-Fi network (as detected by the app) is displayed below this setting.

> **_NOTE:_** <small>If the network shows as `<unknown ssid>`, the app lacks permission to read the Wi-Fi network name. 
> This is expected until you attempt to add a *trusted Wi-Fi name*, which will prompt a permission request.</small>

#### Wi-Fi detection method

This setting allows the user to select by which method WG Tunnel will attempt to get the Wi-Fi connection information
for auto-tunneling (namely the SSID). 

There are several options, each with different benefits and drawbacks:

- ***Default***: Uses the preferred Android API based on the Android version. This
is the most reliable method, but it can come with drawbacks on newer Android devices as it will query location information often.
- ***Legacy***: Use the legacy Android API. This comes with the benefit of less frequent location queries, but at the risk of
not working properly on some newer devices models. 
- ***Root***: Uses a root shell. This option has the benefit on not requiring any location permission to the app nor location services
to be active on the phone. The drawback is your device must be rooted to use this feature.


#### Use name wildcards

This setting enables the use of custom wildcard patterns when adding trusted Wi-Fi names. It supports both 
*whitelisting* (trusting) and *blacklisting* (marking as untrusted) Wi-Fi network names.

> **_NOTE:_** <small>Special characters in Wi-Fi names must be escaped with a leading `\`. For example: `\(5G\) Wifi*`. 
> Special characters requiring escaping include: `.^$+{}[]|()` and `*?` when part of a Wi-Fi name.</small>

Supported wildcard characters:
- `*`: Matches any sequence of characters.
  - Example use cases:
    - Trust all networks: `*`
    - Trust networks starting with "Home": `Home*`
- `!`: Marks a Wi-Fi name as untrusted (blacklist).
  - Example use case:
    - Mark a network as untrusted: `!Guest Wi-Fi`
- `?`: Matches a single character.
  - Example use case:
    - Trust networks named "Home" followed by one character: `Home?`

These wildcards can be combined to create flexible whitelisting or blacklisting rules, such as trusting all networks 
except specific blacklisted ones.

#### Trusted Wi-Fi names

This setting provides a textbox for adding trusted Wi-Fi names. If wildcards are enabled, you can use them to customize 
these names further.

#### Stop kill switch on trusted

When enabled, this setting configures auto-tunneling to disable the VPN kill switch (if active) when connected to a 
trusted Wi-Fi network.

### Auto-tunneling by other networks

These settings configure auto-tunneling for non-Wi-Fi networks.

#### Tunnel on mobile data

When enabled, auto-tunneling activates the corresponding tunnel when connected to a cellular network.

#### Tunnel on ethernet

When enabled, auto-tunneling activates the corresponding tunnel when connected to an ethernet network.

#### Stop tunnel on no internet

When enabled, auto-tunneling deactivates the active tunnel if no internet connection is available.

#### Advanced - Debounce Delay

This advanced setting lets users adjust the debounce delay, which controls how long auto-tunneling waits before 
responding to rapid network changes. Typically, this setting should remain untouched unless the user needs to fine-tune 
the speed of auto-tunneling’s response to network changes.