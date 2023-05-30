import React, { useState, useReducer, useLayoutEffect, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import Reducer from '../../contexts/AuthContext'
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios'
import Confetti from 'react-confetti'



export default function SpecialProduct() {
  const { idPath } = useParams()
  const { product, favorite, dispatchCart, dispatchFav, currentUser, setProduct, server, admin } = useAuth()
  const { darkTheme, lang, t } = useDefault()
  const [sizeType, setSizeType] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartSpec, dispatch] = useReducer(Reducer, { size: '', number: 1 })
  const [specialClothing, setSpecialClothing] = useState()
  const [review, setReview] = useState({ star: 0, text: '', load: 4, type: 'Selecteaza o nota', anonim: false, edit: false })
  const [photoSlider, setPhotoSlider] = useState()
  const [adminPopUp, setAdminPopUp] = useState({ active: false, user: '', star: 0, text: '', reason: '' })
  const [zoom, setZoom] = useState(false);
  const navigate = useNavigate()
  const email = currentUser ? currentUser.email : undefined

  useLayoutEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const special = product.find(item => item.id === idPath)
        if (special) {
          const reviewList = (await axios.post(`${server}/product/review`, { id: special.id })).data.review
          const reviewIndex = reviewList.findIndex(rev => rev.user === email)
          if (reviewIndex !== -1) {
            setReview({ ...review, star: reviewList[reviewIndex].star, text: reviewList[reviewIndex].text })
          }
          setSpecialClothing({ ...special, review: reviewList })
          setPhotoSlider(special.photo)
          const type = special.type
          if (type.includes('foot')) {
            setSizeType(['37', '38', '39', '40', '41', '42', '43', '44'])
          } else {
            setSizeType(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
          }
        } else {
          navigate('/main/productNotFound')
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchData()
  }, [idPath, product])//cauta produsul cu id-ul egal cu idPath, iar daca nu exista, muta utilizatorul pe pagina 404
  useEffect(() => {
    if (zoom) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "scroll"
    }
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [zoom])

  useEffect(() => {
    const special = product.find(item => item.id === idPath)
    if (special) {
      document.title = `Blisst — ${special.name}`
    }
  }, [lang])
  const handleStar = (ratingValue) => {
    if (ratingValue === 1) {
      setReview({ ...review, type: t('Spec.Nu recomand'), star: ratingValue })
    } else if (ratingValue === 2) {
      setReview({ ...review, type: t('Spec.Slab'), star: ratingValue })
    } else if (ratingValue === 3) {
      setReview({ ...review, type: t('Spec.Acceptabil'), star: ratingValue })
    } else if (ratingValue === 4) {
      setReview({ ...review, type: t('Spec.Bun'), star: ratingValue })
    } else if (ratingValue === 5) {
      setReview({ ...review, type: t('Spec.Excelent'), star: ratingValue })
    }
  }
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (review.star === 0) {
      Swal.fire({
        title: t('Spec.Eroare!'),
        text: t('Spec.Nu ai selectat numărul de stele.'),
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Spec.Înapoi'),
      })
      setLoading(false)
      return
    }
    const date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    const reviewPost = await axios.post(`${server}/product/review/post`, {
      review: review,
      id: specialClothing.id,
      user: currentUser.email,
      date: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()} ${hours}:${minutes}`,
    })
    if (reviewPost.data.success) {
      setProduct(p => p.map(prod => {
        if (prod.id === specialClothing.id) {
          return { ...prod, star: reviewPost.data.star }
        } else {
          return prod
        }
      }))
      Swal.fire({
        title: t('Spec.Postat!'),
        text: t('Spec.Review-ul a fost postat cu succes.'),
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: t('Spec.Eroare!'),
        text: `${t('Spec.Am întâmpinat o eroare')} : ${reviewPost.data.message.code} .`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Spec.Înapoi'),
      })
    }
    setLoading(false)
  }//logica pentru postare review
  const handleUpdate = async e => {
    setLoading(true)
    e.preventDefault()
    setReview({ ...review, edit: false })
    if (review.star === 0) {
      Swal.fire({
        title: t('Spec.Eroare!'),
        text: t('Spec.Nu ai selectat numărul de stele.'),
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Spec.Înapoi'),
      })
      setLoading(false)
      return
    }
    const revUpdate = await axios.post(`${server}/product/review/update`, {
      user: currentUser.email,
      review: review,
      id: specialClothing.id,
    })
    if (revUpdate.data.success) {
      setProduct(p => p.map(prod => {
        if (prod.id === specialClothing.id) {
          return { ...prod, star: revUpdate.data.star }
        } else {
          return prod
        }
      }))
      Swal.fire({
        title: t('Spec.Editat!'),
        text: t('Spec.Review-ul a fost editat cu succes.'),
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: t('Spec.Eroare!'),
        text: `${t('Spec.Am întâmpinat o eroare')} : ${revUpdate.data.message.code}.`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Spec.Înapoi'),
      })
    }
    setLoading(false)
  }// logica pentru editarea unui review mai vechi
  const handleDelete = async () => {
    setLoading(true)
    const reviewDelete = await axios.post(`${server}/product/review/delete`, {
      user: currentUser.email,
      id: specialClothing.id
    })
    if (reviewDelete.data.success) {
      setReview({ ...review, text: "" })
      setProduct(p => p.map(prod => {
        if (prod.id === specialClothing.id) {
          return { ...prod, star: reviewDelete.data.star }
        } else {
          return prod
        }
      }))
      Swal.fire({
        title: t('Spec.Șters!'),
        text: t('Spec.Review-ul a fost șters cu succes.'),
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: t('Spec.Eroare!'),
        text: `${t('Spec.Am întâmpinat o eroare')}: ${reviewDelete.data.message.code} .`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Spec.Înapoi'),
      })
    }
    setLoading(false)
  }// logica pentru a sterge un review definitiv
  const handleAddToCart = () => {
    if (currentUser) {
      if (cartSpec.size === '' || cartSpec.number === '') {
        Swal.fire({
          title: t('Spec.Eroare!'),
          text: t('Spec.Nu ai selectat mărimea sau numărul de produse.'),
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: t('Spec.Înapoi')
        })
      } else {
        dispatchCart({ type: 'cartAdd', payload: { clothing: specialClothing, spec: cartSpec } })
        Swal.fire(
          t('Spec.Adăugat!'),
          t('Spec.Produsul a fost adăugat cu succes in coș.'),
          'success'
        )
      }
    } else {
      Swal.fire({
        title: t('Spec.Nu ești conectat!'),
        text: t('Spec.Trebuie să te conectezi pentru această actiune.'),
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: t('Spec.Înapoi'),
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: t('Spec.Conectare')
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/connect'
        }
      })
    }
  }// logica pentru adaugarea unui produs in cos, daca s-a selectat marimea si pretul corect
  const handleAdminPopUp = (user, star, text) => {
    setAdminPopUp({ active: true, user: user, star: star, text: text, reason: '' })
  }
  const handleAdminDelete = (e) => {
    e.preventDefault()
    axios.post(`${server}/admin/review`, {
      user: adminPopUp.user,
      star: adminPopUp.star,
      id: idPath
    }).then(data => {
      if (data.data.success) {
        setProduct(p => p.map(prod => {
          if (prod.id === specialClothing.id) {
            return { ...prod, star: data.data.star }
          } else {
            return prod
          }
        }))
        Swal.fire(
          t('Spec.Review șters!'),
          t('Spec.Review-ul a fost șters cu succes, iar un email de avertizare a fost trimis.'),
          'success'
        )
      }
      setAdminPopUp({ active: false, user: '', star: '', text: '', reason: '' })
      axios.post(`${server}/email/reviewDeleted`, {
        reason: adminPopUp.reason,
        email: adminPopUp.user,
        id: idPath
      }).catch(err => console.error(err))
    }).catch(err => console.error(err))
  }
  return (
    <>
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">Loading...</div>
          </div>
          <div className='h-screen' />
        </>
      ) : (
        <>
          {adminPopUp.active && (
            <>
              <div className='spec-pop'>
                <div className='spec-pop-bg' onClick={() => setAdminPopUp({ active: false, user: '', star: 0, text: '', reason: '' })} />
                <form className='spec-pop-div' onSubmit={e => handleAdminDelete(e)}>
                  <div className='spec-pop-user my-4'>{t('Spec.Email')}: {adminPopUp.user}</div>
                  <div className='spec-pop-star my-4'>
                    <span className='text-xl font-semibold'>{t('Spec.Stele')}:</span>
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <FaStar
                          key={ratingValue}
                          size={24}
                          className={ratingValue <= adminPopUp.star ? 'principal' : 'black'}
                        />
                      );
                    })}
                  </div>
                  <div className='text-xl font-semibold my-4'>{t('Spec.Text')}: {adminPopUp.text}</div>
                  <div className='text-xl font-semibold my-4'>{t('Spec.Motiv')}:
                    <input type='text' className='spec-rev-input'
                      value={adminPopUp.reason}
                      onChange={e => setAdminPopUp({ ...adminPopUp, reason: e.target.value })}
                      required minLength={10} maxLength={400}
                    />
                  </div>
                  <div className='flex items-center justify-center w-full my-4'>
                    <input type='submit' className='spec-pop-submit' value={t('Spec.Șterge Review-ul')} />
                  </div>
                </form>
              </div>
            </>
          )}
          <div className='special'>
            {specialClothing && (
              <>
                <div className='special-div'>
                  {zoom && (
                    <div className='special-zoom' onClick={() => {
                      setZoom(false)
                    }}>
                      <img className='special-zoom-photo'
                        src={photoSlider}
                        alt='Poza' />
                    </div>
                  )}
                  <div className='spec-left'>
                    <div className='spec-slider'>
                      <img src={specialClothing.photo}
                        className='spec-slider-photo'
                        alt='Poza' onClick={() => setPhotoSlider(specialClothing.photo)}
                      />
                      {specialClothing.sliderPhoto && specialClothing.sliderPhoto.map((photo) => {
                        return (
                          <img src={photo}
                            className='spec-slider-photo'
                            alt='Poza' onClick={() => setPhotoSlider(photo)}
                          />
                        )
                      })}
                    </div>
                    <div className='spec-photo'>
                      <img alt='Poza Produs'
                        className='spec-img' onClick={() => {
                          setZoom(true)
                        }}
                        src={photoSlider}
                      />
                    </div>
                  </div>
                  <div className='spec-right'>
                    <div className='spec-name'>{specialClothing.name}</div>
                    <div className='flex mb-2 flex-wrap'>
                      {[...Array(5)].map((_, i) => {
                        const ratingValue = i + 1;
                        return (
                          <FaStar
                            key={ratingValue}
                            size={24}
                            className={ratingValue <= specialClothing.star.total / specialClothing.star.nr + 0.5 ? 'principal' : 'black'}
                          />
                        );
                      })}
                      {specialClothing.star.total === 0 ? (
                        <>
                          {t('Spec.Medie')}: 0.00
                        </>
                      ) : (
                        <>
                          {t('Spec.Medie')}: {Number((specialClothing.star.total / specialClothing.star.nr).toFixed(2))}
                        </>
                      )}
                      <div>({specialClothing.star.nr} {t('Spec.Review-uri')})</div>
                    </div>
                    {specialClothing.discount > 0 ? (
                      <>
                        <div className='flex'>
                          <div className='spec-price-old'>{specialClothing.price} Lei</div>
                          <span className='spec-price-old'> - {(specialClothing.discount * 100).toFixed(0)} %</span>
                        </div>
                        <div className='spec-price'>{(specialClothing.price + 0.01 - ((specialClothing.price + 0.01) * specialClothing.discount) - 0.01).toFixed(2)} Lei</div>
                      </>
                    ) : (
                      <>
                        <div className='spec-id'>{specialClothing.price} Lei</div>
                      </>
                    )}
                    <div className='spec-id-text'>{t('Spec.Id produs')}: <span className='spec-id'>{specialClothing.id}</span></div>
                    <div className='spec-id-text flex'>{t('Spec.Culori')}:
                      {specialClothing.colors.map(color => {
                        return (
                          <div className='spec-color' style={{ backgroundColor: color }} />
                        )
                      })}
                    </div>
                    <div className='spec-id my-2'>{t('Spec.Mărimi')}</div>
                    <div className='spec-size-flex'>
                      {sizeType.map((sizeMap) => {
                        return (
                          <>
                            {specialClothing.size[sizeMap] <= 0 ? (
                              <div className='spec-size-disable'>{sizeMap}</div>
                            ) : (
                              <div className={cartSpec.size === sizeMap ? 'spec-size-current' : 'spec-size'}
                                onClick={() => {
                                  dispatch({ type: 'setSize', payload: { size: sizeMap } })
                                  dispatch({ type: 'cartReset' })
                                }}>{sizeMap}
                              </div>
                            )}
                          </>
                        )
                      })}
                    </div>
                    <div className='spec-cart'>
                      <div className='spec-add-cart' onClick={() => { handleAddToCart() }}>{t('Spec.Adaugă în coș')}
                        <div className={darkTheme ? 'spec-cart-photo spec-cart-dark' : 'spec-cart-photo spec-cart-light'} />
                      </div>
                      <div className='spec-cart-nr'>
                        {specialClothing.size[cartSpec.size] && (
                          <select value={cartSpec.number} className="spec-option"
                            onChange={e => { dispatch({ type: 'cartNr', payload: { number: e.target.value } }) }}
                          >
                            <option value="" className='principal'>Stoc:{specialClothing.size[cartSpec.size]}</option>
                            {Array.from({ length: specialClothing.size[cartSpec.size] }, (_, index) => {
                              if (index < 10) {
                                return index + 1
                              } else {
                                return null
                              }
                            }).map((number) => <>(
                              {number && (
                                <option key={number} value={number}>
                                  {number}
                                </option>
                              )})
                            </>
                            )}
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="spec-fav">
                      {favorite.some(item => item.id === specialClothing.id) ? (
                        <>
                          <Confetti width={50} height={50} recycle={false} gravity={0.3} />
                          <div className="cloth-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: specialClothing } })} />
                        </>
                      ) : (
                        <div className={darkTheme ? 'cloth-fav-dark' : "cloth-fav"} onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: specialClothing, user: currentUser, t: t } })} />
                      )}
                    </div>
                    <div className='spec-det'><span className='spec-span'>{t('Spec.Detalii')}: </span>{specialClothing.spec}</div>
                  </div>
                </div>
                <div className='spec-white-space'>
                  {specialClothing.review.filter(item => item.user === email).length === 0 ? (
                    <div className='spec-rev-text-dark'>{t('Spec.Lasă un Review')}</div>
                  ) : (
                    <div className='spec-rev-text-dark'>{t('Spec.Editează')}</div>
                  )}
                  <div className='spec-rev-text-dark'>{t('Spec.Alte Review-uri')}</div>
                </div>
                <div className='spec-review-page'>
                  <div className='spec-review-left'>
                    {currentUser ? (
                      <>
                        {specialClothing.review.filter(item => item.user === currentUser.email).length === 0 ? (
                          <>
                            <form className='spec-review-left-content' onSubmit={handleSubmit}>
                              <div className='flex w-full justify-center'>
                                {[...Array(5)].map((_, i) => {
                                  const ratingValue = i + 1;
                                  return (
                                    <FaStar
                                      key={ratingValue}
                                      size={24}
                                      className={ratingValue <= review.star ? 'principal-star' : 'black'}
                                      onClick={() => handleStar(ratingValue)}
                                      style={{ cursor: 'pointer' }}
                                    />
                                  );
                                })}
                              </div>
                              <div className='spec-rev-left-text'>{review.type}</div>
                              <div className='flex flex-col items-start justify-start w-full'>
                                <div className='spec-rev-title'>{t('Spec.Părerea ta contează')}</div>
                                <label className='spec-rev-label'>
                                  <input className='spec-rev-input' type='text'
                                    value={review.text}
                                    placeholder='Spune-ti parerea' required minLength={10} maxLength={400}
                                    onChange={e => setReview(r => { return { ...r, text: e.target.value } })}
                                  />
                                  {review.text.length >= 10 ? (
                                    <div className='spec-place-holder'>{review.text.length}/400</div>
                                  ) : (
                                    <div className='spec-place-holder text-red-600'>{review.text.length}/400</div>
                                  )}
                                </label>
                              </div>
                              <div className='my-3 flex items-center justify-around w-full'>
                                <input type='submit' value={t('Spec.Postează')} className='spec-rev-submit'
                                  onClick={() => { setReview({ ...review, anonim: false }) }}
                                />
                                <input type='submit' value={t('Spec.Postează anonim')} className='spec-rev-submit-anonim'
                                  onClick={() => { setReview({ ...review, anonim: true }) }}
                                />
                              </div>
                            </form>
                          </>
                        ) : (
                          <>
                            {specialClothing.review.map(rev => {
                              if (rev.user === currentUser.email) {
                                if (review.edit) {
                                  return (
                                    <>
                                      <form className='spec-review-left-content' onSubmit={handleUpdate}>
                                        <div className='flex w-full justify-center'>
                                          {[...Array(5)].map((_, i) => {
                                            const ratingValue = i + 1;
                                            return (
                                              <FaStar
                                                key={ratingValue}
                                                size={24}
                                                className={ratingValue <= review.star ? 'principal-star' : 'black'}
                                                onClick={() => handleStar(ratingValue)}
                                                style={{ cursor: 'pointer' }}
                                              />
                                            );
                                          })}
                                        </div>
                                        <div className='spec-rev-left-text'>{review.type}</div>
                                        <div className='flex flex-col items-start justify-start w-full'>
                                          <div className='flex items-center justify-between w-full'>
                                            <div className='spec-rev-title'>{rev.anonim ? 'Anonim' : rev.user}</div>
                                            <div className={darkTheme ? 'spec-rev-trash-dark' : 'spec-rev-trash'}
                                              onClick={() => handleDelete()}
                                            />
                                          </div>
                                          <label className='spec-rev-label'>
                                            <input className='spec-rev-input' type='text'
                                              value={review.text}
                                              placeholder='Spune-ti parerea' required minLength={10} maxLength={400}
                                              onChange={e => setReview(r => { return { ...r, text: e.target.value } })}
                                            />
                                            {review.text.length >= 10 ? (
                                              <div className='spec-place-holder'>{review.text.length}/400</div>
                                            ) : (
                                              <div className='spec-place-holder text-red-600'>{review.text.length}/400</div>
                                            )}
                                          </label>
                                        </div>
                                        <div className='spec-rev-edit-flex'>
                                          <input type='submit' value={t('Spec.Salvează')} className='spec-rev-submit'
                                            onClick={() => { setReview({ ...review, anonim: false }) }}
                                          />
                                          <input type='submit' value={t('Spec.Salvează anonim')} className='spec-rev-submit-anonim'
                                            onClick={() => { setReview({ ...review, anonim: true }) }}
                                          />
                                          <div className='spec-rev-submit' onClick={() => setReview({ ...review, edit: false })}>{t('Spec.Înapoi')}</div>
                                        </div>
                                      </form>
                                    </>
                                  )
                                } else {
                                  return (
                                    <>
                                      <div className='spec-review'>
                                        <div className='spec-rev-upper'>
                                          {rev.anonim ? (
                                            <>
                                              <div className='spec-rev-user'>{t('Spec.Anonim')}</div>
                                            </>
                                          ) : (
                                            <>
                                              <div className='spec-rev-user'>{rev.user}</div>
                                            </>
                                          )}
                                          <div className='spec-rev-star'>
                                            {[...Array(5)].map((_, i) => {
                                              const ratingValue = i + 1;
                                              return (
                                                <FaStar
                                                  key={ratingValue}
                                                  size={24}
                                                  className={ratingValue <= rev.star ? 'principal' : 'black'}
                                                />
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className='spec-rev-text'>{rev.text}</div>
                                        <div className='flex items-center justify-around my-2'>
                                          <div className='spec-rev-submit' onClick={() => setReview({ ...review, edit: true })}>{t('Spec.Editează')}</div>
                                        </div>
                                      </div>
                                    </>
                                  )
                                }
                              }
                            })}
                          </>
                        )}
                      </>
                    ) : (
                      <div className='spec-review'>
                        <div className='spec-rev-name text-center p-2'>{t('Spec.Nu esti conectat. Conectează-te pentru a lăsa o părere.')}</div>
                        <div className='spec-rev-enter'>
                          <div className='spec-rev-type-submit' >
                            <Link to='/connect' className='spec-rev-submit'>{t('Spec.Conectare')}</Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='spec-review-right'>
                    <div className='spec-review'>
                      <div className='spec-rev-upper'>
                        <div className='spec-rev-user principal'>blisstteam@gmail.com</div>
                      </div>
                      <div className='spec-rev-text'>{t('Spec.BlisstText')} &#x1F44B;</div>
                    </div>
                    {specialClothing.review.map((rev, index) => {
                      const [day, month, year, time] = rev.date.split(' ');
                      if (index < review.load) {
                        return (
                          <div className='spec-review'>
                            <div className='spec-rev-upper'>
                              {rev.anonim ? (
                                <>
                                  <div className='spec-rev-user'>{t('Spec.Anonim')}</div>
                                </>
                              ) : (
                                <>
                                  <div className='spec-rev-user'>{rev.user}</div>
                                </>
                              )}
                              <div className='spec-rev-star'>
                                {[...Array(5)].map((_, i) => {
                                  const ratingValue = i + 1;
                                  return (
                                    <FaStar
                                      key={ratingValue}
                                      size={24}
                                      className={ratingValue <= rev.star ? 'principal' : 'black'}
                                    />
                                  );
                                })}
                              </div>
                              <div className="font-semibold text-base">{day} {t(`Month.${month}`)} {year} {time}</div>
                              {admin && (
                                <div className={darkTheme ? 'spec-rev-sett-dark' : 'spec-rev-sett'}
                                  onClick={() => handleAdminPopUp(rev.user, rev.star, rev.text)}
                                />
                              )}
                            </div>
                            <div className='spec-rev-text'>{rev.text}</div>
                          </div>
                        )
                      }
                    })}
                    {specialClothing.review.length > review.load && (
                      <div className='spec-rev-more'
                        onClick={() => setReview({ ...review, load: review.load + 4 })}
                      >{t('Spec.Încarcă mai multe Review-uri')}</div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
