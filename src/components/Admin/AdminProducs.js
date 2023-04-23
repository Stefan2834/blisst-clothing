import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRef } from 'react'
import { colors } from '../SmallComponents/Test'

export default function AdminProducs() {
  const { product } = useAuth()
  const [newProduct, setNewProduct] = useState({photos: []})
  const type = [
    'barbati top tricouri', 'barbati top bluze', 'barbati bottom scurti', 'barbati bottom lungi',
    'barbati foot adidasi', 'barbati foot papuci',
    'femei top tricouri', 'femei top bluze', 'femei bottom scurti', 'femei bottom lungi',
    'femei foot adidasi', 'femei foot papuci',
  ]
  const nameRef = useRef()
  const idRef = useRef()
  const priceRef = useRef()
  const discountRef = useRef()
  const specRef = useRef()

  async function handlePhotoChange(event) {
    const files = event.target.files;
    const photos = Array.from(files);

    const urls = await Promise.all(
      photos.map(async (photo) => {
        const formData = new FormData();
        formData.append('photo', photo);

        const response = await fetch('/upload', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        return data.url;
      })
    );

    setNewProduct({ ...newProduct, photos: urls });
  }

  return (
    <div className='adm-prod'>
      <form className='adm-prod-form'>
        <div className='adm-prof-title'>Adauga un produs nou</div>
        <label className='adm-label'>
          <input ref={nameRef} className='adm-input' type='text' placeholder=' ' required minLength={6} maxLength={30} />
          <span className='adm-place-holder'>Nume</span>
        </label>
        <label className='adm-label'>
          <input ref={idRef} className='adm-input' type='text' placeholder=' ' required minLength={6} maxLength={6} />
          <span className='adm-place-holder'>Id</span>
        </label>
        <label className='adm-label'>
          <input ref={priceRef} className='adm-input' type='number' placeholder=' ' required min={1} max={500} />
          <span className='adm-place-holder'>Pret</span>
        </label>
        <label className='adm-label'>
          <input ref={discountRef} className='adm-input' type='number' placeholder=' ' required min={0} max={100} />
          <span className='adm-place-holder'>Reducere</span>
        </label>
        <label className='adm-label'>
          <input ref={specRef} className='adm-input' type='text' placeholder=' ' required minLength={10} maxLength={150} />
          <span className='adm-place-holder'>Specificatii</span>
        </label>
        <label className='adm-option adm-option-label'>Tip:
          <select value={newProduct.type} className='adm-option'
            onChange={e => { setNewProduct({ ...newProduct, type: e.target.value }) }}
          >
            {type.map((type) => {
              return (
                <option key={type}
                  value={type}
                  className='adm-option'
                >
                  {type}
                </option>
              )
            })}
          </select>
        </label>
        <label className='adm-option adm-option-label'>Culoare:
          <select value={newProduct.type} className='adm-option'
            onChange={e => { setNewProduct({ ...newProduct, color: e.target.value }) }}
          >
            {colors.map((color) => {
              return (
                <option key={color}
                  value={color}
                  className='adm-option'
                >
                  {color}
                </option>
              )
            })}
          </select>
        </label>
        <label className='adm-option adm-option-label'>Sex:
          <select value={newProduct.type} className='adm-option'
            onChange={e => { setNewProduct({ ...newProduct, sex: e.target.value }) }}
          >
            <option value={'man'} className='adm-option'>
              Barbat
            </option>
            <option value={'woman'} className='adm-option'>
              Femeie
            </option>
          </select>
        </label>
        <label className='adm-option-label adm-option'>
          Poza principala
          <input type="file" value={newProduct.photos[0]}
            onChange={(e) => handlePhotoChange(e)}
          />
        </label>
        <label className='adm-option-label adm-option'>
          Pozele secundare
          <input type="file" value={newProduct.photos}
            onChange={(e) => handlePhotoChange(e)}
          />
        </label>
        <input type="submit" value={'Submit'} />
        {newProduct.photos.map(photoUrl => (
          <img key={photoUrl} src={photoUrl} alt="Product photo" />
        ))}
      </form>
    </div>
  )
}
