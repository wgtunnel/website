import React, {ReactNode} from 'react';
import clsx from 'clsx';
import { MdOutlineBolt, MdDns, MdDesktopWindows, MdSyncAlt, MdAutorenew, MdSwapHoriz } from 'react-icons/md'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { BiSolidLockAlt } from 'react-icons/bi'
import { PiShieldWarningBold } from 'react-icons/pi'
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
    title: 'Fully Native, Everywhere',
    Svg: MdDesktopWindows,
    description: (
      <>
        Android and desktop are both genuinely native apps with native performance. Desktop compiles to native executables, running the tunnel as a background service.
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
    title: 'Dynamic DNS Recovery',
    Svg: MdSyncAlt,
    description: (
      <>
        When a tunnel fails, checks whether your server's dynamic DNS hostname now resolves to a new IP and updates the peer endpoint automatically, without dropping the tunnel or requiring a restart.
      </>
    ),
  },
  {
    title: 'IPv6 Restore',
    Svg: MdSwapHoriz,
    description: (
      <>
        Prefers IPv6 endpoints when available, falling back to IPv4 automatically if the network doesn't support it, and proactively upgrading back to IPv6 once it does, all without dropping the tunnel.
      </>
    ),
  },
  {
    title: 'Seamless Recovery',
    Svg: MdAutorenew,
    description: (
      <>
        Recovers from handshake failures or network changes by bouncing the connection alone, never tearing down the tunnel interface or kill switch, so you stay protected the whole time.
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
