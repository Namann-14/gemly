"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent
        side="right"
        showCloseButton={true}
        className="border-l-0 p-0 w-[340px] sm:w-[420px] flex flex-col h-full"
        style={{
          background: "rgba(8, 6, 12, 0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderLeft: "1px solid rgba(168, 85, 247, 0.15)",
        }}
      >
        <SheetHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2 text-[#f8f8ff] font-light">
            <ShoppingBag className="text-purple-400" size={18} />
            <span>Cosmic Cart</span>
            {cartCount > 0 && (
              <Badge
                variant="outline"
                className="ml-2 border-purple-500/30 bg-purple-500/10 text-purple-300 text-[10px] px-2 py-0.5 rounded-full"
              >
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Divider with glow */}
        <div
          className="mx-6 mb-2"
          style={{
            height: 1,
            background:
              "linear-gradient(90deg, rgba(168,85,247,0.3) 0%, rgba(168,85,247,0.02) 100%)",
          }}
        />

        {/* Cart Items list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-950/20 border border-purple-500/10 flex items-center justify-center text-slate-500">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-300">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-[240px] mx-auto font-light leading-relaxed">
                  You haven&apos;t added any cosmic recommendations or gemstones to your cart yet.
                </p>
              </div>
              <SheetClose render={<Button className="btn-celestial rounded-full px-6 py-2.5 text-xs font-semibold text-white tracking-wide active:scale-[0.98] transition-all cursor-pointer" />}>
                Continue Exploring
              </SheetClose>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl p-4 bg-purple-950/5 border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300 flex gap-4"
                style={{
                  boxShadow: `0 4px 20px -5px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.02)`,
                }}
              >
                {/* Gem Image */}
                <div
                  className="w-16 h-16 rounded-xl overflow-hidden bg-[#0d0a1b] border border-purple-500/10 flex items-center justify-center shrink-0 p-1"
                  style={{
                    boxShadow: `0 0 10px ${item.color}08`,
                  }}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-slate-200 truncate group-hover:text-purple-300 transition-colors">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-0.5 rounded cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">
                      Ruling Planet: <span style={{ color: item.color }}>{item.planet}</span> · {item.ratti} Ratti
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-purple-500/15 rounded-lg bg-black/20 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-purple-500/10 text-slate-400 hover:text-[#f8f8ff] transition-all cursor-pointer"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="px-2.5 text-xs text-slate-300 font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-purple-500/10 text-slate-400 hover:text-[#f8f8ff] transition-all cursor-pointer"
                      >
                        <Plus size={10} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-xs text-purple-300 font-light font-mono">
                        {formatINR(item.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 bg-purple-950/10 border-t border-purple-500/10 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 font-light">Subtotal</span>
              <span className="text-base font-light text-[#f8f8ff] font-mono">
                {formatINR(cartTotal)}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-light leading-relaxed">
              Shipping, taxes, and astrological certification are calculated at checkout.
            </p>

            <div className="flex flex-col gap-2.5 mt-2">
              <Button
                className="w-full btn-celestial py-6 rounded-xl text-xs font-semibold text-white tracking-wide active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-0"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </Button>

              <SheetClose render={<Button variant="ghost" className="w-full py-5 text-xs text-slate-400 hover:text-[#f8f8ff] transition-all cursor-pointer" />}>
                Continue Shopping
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
