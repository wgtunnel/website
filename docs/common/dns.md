---
sidebar_position: 5
---

# Split & Encrypted DNS

DNS resolution is configurable in two independent places: how the tunnel's own peer endpoint gets
resolved, and how DNS works for traffic going through the tunnel.

## Peer Resolution

Controls how a tunnel's peer endpoint (the server hostname in your config, like `my-server.com`) gets
resolved:

- **Resolution Method**: System DNS, or DoH/DoT with a custom resolver endpoint.

This only affects peer endpoint resolution, not general DNS traffic through the tunnel. It's also the
method used whenever a peer needs to be re-resolved after the tunnel is already up, most notably by
[Dynamic DNS Recovery](/docs/common/tunnels#dynamic-dns-recovery), which re-checks a peer's address
with this same method after a failure is detected.

In VPN mode, or whenever the kill switch is active, this resolution is performed over a socket that
bypasses the tunnel (and the kill switch), so peer resolution can still reach the internet directly
even while the tunnel itself is down or blocked.

### IP4P Endpoints

There's no setting for this, it's automatic. If a peer's hostname resolves to an IPv6 address in the
`2001:` NAT-mapped ("IP4P") format that some WireGuard providers use (Mullvad is the notable example,
for its multihop/custom-port endpoints), WG Tunnel detects it and decodes it back into the real IPv4
address and port instead of connecting to it as a literal IPv6 address. This is checked on every
resolution, including [Dynamic DNS Recovery](/docs/common/tunnels#dynamic-dns-recovery), so it keeps
working across reconnects without you having to do anything provider-specific.

## Tunnel DNS

Controls DNS for traffic going through the tunnel itself:

- **Tunnel DNS Mode**:
    - **Off**: Use the DNS servers from your tunnel config as-is, with no additional handling.
    - **Encrypted**: Resolve all tunnel DNS via DoH or DoT to a resolver of your choice.
    - **Split**: Route only specific domain suffixes to a custom resolver, with everything else going through the system or tunnel DNS.
    - **All Local**: Force all DNS through your local/system resolver instead of the tunnel.
- **Protocol**: Plain, DoH, or DoT, depending on the mode.

### Domain Suffixes / Split Suffix Target

In Split mode, **Domain Suffixes** is the list of suffixes (like `internal.corp`) that get routed
differently from everything else. **Split Suffix Target** decides which resolver those suffixes go to:

- **System DNS**: The listed suffixes are routed to your system DNS. Everything else uses tunnel DNS.
- **Tunnel DNS**: The listed suffixes are routed to tunnel DNS (the custom resolver you configured above). Everything else uses your system DNS.

### Transit DNS Policy

Controls what happens to a plain DNS request that's addressed directly to a server other than your
configured tunnel DNS servers (for example, an app that hardcodes a DNS server instead of using the
system resolver):

- **Redirect** (default): Transparently redirect the request to your configured tunnel DNS servers instead, so it's still answered, just via the resolver you've sanctioned.
- **Block**: Drop the request entirely, it gets no answer.
- **Allow**: Let the request pass through unmodified to whatever server it was addressed to.

## Platform Differences

- **Android** additionally shows your current system DNS configuration (including Android's Private DNS setting) directly on this screen, with a warning if Private DNS is enabled while Tunnel DNS is active, since the two can conflict.
- **Desktop** doesn't show a system DNS banner, since there's no equivalent to Android's device-wide Private DNS setting to conflict with.
