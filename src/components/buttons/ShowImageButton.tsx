
import React, { useState } from 'react';
import OutlinedIconButton from "@site/src/components/buttons/OutlinedIconButton";
import {CgScreenShot} from "react-icons/cg";

type ClickToRevealImageProps = {
    src: string;
    alt?: string;
    width?: string;
    showButtonText: string;
    hideButtonText: string;
};

const ClickToRevealImage: React.FC<ClickToRevealImageProps> = (
    {
     src,
     alt = 'Image',
     width = '50%',
     showButtonText,
     hideButtonText,
     }) => {
    const [show, setShow] = useState(false);

    return (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>

            <OutlinedIconButton
                onClick= { () => {
                    setShow(!show)
                }}
                label={show ? hideButtonText : showButtonText}
                icon={CgScreenShot}
            />

            {show && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1rem' }}>
                    <img
                        src={src}
                        alt={alt}
                        style={{ width, height: 'auto' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ClickToRevealImage;
