import React, { useEffect, useRef } from "react";

export default function WebViewPage() {
    const placeholderRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();

    const syncBounds = () => {
        if (placeholderRef.current) {
            const rect = placeholderRef.current.getBoundingClientRect();

            // Sending bounds to Main process via IPC
            window.electronAPI.updateWebViewBounds({
                x: Math.round(rect.x),
                y: Math.round(rect.y),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
            });
        }
        // Continue the sync loop for smooth animations
        requestRef.current = requestAnimationFrame(syncBounds);
    };

    useEffect(() => {
        // Start the sync loop
        requestRef.current = requestAnimationFrame(syncBounds);

        // Also sync on scroll and resize events
        window.addEventListener("scroll", syncBounds, true);
        window.addEventListener("resize", syncBounds);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener("scroll", syncBounds, true);
            window.removeEventListener("resize", syncBounds);
            window.electronAPI.detachWebView(); // Clean up on unmount
        };
    }, []);

    return (
        <div className="pdp-container overflow-y-auto h-screen bg-black">
            <div className="h-[500px] flex items-center justify-center">
                <h1 className="text-white text-4xl">
                    Scroll down to see the Web View
                </h1>
            </div>
            {/* The moving target for the WebContentsView */}
            <div
                ref={placeholderRef}
                className="w-full h-[600px] bg-white rounded-2xl mx-auto max-w-5xl"
            />
            <div className="h-[1000px]" /> {/* Extra space for scrolling */}
        </div>
    );
}
