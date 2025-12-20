// components/properties/PropertyImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface PropertyImageGalleryProps {
  images: string[];
}

export function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="secondary"
            size="icon"
            onClick={prevImage}
            className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={nextImage}
            className="h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </div>

        {/* Fullscreen Button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40"
        >
          <Maximize2 className="h-5 w-5 text-white" />
        </Button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-4 left-4 right-4 hidden md:flex justify-center gap-2">
          {images.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-16 h-12 rounded-lg overflow-hidden transition-all ${
                currentIndex === index
                  ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={images[index]}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={48}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex]}
              alt={`Property image ${currentIndex + 1}`}
              fill
              className="object-contain"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="bg-black/20 backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="bg-black/20 backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}