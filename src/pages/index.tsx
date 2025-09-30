import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { useHistory } from '@docusaurus/router';



import styles from './index.module.css';
import OutlinedIconButton from "@site/src/components/buttons/OutlinedIconButton";

function HomepageHeader() {
    const history = useHistory();
    const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
            <OutlinedIconButton
                onClick={() => { history.push('/download'); }}
                label="Download"
            />
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.tagline}`}>
      <HomepageHeader />
      <main>
          <section className={styles.featuresSection}>
              <div className="container">
                  <div className="row">
                      <div className="col col--12">
                          <h2 className={styles.subHeader}>Features</h2>
                      </div>
                  </div>
                  <HomepageFeatures />
              </div>
          </section>
      </main>
    </Layout>
  );
}
