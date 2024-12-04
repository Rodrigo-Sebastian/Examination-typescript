import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import MenuList from './components/MenuList';
import OrderForm from './components/OrderForm';
import CartPage from './components/CartPage';
import ConfirmationPage from './components/ConfirmationPage';

// Typdefinition för tenant
interface Tenant {
  id: string;
}

// Mockup av createTenant-funktionen med typ
const createTenant = async (tenantName: string): Promise<Tenant> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: `${tenantName}-id` });
    }, 1000);
  });
};
const App: React.FC = () => {
  const [tenantId, setTenantId] = useState<string>('');

  const createFoodTruck = async () => {
    try {
      const tenant = await createTenant('zocom');
      setTenantId(tenant.id);
      console.log('Tenant created:', tenant);
    } catch (error) {
      console.error('Error creating food truck:', error);
    }
  };

  return (
    <div>
      <h1 className='text-center font-bold text-2xl p-4'>Yum Yum Food Truck</h1>
      {!tenantId ? (
        <button className='absolute left-[40%] p-2 w-[100px] bg-black text-white rounded-md' onClick={createFoodTruck}>Se Menyn</button>
      ) : (
        <>
          <div className="menu-cart-toggle flex flex-row gap-4 p-4">
            <Link to="/menu">
              <button className='p-2 bg-black text-white rounded-md hover:bg-gray-300 hover:text-black transition'>Meny</button>
            </Link>
            <Link to="/cart">
              <button className='p-2 border border-black text-black rounded-md hover:bg-black hover:text-white transition'>Kundvagn</button>
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<Navigate to="/menu" replace />} />
            <Route
              path="/menu"
              element={
                <>
                  <MenuList />
                  <OrderForm tenantId={tenantId} />
                </>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<Navigate to="/menu" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
