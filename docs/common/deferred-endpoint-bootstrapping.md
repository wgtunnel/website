---
sidebar_position: 3
slug: /deferred-endpoint-bootstrapping
---

# Deferred Endpoint Bootstrapping

WG Tunnel splits tunnel startup into two independent stages so that you're protected immediately,
regardless of network conditions.

## The problem with most clients

A WireGuard config's `Endpoint` is usually a hostname (`my-server.com:51820`), not a raw IP. Before a
typical client can send a single packet through the tunnel, it has to resolve that hostname first.
Most clients do this resolution *before* bringing the tunnel interface, routes, and firewall rules up
at all. That creates two real problems:

- **You leak while it resolves.** Until resolution finishes, your traffic is still going out
  unprotected, over your normal connection. On a slow or congested network, that window can be
  several seconds, or longer.
- **A DNS failure means no tunnel at all.** If resolution never succeeds (a blocked resolver, a
  captive portal, no network connection yet), the client gives up before the tunnel ever comes up.
  You're not just leaking, you have no protection whatsoever until you manually retry.

## How WG Tunnel does it differently

WG Tunnel brings up the TUN interface, routes, and firewall rules *first*, before it knows anything
about the peer's real address. Peer endpoint resolution happens separately, in the background,
retrying indefinitely until it succeeds. This is independent of the kill switch, which is its own
separate, optional feature with its own lifecycle, on or off, unrelated to any given tunnel's
connection state.

This means the two stages are fully decoupled:

1. **Protection is immediate.** The moment you toggle a tunnel on, your traffic is already locked
   down. There's no window where you're exposed, and no dependency on DNS succeeding for you to be
   protected.
2. **The tunnel never fails to come up because of resolution.** Since bringing the tunnel up doesn't
   require a resolved endpoint, a flaky network, a temporarily unreachable DNS server, or even having
   no network connection at all can't prevent it from starting.

## A concrete example

You can toggle a tunnel on while your device has no network connection at all, before connecting to
Wi-Fi, before a mobile data signal comes back, even in airplane mode. The tunnel interface comes up
immediately regardless. As soon as a network path becomes available, WG Tunnel resolves the peer's
real address in the background and connects automatically, with no need to toggle the tunnel off and
on again or otherwise intervene.

Contrast that with a client that resolves first: with no network available, it has nothing to resolve
against, so it fails outright, and you have to remember to retry once you're actually online.

## Why this matters

This isn't a cosmetic difference. It changes the actual security and reliability guarantees of the
app:

- No leak window while waiting on DNS, ever.
- No "tunnel silently didn't start" surprise on an unreliable network.
- One consistent behavior across auto-tunneling, manual toggles, and boot-time tunnel restoration on
  both Android and desktop, since all three share the same underlying engine.
