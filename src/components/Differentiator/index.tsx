import React, {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function Differentiator(): ReactNode {
    return (
        <section className={styles.differentiator}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.textCol}>
                        <div className={styles.eyebrow}>What Makes WG Tunnel Different</div>
                        <Heading as="h2" className={styles.headline}>
                            Immediate protection
                        </Heading>
                        <p className={styles.body}>
                            WG Tunnel is intentionally designed for enhanced leak protection and reliability.
                            As soon as you turn on your tunnel, you are protected. You can even turn on a tunnel
                            when you have no network connection and it will automatically connect the moment
                            you're online.
                        </p>
                        <a href="/docs/deferred-endpoint-bootstrapping" className={styles.learnMore}>
                            Learn how this works →
                        </a>
                    </div>
                    <div className={styles.compareCol}>
                        <div className={`${styles.compareRow} ${styles.otherClients}`}>
                            <div className={styles.compareLabel}>Most WireGuard clients</div>
                            <p className={styles.compareText}>
                                Resolve endpoints first, leaking during resolution → never comes up if resolution fails.
                            </p>
                        </div>
                        <div className={`${styles.compareRow} ${styles.wgtunnel}`}>
                            <div className={styles.compareLabel}>WG Tunnel</div>
                            <p className={styles.compareText}>
                                Locks down traffic first (no leaks) → resolves endpoints in the background, retrying indefinitely.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
