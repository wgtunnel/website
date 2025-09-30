import React, {ReactNode} from 'react';
import clsx from 'clsx';
import { MdOutlineBolt, MdOutlineBlock, MdOutlineTv, MdDns, MdOutlineAndroid } from 'react-icons/md'
import { LiaExchangeAltSolid } from 'react-icons/lia'
import { BiSolidLockAlt } from 'react-icons/bi'
import { FaTools, FaRegQuestionCircle } from 'react-icons/fa'
import Heading from '@theme/Heading';
import styles from './styles.module.css';


type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Auto-tunneling',
    Svg: MdOutlineBolt,
    description: (
      <>
          With auto-tunneling, tunnels are automatically turn on, off, or changed based on your network, completely customizable.
      </>
    ),
  },
  {
    title: 'Censorship Resistance',
    Svg: MdOutlineBlock,
    description: (
      <>
          With AmneziaWG 1.5+ support, the app offers compatibility with WireGuard and AmenziaWG servers to provide censorship resistance.
      </>
    ),
  },
  {
    title: 'Proxying',
    Svg: LiaExchangeAltSolid,
    description: (
      <>
        Proxy your applications or even other devices directly to your tunnels via a local HTTP and/or SOCKS5 proxy.
      </>
    ),
  },
    {
        title: 'Android TV Support',
        Svg: MdOutlineTv,
        description: (
            <>
                All features of this app (minus a few due to Android TV limitations) are available and work on Android TV devices.
            </>
        ),
    },
    {
        title: 'Lockdown Mode',
        Svg: BiSolidLockAlt,
        description: (
            <>
                A robust kill switch solution that prevents any data from leaking outside of the tunnel.
            </>
        ),
    },
    {
        title: 'Dynamic DNS Updates',
        Svg: MdDns,
        description: (
            <>
                Automatically detects Dynamic DNS changes and updates to the the latest server IP without restarting the tunnel.
            </>
        ),
    },
    {
        title: 'System Integrations',
        Svg: MdOutlineAndroid,
        description: (
            <>
                The app offers support for tiles, dynamic shortcuts, restore on restarts, and broadcast integration for automation apps like Tasker.
            </>
        ),
    },
    {
        title: 'Active Development',
        Svg: FaTools,
        description: (
            <>
                This app is under continuous active development, with new features and ideas driven by the community in concert with the app developer.
            </>
        ),
    },
    {
        title: 'Support Community',
        Svg: FaRegQuestionCircle,
        description: (
            <>
                The app developer and community are active and always willing to help answer questions or troubleshoot issues.
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
