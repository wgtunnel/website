import React from 'react';
import styles from './styles.module.css';

export default function AuthorCard({
    name,
    role,
    github,
}: {
    name: string;
    role: string;
    github: string;
}): React.ReactElement {
    const profile = `https://github.com/${github}`;
    return (
        <a className={styles.card} href={profile} target="_blank" rel="noopener noreferrer">
            <img
                className={styles.avatar}
                src={`${profile}.png?size=128`}
                alt=""
                width={56}
                height={56}
                loading="lazy"
            />
            <span className={styles.text}>
                <span className={styles.name}>{name}</span>
                <span className={styles.role}>{role}</span>
            </span>
        </a>
    );
}
