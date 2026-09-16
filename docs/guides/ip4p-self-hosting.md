---
sidebar_position: 1
---

# Self-Hosting Behind CGNAT with IP4P

If you're self-hosting a WireGuard server at home and your ISP puts you behind CGNAT (Carrier-Grade
NAT), you don't have a stable public IPv4 address to give clients, and you can't port-forward your way
around it. [natmap](https://github.com/heiher/natmap) by heiher solves this with NAT hole-punching
combined with the same IP4P address format that [WG Tunnel decodes automatically](/docs/common/dns#ip4p-endpoints),
letting you connect to a home server behind CGNAT using a plain domain name, with no manual endpoint
updates when your public IP or port changes.

This guide covers the pieces specific to using natmap with WG Tunnel. For the full, up-to-date natmap
setup (including DDNS provider scripts), see the
[natmap wiki's WireGuard guide](https://github.com/heiher/natmap/wiki/wireguard), the guide below is
an English summary of that workflow, credit to heiher for the tool and the technique.

## How it fits together

```text
Your WireGuard Server (ex. 192.168.0.2:6000)
              │
              ▼
   natmap (hole-punches via STUN)
              │
              ▼
  Public IPv4:Port (assigned by your ISP's
   CGNAT, and can change over time)
              │
              ▼
 DNS AAAA record, updated in IP4P format
   whenever natmap detects a change
              │
              ▼
   WG Tunnel resolves your domain, decodes
   the AAAA record, connects to the real
   IPv4:Port behind it
```

natmap doesn't touch your WireGuard traffic, it just keeps a DNS record pointed at wherever your
CGNAT'd connection is currently reachable, using an encoding [WG Tunnel already understands](/docs/common/dns#ip4p-endpoints).

## Setting up natmap

On OpenWrt 22.03+, natmap is packaged directly:

```shell
opkg install natmap luci-app-natmap
```

For other systems, prebuilt binaries are available from the
[natmap releases page](https://github.com/heiher/natmap/releases).

A typical invocation looks like:

```shell
natmap -d -u -i pppoe-wan -s turn.cloudflare.com -b 6000 -t 192.168.0.2 -p 6000 -e /usr/bin/ddns
```

This tells natmap to hole-punch UDP on your WAN interface, using `turn.cloudflare.com` as the STUN
server, forwarding the discovered public endpoint to your internal WireGuard server at
`192.168.0.2:6000`, and running `/usr/bin/ddns` (a notify script you provide) whenever the mapping
changes.

Make sure your firewall allows inbound UDP on whatever bind port you choose (`6000` in the example
above).

## Updating DNS with the IP4P record

The notify script (`-e` above) is responsible for taking the newly discovered public IP and port and
writing them into a AAAA record for your domain, in the IP4P format:

```text
2001:0000:0000:0000:0000:PPPP:IIII:IIII
```

Where `PPPP` is the port in hex, and the last two groups together encode the four IPv4 octets in hex.
Since the exact API calls depend on your DNS provider, the
[natmap wiki](https://github.com/heiher/natmap/wiki/wireguard) has a working example script for
Cloudflare that you can adapt for another provider.

## Configuring the tunnel in WG Tunnel

Once your domain resolves to the IP4P-encoded AAAA record, use that domain as the peer's `Endpoint` in
your WireGuard config, same as any other hostname-based endpoint:

```shell
[Peer]
PublicKey = ...
Endpoint = your-domain.example.com:0
```

The port in the config doesn't matter here since IP4P always overrides it with the port encoded in the
DNS record. WG Tunnel resolves the domain, detects the IP4P format automatically, and connects to the
real IPv4 address and port, including on reconnects, since
[Dynamic DNS Recovery](/docs/common/tunnels#dynamic-dns-recovery) re-checks this the same way after a
failure.
