import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import StripeCheckout from 'react-stripe-checkout';
import '../css/sidebar.css'
import { useNavigate } from 'react-router-dom';

// function Test() {
//   const { server } = useAuth()
//   const [paymentAmount, setPaymentAmount] = useState(10);
//   const [paymentToken, setPaymentToken] = useState(null);

//   const handleSubmit = async () => {
//     const response = await axios.post(`${server}/charge`, {
//       amount: paymentAmount * 100,
//       token: paymentToken,
//     });

//     console.log(response.data.message);
//   };

//   const handleToken = (token) => {
//     setPaymentToken(token);
//   };

//   return (
//     <div>
//       <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} />
//       <StripeCheckout
//         stripeKey="pk_test_51N0nLNJak7XWs1IO2ryVvKBoNLX84G6htRhF2Qngwgzzy5Fkafx01iaUtCPa3zCYpAbzbCC0vGffv1C2WOny0op900WR0ZeVUf"
//         token={handleToken}
//         panelLabel="Pay now"
//         amount={paymentAmount * 100}
//         currency="RON"
//         zipCode={true}
//         description="Plateste"
//       >
//         {/* <div className='my-credit-card-input'>Plateste</div> */}
//       </StripeCheckout>
//       {/* <button onClick={handleSubmit}>Pay</button> */}
//     </div>
//   );
// };


function Test() {
  const { server } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = async () => {
    const response = await axios.post(`${server}/create-checkout-session`);
    console.log(response.data.url)
    window.location.href = response.data.url
  };

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
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