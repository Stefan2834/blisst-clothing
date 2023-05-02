import React, { useState, useDeferredValue } from 'react';
import Fuse from 'fuse.js';
import { useAuth } from '../../contexts/AuthContext';

const options = {
  keys: ['name'],
  threshold: 0.3,
  includeScore: true,
};

const Test = () => {
  const { product } = useAuth()
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm, { timeoutMs: 2000 });

  console.log('Rendering with searchTerm:', searchTerm, 'deferredSearchTerm:', deferredSearchTerm);

  const fuse = new Fuse(product, options);
  const searchResults = fuse.search(deferredSearchTerm);
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products"
      />

      {searchResults.map((result) => (
        <div key={result.item.id}>
          <h2>{result.item.name}</h2>
          <p>{result.item.spec}</p>
          <p>{result.item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;




export const colors = ['#1c1919', '#bdbeb4', '#eee', '#0091e5', '#00ffd8', '#00d2ff', '#72ff00', '#ff00f0', '#a200ff', '#fd6500', '#fff600', '#ea0000']

export const counties = [
  'Alba',
  'Arad',
  'Arges',
  'Bacau',
  'Bihor',
  'Bistrita-Nasaud',
  'Botosani',
  'Braila',
  'Brasov',
  'Bucuresti',
  'Buzau',
  'Calarasi',
  'Caras-Severin',
  'Cluj',
  'Constanta',
  'Covasna',
  'Dambovita',
  'Dolj',
  'Galati',
  'Giurgiu',
  'Gorj',
  'Harghita',
  'Hunedoara',
  'Ialomita',
  'Iasi',
  'Ilfov',
  'Maramures',
  'Mehedinti',
  'Mures',
  'Neamt',
  'Olt',
  'Prahova',
  'Salaj',
  'Satu Mare',
  'Sibiu',
  'Suceava',
  'Teleorman',
  'Timis',
  'Tulcea',
  'Valcea',
  'Vaslui',
  'Vrancea'
];