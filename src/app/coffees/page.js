'use client';

import { React, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getCoffeesByUid } from '../../api/coffeesData';
import CoffeeCard from '../../components/CoffeeCard';

export default function SavedCoffees() {
  const { user } = useAuth();
  const [coffees, setCoffees] = useState([]);

  const loadCoffees = useCallback(async () => {
    const coffeesData = await getCoffeesByUid(user.uid);
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
