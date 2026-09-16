import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface GalleryImage {
    url: string;
    alt: string;
}

interface GalleryProps {
    images: GalleryImage[];
    wide?: boolean;
}

export default function Gallery({ images, wide }: GalleryProps) {
    const [openImage, setOpenImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        if (!openImage) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenImage(null);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [openImage]);

    return (
        <>
            <div className={`${styles.grid} ${wide ? styles.gridWide : ''}`}>
                {images.map((image) => (
                    <button
                        key={image.url}
                        type="button"
                        className={styles.thumb}
                        onClick={() => setOpenImage(image)}
                        aria-label={`View ${image.alt} full size`}
                    >
                        <img src={image.url} alt={image.alt} loading="lazy" />
                    </button>
                ))}
            </div>

            {openImage && (
                <div className={styles.overlay} onClick={() => setOpenImage(null)}>
                    <div className={styles.overlayContent} onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => setOpenImage(null)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <img src={openImage.url} alt={openImage.alt} />
                    </div>
                </div>
            )}
        </>
    );
}
