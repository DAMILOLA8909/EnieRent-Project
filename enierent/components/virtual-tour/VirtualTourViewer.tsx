// components/virtual-tour/VirtualTourViewer.tsx - FIXED
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, // Added
  DialogTrigger 
} from "@/components/ui/dialog";
import { Maximize2, Minimize2, X, Navigation, Info } from "lucide-react";
import { Loader2 } from "lucide-react";
import { VirtualTourHotspot } from "@/types";

interface VirtualTourViewerProps {
  images: string[];
  hotspots?: VirtualTourHotspot[];
  propertyTitle: string;
  trigger: React.ReactNode;
}

export function VirtualTourViewer({ 
  images, 
  hotspots = [],
  propertyTitle,
  trigger 
}: VirtualTourViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [viewer, setViewer] = useState<any>(null);
  const panoramaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && panoramaRef.current && typeof window !== 'undefined') {
      // Clean up previous viewer
      if (viewer) {
        try {
          viewer.destroy();
        } catch (error) {
          console.error('Error destroying previous viewer:', error);
        }
      }

      // Dynamically import pannellum
      import('pannellum').then((pannellum) => {
        const config = {
          type: "equirectangular",
          panorama: images[currentScene],
          autoLoad: true,
          autoRotate: -1,
          compass: true,
          preview: images.length > 0 ? images[0] : undefined,
          hotSpotDebug: false,
          showControls: true,
          haov: 360,
          vaov: 180,
          vOffset: 0,
        };

        // Add hotspots to config
        if (hotspots.length > 0) {
          (config as any).hotSpots = hotspots.map(hotspot => ({
            pitch: hotspot.pitch,
            yaw: hotspot.yaw,
            type: hotspot.type || 'info',
            text: hotspot.text,
            URL: hotspot.url,
            sceneId: hotspot.targetSceneId,
            cssClass: 'custom-hotspot',
          }));
        }

        const newViewer = (pannellum as any).viewer(panoramaRef.current, config);
        setViewer(newViewer);
        setIsLoading(false);
        
      }).catch(error => {
        console.error('Failed to load virtual tour:', error);
        setIsLoading(false);
      });
    }

    // Cleanup function
    return () => {
      if (viewer) {
        try {
          viewer.destroy();
        } catch (error) {
          console.error('Error cleaning up viewer:', error);
        }
      }
    };
  }, [isOpen, currentScene]);

  useEffect(() => {
    // Switch scenes when currentScene changes
    if (viewer && images[currentScene]) {
      try {
        viewer.setPanorama(images[currentScene]);
      } catch (error) {
        console.error('Error switching scene:', error);
      }
    }
  }, [currentScene, viewer, images]);

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          setCurrentScene(prev => prev > 0 ? prev - 1 : images.length - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          setCurrentScene(prev => prev < images.length - 1 ? prev + 1 : 0);
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, images.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      panoramaRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Simple hotspot click handler
  const handleHotspotClick = (hotspot: VirtualTourHotspot) => {
    if (hotspot.type === 'link' && hotspot.url) {
      window.open(hotspot.url, '_blank');
    } else if (hotspot.type === 'scene' && hotspot.targetSceneId) {
      const sceneIndex = parseInt(hotspot.targetSceneId);
      if (!isNaN(sceneIndex) && sceneIndex >= 0 && sceneIndex < images.length) {
        setCurrentScene(sceneIndex);
      }
    } else if (hotspot.text) {
      alert(hotspot.text);
    }
  };

  // Custom CSS for hotspots
  useEffect(() => {
    if (isOpen && hotspots.length > 0) {
      const style = document.createElement('style');
      style.innerHTML = `
        .custom-hotspot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.8);
          border: 2px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .custom-hotspot:hover {
          background: rgba(59, 130, 246, 1);
          transform: scale(1.1);
        }
        .custom-hotspot::after {
          content: '';
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isOpen, hotspots.length]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0 overflow-hidden">
        {/* Added DialogTitle for accessibility */}
        <DialogTitle className="sr-only">
          Virtual Tour - {propertyTitle}
        </DialogTitle>
        
        <div className="relative w-full h-full">
          {/* Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentScene((prev) => 
                  prev > 0 ? prev - 1 : images.length - 1
                )}
                className="bg-background/80 backdrop-blur-sm shadow-lg"
                disabled={isLoading}
              >
                ←
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentScene((prev) => 
                  prev < images.length - 1 ? prev + 1 : 0
                )}
                className="bg-background/80 backdrop-blur-sm shadow-lg"
                disabled={isLoading}
              >
                →
              </Button>
            </div>
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleFullscreen}
              className="bg-background/80 backdrop-blur-sm shadow-lg"
              disabled={isLoading}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="bg-background/80 backdrop-blur-sm shadow-lg"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Scene Indicator */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentScene(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentScene === index
                        ? "bg-primary scale-125"
                        : "bg-muted-foreground hover:bg-primary/50"
                    }`}
                    aria-label={`Switch to scene ${index + 1}`}
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scene Info */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h3 className="font-semibold">{propertyTitle}</h3>
              <p className="text-sm text-muted-foreground">
                Scene {currentScene + 1} of {images.length}
              </p>
            </div>
          </div>

          {/* Hotspot Info */}
          {hotspots.length > 0 && (
            <div className="absolute top-20 left-4 z-10">
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-sm shadow-lg">
                <Info size={16} />
                <span>Click on the blue circles for more info</span>
              </div>
            </div>
          )}

          {/* Tour Container */}
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted gap-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="text-sm text-muted-foreground">Loading virtual tour...</p>
              </div>
            )}
            <div 
              ref={panoramaRef} 
              className="w-full h-full"
              style={{ minHeight: '400px' }}
            />
            
            {/* Manual Hotspot Overlay */}
            {hotspots.length > 0 && !isLoading && (
              <div className="absolute inset-0 pointer-events-none">
                {hotspots.map((hotspot, index) => {
                  const x = 50 + (hotspot.yaw / 360) * 100;
                  const y = 50 + (hotspot.pitch / 180) * 100;
                  
                  return (
                    <button
                      key={index}
                      className="absolute pointer-events-auto custom-hotspot"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onClick={() => handleHotspotClick(hotspot)}
                      title={hotspot.text}
                      aria-label={hotspot.text || `Hotspot ${index + 1}`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-xs shadow-lg">
              <Navigation size={14} />
              <span>Drag to look around • Scroll to zoom</span>
            </div>
          </div>

          {/* Error Fallback */}
          {!isLoading && images.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center p-8">
                <p className="text-muted-foreground mb-4">No virtual tour images available</p>
                <Button onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}