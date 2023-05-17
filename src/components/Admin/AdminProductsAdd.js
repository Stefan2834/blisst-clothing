import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { colors } from '../../contexts/Import';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import storage from '../SmallComponents/Firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminProductsAdd() {
  const { server, collections } = useAuth()
  const { t, lang } = useDefault()
  const navigate = useNavigate()
  const [newProduct, setNewProduct] = useState({
    name: "",
    id: "",
    type: "",
    colors: ["", ""],
    sex: "",
    spec: "",
    photo: ["", "", "", ""],
    collection: ''
  })
  const [size, setSize] = useState([])
  const type = [
    'barbati top tricouri', 'barbati top bluze', 'barbati bottom scurti', 'barbati bottom lungi',
    'barbati foot adidasi', 'barbati foot papuci',
    'femei top tricouri', 'femei top bluze', 'femei bottom scurti', 'femei bottom lungi',
    'femei foot adidasi', 'femei foot papuci',
  ]
  const handleSubmit = async (e, photoIndex) => {
    const file = e.target.files[0]
    let imageUrl = null;
    if (file) {
      const imageRef = storageRef(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      imageUrl = await getDownloadURL(imageRef);
      const url = imageUrl
      setNewProduct({
        ...newProduct, photo: newProduct.photo.map((photo, index) => {
          if (photoIndex === index) {
            return url
          } else {
            return photo
          }
        })
      })
    }
  };
  const handleNewProduct = async e => {
    e.preventDefault()
    const sendProduct = await axios.post(`${server}/admin/product`, { newProduct: newProduct })
    if (sendProduct.data.success) {
      Swal.fire({
        title: t('Admin.Add.Produs adăugat!'),
        text: t("Admin.Add.Produsul a fost adăugat cu succes, iar acum este pe site."),
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
      navigate('/main/admin')
    } else {
      Swal.fire({
        title: t('Admin.Add.Eroare!'),
        text: `${t('Admin.Add.A intervenit o eroare')}: ${sendProduct.data.message.code}`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Admin.Add.Înapoi'),
      })
    }
  }
  return (
    <div className='adm-prod'>
      <form className='adm-prod-form' onSubmit={e => handleNewProduct(e)}>
        <div className='adm-prof-title'>{t('Admin.Add.Adaugă un produs nou')}</div>
        <label className='adm-label'>
          <input className='adm-input' onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            type='text' placeholder=' ' value={newProduct.nume}
            required minLength={6} maxLength={30} />
          <span className='adm-place-holder'>{t('Admin.Add.Nume')}</span>
        </label>
        <label className='adm-label'>
          <input className='adm-input' onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
            type='text' placeholder=' ' value={newProduct.id}
            required minLength={6} maxLength={6} />
          <span className='adm-place-holder'>ID</span>
        </label>
        <label className='adm-label'>
          <input className='adm-input' onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            type='number' placeholder=' ' value={newProduct.price}
            required min={1} max={500} />
          <span className='adm-place-holder'>{t('Admin.Add.Preț')}</span>
        </label>
        <label className='adm-label'>
          <input className='adm-input' onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
            type='number' placeholder=' ' value={newProduct.discount}
            required min={0} max={100} />
          <span className='adm-place-holder'>{t('Admin.Add.Reducere')}</span>
        </label>
        <label className='adm-label'>
          <input className='adm-input' type='text' onChange={(e) => setNewProduct({ ...newProduct, spec: e.target.value })}
            placeholder=' ' required minLength={10} maxLength={150} value={newProduct.spec}
          />
          <span className='adm-place-holder'>{t('Admin.Add.Specificații')}</span>
        </label>
        <label className='adm-option adm-option-label'>{t('Admin.Add.Tip')} :
          <select value={newProduct.type} className='adm-option' required
            onChange={e => {
              if (e.target.value !== "") {
                if (e.target.value.includes('foot')) {
                  setSize({ 37: "", 38: "", 39: "", 40: "", 41: "", 42: "", 43: "", 44: "" })
                } else {
                  setSize({ XS: "", S: "", M: "", L: "", XL: "", XXL: "" })
                }
              } else {
                setSize([])
              }
              setNewProduct({ ...newProduct, type: e.target.value, size: size, sex: e.target.value.includes('barbati') ? 'man' : 'woman' })
            }}
          >
            <option value="" className='adm-option'>{t('Admin.Add.Selectează')}</option>
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
        <label className='adm-option adm-option-label'>{t('Admin.Add.Stoc')} :
          {Object.keys(size).map(size => {
            return (
              <select value={newProduct.size[size]} className='adm-option' required
                onChange={e => { setNewProduct({ ...newProduct, size: { ...newProduct.size, [size]: Number(e.target.value) } }) }}
              >
                <option value="" className='adm-prod-option'>{size}</option>
                {[...Array(101).keys()].map((type) => {
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
            )
          })}
        </label>
        <label className='adm-option adm-option-label'>{t('Admin.Add.Culoare')} 1 :
          <select value={newProduct.colors[0]} className='adm-option' required
            onChange={e => { setNewProduct({ ...newProduct, colors: [e.target.value, newProduct.colors[1]] }) }}
          >
            <option value="" className='adm-option'>Selectează</option>
            {colors.map((color) => {
              return (
                <option key={color}
                  value={color}
                  className='adm-option'
                  style={color !== '#1c1919' ?
                    { backgroundColor: color, color: 'black' }
                    :
                    { backgroundColor: color, color: 'white' }}
                >
                  {color}
                </option>
              )
            })}
          </select>
        </label>
        <label className='adm-option adm-option-label'>{t('Admin.Add.Culoare')} 2 :
          <select value={newProduct.colors[1]} className='adm-option' required
            onChange={e => { setNewProduct({ ...newProduct, colors: [newProduct.colors[0], e.target.value] }) }}
          >
            <option value="" className='adm-option'>{t('Admin.Add.Selectează')}</option>
            {colors.map((color) => {
              return (
                <option key={color}
                  value={color}
                  className='adm-option'
                  style={color !== '#1c1919' ?
                    { backgroundColor: color, color: 'black' }
                    :
                    { backgroundColor: color, color: 'white' }}
                >
                  {color}
                </option>
              )
            })}
          </select>
        </label>
        <label className='adm-option adm-option-label'>{t('Admin.Add.Colecție')} :
          <select value={newProduct.collection} className='adm-option' required
            onChange={e => { setNewProduct({ ...newProduct, collection: e.target.value }) }}
          >
            <option value="" className='adm-option'>{t('Admin.Add.Nici una')}</option>
            {collections.map((coll, index) => {
              return (
                <option key={index}
                  value={coll.name}
                  className='adm-option'
                >
                  {coll.name}
                </option>
              )
            })}
          </select>
        </label>
        <label className='adm-option-label'>
          <input type='file' onChange={(e) => handleSubmit(e, 0)} required />
        </label>
        <label className='adm-option-label'>
          <input type='file' onChange={(e) => handleSubmit(e, 1)} required />
        </label>
        <label className='adm-option-label'>
          <input type='file' onChange={(e) => handleSubmit(e, 2)} required />
        </label>
        <label className='adm-option-label'>
          <input type='file' onChange={(e) => handleSubmit(e, 3)} required />
        </label>
        <input type='submit' value={t("Admin.Add.Postează produsul")} className='adm-prod-submit' />
      </form>
    </div>
  )
}
