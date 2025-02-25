'use client';

import { Button } from 'react-bootstrap';
// import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
// import roastLevel from '../api/roastLevels';

export default function CoffeeCard({ coffee }) {
  // const router = useRouter();

  return (
    /* From Uiverse.io by Yaya12085 */
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        <img src={coffee.image} alt={coffee.name} />
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">{coffee.name}</h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">{coffee.origin}</p>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">{coffee.tastingNotes.map((note) => `${note}, `)}</p>
      </div>
      <div className="p-6 pt-0">
        <Button data-ripple-light="true" type="button" className="btn">
          View
        </Button>
      </div>
    </div>
  );
}

CoffeeCard.propTypes = {
  coffee: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    origin: PropTypes.string,
    tastingNotes: PropTypes.arrayOf,
  }).isRequired,
};
