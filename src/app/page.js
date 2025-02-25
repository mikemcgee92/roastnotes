'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

// import { useAuth } from '@/utils/context/authContext';
import { useCallback, useEffect, useState } from 'react';
import { getAllCoffees } from '../api/coffeesData';
import CoffeeCard from '../components/CoffeeCard';

function Home() {
  // const { user } = useAuth();
  const [coffees, setCoffees] = useState([]);

  const loadCoffees = useCallback(async () => {
    const coffeesData = await getAllCoffees();
    setCoffees(coffeesData);
  }, [setCoffees]);

  useEffect(() => {
    loadCoffees();
  }, [loadCoffees]);

  return (
    <div
      className="text-center d-flex flex-row flex-wrap justify-content-start gap-4"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      {console.log(coffees)}
      {Object.values(coffees).map((coffee) => (
        <div key={coffee.id} style={{ width: 'calc(33.33% - 1rem)' }}>
          <CoffeeCard coffee={coffee} />
        </div>
      ))}
    </div>
  );
}

export default Home;
