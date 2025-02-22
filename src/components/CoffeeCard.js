'use client';

// import Image from 'next/image';
import PropTypes from 'prop-types';
// import roastLevel from '../api/roastLevels';

export default function CoffeeCard({ coffee }) {
  return <div>{coffee.name}</div>;
}

CoffeeCard.propTypes = {
  coffee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
