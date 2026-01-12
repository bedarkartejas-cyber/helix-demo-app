import React from "react";
import { motion } from "framer-motion";

const Product = () => {
    return (
        <div className="w-full flex flex-col gap-x-8 overflow-y-auto bg-black text-white pb-16 scrollbar-hide">
            {/* Section 1: Hero */}
            <div className="flex flex-row md:flex-row items-center justify-between px-12 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ padding: "32px" }}
                    className="w-1/3 space-y-6 flex-col"
                >
                    <p className="text-sm font-bold tracking-widest text-gray-400">
                        OMEN 17 GAMING LAPTOP
                    </p>
                    <h1 className="text-5xl font-bold">Pro-Level Gaming</h1>
                    <p className="text-2xl font-light text-gray-300 mt-4">
                        Packed with a jaw-dropping display, next-gen CPU and
                        GPU. Essentially everything you need for epic gaming and
                        nothing you don’t.
                    </p>
                    <div className="flex gap-4 items-center pt-4 mt-2">
                        <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_2_242448702-A_AMD_Ryzen_9_Badge_RGB.png"
                            alt="AMD Ryzen 9"
                            className="h-12 object-contain"
                        />
                        <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_3_nvidia-geforce-rtx.png"
                            alt="NVIDIA RTX"
                            className="h-12 object-contain"
                        />
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 w-2/3 flex justify-center"
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_4_Hero-Laptop-Cropped%402x.png"
                        alt="OMEN 17 Laptop"
                        className="max-w-full h-auto"
                    />
                </motion.div>
            </div>

            {/* Section 2: Pure Performance */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ marginTop: "12em", padding: "32px" }}
                className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-black"
            >
                <h2 className="text-4xl font-bold">Pure Performance</h2>
                <p className="max-w-4xl text-2xl font-light text-gray-300">
                    We packed the OMEN 17 only with what you need. This starts
                    with the new AMD Ryzen 8040 Series CPUs, which with a
                    dedicated NPU for ultra performance efficiency, keeps your
                    frames high and your thermal temps low. Combined with an
                    immersive, lightning quick 17” 240hz IPS display and up to
                    an NVIDIA® RTX™ 4070, the OMEN 17 has everything you need to
                    win and nothing you don’t.
                </p>
            </motion.div>

            {/* Section 3: More Bang Less Buck */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ marginBottom: "8em" }}
                className="flex flex-col md:flex-row justify-start p-12 gap-12 mt-8"
            >
                <div className="relative">
                    <div className="flex-1">
                        <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_14_AMD-Chip%402x.png"
                            alt="AMD Chip"
                            className="w-full"
                        />
                    </div>
                    <div
                        style={{ bottom: 0, right: 0 }}
                        className="absolute z-100 bottom-0 w-1/3 pl-6 flex-1 space-y-4 mt-4 "
                    >
                        <h2 className="text-3xl font-bold uppercase">
                            MORE BANG LESS BUCK
                        </h2>
                        <p className="text-2xl font-light text-gray-300">
                            OMEN 17 DELIVERS LEGENDARY GAMING PERFORMANCE AT AN
                            INCREDIBLE VALUE RIGHT OUT OF THE BOX.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Section 4: AI */}
            <motion.div
                initial={{ opacity: 0, x: +50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ marginTop: "8em", marginBottom: "8em" }}
                className="gap-12 bg-black"
            >
                <h2
                    style={{ paddingLeft: "4em", marginBottom: "16px" }}
                    className="text-3xl font-bold uppercase"
                >
                    MORE POWER, MORE PLAY WITH AMD RYZEN AI
                </h2>
                <div className="flex flex-row justify-start items-center">
                    <div className="w-1/4 flex justify-center">
                        <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_2_242448702-A_AMD_Ryzen_9_Badge_RGB.png"
                            alt="AMD Ryzen 9"
                            className="h-32 object-contain"
                        />
                    </div>
                    <div className="flex-1 w-3/4 space-y-4">
                        <p className="text-2xl font-light text-gray-300">
                            With the OMEN 17, AI is always working on your
                            behalf. The AMD Ryzen™ 8040 CPUs feature a
                            combination of powerful AI accelerators that help
                            unlock new levels of play, performance and
                            efficiency.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Section 5: Beyond Fast */}
            <motion.div
                initial={{ opacity: 0, y: +50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ marginTop: "8em", marginBottom: "8em" }}
                className="flex flex-col items-center justify-center p-12 space-y-8 mt-16"
            >
                <div className="text-center space-y-4 max-w-3xl">
                    <h2 className="text-4xl font-bold">BEYOND FAST</h2>
                    <p className="text-lg font-light text-gray-300">
                        Lead your squad to victory with the latest GeForce RTX
                        40 Series Laptop GPUs - powered by AI. Get the ultimate
                        competitive advantage and stay connected with the newest
                        and best tech GeForce has to offer.
                    </p>
                </div>
                <div
                    className="flex justify-center gap-8 mt-8"
                    style={{ height: "275px" }}
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_15_3x-fps-2x.jpg"
                        alt="FPS Chart"
                        className="h-full object-scale-down rounded-lg max-w-full"
                    />
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_16_60-latency-2x.jpg"
                        alt="Latency Chart"
                        className="h-full object-scale-down rounded-lg max-w-full"
                    />
                </div>
            </motion.div>
            {/* <div className="relative mt-8 w-full">
                <img
                    src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_18_Flat-Full-Angle%402x.jpg"
                    alt="OMEN 17 Display"
                    className="absolute top-0 left-0"
                />
                <div className="absolute right-0 top-0 p-6 w-1/3">
                    <p className="text-sm font-bold tracking-widest text-gray-400">
                        IMMERSION READY 17” DISPLAY
                    </p>
                    <h3 className="text-3xl font-bold">
                        MOVE FASTER, PLAY SHARPER
                    </h3>
                    <p className="text-lg font-light text-gray-300">
                        Thanks to an immersive 17” IPS display boasting a
                        standout 240hz VRR and 100% sRBG, victory looks good
                        from any angle. No matter what you play, put yourself in
                        the best position to win with unmatched clarity and
                        speed that bring every scene to life.
                    </p>
                </div>
            </div> */}
            <motion.div
                initial={{ opacity: 0, y: +50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ marginTop: "8em", marginBottom: "8em" }}
                className="flex flex-row gap-x-8 mt-8 w-full"
            >
                <div className="flex-1">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_19_Callout-test-2x.png"
                        className="object-contain"
                    />
                </div>
                <div className="p-2 flex-1">
                    <p className="text-sm font-bold tracking-widest text-gray-400">
                        KEYBOARD
                    </p>
                    <p className="text-3xl font-bold uppercase">
                        BUILT FOR GAMING, READY FOR ANYTHING
                    </p>
                    <p className="text-xl font-light text-gray-300">
                        Open the OMEN 17 to reveal a stunning 1-zone RGB numeric
                        keyboard plus FHD camera with temporal noise reduction.
                        It’s built for play, but ready for anything you throw
                        its way.
                    </p>
                </div>
            </motion.div>

            {/* Audio */}
            <div
                style={{
                    margin: "8em 2em",
                }}
                className="flex flex-row gap-x-8 mt-8 w-full pb-24"
            >
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ marginRight: "2em" }}
                    className="flex-1"
                >
                    <p className="text-sm font-bold tracking-widest text-gray-400">
                        AUDIO
                    </p>
                    <p className="text-3xl font-bold uppercase">
                        GAME-CHANGING SOUND
                    </p>
                    <p className="text-xl font-light text-gray-300">
                        By HyperX. immerse yourself in a gaming symphony with
                        OMEN 17’s HyperX-tuned audio. Elevated clarity, balance,
                        and precision ensures every subtle sound is clearly
                        heard to give you a bigger advantage and more immersive
                        gaming experience.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: +50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex-1"
                >
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_21_Callout-02%402x.jpg"
                        className="object-contain"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Product;
