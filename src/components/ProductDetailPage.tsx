import React, { useState } from 'react';
import { Product } from '../types';
import {
  ArrowRight,
  Star,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  QrCode,
  MapPin,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  onVerifyBatch: (batchCode: string) => void;
}

const WEIGHTS = ['250g', '500g', '1kg'];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onVerifyBatch,
}) => {
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedWeight);
    setAddedSuccess(true);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#D49B37', '#0C261B'],
      });
    } catch {
      // confetti is decorative only
    }
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  return (
    <section id="product-detail-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-right">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-[#0C261B] hover:text-[#D49B37] mb-6 cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة إلى المتجر</span>
      </button>

      <div className="bg-white rounded-2xl border border-[#EAE1D2] shadow-sm p-5 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF6EE] border border-[#EAE1D2]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 bg-[#0C261B] text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#D49B37]/50">
              {product.purity}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <span className="text-xs font-bold text-[#8C7A60] block mb-1">{product.categoryLabel}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0C261B] leading-snug mb-1">
                {product.name}
              </h1>
              <p className="text-sm text-[#6F827B] font-medium">{product.subtitle}</p>
            </div>

            <div className="flex items-center gap-1.5 text-[#D49B37]">
              {[...Array(product.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D49B37]" />
              ))}
              <span className="text-xs text-[#8C7A60] mr-1">({product.reviewsCount} تقييم معتمد)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#0C261B]">{product.price} ر.س</span>
              {product.oldPrice && (
                <span className="text-sm font-semibold text-[#A0AFA9] line-through">{product.oldPrice} ر.س</span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-[#576B64]">
              <MapPin className="w-4 h-4 text-[#D49B37] shrink-0" />
              <span>المصدر: {product.origin}</span>
            </div>

            <div>
              <span className="text-sm font-bold text-[#0C261B] block mb-2">اختر الحجم:</span>
              <div className="flex gap-2">
                {WEIGHTS.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                      selectedWeight === w
                        ? 'bg-[#0C261B] text-white border-2 border-[#0C261B]'
                        : 'bg-white text-[#0C261B] border border-[#EAE1D2] hover:bg-[#F2EAE0]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-3 bg-[#FAF6EE] px-3 py-2 rounded-lg border border-[#D5C7B0]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#0C261B] hover:text-[#D49B37] cursor-pointer"
                  aria-label="إنقاص الكمية"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-sm w-5 text-center text-[#0C261B]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-[#0C261B] hover:text-[#D49B37] cursor-pointer"
                  aria-label="زيادة الكمية"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={addedSuccess}
                className={`flex-1 inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-3 rounded-lg shadow-sm transition-all cursor-pointer ${
                  addedSuccess ? 'bg-[#1E6B56] text-white' : 'bg-[#0C261B] hover:bg-[#15473A] text-white'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تمت الإضافة للسلة!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 text-[#D49B37]" />
                    <span>إضافة إلى السلة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-[#EAE1D2]">
          <h2 className="text-base font-extrabold text-[#0C261B]">وصف المنتج</h2>
          <p className="text-sm sm:text-base text-[#3F5249] leading-relaxed">{product.description}</p>

          <div className="bg-[#FAF6EE] p-4 rounded-xl border border-[#EAE1D2] space-y-2 mt-2">
            <span className="text-sm font-bold text-[#0C261B] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D49B37]" />
              أبرز الفوائد والخصائص:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#3F5249]">
              {product.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#1E6B56] shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#FAF0DC] rounded-xl p-4 border border-[#D49B37]/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <QrCode className="w-5 h-5 text-[#D49B37] shrink-0" />
            <div>
              <span className="text-sm font-bold text-[#0C261B] block">رمز الدفعة الحالي: {product.batchCode}</span>
              <span className="text-xs text-[#6F7F78]">مفحوص ومسجل في سجلات الجودة والمناحل</span>
            </div>
          </div>
          <button
            onClick={() => onVerifyBatch(product.batchCode)}
            className="text-xs font-bold text-[#0C261B] bg-white hover:bg-[#FAF6EE] px-3 py-2 rounded-lg border border-[#D49B37] transition-colors cursor-pointer shrink-0"
          >
            عرض الشهادة
          </button>
        </div>
      </div>
    </section>
  );
};
