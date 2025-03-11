'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { useCallback, useEffect, useState } from 'react';
import { getAllCoffees } from '../api/coffeesData';
import CoffeeCard from '../components/CoffeeCard';

function Home() {
  const [coffees, setCoffees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getSearchTerm = () => {
    const url = window.location.href;
    console.log(url.includes('?search='));
    if (url.includes('?search=')) {
      // get everything after the '?search=' and set the search term to it
      const urlSplit = url.split('?search=');
      setSearchTerm(urlSplit[1]);
    }
  };

  const loadCoffees = useCallback(async () => {
    // load in all firebase keys for coffee objects to display
    setCoffees([]);
    const coffeesData = await getAllCoffees();
    console.log(searchTerm);
    if (searchTerm) {
      const searchedCoffees = coffees.filter((coffee) => coffee.name.toLowerCase().includes(searchTerm));
      setCoffees(
        Object.keys(searchedCoffees).map((key) => ({
          ...searchedCoffees[key],
          firebaseKey: key,
        })),
      );
    } else {
      setCoffees(
        Object.keys(coffeesData).map((key) => ({
          ...coffeesData[key],
          firebaseKey: key,
        })),
      );
    }
  }, [setCoffees]);

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
