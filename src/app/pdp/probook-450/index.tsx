const Product = () => {
    return (
        <div className="w-full flex flex-col overflow-y-auto bg-white text-black py-8">
            {/* Section 1: Hero */}
            <div className="flex flex-row md:flex-row p-12 min-h-screen">
                <div className="flex-1 flex-col w-1/2 flex justify-center items-center">
                    <p className="text-3xl font-bold text-gray-400">
                        HP ProBook 450
                    </p>
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_154_vf5wgra93l.png"
                        alt="Probook 450 Image"
                        className="max-w-full h-auto"
                    />
                    <div className="justify-center">
                        <img
                            src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_55_logos.jpg"
                            alt="Logos"
                        />
                    </div>
                </div>
                <div className="flex flex-col w-1/2 justify-center items-center px-4">
                    <p className="text-5xl font-medium text-gray-400">
                        Performance to stay productive from anywhere
                    </p>
                    {/* <h1 className="text-5xl font-bold">Pro-Level Gaming</h1> */}
                    <p className="text-2xl font-normal text-gray-300 mt-4">
                        Deliver essential performance, security, and durability
                        for hybrid work on this reliable HP ProBook 450
                    </p>
                </div>
            </div>
            {/* Performance */}
            <div
                className="flex"
                style={{
                    borderWidth: "2px 0px",
                    paddingLeft: "2em",
                    marginTop: "12em",
                    marginLeft: "2em",
                    marginRight: "2em",
                    padding: "1em 0 1.5em 0",
                }}
            >
                <p className="text-5xl font-medium text-gray-400">
                    Designed for high-performance
                </p>
            </div>
            <div className="flex gap-4 p-8 border-x-2 border-black mt-8">
                <div className="flex flex-col border-r-2 flex-1 justify-start w-1/4">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_57_personalization.jpg"
                        alt="Personalization"
                        className="w-16"
                        style={{ width: "100px" }}
                    />
                    <p className="text-4xl font-medium text-gray-400">
                        Optimized for growing business
                    </p>
                    <p className="text-2xl font-normal text-gray-400">
                        Keep up with demanding, deadline-driven tasks with the
                        latest Intel processor, long battery life, and
                        upgradeable storage and memory
                    </p>
                </div>
                <div className="flex flex-col flex-1 justify-start w-1/4">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_58_processor_icon.jpg"
                        alt="Personalization"
                        className="w-16"
                        style={{ width: "100px" }}
                    />
                    <p className="text-4xl font-medium text-gray-400">
                        Designed for the enterprise. Made for you.
                    </p>
                    <p className="text-2xl font-normal text-gray-400">
                        Highly secure and easy to manage remotely with AMD PRO
                        manageability, the HP EliteBook 845 has the performance
                        you need for complex workloads and a sophisticated
                        design.
                    </p>
                </div>
            </div>
            {/* Security */}
            {/* Performance */}
            <div
                className="flex mt-16 pl-8"
                style={{
                    borderWidth: "2px 0px",
                    paddingLeft: "2em",
                    marginTop: "8em",
                    marginLeft: "2em",
                    marginRight: "2em",
                    padding: "1em 0 1.5em 0",
                }}
            >
                <p className="text-5xl font-medium text-gray-400">
                    Tailored Solutions For Efficiency
                </p>
            </div>
            <div className="flex gap-4 p-8 border-black mt-8">
                <div className="flex flex-col border-r-2 flex-1 justify-start w-1/3">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_60_battery_time.jpg"
                        alt="battery time"
                        className="w-16"
                        style={{ width: "130px" }}
                    />
                    <p className="text-4xl font-medium text-gray-400">
                        Smart Sense
                    </p>
                    <p className="text-2xl font-normal text-gray-400">
                        Enjoy long battery life managed by AI and HP Smart Sense
                        that adapts to power needs. The PC will switch to
                        performance mode when you need the most power and back
                        to comfort mode that helps keep your pc cool and quiet
                        during simple tasks.
                    </p>
                </div>
                <div className="flex flex-col flex-1 justify-start w-1/3">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_61_batter_icon.jpg"
                        alt="Personalization"
                        style={{ width: "130px" }}
                    />
                    <p className="text-4xl font-medium text-gray-400">
                        Easy battery management
                    </p>
                    <p className="text-2xl font-normal text-gray-400">
                        Manage and monitor your battery's performance and
                        condition and customize charging options with the
                        easy-to-use HP Power Manager dashboard.
                    </p>
                </div>
                <div className="flex flex-col flex-1 justify-start w-1/3">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_62_fox_security.jpg"
                        alt="Security"
                        className="w-16"
                        style={{ width: "130px" }}
                    />
                    <p className="text-4xl font-medium text-gray-400">
                        Protected by HP Wolf Security
                    </p>
                    <p className="text-2xl font-normal text-gray-400">
                        Wolf Security for Business creates a hardware-enforced,
                        always-on, resilient defense. From the BIOS to the
                        browser, above, in, and below the OS, these constantly
                        evolving solutions help protect your PC from modern
                        threats.
                    </p>
                </div>
            </div>
            {/* Ports */}
            <div className="flex mt-16 ml-8">
                <p className="text-5xl font-medium text-gray-400 ml-8">Ports</p>
            </div>
            <div className="flex flex-col gap-4 p-8 border-black mt-8">
                <div className="flex flex-1 border-r-2 justify-start">
                    <img
                        src="https://cdn.jsdelivr.net/gh/kartiknesari/helixApp@assets-only/src/assets/HP-EliteBook-830/imgi_63_port.jpg"
                        alt="Ports"
                        className="w-full"
                    />
                </div>
                <div
                    className="mt-6 grid-rows-auto grid-cols-auto md:grid-cols-4"
                    style={{
                        display: "grid",
                        gridRow: 2,
                        columnGap: "1em",
                    }}
                >
                    {/* Port 1 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 h-auto w-fit flex-shrink-0 items-center rounded-full justify-center font-bold text-zinc-600"
                        >
                            1
                        </div>
                        <span className="text-lg text-zinc-700">
                            Nano Sim Slot (Optional)
                        </span>
                    </div>
                    {/* Port 2 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            2
                        </div>
                        <span className="text-lg text-zinc-700">
                            Security Lock Slot
                        </span>
                    </div>
                    {/* Port 3 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            3
                        </div>
                        <span className="text-lg text-zinc-700">USB-A</span>
                    </div>
                    {/* Port 4 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            4
                        </div>
                        <span className="text-lg text-zinc-700">
                            Audio Combo Jack
                        </span>
                    </div>
                    {/* Port 5 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            5
                        </div>
                        <span className="text-lg text-zinc-700">
                            HDMI 2.1 Port
                        </span>
                    </div>
                    {/* Port 6 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            6
                        </div>
                        <span className="text-lg text-zinc-700">USB-A</span>
                    </div>
                    {/* Port 7 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            7
                        </div>
                        <span className="text-lg text-zinc-700">
                            2x Thunderbolt 4 USB Type-C
                        </span>
                    </div>
                    {/* Port 8 */}
                    <div className="flex items-center gap-x-3">
                        <div
                            style={{
                                borderWidth: "2px",
                                borderColor: "black",
                                marginRight: "8px",
                            }}
                            className="flex p-1 flex-shrink-0 items-center justify-center rounded-full border-2 border-zinc-400 font-bold text-zinc-600"
                        >
                            8
                        </div>
                        <span className="text-lg text-zinc-700">
                            Smart card reader (optional)
                        </span>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default Product;
