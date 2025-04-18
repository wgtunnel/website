+++
weight = 100
date = "2025-04-13T18:42:53-04:00"
lastmod = "2025-04-13T18:42:53-04:00"
draft = false
author = "Zane Schepke"
title = "Backends"
icon = "handyman"
toc = true
description = "The backend and tunnel configuration capabilities of WG Tunnel."
tags = ["backend", "kernel", "userspace"]
+++

## Key Terms

- **Userspace**: The environment where apps and user processes operate. It includes apps, their data, and application  
  libraries. These run with restricted privileges for security, isolated from the core system.
- **Kernel**: The core of Android’s operating system (based on Linux). It manages hardware (e.g., CPU, memory, sensors),
  controls resource access, and serves as a bridge between apps and device hardware. It runs with full privileges and
  enforces security.

## WG Tunnel Backend Implementations

WG Tunnel offers two backend implementations for its core logic:

- **AmneziaWG** (Userspace, backward compatible with WireGuard, default)
- **WireGuard** (Kernel, requires root access)

### AmneziaWG (Userspace)

AmneziaWG is a backward-compatible fork of WireGuard that works seamlessly with standard WireGuard servers. It can
optionally obfuscate WireGuard packet signatures, helping bypass Deep Packet Inspection (DPI) systems that block
WireGuard traffic. AmneziaWG also supports a server-side fork for enhanced DPI protection.

This is WG Tunnel’s default backend, offering performance comparable to the standard WireGuard userspace backend.

AmneziaWG is fully compatible with traditional WireGuard configurations, and will run in a standard WireGuard
mode with these configurations. If DPI protection is needed, AmneziaWG requires additional properties to be configured.

#### AmneziaWG DPI Protection Configuration Details

To evade Deep Packet Inspection (DPI) systems, AmneziaWG extends the standard WireGuard configuration with properties
that obfuscate packet patterns while maintaining compatibility with standard WireGuard servers when set within specific
thresholds. Below are the properties, their roles, thresholds, and compatibility values for standard WireGuard servers:

> <small> In WG Tunnel, there is a convenience action menu on the `Interface` section when editing the configuration to 
> automatically add and remove the DPI protection compatibility values for standard WireGuard servers. </small>

- **Junk Packet Count**: Number of dummy packets added per transmission.
  - **Threshold**: 1–128
  - **Compatibility:** 3-5
  - **Purpose**: Adds noise to obscure traffic patterns.
- **Junk Packet Minimum Size**: Smallest size of dummy packets.
  - **Threshold**: 1–1500 bytes
  - **Compatibility:** 40
  - **Purpose**: Ensures junk packets blend with real data.
- **Junk Packet Maximum Size**: Largest size of dummy packets.
  - **Threshold**: 1–1500 bytes
  - **Compatibility**: 70
  - **Purpose**: Varies packet sizes to avoid predictable patterns.
- **Init Packet Junk Size**: Extra junk data in initial handshake packets.
  - **Threshold**: 0–500 bytes
  - **Compatibility**: 0 (may appear empty in app, this is correct)
  - **Purpose**: Adds junk data to initial handshakes to obscure DPI handshake detection.
- **Response Packet Junk Size**: Extra junk data in response packets.
  - **Threshold**: 0–500 bytes
  - **Compatibility**: 0 (may appear empty in app, this is correct)
  - **Purpose**: Inserts junk in handshake responses to disrupt DPI pattern recognition.
- **Init Packet Magic Header**: Unique identifier for initial packets.
  - **Threshold**: 0–255
  - **Compatibility**: 1
  - **Purpose**: Marks packets to resist DPI filtering.
- **Response Packet Magic Header**: Identifier for response packets.
  - **Threshold**: 0–255
  - **Compatibility**: 2
  - **Purpose**: Obfuscates handshake replies.
- **Underload Packet Magic Header**: Identifier for low-traffic packets.
  - **Threshold**: 0–255
  - **Compatibility**: 3
  - **Purpose**: Masks activity during minimal data transfer.
- **Transport Packet Magic Header**: Identifier for data transport packets.
  - **Threshold**: 0–255
  - **Compatibility**: 4
  - **Purpose**: Conceals regular traffic patterns.

### WireGuard (Kernel)

The kernel backend uses the official WireGuard kernel module for Android, requiring a rooted device. It offers better
performance than userspace implementations and supports multiple simultaneous tunnels. However, it’s less stable due to
deeper system integration and requires root access, which may introduce reliability issues.