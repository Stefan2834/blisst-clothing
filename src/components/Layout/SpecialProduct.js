import React, { useState, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import Reducer from '../../contexts/AuthContext'
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

import tricouBlisst1 from '../../clothing/man/tricouBlisst1.jpg'
import tricouBlisst2 from '../../clothing/man/tricouBlisst2.jpg'
import tricouBlisst3 from '../../clothing/man/tricouBlisst3.jpg'

export default function SpecialProduct() {
  const { idPath } = useParams()
  const { product, favorite, dispatchCart, dispatchFav, currentUser, setProduct } = useAuth()
  const { darkTheme, isPending, startTransition } = useDefault()
  const [sizeType, setSizeType] = useState([])
  const [cartSpec, dispatch] = useReducer(Reducer, { size: '', number: 1 })
  const [specialClothing, setSpecialClothing] = useState()
  const [review, setReview] = useState({ star: 0, text: '', load: 4, type: 'Selecteaza o nota', anonim: false, nr: 0 })
  const [photoSlider, setPhotoSlider] = useState()
  const [zoom, setZoom] = useState(false);
  const photos = [tricouBlisst1, tricouBlisst2 ,tricouBlisst3]

  useEffect(() => {
    startTransition(() => {
      const special = product.find(item => item.id === idPath)
      setSpecialClothing(special)
      if (currentUser && special) {
        setReview({ ...review, nr: special.review.filter(item => item.user === currentUser.email).length })
      }
      if (special) {
        document.title = `Blisst — ${special.nume}`
        setPhotoSlider(special.photo)
        const type = special.type
        if (type.includes('foot')) {
          setSizeType(['37', '38', '39', '40', '41', '42', '43', '44'])
        } else {
          setSizeType(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
        }
      } else {
        document.title = `Blisst - Produs inexistent`
      }
    })
  }, [idPath])

  const handleStar = (ratingValue) => {
    if (ratingValue === 1) {
      setReview({ ...review, type: 'Nu recomand', star: ratingValue })
    } else if (ratingValue === 2) {
      setReview({ ...review, type: 'Slab', star: ratingValue })
    } else if (ratingValue === 3) {
      setReview({ ...review, type: 'Acceptabil', star: ratingValue })
    } else if (ratingValue === 4) {
      setReview({ ...review, type: 'Bun', star: ratingValue })
    } else if (ratingValue === 5) {
      setReview({ ...review, type: 'Excelent', star: ratingValue })
    }
  }
  const handleUpdate = e => {
    e.preventDefault()
    if (review.star === 0) {
      Swal.fire({
        title: 'Eroare!',
        text: "Nu ai selectat numarul de stele.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
      })
      return
    }
    const idProduct = product.findIndex(item => {
      return item.id === idPath
    });
    startTransition(() => {
      setSpecialClothing(p => {
        return {
          ...p, star: {
            ...p.star, total: p.star.total - p.review.reduce((acc, rev) => {
              if (rev.user === currentUser.email) {
                return acc + rev.star;
              } else {
                return acc;
              }
            }, 0) + review.star
          }, review: p.review.map((rev) => {
            if (rev.user === currentUser.email) {
              return { star: review.star, anonim: review.anonim, text: review.text, user: currentUser.email };
            }
            return rev
          })
        }
      })//logica pentru update-ul statului cu produsul pagini
      setProduct(c => c.map((p, index) => {
        if (index === idProduct) {
          return {
            ...p, star: {
              ...p.star, total: p.star.total - p.review.reduce((acc, rev) => {
                if (rev.user === currentUser.email) {
                  return acc + rev.star;
                } else {
                  return acc;
                }
              }, 0) + review.star
            }, review: p.review.map((rev) => {
              if (rev.user === currentUser.email) {
                return { star: review.star, anonim: review.anonim, text: review.text, type: review.type, user: currentUser.email };
              }
              return rev
            })
          }
        } else {
          return p
        }
      }))//logica pt update-ul stateului cu produse, care se salveaza in baza de date
    })
    Swal.fire({
      title: 'Editat',
      text: "Review-ul a fost editat cu succes",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (review.star === 0) {
      Swal.fire({
        title: 'Eroare!',
        text: "Nu ai selectat numarul de stele.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
      })
      return
    }
    setReview({ ...review, text: '' }) // goleste inputul
    const idProduct = product.findIndex(item => {
      return item.id === idPath
    }); // id-ul produsului respectiv
    setReview({ ...review, nr: 1 });
    //numara review-urile
    startTransition(() => {
      setSpecialClothing(p => { return { ...p, star: { total: p.star.total + review.star, nr: p.star.nr + 1 }, review: [{ text: review.text, user: currentUser.email, anonim: review.anonim, star: review.star }, ...p.review] } })
      setProduct(c => c.map((prod, index) => {
        if (idProduct === index) {
          return { ...prod, star: { total: prod.star.total + review.star, nr: prod.star.nr + 1 }, review: [{ text: review.text, user: currentUser.email, anonim: review.anonim, star: review.star }, ...prod.review,] }
        } else {
          return prod
        }
      }))
    })// modifica media 
    Swal.fire({
      title: 'Postat',
      text: "Review-ul a fost postat cu succes",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
  }
  const handleAddToCart = () => {
    if (currentUser) {
      if (cartSpec.size === '' || cartSpec.number === '') {
        Swal.fire({
          title: 'Eroare',
          text: "Nu ai selectat marimea sau numarul de produse.",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Inapoi'
        })
      } else {
        dispatchCart({ type: 'cartAdd', payload: { clothing: specialClothing, spec: cartSpec } })
        Swal.fire(
          'Adaugat!',
          'Produsul a fost adaugat cu succes in cos.',
          'success'
        )
      }
    } else {
      Swal.fire({
        title: 'Nu esti conectat!',
        text: "Trebuie sa te conectezi pentru aceasta actiune.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Inapoi',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Conecteaza-te'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/connect'
        }
      })
    }
  }
  return (
    <>
      {isPending && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='special'>
        {specialClothing ? (
          <>
            <div className='special-div'>
              {zoom && (
                <div className='special-zoom' onClick={() => setZoom(false)}>
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
                  {photos.map((photo) => {
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
                    className='spec-img' onClick={() => setZoom(true)}
                    src={photoSlider}
                  />
                </div>
              </div>
              <div className='spec-right'>
                <div className='spec-name'>{specialClothing.nume}</div>
                <div className='flex mb-2'>
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <FaStar
                        key={ratingValue}
                        size={24}
                        className={ratingValue <= specialClothing.star.total / specialClothing.star.nr + 0.5 ? 'text-yellow-400' : 'black'}
                      />
                    );
                  })}
                  Medie: {Number((specialClothing.star.total / specialClothing.star.nr).toFixed(2))}
                  <div>({specialClothing.star.nr} Review-uri)</div>
                </div>
                {specialClothing.discount > 0 ? (
                  <>
                    <div className='flex'>
                      <div className='spec-price-old'>{specialClothing.price} Lei</div>
                      <span className='spec-price-old'> - {specialClothing.discount * 100} %</span>
                    </div>
                    <div className='spec-price'>{specialClothing.price + 0.01 - ((specialClothing.price + 0.01) * specialClothing.discount) - 0.01} Lei</div>
                  </>
                ) : (
                  <>
                    <div className='spec-id'>{specialClothing.price} Lei</div>
                  </>
                )}
                <div className='spec-id-text'>Id produs: <span className='spec-id'>{specialClothing.id}</span></div>
                <div className='spec-id my-2'>Marimi</div>
                <div className='spec-size-flex'>
                  {sizeType.map((sizeMap) => {
                    return (
                      <>
                        {specialClothing.size[sizeMap] === 0 ? (
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
                  <div className='spec-add-cart' onClick={() => { handleAddToCart() }}>Adauga in cos
                    <div className={darkTheme ? 'spec-cart-photo spec-cart-dark' : 'spec-cart-photo spec-cart-light'} />
                  </div>
                  <div className='spec-cart-nr'>
                    {specialClothing.size[cartSpec.size] && (
                      <select value={cartSpec.number} className="spec-option"
                        onChange={e => { dispatch({ type: 'cartNr', payload: { number: e.target.value } }) }}
                      >
                        <option value="" className='text-red-600'>Stoc:{specialClothing.size[cartSpec.size]}</option>
                        {Array.from({ length: specialClothing.size[cartSpec.size] }, (_, index) => {
                          if (index < 10) {
                            return index + 1
                          } else {
                            return null
                          }
                        }).map((number) => <>(
                          {number && (
                            <option key={number} value={number} className='aaa'>
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
                    <div className="cloth-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: specialClothing } })} />
                  ) : (
                    <div className={darkTheme ? 'cloth-fav-dark' : "cloth-fav"} onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: specialClothing, user: currentUser } })} />
                  )}
                </div>
                <div className='spec-det'><span className='spec-span'>Detalii: </span>{specialClothing.spec}</div>
              </div>
            </div>
            <div className='spec-white-space'>
              {review.nr === 0 ? (
                <div className='spec-rev-text-dark'>Lasa un Review</div>
              ) : (
                <div className='spec-rev-text-dark'>Editeaza</div>
              )}
              <div className='spec-rev-text-dark'>Alte Reviewuri</div>
            </div>
            <div className='spec-review-page'>
              <div className='spec-review-left'>
                <div className='spec-review-left-content'>
                  {currentUser ? (
                    <>
                      {review.nr === 0 ? (
                        <>
                          <div className='flex'>
                            {[...Array(5)].map((_, i) => {
                              const ratingValue = i + 1;
                              return (
                                <FaStar
                                  key={ratingValue}
                                  size={24}
                                  className={ratingValue <= review.star ? 'text-yellow-400' : 'black'}
                                  onClick={() => handleStar(ratingValue)}
                                  style={{ cursor: 'pointer' }}
                                />
                              );
                            })}
                          </div>
                          <div className='spec-rev-text'>{review.type}</div>
                          <div className='spec-rev-name'>Spune-ne ceva despre produs</div>
                          <form className='spec-rev-enter' onSubmit={handleSubmit}>
                            <label>
                              <input className='spec-rev-input' type='text'
                                placeholder='Scrie ceva'
                                value={review.text} required minLength={10} maxLength={160}
                                onChange={e => setReview(r => { return { ...r, text: e.target.value } })}
                              />
                            </label>
                            <div className='flex items-center justify-around w-full' >
                              <input type='submit' value={'Posteaza'} className='spec-rev-submit'
                                onClick={() => { setReview({ ...review, anonim: false }) }}
                              />
                              <input type='submit' value={'Posteaza anonim'} className='spec-rev-submit-anonim'
                                onClick={() => { setReview({ ...review, anonim: true }) }}
                              />
                            </div>
                          </form>
                        </>
                      ) : (
                        <>
                          {specialClothing.review.map(rev => {
                            if (rev.user === currentUser.email) {
                              return (
                                <div className='spec-review-second'>
                                  <div className='spec-rev-upper'>
                                    {rev.anonim ? (
                                      <>
                                        <div className={darkTheme ? 'spec-rev-anonim-dark' : 'spec-rev-anonim'} />
                                        <div className='spec-rev-user'>Anonim</div>
                                      </>
                                    ) : (
                                      <>
                                        <div className={darkTheme ? 'spec-rev-photo-dark' : 'spec-rev-photo'} />
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
                                            className={ratingValue <= review.star ? 'text-yellow-400' : 'black'}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleStar(ratingValue)}
                                          />
                                        );
                                      })}
                                    </div>
                                    <div className='text-base'>{review.type}</div>
                                  </div>
                                  <form onSubmit={handleUpdate}>
                                    <input type={'text'} value={review.text}
                                      className='spec-rev-input-update'
                                      placeholder='Modifica Review-ul'
                                      required minLength={10} maxLength={160}
                                      onChange={e => setReview({ ...review, text: e.target.value })}
                                    />
                                    <div className='flex items-center justify-around w-full' >
                                      <input type='submit' value={'Salveaza'} className='spec-rev-submit'
                                        onClick={() => { setReview({ ...review, anonim: false }) }}
                                      />
                                      <input type='submit' value={'Salveaza ca anonim'} className='spec-rev-submit-anonim'
                                        onClick={() => { setReview({ ...review, anonim: true }) }}
                                      />
                                    </div>
                                  </form>
                                </div>
                              )
                            }
                          })}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className='spec-review-right'>
                {specialClothing.review.map((rev, index) => {
                  if (index < review.load) {
                    return (
                      <div className='spec-review'>
                        <div className='spec-rev-upper'>
                          {rev.anonim ? (
                            <>
                              <div className={darkTheme ? 'spec-rev-anonim-dark' : 'spec-rev-anonim'} />
                              <div className='spec-rev-user'>Anonim</div>
                            </>
                          ) : (
                            <>
                              <div className={darkTheme ? 'spec-rev-photo-dark' : 'spec-rev-photo'} />
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
                                  className={ratingValue <= rev.star ? 'text-yellow-400' : 'black'}
                                />
                              );
                            })}
                          </div>
                        </div>
                        <div className='spec-rev-text'>{rev.text}</div>
                      </div>
                    )
                  }
                })}
                {specialClothing.review.length > review.load && (
                  <div className='spec-rev-more'
                    onClick={() => setReview({ ...review, load: review.load + 2 })}
                  >Incarca mai multe Reviewuri</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {!isPending && (
              <div className="spec-deleted">
                <div className='spec-deleted-text'>
                  Acest produs nu exista, sau a fost sters
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
