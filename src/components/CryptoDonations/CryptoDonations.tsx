import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiCopy } from 'react-icons/fi';
import { MdOutlineQrCode } from 'react-icons/md'

import styles from './CryptoDonations.module.css';
import {IconType} from "react-icons";
import OutlinedIconButton from "@site/src/components/buttons/OutlinedIconButton";

interface CryptoAddress {
    name: string;
    address: string;
    icon?: IconType | string;
}

interface CryptoDonationsProps {
    addresses: CryptoAddress[];
}

const CryptoDonations: React.FC<CryptoDonationsProps> = ({ addresses }) => {
    const [modalAddress, setModalAddress] = useState<string | null>(null);
    const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedMessage('Address copied to clipboard!');
            setTimeout(() => setCopiedMessage(null), 2000);
        });
    };

    const openModal = (address: string) => {
        setModalAddress(address);
    };

    const closeModal = () => {
        setModalAddress(null);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.cryptoList}>
                {addresses.map((item, index) => (
                    <div key={index} className={styles.cryptoItem}>
                        <div style={{ padding: '1em' }}>
                            {typeof item.icon === 'string' ? (
                                <img src={item.icon} alt={`${item.name} icon`} className={styles.downloadIcon} />
                            ) : (
                                item.icon && <span className={styles.downloadIconSvg}>{React.createElement(item.icon)}</span>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p className={styles.cryptoName}>{item.name}</p>
                            <div className={styles.addressRow}>
                                <span className={styles.addressText}>{item.address}</span>
                                <button
                                    onClick={() => copyToClipboard(item.address)}
                                    className={styles.iconButton}
                                    title="Copy address"
                                >
                                    <FiCopy size={20} />
                                </button>
                                <button
                                    onClick={() => openModal(item.address)}
                                    className={styles.iconButton}
                                    title="Show QR code"
                                >
                                    <MdOutlineQrCode size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalAddress && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <QRCodeSVG value={modalAddress} size={256} />
                        <p style={{ marginTop: '10px', color: 'black' }}>{modalAddress}</p>
                        <OutlinedIconButton label="Close" onClick={closeModal} />
                    </div>
                </div>
            )}

            {copiedMessage && (
                <div className={styles.copiedNotification}>
                    {copiedMessage}
                </div>
            )}
        </div>
    );
};

export default CryptoDonations;