'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/utils/context/authContext';
import roastLevelTable from '@/api/roastLevels';
import PropTypes from 'prop-types';
import { createCoffee, updateCoffee } from '../../api/coffeesData';

const initialState = {
  elevation: '',
  favorite: false,
  image: '',
  name: '',
  origin: '',
  personalNotes: '',
  private: false,
  process: '',
  purchaseLocation: '',
  roastLevel: '',
  tastingNotes: [],
  varietals: '',
};

export default function CoffeeForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the field being checked is tasting notes and convert the value to an array if so
    if (name === 'tastingNotes') {
      const notesArr = value.split(',');
      setFormInput((prevState) => ({
        ...prevState,
        tastingNotes: notesArr,
        // TODO: Handle input if there is more than one tasting note
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      uid: user.uid,
    };

    try {
      if (obj.firebaseKey) {
        await updateCoffee(obj.firebaseKey, payload);
        router.push(`/coffees`);
      } else {
        await createCoffee(payload);
        router.push('/coffees');
      }
    } catch (err) {
      console.error('Error with coffee object:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{obj.firebaseKey ? 'Edit' : 'Add'} Coffee</h2>

      {/* name */}
      <FloatingLabel controlId="floatingInput1" label="name">
        <Form.Control type="text" placeholder="Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>

      {/* image */}
      <FloatingLabel controlId="floatingInput2" label="image">
        <Form.Control type="text" placeholder="Image URL" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>

      {/* origin */}
      <FloatingLabel controlId="floatingInput3" label="origin">
        <Form.Control type="text" placeholder="Origin" name="origin" value={formInput.origin} onChange={handleChange} required />
      </FloatingLabel>

      {/* roast level */}
      <FloatingLabel controlId="floatingSelect" label="roast level">
        <Form.Select aria-label="Roast Level" name="roastLevel" value={formInput.roastLevel} onChange={handleChange} required>
          <option value="">Select...</option>
          {roastLevelTable.map((roast) => (
            <option key={roast.id} value={roast.level}>
              {roast.level}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      {/* elevation */}
      <FloatingLabel controlId="floatingInput4" label="elevation">
        <Form.Control type="text" placeholder="Elevation" name="elevation" value={formInput.elevation} onChange={handleChange} />
      </FloatingLabel>

      {/* process */}
      <FloatingLabel controlId="floatingInput5" label="process">
        <Form.Control type="text" placeholder="Process" name="process" value={formInput.process} onChange={handleChange} />
      </FloatingLabel>

      {/* varietals */}
      <FloatingLabel controlId="floatingInput6" label="varietals">
        <Form.Control type="text" placeholder="Varietals" name="varietals" value={formInput.varietals} onChange={handleChange} />
      </FloatingLabel>

      {/* tasting notes */}
      {/* TODO: Handle input for more than one tasting note */}
      <FloatingLabel controlId="floatingInput7" label="tasting notes (separated by commas)">
        <Form.Control type="text" placeholder="tasting notes (separated by commas)" name="tastingNotes" value={formInput.tastingNotes} onChange={handleChange} />
      </FloatingLabel>

      {/* purchase location */}
      <FloatingLabel controlId="floatingInput8" label="purchase location">
        <Form.Control type="text" placeholder="purchase location" name="purchaseLocation" value={formInput.purchaseLocation} onChange={handleChange} />
      </FloatingLabel>

      {/* personal notes */}
      <FloatingLabel controlId="floatingTextarea" label="personal notes">
        <Form.Control as="textarea" placeholder="Personal notes" style={{ height: '100px' }} name="personalNotes" value={formInput.personalNotes} onChange={handleChange} />
      </FloatingLabel>

      {/* favorite */}
      <Form.Check
        type="switch"
        id="favorite"
        name="favorite"
        label="favorite"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* private */}
      <Form.Check
        type="switch"
        id="private"
        name="private"
        label="private"
        checked={formInput.private}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            private: e.target.checked,
          }));
        }}
      />

      {/* submit */}
      <Button type="submit" className="btn">
        {obj.firebaseKey ? 'Update' : 'add'}
      </Button>
    </Form>
  );
}

CoffeeForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    origin: PropTypes.string,
    roastLevel: PropTypes.string,
    elevation: PropTypes.string,
    process: PropTypes.string,
    varietals: PropTypes.string,
    tastingNotes: PropTypes.arrayOf(PropTypes.string),
    purchaseLocation: PropTypes.string,
    personalNotes: PropTypes.string,
    favorite: PropTypes.bool,
    private: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};
