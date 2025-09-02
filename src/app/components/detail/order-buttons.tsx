"use client";
import { addToBasket, checkoutSingleItem } from "@/app/service/basket-service";
import { Product } from "@/app/types";
import { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
const OrderButtons = ({ grocery }: { grocery: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const userId = "eslem123";

  //sepete ekle
  const handleAddToCart = async () => {
    if (quantity < 1 || grocery.stock < quantity) return;

    setLoading(true);
    try {
      const res = await addToBasket(userId, grocery._id, quantity);
      toast.success(`${quantity} adet ${grocery.name} sepete eklendi`);
      setQuantity(1);
    } catch (error) {
      console.log(error);
      toast.error("Ürün sepete eklenemedi");
    } finally {
      setLoading(false);
    }
  };
  //hemen satın al
  const handleBuyNow = async () => {
    if (quantity < 1 || grocery.stock > quantity) return;
    setLoading(true);
    try {
      const { url } = await checkoutSingleItem(grocery, quantity);
      window.open(url, "_blank");
      //statei sıfırlayan fonksiyon
      setQuantity(1);
    } catch (error) {
      console.error(error);
      toast.error("Ödeme işlemi başlatılamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className=" cursor-pointer px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <FaMinus />
          </button>
          <span className="px-3 py-2 border-gray-300 min-w-[40px] text-center ">
            {quantity}{" "}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= grocery.stock}
            className="cursor-pointer px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            <FaPlus />
          </button>
        </div>
        <span className="text-gray-500">Stok: {grocery.stock} </span>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          disabled={loading}
          onClick={handleAddToCart}
          className="bg-white border-2 flex-1 border-green-600 text-green-600 hover:bg-green-100 transition py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 disabled: opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FaShoppingCart />
              Sepete Ekle
            </>
          )}
        </button>

        <button
          disabled={loading}
          onClick={handleBuyNow}
          className="flex-1 flex justify-center items-center bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-md font-medium disabled:opacity-85 cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Hemen Satın Al"}
        </button>
      </div>
    </div>
  );
};

export default OrderButtons;
