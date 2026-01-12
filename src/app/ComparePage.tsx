import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../interfaces";
import ComparisonTable from "./comparison";

export default function ComparePage() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const all = await window.electronAPI.getProducts();
                setAllProducts(all);
            } catch (error) {
                console.error("Failed to load product data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-slate-50">
                <div className="text-xl text-slate-600">
                    Loading Comparison...
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 w-screen bg-slate-50">
            <header className="p-6">
                <Link
                    to="/catalog"
                    className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium"
                >
                    &larr; Back to Catalog
                </Link>
            </header>
            <main className="flex w-full px-6 pb-6">
                <ComparisonTable allProducts={allProducts} />
            </main>
        </div>
    );
}
