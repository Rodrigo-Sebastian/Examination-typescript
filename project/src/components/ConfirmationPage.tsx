import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importera useCart

const ConfirmationPage: React.FC = () => {
  const { clearCart } = useCart(); // Hämta clearCart från CartContext
  const navigate = useNavigate();

  // Mockdata
  const confirmationId = '#123456';
  const estimatedTime = '15 min';

 // Funktion för att hantera ny beställning
 const handleNewOrder = () => {
    clearCart(); // Rensa kundvagnen
    navigate('/'); // Navigera tillbaka till hemsidan
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600 text-white p-6">
      {/* Bild */}
      <img
        src="/public/yygs.png"
        alt="Företagsbild"
        className="w-[500px] mb-12"
      />

      {/* Info */}
      <div className="text-center mb-6">
        <h1 className="w-[300px] text-2xl uppercase font-bold mb-4">Dina Wontons Tillagas!</h1>
        <div className='flex flex-row gap-2 items-center justify-center mb-4'>
          <p className="text-lg">ETA</p>
          <span className="font-semibold text-lg uppercase">{estimatedTime}</span>
        </div>
        <span className="">{confirmationId}</span>
      </div>

      {/* Knappar */}
      <div className="flex flex-col gap-4">
        {/* Kvitto-knapp */}
        <button
          className="p-4 border border-white rounded-sm hover:bg-zinc-700 transition uppercase"
        >
          Se Kvitto
        </button>

        {/* Ny Beställning-knapp */}
        <button
          className="p-4 bg-zinc-800 text-white uppercase rounded-sm shadow hover:bg-zinc-500 transition"
          onClick={handleNewOrder} // Navigera tillbaka till hemskärmen
        >
          Gör en Ny Beställning
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
