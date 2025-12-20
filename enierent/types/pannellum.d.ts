// types/pannellum.d.ts
declare module 'pannellum' {
  interface ViewerOptions {
    type: string;
    panorama: string;
    autoLoad?: boolean;
    autoRotate?: number;
    showControls?: boolean;
    hotSpotDebug?: boolean;
  }

  interface Viewer {
    destroy(): void;
  }

  function viewer(container: HTMLElement | null, options: ViewerOptions): Viewer;
  
  const pannellum: {
    viewer: typeof viewer;
  };
  
  export default pannellum;
}