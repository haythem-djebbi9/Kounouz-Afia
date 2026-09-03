import React from 'react';
import { motion } from 'motion/react';
import { Leaf, MapPin, ShieldCheck, Gem } from 'lucide-react';

export const FeaturesBar: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: '100% طبيعي',
      description: 'من الطبيعة كما هي',
    },
    {
      icon: MapPin,
      title: 'قابل للتتبع',
      description: 'نعرف مصدر كل منتج',
    },
    {
      icon: ShieldCheck,
      title: 'تم التحقق',
      description: 'اختبارات مخبرية دقيقة',
    },
    {
      icon: Gem,
      title: 'جودة ممتازة',
      description: 'معايير عالمية للنقاء',
    },
  ];

  return (
    <section id="features-bar" className="relative bg-[#0C261B] text-white py-10 sm:py-12 overflow-hidden">
      {/* Golden hairline marking the top edge of the band */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-[#D19A44]/70 to-transparent" />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-honeycomb-dark opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label so the promises read as a set, not four loose icons */}
        <p className="text-center text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#D19A44] mb-8 sm:mb-10">
          لماذا كنوز العافية؟
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-8">

          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="relative flex flex-col items-center text-center px-2 sm:px-4"
              >
                {/* Separator drawn only between columns, never on the outer edge */}
                {idx > 0 && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute inset-y-1 right-0 w-px bg-gradient-to-b from-transparent via-[#2C5445] to-transparent"
                  />
                )}

                {/* Icon Circle */}
                <div className="mb-4 text-[#E3B45F] flex items-center justify-center w-14 h-14 rounded-full bg-[#153E2E] border border-[#D19A44]/40 transition-transform duration-300 hover:scale-110">
                  <Icon className="w-6 h-6 stroke-[1.7]" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 tracking-tight">
                  {feature.title}
                </h3>

                {/* Subtitle */}
                <p className="text-[13px] sm:text-sm text-[#C2D3CC] font-normal leading-relaxed max-w-[22ch]">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};
