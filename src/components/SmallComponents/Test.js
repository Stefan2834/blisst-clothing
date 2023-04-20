import { useState } from "react";

export default function Test() {
  const [rangeValues, setRangeValues] = useState([50, 150]); // initial values for the range slider

  const handleChange = (event) => {
    setRangeValues([event.target.min, event.target.max].map(parseFloat)); // set the minimum and maximum values of the range slider
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="200"
        step="1"
        value={rangeValues}
        onChange={handleChange}
        className="range-slider"
      />
      <div className="range-slider-thumb" style={{ left: rangeValues[0] + "%" }} />
      <div className="range-slider-thumb" style={{ left: rangeValues[1] + "%" }} />
    </div>
  );
};

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