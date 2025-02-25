import { clientCredentials } from '@/utils/client';

const endpoint = clientCredentials.databaseURL;

// get all coffees
const getAllCoffees = async () => {
  const get = await fetch(`${endpoint}/coffees.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

// get only user coffees
const getCoffeesByUid = async (uid) => {
  const get = await fetch(`${endpoint}/coffees.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

// get single coffee
const getCoffee = async (firebaseKey) => {
  const get = await fetch(`${endpoint}/coffees/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = get.json();
  return response;
};

// create a new coffee
const createCoffee = async (payload) => {
  const post = await fetch(`${endpoint}/coffees.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = post.json();
  return response;
};

// update coffee
const updateCoffee = async (firebaseKey, payload) => {
  const patch = await fetch(`${endpoint}/coffees/${firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = patch.json();
  return response;
};

// delete coffee
const deleteCoffee = async (firebaseKey) => {
  const response = await fetch(`${endpoint}/coffees/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export { getAllCoffees, getCoffeesByUid, getCoffee, createCoffee, updateCoffee, deleteCoffee };
