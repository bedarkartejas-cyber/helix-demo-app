import React from "react";
import { motion } from "framer-motion";

// Types
interface TextStyle {
    family?: string;
    weight?: string;
    size?: string;
    color?: string;
}

interface LogoConfig {
    src: string;
    alt?: string;
    height?: string;
    width?: string;
}

interface LayoutConfig {
    align?: "left" | "center" | "right";
    theme?: "dark" | "light";
    sub_brand?: string;
    logos?: LogoConfig[];
    textMaxWidth?: string;
    styles?: {
        sub_brand?: TextStyle;
        title?: TextStyle;
        description?: TextStyle;
    };
}

interface SectionData {
    id: number;
    product_id: string;
    section_type: string;
    title: string;
    description: string;
    media_path: string;
    layout_config: string;
    display_order: number;
}

interface BentoSectionProps {
    section: SectionData;
}

// Main Bento Section Component
const BentoSection: React.FC<BentoSectionProps> = ({ section }) => {
    const config: LayoutConfig = JSON.parse(section.layout_config);
    const isDark = config.theme === "dark";

    // Define default styles and merge with config
    const subBrandStyle = {
        size: "text-xs",
        weight: "font-bold",
        color: isDark ? "text-blue-400" : "text-blue-600",
        ...config.styles?.sub_brand,
    };
    const titleStyle = {
        size: "text-6xl",
        weight: "font-bold",
        color: isDark ? "text-white" : "text-gray-900",
        ...config.styles?.title,
    };
    const descriptionStyle = {
        size: "text-xl",
        weight: "font-normal",
        color: isDark ? "text-gray-300" : "text-gray-600",
        ...config.styles?.description,
    };

    // Parse media (could be string, array, or empty)
    let mediaContent: string | string[] = section.media_path;
    try {
        if (section.media_path && section.media_path.startsWith("[")) {
            mediaContent = JSON.parse(section.media_path);
        }
    } catch (e) {
        // Keep as string
    }

    const isMediaArray = Array.isArray(mediaContent);
    const hasMedia = section.media_path && section.media_path !== "";

    // Alignment classes
    const alignmentClasses = {
        left: "text-left items-start",
        center: "text-center items-center",
        right: "text-right items-end",
    };

    const alignment = config.align || "left";

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`
                relative w-full min-h-screen px-20 py-24
                flex items-center
                ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
            `}
        >
            <div
                className={`
                    w-full max-w-[1600px] mx-auto flex items-center gap-16
                    ${alignment === "right" && hasMedia ? "flex-row-reverse" : "flex-row"}
                `}
            >
                {/* Content Column */}
                <div
                    className={`
                        ${hasMedia ? "w-1/2" : "w-full"}
                        flex flex-col justify-center
                        ${alignmentClasses[alignment]}
                    `}
                >
                    <div className="flex flex-col">
                        {/* Text Content Bundle */}
                        <div
                            className={`flex flex-col gap-8 ${config.textMaxWidth || ""}`}
                        >
                            {/* Sub-brand */}
                            {config.sub_brand && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`
                                        tracking-[0.2em] uppercase
                                        ${subBrandStyle.size} ${subBrandStyle.weight} ${subBrandStyle.color}
                                    `}
                                >
                                    {config.sub_brand}
                                </motion.div>
                            )}

                            {/* Title */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`leading-tight ${titleStyle.size} ${titleStyle.weight} ${titleStyle.color}`}
                            >
                                {section.title}
                            </motion.h2>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`
                                    leading-relaxed ${descriptionStyle.size} ${descriptionStyle.weight} ${descriptionStyle.color}
                                `}
                            >
                                {section.description}
                            </motion.p>
                        </div>

                        {/* Logos Bundle */}
                        {config.logos && config.logos.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`
                                    flex gap-8 mt-14 flex-wrap
                                    ${alignment === "center" ? "justify-center" : ""}
                                    ${alignment === "right" ? "justify-end" : ""}
                                `}
                            >
                                {config.logos.map((logo, idx) => (
                                    <img
                                        key={idx}
                                        src={logo.src}
                                        alt={logo.alt || `Logo ${idx + 1}`}
                                        className={`${
                                            logo.height || "h-12"
                                        } ${logo.width || ""} object-contain`}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Media Column */}
                {hasMedia && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className={`
                            w-1/2 flex items-center justify-center
                        `}
                    >
                        {isMediaArray ? (
                            // Multiple images in a grid
                            <div className="grid grid-cols-2 gap-6 w-full">
                                {(mediaContent as string[]).map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={img}
                                        alt={`${section.title} ${idx + 1}`}
                                        className="w-full h-auto object-cover rounded-xl shadow-2xl"
                                    />
                                ))}
                            </div>
                        ) : (
                            // Single image
                            <img
                                src={mediaContent as string}
                                alt={section.title}
                                className="w-full h-auto object-contain max-h-[700px]"
                            />
                        )}
                    </motion.div>
                )}
            </div>
        </motion.section>
    );
};

// Product Detail Page Component
interface ProductDetailPageProps {
    sections: SectionData[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
    sections,
}) => {
    // Sort sections by display_order
    const sortedSections = [...sections].sort(
        (a, b) => a.display_order - b.display_order
    );

    return (
        <div className="w-full overflow-y-auto h-screen">
            {sortedSections.map((section) => {
                // Handle different section types
                switch (section.section_type) {
                    case "bento":
                        return (
                            <BentoSection key={section.id} section={section} />
                        );
                    default:
                        return (
                            <BentoSection key={section.id} section={section} />
                        );
                }
            })}
        </div>
    );
};

// Example usage with mock data fetch
export const ProductDetailPageContainer: React.FC<{ productId: string }> = ({
    productId,
}) => {
    const [sections, setSections] = React.useState<SectionData[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Fetch sections from your database
        // This is a placeholder - replace with your actual DB query
        const fetchSections = async () => {
            try {
                // Example: const data = await db.query('SELECT * FROM pdp_sections WHERE product_id = ?', [productId]);
                // setSections(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sections:", error);
                setLoading(false);
            }
        };

        fetchSections();
    }, [productId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    return <ProductDetailPage sections={sections} />;
};

export default ProductDetailPage;
