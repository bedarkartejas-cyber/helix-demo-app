import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Product = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-full flex flex-col bg-black text-white">
                <div className="p-12">Loading...</div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-x-4 overflow-y-auto pb-8">
            {/* Section 1: Hero */}
            <div className="items-start bg-black text-white flex flex-row md:flex-row justify-between p-12 min-h-screen">
                {/* <motion.section
                    className="mt-16 flex-col w-1/2 space-y-2 p-10"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px0" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                > */}
                <div className="mt-16 flex-col w-1/2 space-y-2 p-10">
                    <p className="text-sm text-orange-500 font-bold tracking-widest">
                        VICTUS 16 INCH GAMING LAPTOP
                    </p>
                    <h1 className="text-5xl font-bold">
                        FOR GAMERS AND CREATORS
                    </h1>
                    <p className="text-lg font-light text-gray-300">
                        Powered by NVIDIA Geforce RTX 40 Series and DLSS 3
                    </p>
                    <div className="flex gap-4 items-center pt-4 mb-8">
                        {/* <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_2_242448702-A_AMD_Ryzen_9_Badge_RGB.png"
                            alt="Logo-banner"
                            className="h-12 object-contain"
                        /> */}
                        <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_3_nvidia-geforce-rtx.png"
                            alt="Logo-banner"
                            className="h-12 object-contain"
                        />
                    </div>
                    <hr className="mb-8" />
                    <div className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <p className="text-sm text-white font-bold tracking-widest">
                                MAX FPS. MAX QUALITY. POWERED BY AI.
                            </p>
                            <p>
                                Upgrade your gaming performance with this
                                breakthrough technology from Nvidia which
                                multiplies performance by upto 4x
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-white font-bold tracking-widest">
                                ACCELERATE YOUR IDEAS
                            </p>
                            <p>
                                NVIDIA Studio takes your creative projects to
                                the next level. Unlock RTX and AI acceleration
                                in top creative apps, NVIDIA Studio drivers for
                                max stability, and a suite of exclusive tools to
                                fast-track your creativity.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-white font-bold tracking-widest">
                                OPTIMIZED POWER AND PERFORMANCE
                            </p>
                            <p>
                                Our quietest laptop ever. Experience blazing
                                gaming gaming with pindrop silence.
                            </p>
                        </div>
                    </div>
                </div>
                {/* </motion.section> */}
                <div className="flex-1 w-2/3 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-Victus-16-Intel-Laptop/imgi_11_BEYOND_FAST_FOR_GAMERS%402x.png"
                        alt="Hero Banner"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>

            {/* Section 2: Pure Performance */}
            <div
                style={{ backgroundColor: "#676a6b" }}
                className="items-center text-black flex flex-row md:flex-row justify-between p-12 min-h-screen"
            >
                <div className="flex-1 w-1/2 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-Victus-16-Intel-Laptop/imgi_12_KSP_Image%402x.png"
                        alt="Sub-Hero Banner"
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="mt-16 flex-col w-1/2 space-y-2 p-10">
                    <h1 className="text-4xl font-bold">ONLY ULTRA REQUIRED</h1>
                    <p className="text-lg font-light">
                        Performance so good, you'll only ever set ultra.
                    </p>

                    <hr className="mb-8" />
                    <div className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <p className="text-sm font-bold tracking-widest">
                                The best of RAM.
                            </p>
                            <p>
                                Gaming will be blazing fast with our 32GB of
                                DDR5 RAM
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold tracking-widest">
                                TEMPEST COOLING
                            </p>
                            <p>
                                For the first time ever, Victus has evolved its
                                cooling capabilities using OMEN's revolutionary
                                Tempest Cooling technology
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold tracking-widest">
                                NEW GAMING HUB FEATURES
                            </p>
                            <p>
                                Need more power? Switch is automatic with
                                Dynamic Power and Graphic Switcher in the all
                                new gaming hub.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3: More Bang Less Buck */}
            <div className="items-start bg-black text-white flex flex-row md:flex-row justify-between p-12 min-h-screen">
                <div className="mt-16 flex-col w-1/2 space-y-2 p-10">
                    <h1 className="text-5xl font-bold">TRULY YOURS</h1>
                    <p className="text-lg font-light text-gray-300">
                        Express yourself through your laptop. Game skins need
                        not be the only way you can show off! Now you can
                        customize your keyboards, back covers, and colors!
                    </p>
                    <hr className="mb-8" />
                    <div className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <p className="text-sm text-white font-bold tracking-widest">
                                MAX FPS. MAX QUALITY. POWERED BY AI.
                            </p>
                            <p>
                                Upgrade your gaming performance with this
                                breakthrough technology from Nvidia which
                                multiplies performance by upto 4x
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-white font-bold tracking-widest">
                                ACCELERATE YOUR IDEAS
                            </p>
                            <p>
                                NVIDIA Studio takes your creative projects to
                                the next level. Unlock RTX and AI acceleration
                                in top creative apps, NVIDIA Studio drivers for
                                max stability, and a suite of exclusive tools to
                                fast-track your creativity.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-white font-bold tracking-widest">
                                OPTIMIZED POWER AND PERFORMANCE
                            </p>
                            <p>
                                Our quietest laptop ever. Experience blazing
                                gaming gaming with pindrop silence.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-1/2 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-Victus-16-Intel-Laptop/imgi_13_BE%20YOU%2C%20GO%20VICTUS%402x.png"
                        alt="Banner"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>

            {/* Section 4: PORTS */}
            <div
                style={{ backgroundColor: "#676a6b" }}
                className="items-center text-black flex flex-row md:flex-row justify-between p-12 min-h-screen"
            >
                <div className="flex-1 w-1/2 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-Victus-16-Intel-Laptop/imgi_14_Ports%402x.png"
                        alt="ports-banner"
                        className="max-w-full h-auto"
                    />
                </div>
                <div className="flex-col w-1/2 space-y-2 p-10">
                    <p className="text-sm text-white font-bold tracking-widest">
                        PORTS
                    </p>
                    <h1 className="text-5xl font-bold">CONNECT EVERYWHERE</h1>
                    <hr className="mb-8" />
                    <div className="flex flex-col space-y-4 w-1/2">
                        <div>
                            <p className="text-sm font-bold tracking-widest">
                                1 USB Type-C
                            </p>
                            <p className="text-sm font-bold tracking-widest">
                                1 USB Type-A (Charging)
                            </p>
                            <p className="text-sm font-bold tracking-widest">
                                2 USB Type-A
                            </p>
                            <p className="text-sm font-bold tracking-widest">
                                Ethernet
                            </p>
                            <p className="text-sm font-bold tracking-widest">
                                Audio Jack
                            </p>
                            <p className="text-sm font-bold tracking-widest">
                                HDMI 2.1
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5: Gaming Dashboard */}
            <div className="flex flex-row bg-black text-white items-end md:flex-row p-12 min-h-screen">
                <div className="flex-col w-1/3 space-y-2 p-10">
                    <div className="space-y-4 max-w-3xl">
                        <p className="text-sm font-bold tracking-widest">
                            SYSTEM VITALS
                        </p>
                        <h2 className="text-4xl font-bold">
                            Keeping up with your laptop health
                        </h2>
                        <p className="text-lg font-light text-gray-300">
                            Keep an eye on all the vitals with a dashboard that
                            tracks every key metric in real time. Scan
                            utilization, temperature of your CPU, GPU and
                            memory.
                        </p>
                    </div>
                </div>
                <div className="flex-1 w-2/3 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-Victus-16-Intel-Laptop/imgi_19_1.1.2%20-%20Advanced%20System%20Vitals%20-%20Basic%20View%20-%20Full%20Screen.jpg"
                        alt="Banner"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Product;
