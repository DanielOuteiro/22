"use client"

import * as React from "react"
import Image from "next/image"
import Lenis from "@studio-freight/lenis"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const infiniteScrollVariants = cva(
  "relative z-10 overflow-hidden scroll-auto",
  {
    variants: {
      size: {
        default: "h-[70vh]",
        sm: "h-[50vh]",
        lg: "h-[90vh]"
      },
      padding: {
        default: "p-8",
        none: "p-0",
        sm: "p-4",
        lg: "p-12"
      }
    },
    defaultVariants: {
      size: "default",
      padding: "default"
    }
  }
)

const gridVariants = cva(
  "scroll-content grid",
  {
    variants: {
      columns: {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4"
      },
      gap: {
        default: "gap-[2vh]",
        sm: "gap-[1vh]",
        lg: "gap-[3vh]"
      }
    },
    defaultVariants: {
      columns: 3,
      gap: "default"
    }
  }
)

interface InfiniteScrollProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infiniteScrollVariants>,
    VariantProps<typeof gridVariants> {
  images: string[]
  imageHeight?: string
  repeat?: number
  lenisOptions?: Partial<Lenis>
}

const InfiniteScroll = React.forwardRef<HTMLDivElement, InfiniteScrollProps>(
  ({ 
    className,
    size,
    padding,
    columns,
    gap,
    images,
    imageHeight = "31vh",
    repeat = 2,
    lenisOptions,
    ...props 
  }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (!containerRef.current) return

      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        infinite: true,
        wrapper: containerRef.current,
        content: containerRef.current.querySelector(".scroll-content"),
        ...lenisOptions
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      return () => {
        lenis.destroy()
      }
    }, [lenisOptions])

    return (
      <div
        ref={containerRef}
        className={cn(infiniteScrollVariants({ size, padding }), className)}
        {...props}
      >
        <div className={cn(gridVariants({ columns, gap }))}>
          {Array(repeat)
            .fill(images)
            .flat()
            .map((src, index) => (
              <div
                key={index}
                className="relative mx-auto w-full"
                style={{ height: imageHeight }}
              >
                <Image
                  src={src}
                  fill
                  className="object-cover"
                  alt={`infinite scroll image ${index + 1}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
        </div>
      </div>
    )
  }
)
InfiniteScroll.displayName = "InfiniteScroll"

export { InfiniteScroll, type InfiniteScrollProps }