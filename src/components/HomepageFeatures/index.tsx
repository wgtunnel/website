import React, {ReactNode} from 'react';
import clsx from 'clsx';
import { MdOutlineBolt, MdDns, MdDesktopWindows, MdSwapHoriz, MdAltRoute } from 'react-icons/md'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { BiSolidLockAlt } from 'react-icons/bi'
import { PiShieldWarningBold, PiCodeBold } from 'react-icons/pi'
import Heading from '@theme/Heading';
import styles from './styles.module.css';


type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Auto-Tunneling',
    Svg: MdOutlineBolt,
    description: (
      <>
          Tunnels automatically turn on, off, or switch based on your network conditions, fully customizable per network.
      </>
    ),
  },
  {
    title: 'Kill Switch',
    Svg: BiSolidLockAlt,
    description: (
      <>
        A system-wide, tunnel-independent kill switch that blocks all traffic outside the tunnel, on both Android and desktop.
      </>
    ),
  },
  {
    title: 'AmneziaWG Support',
    Svg: PiShieldWarningBold,
    description: (
      <>
        First class support for AmneziaWG 2.0 through 3.1 alongside standard WireGuard, for robust protection on restrictive networks.
      </>
    ),
  },
  {
    title: 'Multihop',
    Svg: MdAltRoute,
    description: (
        <>
            Nest any of your tunnels inside another, mixing WireGuard and AmneziaWG freely. The entry hop sees your real IP but not your traffic, and the exit hop sees your traffic but not your real IP.
        </>
    ),
  },
  {
    title: 'Split & Encrypted DNS',
    Svg: MdDns,
    description: (
      <>
        Resolve DNS through the tunnel via plain DNS, DoT, or DoH, and optionally split resolution by domain suffix.
      </>
    ),
  },
  {
    title: 'Local Proxy Mode',
    Svg: LiaExchangeAltSolid,
    description: (
      <>
        Expose any tunnel over a local SOCKS5 or HTTP proxy for individual apps or other devices to use.
      </>
    ),
  },
  {
    title: 'Tunnel Recovery',
    Svg: MdSwapHoriz,
    description: (
      <>
        Continuously monitors handshake health and automatically recovers from network switches, NAT issues, IPv4/IPv6 endpoint failures, and dynamic server IPs, all without restarting the VPN.
      </>
    ),
  },
  {
    title: 'Fully Native, Everywhere',
    Svg: MdDesktopWindows,
    description: (
        <>
            Android and desktop are both genuinely native apps with native performance. Desktop compiles to native executables, running the tunnel as a background service.
        </>
    ),
  },
  {
    title: 'Open Source & Independent',
    Svg: PiCodeBold,
    description: (
      <>
        Fully open source, with no telemetry, ads, or proprietary code. Funded entirely by small-dollar donations from the community, with no investors or corporate interests.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className={styles.featureCard}>
                <div className={styles.headerRow}>
                    <Svg className={styles.featureSvg} role="img" />
                    <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
                </div>
                <p className={styles.featureDescription}>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
