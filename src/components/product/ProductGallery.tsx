"use client";

import React, {useState} from "react";

interface Props {
    cover: string;
    images?: string[];
    selectedImage?: string;
    onSelect?: (src: string) => void;
}

export default function ProductGallery({cover, images = [], selectedImage, onSelect}: Props) {
    const all = [cover, ...images];
    const [internalSelected, setInternalSelected] = useState<string>(cover);
    const isControlled = selectedImage !== undefined;
    const selected = isControlled ? (selectedImage as string) : internalSelected;

    function handleSelect(src: string) {
        if (!isControlled) setInternalSelected(src);
        if (onSelect) onSelect(src);
    }

    return (
        <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-3 sm:p-4 shadow-sm">
            <div className="rounded-lg overflow-hidden border border-outline-variant/70 bg-surface-container-low">
                <button
                    className="w-full p-0 bg-transparent border-0 text-left"
                    onClick={() => handleSelect(selected)}
                    aria-label="Open image"
                >
                    <img
                        alt="Cover"
                        className="w-full aspect-3/4 object-contain book-inner-stroke transition-transform duration-300 hover:scale-[1.02]"
                        src={selected}
                    />
                </button>
            </div>

            <div className="mt-3 sm:mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {all.map((src, i) => {
                    const isActive = src === selected;
                    return (
                        <button
                            key={src + i}
                            onClick={() => handleSelect(src)}
                            className={`shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-md overflow-hidden transition-all duration-200 border-2 ${
                                isActive
                                    ? "ring-2 ring-primary/20 border-primary shadow-sm"
                                    : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                            aria-pressed={isActive}
                            aria-label={`Preview ${i + 1}`}
                        >
                            <img className="w-full h-full object-cover" src={src} alt={`Preview ${i + 1}`}/>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

