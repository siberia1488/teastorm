"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  previewImage: string
  galleryImages: string[]
  productName: string
}

export default function ProductGallery({
  previewImage,
  galleryImages,
  productName,
}: Props) {
  const allImages = [previewImage, ...galleryImages]
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const selectedImage = allImages[selectedImageIndex]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* MAIN IMAGE */}
      <div
        style={{
          background:
            "radial-gradient(800px 400px at 20% -20%, #f5f4f0 0%, #efede7 60%, #e8e6df 100%)",
          borderRadius: 32,
          height: 520,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open image"
          style={{ all: "unset", display: "block", width: "100%", height: "100%" }}
        >
          <Image
            src={selectedImage}
            alt={`${productName} - Image ${selectedImageIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedImageIndex === 0}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </button>
      </div>

      {/* THUMBNAILS */}
      {allImages.length > 1 && (
        <div style={{ display: "flex", gap: 12 }}>
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              style={{
                width: 100,
                height: 100,
                borderRadius: 12,
                border:
                  selectedImageIndex === index
                    ? "3px solid #000"
                    : "1px solid #ddd",
                padding: 0,
                background: "#fff",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
              aria-label={`View product image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="100px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* IMAGE COUNTER */}
      {allImages.length > 1 && (
        <p style={{ fontSize: 12, color: "#999", textAlign: "center" }}>
          {selectedImageIndex + 1} / {allImages.length}
        </p>
      )}
      {isOpen && (
        <Lightbox
          images={allImages}
          startIndex={selectedImageIndex}
          onClose={() => setIsOpen(false)}
          onChangeIndex={(i) => setSelectedImageIndex(i)}
          productName={productName}
        />
      )}
    </div>
  )
}

function Lightbox({
  images,
  startIndex = 0,
  onClose,
  onChangeIndex,
  productName,
}: {
  images: string[]
  startIndex?: number
  onClose: () => void
  onChangeIndex: (i: number) => void
  productName: string
}) {
  const [index, setIndex] = useState(startIndex)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => onChangeIndex(index), [index, onChangeIndex])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1))
      if (e.key === "ArrowRight") setIndex((i) => Math.min(images.length - 1, i + 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [images.length, onClose])

  const prev = () => setIndex((i) => Math.max(0, i - 1))
  const next = () => setIndex((i) => Math.min(images.length - 1, i + 1))

  return (
    <div
      role="dialog"
      aria-modal
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "min(1100px, 96vw)",
          height: "min(800px, 88vh)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={images[index]}
          alt={`${productName} - Lightbox ${index + 1}`}
          fill
          sizes="(max-width: 1100px) 100vw, 1100px"
          style={{ objectFit: "contain", objectPosition: "center" }}
        />

        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 44,
            height: 44,
            borderRadius: 8,
            border: "none",
            background: "rgba(255,255,255,0.06)",
            color: "#fff",
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {index > 0 && (
          <button
            onClick={prev}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ‹
          </button>
        )}

        {index < images.length - 1 && (
          <button
            onClick={next}
            aria-label="Next"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              fontSize: 20,
              cursor: "pointer",
            }}
          >
            ›
          </button>
        )}
      </div>
    </div>
  )
}
