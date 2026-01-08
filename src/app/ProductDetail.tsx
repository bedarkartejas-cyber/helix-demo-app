import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "../interfaces";

// --- HELPER COMPONENTS ---

const StarRating = () => (
  <div className="flex items-center gap-1 mb-4">
    <div className="flex text-yellow-400 text-sm">
      {[1, 2, 3, 4, 5].map(i => <span key={i}>★</span>)}
    </div>
    <span className="text-xs text-blue-600 hover:underline ml-1 cursor-pointer">128 ratings</span>
  </div>
);

const SpecRow = ({ label, value, isEven }: { label: string, value: string, isEven: boolean }) => (
  <div className={`flex border-b border-slate-200 ${isEven ? 'bg-slate-50' : 'bg-white'}`}>
    <div className="w-1/3 py-3 px-4 text-sm font-semibold text-slate-500 border-r border-slate-200">
      {label}
    </div>
    <div className="w-2/3 py-3 px-4 text-sm font-medium text-slate-900">
      {value}
    </div>
  </div>
);

// --- NEW: OFFERS COMPONENT ---
const OffersSection = () => (
  <div className="mb-6">
    <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
       <span className="text-lg">🏷️</span> Available Offers
    </h4>
    <div className="grid grid-cols-1 gap-3">
       {/* Bank Offer */}
       <div className="flex gap-3 items-start border border-slate-100 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl">🏦</div>
          <div>
            <div className="font-bold text-xs text-slate-800">Bank Offer</div>
            <div className="text-xs text-slate-600 mt-1">
              5% Unlimited Cashback on Axis Bank Credit Card.
            </div>
          </div>
       </div>

       {/* Partner Offer */}
       <div className="flex gap-3 items-start border border-slate-100 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl">🤝</div>
          <div>
            <div className="font-bold text-xs text-slate-800">Partner Offer</div>
            <div className="text-xs text-slate-600 mt-1">
              Sign up for Helix Pay and get $500 Gift Card instantly.
            </div>
          </div>
       </div>

       {/* No Cost EMI */}
       <div className="flex gap-3 items-start border border-slate-100 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="text-xl">📅</div>
          <div>
            <div className="font-bold text-xs text-slate-800">No Cost EMI</div>
            <div className="text-xs text-slate-600 mt-1">
              Upto 6 months No Cost EMI on select credit cards.
            </div>
          </div>
       </div>
    </div>
  </div>
);

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Data State
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // UI State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Comparison State: [Current, Slot 2, Slot 3]
  const [compareSlots, setCompareSlots] = useState<(Product | null)[]>([null, null, null]);
  const [activeSlotSelector, setActiveSlotSelector] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const current = await window.electronAPI.getProductById(id);
          setProduct(current);
          setCompareSlots([current, null, null]); // Lock Slot 1

          const all = await window.electronAPI.getProducts();
          setAllProducts(all);
        } catch (error) {
          console.error("Failed to load product", error);
        }
      }
      setIsLoading(false);
    };
    init();
  }, [id]);

  // Handlers
  const handleAddProduct = (p: Product, idx: number) => {
    const newSlots = [...compareSlots];
    newSlots[idx] = p;
    setCompareSlots(newSlots);
    setActiveSlotSelector(null);
  };

  const handleRemoveProduct = (idx: number) => {
    if (idx === 0) return;
    const newSlots = [...compareSlots];
    newSlots[idx] = null;
    setCompareSlots(newSlots);
  };

  const getSpecVal = (p: Product | null, label: string) => {
    if (!p) return "—";
    const s = p.specs.find(sp => sp.label.toLowerCase().includes(label.toLowerCase()));
    return s ? s.human_value : "—";
  };

  if (isLoading || !product) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-slate-500">
        Loading...
      </div>
    );
  }

  const images = [...product.media].sort((a, b) => b.is_hero_media - a.is_hero_media);

  return (
    <div className="h-screen bg-slate-50 text-slate-900 overflow-y-auto font-sans">
      
      {/* --- STANDARD HEADER --- */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/catalog" className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-2">
            &larr; Back to Catalog
          </Link>
          <div className="flex items-center gap-4">
             <span className="font-bold text-slate-800 text-sm hidden sm:block">
               {product.model_name}
             </span>
             <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-bold shadow-sm transition-colors">
               Add to Cart
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-32">

        {/* --- MAIN PRODUCT CARD --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* LEFT: GALLERY */}
            <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="sticky top-24">
                <div className="border border-slate-200 rounded-lg p-4 mb-4 flex items-center justify-center aspect-[4/3] bg-white">
                   {images[activeImageIndex] ? (
                     <img src={images[activeImageIndex].file_path} className="max-w-full max-h-full object-contain" alt="Main" />
                   ) : <div className="text-slate-300">No Image</div>}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                   {images.map((img, idx) => (
                     <button 
                       key={img.id} 
                       onClick={() => setActiveImageIndex(idx)}
                       className={`w-16 h-16 border rounded p-1 flex-shrink-0 ${activeImageIndex === idx ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200 hover:border-slate-300'}`}
                     >
                       <img src={img.file_path} className="w-full h-full object-contain" alt="Thumb" />
                     </button>
                   ))}
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
               <span className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 block">
                 {product.persona?.name} Series
               </span>
               <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.model_name}</h1>
               <StarRating />
               
               {/* --- INSERTED OFFERS SECTION --- */}
               <div className="py-2">
                 <OffersSection />
               </div>
               
               <div className="border-t border-b border-slate-100 py-4 my-4">
                 <h3 className="font-bold text-sm mb-2">Description</h3>
                 <p className="text-sm text-slate-600 leading-relaxed">{product.hero_description}</p>
               </div>

               <div className="mb-6">
                 <h3 className="font-bold text-sm mb-3">Key Specs</h3>
                 <ul className="space-y-2 text-sm text-slate-700">
                   {product.specs.slice(0, 5).map(s => (
                     <li key={s.id} className="flex gap-2">
                       <span className="font-semibold text-slate-900 min-w-[80px]">{s.label}:</span>
                       <span>{s.human_value}</span>
                     </li>
                   ))}
                 </ul>
               </div>
            </div>

            {/* FAR RIGHT: BUY BOX */}
            <div className="lg:col-span-3 p-6 bg-slate-50">
               <div className="border border-slate-200 rounded-lg bg-white p-4 shadow-sm sticky top-24">
                 
                 {/* --- PRICE & DISCOUNT SECTION --- */}
                 <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                       <span className="text-red-600 text-xl font-light">-13%</span>
                       <span className="text-3xl font-bold text-slate-900">$1,299.00</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">
                       M.R.P.: <span className="line-through">$1,499.00</span>
                    </div>
                 </div>

                 {/* --- EMI SECTION --- */}
                 <div className="mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                    <div className="text-sm font-bold text-slate-800">EMI starts at $63/mo.</div>
                    <div className="text-xs text-slate-500">No Cost EMI available options</div>
                 </div>

                 <div className="text-sm text-green-600 font-bold mb-4 flex items-center gap-1">
                   <span>✓</span> In Stock.
                 </div>
                 
                 <button className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full font-bold text-sm mb-3 shadow-sm transition-colors">
                   Add to Cart
                 </button>
                 <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-bold text-sm mb-4 shadow-sm transition-colors">
                   Buy Now
                 </button>
                 
                 <div className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
                   <span>🔒</span> Secure transaction
                 </div>
                 <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                    <div><span className="text-slate-400">Ships from</span> <span className="text-slate-700 font-medium">Helix</span></div>
                    <div><span className="text-slate-400">Sold by</span> <span className="text-slate-700 font-medium">Helix Retail</span></div>
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* --- COMPARISON TABLE --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
           <div className="p-6 border-b border-slate-200 bg-slate-50">
             <h2 className="text-lg font-bold text-slate-900">Compare with similar items</h2>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm border-collapse">
               <thead>
                 <tr>
                   <th className="p-4 border-b border-r border-slate-200 w-1/4 bg-white sticky left-0 z-10">
                     <span className="font-bold text-slate-400 uppercase text-xs">Features</span>
                   </th>
                   {compareSlots.map((slot, idx) => (
                     <th key={idx} className={`p-4 border-b border-r border-slate-200 w-1/4 min-w-[200px] align-top ${idx === 0 ? 'bg-blue-50/10' : ''}`}>
                       {slot ? (
                         <div className="relative">
                            {idx !== 0 && (
                              <button onClick={() => handleRemoveProduct(idx)} className="absolute -top-2 -right-2 text-slate-300 hover:text-red-500 font-bold p-1">✕</button>
                            )}
                            <div className="h-24 mb-3 flex items-center justify-center">
                               {slot.media[0] ? <img src={slot.media[0].file_path} className="max-h-full max-w-full" /> : <span>No Img</span>}
                            </div>
                            <Link to={`/product/${slot.id}`} className="font-bold text-blue-600 hover:underline block mb-1">
                              {slot.model_name}
                            </Link>
                         </div>
                       ) : (
                         <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg relative">
                            <button onClick={() => setActiveSlotSelector(idx)} className="text-slate-400 hover:text-blue-600 font-bold text-sm flex flex-col items-center gap-1">
                              <span className="text-xl">+</span> Add Product
                            </button>
                            
                            {/* POPUP PICKER */}
                            {activeSlotSelector === idx && (
                              <div className="absolute top-0 left-0 w-full h-full bg-white z-20 overflow-y-auto border border-slate-300 rounded shadow-lg">
                                <div className="p-2 border-b bg-slate-50 flex justify-between items-center sticky top-0">
                                  <span className="text-xs font-bold">Select</span>
                                  <button onClick={(e) => { e.stopPropagation(); setActiveSlotSelector(null); }} className="text-red-500 text-xs">✕</button>
                                </div>
                                {allProducts.map(p => (
                                  <div key={p.id} onClick={() => handleAddProduct(p, idx)} className="p-2 hover:bg-blue-50 cursor-pointer border-b flex items-center gap-2">
                                     <div className="w-6 h-6 bg-slate-100"><img src={p.media[0]?.file_path} className="w-full h-full object-contain" /></div>
                                     <span className="truncate font-medium">{p.model_name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                         </div>
                       )}
                     </th>
                   ))}
                 </tr>
               </thead>
               <tbody>
                 {["Processor", "Graphics", "Memory", "Storage", "Display", "Battery", "Weight"].map((spec, i) => (
                   <tr key={spec} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                     <td className="p-4 border-b border-r border-slate-200 font-semibold text-slate-600 sticky left-0 bg-inherit z-10">{spec}</td>
                     {compareSlots.map((slot, idx) => (
                       <td key={idx} className={`p-4 border-b border-r border-slate-200 text-slate-800 ${idx === 0 ? 'font-medium' : ''}`}>
                         {getSpecVal(slot, spec)}
                       </td>
                     ))}
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* --- TECHNICAL SPECS TABLE --- */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h2 className="font-bold text-slate-900">Technical Specifications</h2>
          </div>
          <div>
            {product.specs.map((spec, i) => (
              <SpecRow key={spec.id} label={spec.label} value={spec.human_value} isEven={i % 2 !== 0} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}