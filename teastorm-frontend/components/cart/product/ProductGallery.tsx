"use client"

import Image from "next/image"
import { useState } from "react"

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
        <Image
          src={selectedImage}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={selectedImageIndex === 0}
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>

      {/* THUMBNAILS */}
      {allImages.length > 1 && (
        <div style={{ display: "flex", gap: 12 }}>
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                border:
                  selectedImageIndex === index
                    ? "2px solid #000"
                    : "1px solid #ddd",
                padding: 4,
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
                sizes="80px"
                style={{
                  objectFit: "contain",
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
    </div>
  )
}
