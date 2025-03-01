'use client';

import React, { useEffect, useState } from 'react';
import { getCoffee } from '@/api/coffeesData';
import CoffeeForm from '@/components/forms/CoffeeForm';
import PropTypes from 'prop-types';

export default function EditCoffee({ params }) {
  const [editItem, setEditItem] = useState({});
  const { firebaseKey } = params;

  const loadCoffee = async () => {
    const coffee = await getCoffee(firebaseKey);
    coffee.firebaseKey = firebaseKey; // add the firebaseKey as an object property
    setEditItem(coffee);
  };

  useEffect(() => {
    loadCoffee();
  }, [firebaseKey]);

  return <CoffeeForm obj={editItem} />;
}

EditCoffee.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
