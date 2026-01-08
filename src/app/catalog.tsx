import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../interfaces";

export default function ProductCatalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [activePersona, setActivePersona] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // The 'electronAPI' is exposed from the preload script
                const fetchedProducts =
                    await window.electronAPI.getProducts(activePersona);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, [activePersona]); // Re-fetch when activePersona changes

    return (
        <div className="flex h-screen w-screen bg-white text-slate-900">
            {/* Sidebar: Persona Filters [cite: 14, 19] */}
            <aside className="w-72 border-r px-6 py-10 space-y-4 flex flex-col overflow-y-auto">
                <Link
                    to="/"
                    className="text-sm text-slate-500 mb-4 hover:text-slate-900"
                >
                    &larr; Back to Home
                </Link>
                <h2 className="text-2xl font-bold tracking-tight">
                    For Your Life
                </h2>
                <div className="flex flex-col gap-2">
                    {["gaming", "creator", "office", "student"].map((p) => (
                        <button
                            key={p}
                            onClick={() => setActivePersona(p)}
                            className={`p-4 text-left rounded-xl transition-all border-2 ${
                                activePersona === p
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-transparent hover:bg-slate-100"
                            }`}
                        >
                            <span className="capitalize font-semibold">
                                {p}
                            </span>
                        </button>
                    ))}
                    <button
                        onClick={() => setActivePersona(null)}
                        className="text-sm text-slate-500 mt-4 hover:text-slate-900"
                    >
                        Show All
                    </button>
                </div>
            </aside>

            {/* Product Grid: Human-Centric Cards [cite: 4, 20] */}
            <main className="flex-1 p-10 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group border rounded-3xl p-6 hover:shadow-xl transition-all"
                        >
                            <div className="aspect-video bg-slate-100 rounded-2xl mb-6 overflow-hidden">
                                {/* Image Placeholder - Links to product_media table  */}
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    {product.model_name} Visual
                                </div>
                            </div>
                            <h3 className="text-xl font-bold">
                                {product.model_name}
                            </h3>
                            {/* The "Human Term" pitch  */}
                            <p className="text-slate-600 mt-2 leading-relaxed min-h-10 h-14 overflow-hidden">
                                {product.hero_description}
                            </p>
                            <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold group-hover:bg-blue-600 transition-colors">
                                Explore Experience
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
