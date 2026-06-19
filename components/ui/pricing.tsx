import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  buttonVariant?: "default" | "outline";
}

export function PricingCard({
  title,
  price,
  description,
  features,
  highlight = false,
  buttonVariant = "outline",
}: PricingCardProps) {
  return (
    <div
      className={[
        "relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300",
        highlight
          ? "bg-[#1A1A2E] border border-[#00E5A0]/30 shadow-[0_0_60px_rgba(0,229,160,0.08)] flex-[1.15]"
          : "bg-[#111118] border border-white/[0.07] hover:border-white/[0.14] flex-1",
      ].join(" ")}
    >
      {highlight && (
        <>
          {/* top shimmer */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00E5A0] to-transparent rounded-t-2xl" />
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00E5A0] text-[#0A0A0F]
                           text-[10px] font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full whitespace-nowrap">
            Most Popular
          </span>
        </>
      )}

      <div className="space-y-5">
        {/* Header */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#00E5A0] mb-3">{title}</p>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-[2.4rem] font-extrabold text-[#E8F4F1] leading-none font-[var(--font-display)]">
              {price.split(' ')[0]}
            </span>
            {price.includes('/') && (
              <span className="text-[rgba(232,244,241,0.4)] text-sm">{price.split(' ').slice(1).join(' ')}</span>
            )}
          </div>
          <p className="text-[rgba(232,244,241,0.45)] text-[13px] leading-relaxed">{description}</p>
        </div>

        {/* CTA */}
        <Button
          asChild
          className={[
            "w-full rounded-xl font-bold text-[14px] h-11",
            highlight
              ? "bg-[#00E5A0] text-[#0A0A0F] hover:bg-[#00fbb3] hover:shadow-[0_8px_24px_rgba(0,229,160,0.3)] border-none"
              : "bg-transparent border border-white/[0.12] text-[#E8F4F1] hover:border-[#00E5A0]/40 hover:text-[#00E5A0]",
          ].join(" ")}
          variant={buttonVariant}
        >
          <Link href="https://dytex-fn8rqq4mw-hectors-projects-a1cfc66e.vercel.app">
            Get Started
          </Link>
        </Button>
      </div>

      {/* Features */}
      <ul className="mt-7 pt-6 border-t border-white/[0.07] space-y-3">
        {features.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-[13px] text-[rgba(232,244,241,0.6)]">
            <span className="mt-0.5 w-4 h-4 rounded-full bg-[#00E5A0]/15 border border-[#00E5A0]/30
                             flex items-center justify-center flex-shrink-0">
              <Check size={9} className="text-[#00E5A0]" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}