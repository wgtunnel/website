import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface GalleryImage {
    url: string;
    alt: string;
    width?: number;
    height?: number;
}

interface GalleryProps {
    images: GalleryImage[];
    wide?: boolean;
}

const decodedUrls = new Set<string>();

function remember(src: string) {
    decodedUrls.add(src);
}

interface FadeImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

function FadeImage({src, alt, width, height, onReady}: FadeImageProps & {onReady?: () => void}) {
    const [loaded, setLoaded] = useState(() => decodedUrls.has(src));
    const imgRef = useRef<HTMLImageElement>(null);

    function mark() {
        remember(src);
        setLoaded(true);
        onReady?.();
    }

    useLayoutEffect(() => {
        const img = imgRef.current;
        if (img?.complete && img.naturalWidth > 0) {
            mark();
        }
    }, [src]);

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            onLoad={mark}
            className={clsx(styles.fadeImage, loaded && styles.loaded)}
        />
    );
}

function Thumb({image, onOpen}: {image: GalleryImage; onOpen: () => void}) {
    const framed = Boolean(image.width && image.height);
    const [ready, setReady] = useState(() => decodedUrls.has(image.url));

    return (
        <button
            type="button"
            className={clsx(styles.thumb, framed && styles.thumbFramed, ready && styles.thumbReady)}
            style={framed ? {aspectRatio: `${image.width} / ${image.height}`} : undefined}
            onClick={onOpen}
            aria-label={`View ${image.alt} full size`}
        >
            <FadeImage
                src={image.url}
                alt={image.alt}
                width={image.width}
                height={image.height}
                onReady={() => setReady(true)}
            />
        </button>
    );
}

export default function Gallery({images, wide}: GalleryProps): React.ReactElement {
    const [openImage, setOpenImage] = useState<GalleryImage | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const urls = images.map((image) => image.url).join('|');

    useEffect(() => {
        if (!openImage) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpenImage(null);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [openImage]);

    // A hidden tab is display:none, so the browser may skip those photos.
    // Fetch them after the visible ones have had a head start.
    useEffect(() => {
        const panel = rootRef.current?.closest('[role="tabpanel"]');
        const hidden = panel instanceof HTMLElement && panel.hidden;
        const list = urls.split('|').filter(Boolean);
        const preload = () => {
            for (const url of list) {
                if (decodedUrls.has(url)) continue;
                const pre = new Image();
                pre.decoding = 'async';
                pre.src = url;
                pre.onload = () => remember(url);
            }
        };
        if (!hidden) {
            preload();
            return;
        }
        const id = window.setTimeout(preload, 600);
        return () => window.clearTimeout(id);
    }, [urls]);

    return (
        <>
            <div ref={rootRef} className={clsx(styles.grid, wide && styles.gridWide)}>
                {images.map((image) => (
                    <Thumb key={image.url} image={image} onOpen={() => setOpenImage(image)} />
                ))}
            </div>

            {openImage && (
                <div className={styles.overlay} onClick={() => setOpenImage(null)}>
                    <div className={styles.overlayContent} onClick={(event) => event.stopPropagation()}>
                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => setOpenImage(null)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <FadeImage
                            key={openImage.url}
                            src={openImage.url}
                            alt={openImage.alt}
                            width={openImage.width}
                            height={openImage.height}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
