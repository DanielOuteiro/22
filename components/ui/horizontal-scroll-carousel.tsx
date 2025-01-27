"use client"

import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"

interface HorizontalScrollCarouselProps {
  images: string[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ images }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-95%"])

  return (
    <section
      ref={targetRef}
      className="relative h-[400vh] w-full"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4"
        >
          {images.map((src) => (
            <Card
              src={src}
              key={src}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const Card: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="group relative h-[450px] w-[450px] overflow-hidden rounded-lg">
      <Image
        src="https://www.edilozi.pro/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1572099606223-6e29045d7de3%3Fq%3D80%26w%3D2070&w=3840&q=75"
        fill
        objectFit="cover"
        alt="carousel image"
      />
    </div>
  )
}

export { HorizontalScrollCarousel };