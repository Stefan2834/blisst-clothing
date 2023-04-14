import { useAuth } from "../../contexts/AuthContext";
export default function Test() {
  const { cart, product, setProduct } = useAuth()

  const handleUpdateSizes = () => {
    let newProduct = product
    cart.forEach(cart => {
      newProduct = newProduct.map(product => {
        const updatedProduct = product;
        if(product.id === cart.id) {
          updatedProduct.size[cart.selectedSize] -= cart.number
        }
        return updatedProduct
      })
    })
    setProduct(newProduct)
  }
  return (
    <div>
      <button onClick={handleUpdateSizes}>Press</button><br />
    </div>
  );
}

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