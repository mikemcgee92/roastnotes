'use client';

import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from 'react';
import { getCoffee } from '../../../api/coffeesData';

export default function ViewCoffee({ params }) {
  const [coffeeDetails, setCoffeeDetails] = useState({});
  const { firebaseKey } = params;

  const loadCoffee = useCallback(async () => {
    const coffeeObj = await getCoffee(firebaseKey);
    setCoffeeDetails(coffeeObj);
  }, [firebaseKey]);

  useEffect(() => {
    loadCoffee();
  }, [loadCoffee]);

  return (
    <ul className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-xl/6 font-semibold text-gray-900">{coffeeDetails.name}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">origin</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails.origin}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">roast level</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails.roastLevel}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">elevation</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails.elevation} masl</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">process</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails.process}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">varietals</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails.varietals}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">tasting notes</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails?.tastingNotes?.map((e) => `${e}, `)?.join('')}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">purchase location</p>
            <p className="text-lg/6 font-semibold text-gray-900">{/* TODO: add a handler here to convert to a link if https is in the string */ coffeeDetails.purchaseLocation}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">personal notes</p>
            <p className="text-lg/6 font-semibold text-gray-900">{coffeeDetails.personalNotes}</p>
          </div>
        </div>
      </li>
      <li className="flex justify-between gap-x-6 py-1">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="mt-1 truncate text-sm/5 text-gray-500">{coffeeDetails.favorite ? '❤' : ''}</p>
            <p className="mt-1 truncate text-sm/5 text-gray-500">{coffeeDetails.private ? 'private' : 'public'}</p>
          </div>
        </div>
      </li>
    </ul>
  );
}

ViewCoffee.propTypes = {
  params: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    origin: PropTypes.string,
    roastLevel: PropTypes.string,
    elevation: PropTypes.string,
    process: PropTypes.string,
    varietals: PropTypes.string,
    tastingNotes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
