import { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from './Firebase';
const db = getDatabase(app);
const storage = getStorage(app);

function Test() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;
    if (file) {
      const imageRef = storageRef(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Post</button>
    </form>
  );
}


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