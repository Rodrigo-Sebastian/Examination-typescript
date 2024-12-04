import React, { useEffect, useState } from 'react';
import { MenuItem } from '../api/types';
import { getMenu } from '../api/services/api';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { BsBag } from "react-icons/bs";

const MenuList: React.FC = () => {
  const { cart, addToCart } = useCart(); // Använd addToCart från CartContext
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    // Navigationshook från react-router-dom
    const navigate = useNavigate();

  // Räkna antalet produkter i kundvagnen
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuData = await getMenu();
        console.log('Menu Data:', menuData); // Kontrollera vad som returneras
        setMenu(menuData.items); // Spara endast arrayen "items"
      } catch (error) {
        setError('Error fetching menu');
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  // Säkerhetskontroll
  if (!Array.isArray(menu)) {
    console.error('Menu data is not an array:', menu);
    return <div className="text-center text-xl">Invalid menu data</div>;
  }

  const wontons = menu.filter((item) => item.type === 'wonton');
  const dips = menu.filter((item) => item.type === 'dip');
  const drinks = menu.filter((item) => item.type === 'drink');

  return (
    <div className="container p-4 bg-emerald-700">
      {/* Header med kundvagn */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold uppercase text-white">Meny</h2>
        <button
          onClick={() => navigate('/cart')} // Navigera till /cart
          className="p-3 bg-white rounded-md text-black text-xl relative hover:bg-gray-300 transition"
        >
          <BsBag />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </header>
      {/* Wontons */}
      <div className="mb-8">
          <ul className='rounded-2xl bg-zinc-600'>
            {wontons.map((item) => (
              <li onClick={() => addToCart(item)} key={item.id} className="p-4 hover:bg-zinc-800">
                <div className='flex items-center mb-4'>
                  <h4 className="text-xl font-semibold text-white">{item.name}</h4>
                  <span className="flex-grow border-b border-dotted border-gray-400 mx-2 mt-3"></span>
                  <p className="text-white font-semibold"> {item.price} SEK</p>
                </div>
                  <p className="text-white text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
      </div>

      {/* Dips */}
      <div className="mb-8 bg-zinc-600 p-4 rounded-2xl">
        <div className='flex flex-row items-center justify-between mb-4'>
          <h3 className="text-xl text-white font-semibold">Dips</h3>
          <span className="flex-grow border-b border-dotted border-gray-400 mx-2 mt-3"></span>
          <p className="text-white font-semibold"> 19 SEK</p>
        </div>
        <ul className="flex flex-row gap-4 flex-wrap">
          {dips.map((item) => (
            <li key={item.id} className="w-fit bg-zinc-500 p-2 rounded-lg shadow-md hover:shadow-lg hover:bg-zinc-800 transition">
              <button onClick={() => addToCart(item)} className="text-lg text-white font-medium">{item.name}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Drinks */}
      <div className='bg-zinc-600 rounded-2xl p-4'>
        <div className='flex flex-row items-center justify-between mb-4'>
          <h3 className="text-xl text-white font-semibold">Dricka</h3>
          <span className="flex-grow border-b border-dotted border-gray-400 mx-2 mt-3"></span>
          <p className="text-white font-semibold">19 SEK</p>
        </div>
        <ul className="flex flex-row gap-4 items-center flex-wrap">
          {drinks.map((item) => (
            <li key={item.id} className=" p-2 bg-zinc-500 rounded-md shadow-md hover:shadow-lg hover:bg-zinc-800 transition w-fit">
              <button  onClick={() => addToCart(item)} className="text-md text-white font-medium">{item.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuList;
