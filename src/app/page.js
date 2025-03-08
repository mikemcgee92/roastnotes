'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useCallback, useEffect, useState } from 'react';
import { getAllCoffees } from '../api/coffeesData';
import CoffeeCard from '../components/CoffeeCard';

function Home() {
  const [coffees, setCoffees] = useState([]);

  const loadCoffees = useCallback(async () => {
    // load in all firebase keys for coffee objects to display
    const coffeesData = await getAllCoffees();
    setCoffees(
      Object.keys(coffeesData).map((key) => ({
        ...coffeesData[key],
        firebaseKey: key,
      })),
    );
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
      {Object.values(coffees).map((coffee) => (
        <div key={coffee.firebaseKey} style={{ width: 'calc(33.33% - 1rem)' }}>
          <CoffeeCard coffee={coffee} onUpdate={loadCoffees} />
        </div>
      ))}
    </div>
  );
}

export default Home;
