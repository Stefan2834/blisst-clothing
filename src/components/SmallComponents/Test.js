import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const Test = () => {
  const { server } = useAuth()
  const handleUpload = (event) => {
    const file = event.target.files[0];
    axios.post(`${server}/admin/upload-photo`, {file:file})
    .then(data => console.log(data))
    .catch(err => console.log(err))
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
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