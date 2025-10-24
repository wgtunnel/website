---
sidebar_position: 5
---

# Advanced Uses

## Multi-tunneling

Although true multi-tunneling is confined to [kernel mode](settings#kernel-wireguard-only), there are still ways to achieve a multi-tunnel like experience with the other modes.

Typically, Android has a strict limitation of allowing only one VPN to run at a time. To get around this limitation, [Android Work Profiles](https://www.android.com/enterprise/work-profile/) can be used to allow a user to seamlessly run two VPN apps at the same time.

Using an app like [Shelter](https://f-droid.org/en/packages/net.typeblog.shelter/), a user can create an enterprise work profile on their device. Once created, apps like [Shelter](https://f-droid.org/en/packages/net.typeblog.shelter/) allow you to clone various apps to the work profile. This is ideal for privacy and isolation.

Work profiles are isolated and function independently of your normal user profile, allowing VPN apps to run independently in each profile (one per profile). This allows the user to potentially route all work profile apps through one VPN tunnel, and all user apps through another by cloning WG Tunnel to the work profile.

A few notes on the behavior of work profiles:
- If a VPN app is only running in the user profile, all work profile traffic will be blocked by Android.
- If a VPN app is only running in the work profile, only work profile traffic will be routed through the tunnel, while all user profile apps will route outside the tunnel over the primary interface.
- If both profiles have VPN apps running, each will independently route their respective traffic.