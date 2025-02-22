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
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {console.log(coffees)}
      {Object.values(coffees).map((coffee) => {
        const domString = <CoffeeCard key={coffee.id} coffee={coffee} />;
        return domString;
      })}
    </div>
  );
}

export default Home;
