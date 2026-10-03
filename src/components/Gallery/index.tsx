import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

interface GalleryImage {
    url: string;
    alt: string;
}

interface GalleryProps {
    images: GalleryImage[];
    wide?: boolean;
}

interface FadeImageProps {
    src: string;
    alt: string;
    className?: string;
}

// Starts invisible and fades in once decoded, instead of popping in mid-layout as it streams in.
function FadeImage({ src, alt, className }: FadeImageProps) {
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setLoaded(imgRef.current?.complete ?? false);
    }, [src]);

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={[className, styles.fadeImage, loaded ? styles.loaded : '']
                .filter(Boolean)
                .join(' ')}
        />
    );
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
                        <FadeImage src={image.url} alt={image.alt} />
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
                        <FadeImage key={openImage.url} src={openImage.url} alt={openImage.alt} />
                    </div>
                </div>
            )}
        </>
    );
}
