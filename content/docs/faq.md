+++
weight = 900
date = "2025-04-13T18:42:53-04:00"
lastmod = "2025-04-13T18:42:53-04:00"
draft = false
author = "Zane Schepke"
title = "FAQ"
icon = "help_center"
toc = true
description = "Frequently asked questions and answers."
tags = ["faq"]
+++


This section details commonly asked questions and the answers to those questions.

### Is WG Tunnel supported on Android TV?

Yes, the app is supported on Android TV.

Amazon's Fire TV is not officially supported, but the app should work when side loaded. 

### How do I add a tunnel?

To add a tunnel, you need either a WireGuard server or a VPN Provider that allows you to export
tunnel configs for third-party apps.

This will commonly be in the form of a `.conf` file or a QR code.

### Does WG Tunnel work with Android Auto?

Yes, WG Tunnel works with Android Auto, but this requires some configuration.

You need to bypass tunneling for the Android Auto app by leveraging the app's split tunneling feature.

[TODO add link to reference configuring split tunneling.]: #

### Why are some features not available for Android TV?

Android TV does not have all the same capabilities and security features as Android on mobile.

For this reason, some features are disabled for Android TV.

### Why does WG Tunnel require location permissions for auto-tunneling?

Android has deemed Wi-Fi SSIDs as precise location information.
In order for WG Tunnel to read the SSID from the system, it must have these permissions.

> <small> This permission is only required if you enable <em>Tunnel on untrusted wifi</em> in the auto-tunneling settings. </small>

### How do I exclude my local network from the tunnel so I can access my local services and devices?

When editing a tunnel's configuration, there is an action button on each peer that allows you to *exclude LAN*.

This will automatically exclude all private IP address blocks from the tunnel by only adding public IP addresses blocks to the `allowedIps`
configuration on the peer. 

> <small> If you wish for a more precise exclusion of certain IPs from the tunnel, the [AllowedIps Calculator](https://www.procustodibus.com/blog/2021/03/wireguard-allowedips-calculator/)
 is a handy tool to accomplish generated the proper allowedIps list. </small>

