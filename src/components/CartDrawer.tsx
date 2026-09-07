import React from 'react';
import { useCart } from './CartContext';
import { ShoppingBag, X, Plus, Minus, Trash2, Store, Info } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'AZ' | 'EN';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, lang = 'AZ' }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalAmount, totalCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-amber-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="text-lg font-bold text-gray-800">
                {lang === 'AZ' ? 'Seçimləriniz' : 'Your Order Selection'}
              </h2>
              {totalCount > 0 && (
                <span className="bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ITEM LIST */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto stroke-1" />
                <p className="text-gray-500 font-medium">
                  {lang === 'AZ' ? 'Səbətiniz boşdur' : 'Your cart is empty'}
                </p>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  {lang === 'AZ'
                    ? 'Menyudan bəyəndiyiniz təamları əlavə edərək ümumi məbləği hesablaya bilərsiniz.'
                    : 'Add your favorite items from the menu to calculate your total.'}
                </p>
              </div>
            ) : (
              cart.map(({ menuItem, quantity }) => (
                <div
                  key={menuItem.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={menuItem.image}
                      alt={lang === 'AZ' ? menuItem.nameAz : menuItem.nameEn}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {lang === 'AZ' ? menuItem.nameAz : menuItem.nameEn}
                      </h4>
                      <p className="text-amber-700 text-xs font-bold mt-0.5">
                        {menuItem.price.toFixed(2)} ₼
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(menuItem.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-gray-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(menuItem.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(menuItem.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER & CASHIER NOTICE */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50/80 space-y-4">
              {/* Total Price */}
              <div className="flex justify-between items-center text-gray-800">
                <span className="font-semibold">
                  {lang === 'AZ' ? 'Cəmi Məbləğ:' : 'Total Amount:'}
                </span>
                <span className="text-xl font-bold text-amber-800">
                  {totalAmount.toFixed(2)} ₼
                </span>
              </div>

              {/* CASHIER NOTICE BOX (NO ORDER BUTTON) */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3">
                <Store className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    {lang === 'AZ' ? 'Sifariş haqqında məlumat' : 'Ordering Information'}
                  </h5>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    {lang === 'AZ'
                      ? 'Sifarişinizi rəsmiləşdirmək üçün zəhmət olmasa kassaya yaxınlaşın və ya kassirə müraciət edin.'
                      : 'Please approach the cashier counter or speak to our staff to place your order.'}
                  </p>
                </div>
              </div>

              {/* Clear Cart Link */}
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 underline transition"
              >
                {lang === 'AZ' ? 'Səbəti təmizlə' : 'Clear selection'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};