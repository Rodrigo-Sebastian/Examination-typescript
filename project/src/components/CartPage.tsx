import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart(); // Lägg till decreaseQuantity
  const navigate = useNavigate();

// Beräkna det totala priset
const calculateTotal = () => {
    return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 // Hantera beställningen
 const handleOrder = () => {
    navigate('/confirmation');
  };

  return (
    <div className='flex flex-col p-4 bg-slate-50'>
      <h2 className='text-2xl mb-10 font-bold uppercase'>Din kundvagn</h2>
      {cart.items.length === 0 ? (
        <p>Kundvagnen är tom!</p>
      ) : (
        <div>
        <ul className='flex flex-col gap-6'>
          {cart.items.map((item) => (
            <li className='block' key={item.id}>
              <div className='flex flex-row items-center'>
                <h3 className='font-semibold uppercase'>{item.name}</h3>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2 mt-3"></span>
                <p  className='font-semibold'>{item.price} SEK</p>
              </div>
              <div className='flex flex-row gap-4 items-center mt-2'>
                <button className='text-lg w-[20px] h-[20px] rounded-full bg-gray-400 flex justify-center items-center' onClick={() => decreaseQuantity(item.id)}>-</button> {/* Använd decreaseQuantity */}
                <p className='font-medium'>{item.quantity} stycken</p>
                <button className='text-lg w-[20px] h-[20px] rounded-full bg-gray-400 flex justify-center items-center' onClick={() => addToCart(item)}>+</button>
              </div>
              <button className='mt-4 p-2 w-[100px] rounded-md bg-black text-white hover:text-black hover:bg-gray-300 transition' onClick={() => removeFromCart(item.id)}>Ta bort</button>
            </li>
          ))}
        </ul>
         {/* Visa det totala priset och en beställningsknapp */}
         <div className="total-price mt-20 flex flex-col gap-4">
          <div className='p-6 rounded-sm w-full bg-gray-300 flex flex-row justify-between items-center'>
            <div>
              <h3 className='font-semibold uppercase'>Totalt</h3>
              <p className='text-sm'>inkl 20% moms</p>
            </div>
            <button className="total-button text-2xl font-bold text-black">
              {calculateTotal()} SEK
            </button>
          </div>
            <button onClick={handleOrder} className="order-button p-6 rounded-sm w-full bg-black text-white font-bold uppercase">
              Take my money!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
