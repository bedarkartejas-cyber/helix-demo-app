import React, { useEffect } from "react";
import { useIdle } from "react-use";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function Screensaver() {
    // 5 seconds = 5000 ms
    const isIdle = useIdle(5000);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // When idle activates, if we are not at the home menu, navigate there.
        // This ensures that when the user resumes activity (waking the app),
        // the screensaver fades out to reveal the main menu.
        if (isIdle && location.pathname !== "/") {
            navigate("/");
        }
    }, [isIdle, navigate, location.pathname]);

    return (
        <AnimatePresence>
            {isIdle && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-[9999] flex w-full h-full items-center justify-center overflow-hidden cursor-none"
                    style={{
                        // Light pastel gradient
                        background:
                            "linear-gradient(-45deg, #a18cd1, #fbc2eb, #fad0c4, #ff9a9e)",
                        backgroundSize: "400% 400%",
                        animation: "gradient 15s ease infinite",
                    }}
                >
                    <style>
                        {`
                        @keyframes gradient {
                            0% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                            100% { background-position: 0% 50%; }
                        }
                    `}
                    </style>
                    <motion.div
                        animate={{
                            y: [-5, 5, -5],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity, // Keep repeating
                            ease: "easeInOut",
                        }}
                        style={{
                            fontFamily: "Verdana, Geneva, sans-serif",
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "#000000",
                            letterSpacing: "0.5px",
                            wordSpacing: "0px",
                            lineHeight: "1.5",
                            textDecoration: "none",
                            textTransform: "none",
                            textShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            opacity: "50%",
                            // mixBlendMode: "overlay",
                            WebkitFontSmoothing: "antialiased",
                        }}
                    >
                        Screensaver
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
