import React from 'react';
import { IconType } from 'react-icons';
import styles from './DownloadButton.module.css';

interface DownloadButtonProps {
    label: string;
    icon?: IconType | string;
    onClick: () => void | Promise<void>;
}

const OutlinedIconButton: React.FC<DownloadButtonProps> = ({ label, icon, onClick }) => {
    return (
        <button onClick={onClick} className={styles.downloadButton}>
            {typeof icon === 'string' ? (
                <img src={icon} alt={`${label} icon`} className={styles.downloadIcon} />
            ) : (
                icon && <span className={styles.downloadIconSvg}>{React.createElement(icon)}</span>
            )}
            <span>{label}</span>
        </button>
    );
};

export default OutlinedIconButton;
