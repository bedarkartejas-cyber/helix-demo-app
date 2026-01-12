import { X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Product = () => {
    return (
        <div className="w-full h-full flex flex-col gap-x-4 overflow-y-auto bg-black text-white py-8">
            {/* Section 1: Hero */}
            <div className="flex flex-row md:flex-row items-center justify-between p-12 min-h-screen">
                <div className="w-1/3 space-y-6">
                    <p className="text-sm font-bold tracking-widest text-gray-400">
                        OMEN 16 GAMING LAPTOP
                    </p>
                    <h1 className="text-5xl font-bold">
                        COOL, UNINTERRUPTED GAMING
                    </h1>
                    <p className="text-lg font-light text-gray-300">
                        The OMEN 16, OMEN’s coolest 16” laptop yet, is ready for
                        anything you can throw at it. With the latest next-gen
                        components, an upgraded OMEN Tempest Cooling
                        architecture, and the ability to safely overclock your
                        CPU, whether it’s the latest AAA title, a tasking work
                        project, or just browsing on-the-go, the OMEN 16 has you
                        covered.
                    </p>
                    <div className="flex gap-4 items-center pt-4">
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
                </div>
                <div className="flex-1 w-2/3 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_4_Hero-Laptop-Cropped%402x.png"
                        alt="OMEN 17 Laptop"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>

            {/* Section 2: Pure Performance */}
            <div className="mt-2 flex flex-row items-center justify-center p-12 text-center space-y-6 bg-black">
                <h2 className="text-4xl w-1/2 font-bold">
                    OUR COOLEST 16” GAMING YET
                </h2>
                <p className="max-w-4xl w-1/2 text-lg font-light text-gray-300">
                    There’s nothing worse than spending your hard-earned cash on
                    a sweet rig with all the specs you need, only to get hit
                    with frame drops because your internals keep overheating.
                    That’s why we designed the OMEN 16 from the cooling up, and
                    what we ended up with was our evolved OMEN Tempest Cooling
                    architecture
                </p>
            </div>

            {/* Section 3: More Bang Less Buck */}
            <div className="flex flex-col md:flex-row justify-start p-12 gap-12 mt-8">
                <div className="flex-1">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_14_AMD-Chip%402x.png"
                        alt="AMD Chip"
                        className="w-full"
                    />
                </div>
                <div className="pl-6 flex-1 space-y-4 mt-4 ">
                    <h2 className="text-3xl font-bold uppercase">
                        MORE BANG LESS BUCK
                    </h2>
                    <p className="text-lg font-light text-gray-300">
                        OMEN 17 DELIVERS LEGENDARY GAMING PERFORMANCE AT AN
                        INCREDIBLE VALUE RIGHT OUT OF THE BOX.
                    </p>
                </div>
            </div>

            {/* Section 4: AI */}
            <div className="flex flex-row justify-start p-12 gap-12 bg-black mt-16">
                <div className="w-1/4 flex justify-center">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-OMEN-17-Gaming-Laptop/images/imgi_2_242448702-A_AMD_Ryzen_9_Badge_RGB.png"
                        alt="AMD Ryzen 9"
                        className="h-32 object-contain"
                    />
                </div>
                <div className="flex-1 w-3/4 space-y-4">
                    <h2 className="text-3xl font-bold uppercase">
                        MORE POWER, MORE PLAY WITH AMD RYZEN AI
                    </h2>
                    <p className="text-lg font-light text-gray-300">
                        With the OMEN 17, AI is always working on your behalf.
                        The AMD Ryzen™ 8040 CPUs feature a combination of
                        powerful AI accelerators that help unlock new levels of
                        play, performance and efficiency.
                    </p>
                </div>
            </div>

            {/* Section 5: Beyond Fast */}
            <div className="flex flex-col items-center justify-center p-12 space-y-8 mt-16">
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
            </div>
        </div>
    );
};

export default Product;
