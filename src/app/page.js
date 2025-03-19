'use client';

import { useCallback, useEffect, useState } from 'react';
import { getAllCoffees } from '../api/coffeesData';
import CoffeeCard from '../components/CoffeeCard';

function Home() {
  const [coffees, setCoffees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getSearchTerm = useCallback(() => {
    const url = window.location.href;
    if (url.includes('?search=')) {
      // get everything after the '?search=' and set the search term to it
      const urlSplit = url.split('?search=');
      setSearchTerm(urlSplit[1]);
    }
  }, [setSearchTerm]);

  const loadCoffees = useCallback(async () => {
    try {
      // Reset coffees state before loading
      setCoffees([]);

      const coffeesData = await getAllCoffees();

      // put all data into an array
      const formattedCoffees = Object.keys(coffeesData).map((key) => ({
        ...coffeesData[key],
        firebaseKey: key,
      }));

      // Apply search filter if searchTerm exists
      if (searchTerm) {
        const searchedCoffees = formattedCoffees.filter((coffee) => coffee.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCoffees(searchedCoffees);
      } else {
        setCoffees(formattedCoffees);
      }
    } catch (error) {
      console.error('Error loading coffees:', error);
      setCoffees([]);
    }
  }, [setCoffees, searchTerm]);

  useEffect(() => {
    getSearchTerm();
  }, [getSearchTerm]);

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
