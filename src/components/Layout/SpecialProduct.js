import React, { useState, useReducer, useLayoutEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import Reducer from '../../contexts/AuthContext'
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios'



export default function SpecialProduct() {
  const { server } = useAuth()
  const { idPath } = useParams()
  const { product, favorite, dispatchCart, dispatchFav, currentUser, setProduct } = useAuth()
  const { darkTheme } = useDefault()
  const [sizeType, setSizeType] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartSpec, dispatch] = useReducer(Reducer, { size: '', number: 1 })
  const [specialClothing, setSpecialClothing] = useState()
  const [review, setReview] = useState({ star: 0, text: '', load: 4, type: 'Selecteaza o nota', anonim: false, edit: false })
  const [photoSlider, setPhotoSlider] = useState()
  const [zoom, setZoom] = useState(false);
  const navigate = useNavigate()
  const email = currentUser ? currentUser.email : undefined

  useLayoutEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const special = product.find(item => item.id === idPath)
        if (special) {
          document.title = `Blisst — ${special.name}`
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
          document.title = `Blisst - Produs inexistent`
          navigate('/main/productNotFound')
        }
      } catch (err) {
        console.error(err)
      }
      document.addEventListener('scroll', () => setZoom(false))
    }
    fetchData()
    setLoading(false)
    return () => {
      document.removeEventListener('scroll', () => setZoom(false))
    }
  }, [idPath, product])//cauta produsul cu id-ul egal cu idPath, iar daca nu exista, muta utilizatorul pe pagina 404

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
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (review.star === 0) {
      Swal.fire({
        title: 'Eroare!',
        text: "Nu ai selectat numarul de stele.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
      })
      setLoading(false)
      return
    }
    const reviewPost = await axios.post(`${server}/product/review/post`, {
      review: review,
      id: specialClothing.id,
      user: currentUser.email
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
        title: 'Postat',
        text: "Review-ul a fost postat cu succes",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: 'Eroare!',
        text: `Am intampinat o eroare: ${reviewPost.data.message.code}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
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
        title: 'Eroare!',
        text: "Nu ai selectat numarul de stele.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
      })
      setLoading(false)
      return
    }
    const revUpdate = await axios.post(`${server}/product/review/update`, {
      user: currentUser.email,
      review: review,
      id: specialClothing.id
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
        title: 'Editat',
        text: "Review-ul a fost editat cu succes",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: 'Eroare!',
        text: `Am intampinat o eroare: ${revUpdate.data.message.code}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
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
        title: 'Star',
        text: "Review-ul a fost sters cu succes",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    } else {
      Swal.fire({
        title: 'Eroare!',
        text: `Am intampinat o eroare: ${reviewDelete.data.message.code}`,
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi',
      })
    }
    setLoading(false)
  }// logica pentru a sterge un review definitiv
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
  }// logica pentru adaugarea unui produs in cos, daca s-a selectat marimea si pretul corect
  return (
    <>
      {loading && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='special'>
        {specialClothing && (
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
                  {specialClothing.sliderPhoto.map((photo) => {
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
                      Medie: 0.00
                    </>
                  ) : (
                    <>
                      Medie: {Number((specialClothing.star.total / specialClothing.star.nr).toFixed(2))}
                    </>
                  )}
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
                <div className='spec-id-text flex'>Culoare:
                  <div className='spec-color' style={{ backgroundColor: specialClothing.color }} />
                </div>
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
                    <div className="cloth-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: specialClothing } })} />
                  ) : (
                    <div className={darkTheme ? 'cloth-fav-dark' : "cloth-fav"} onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: specialClothing, user: currentUser } })} />
                  )}
                </div>
                <div className='spec-det'><span className='spec-span'>Detalii: </span>{specialClothing.spec}</div>
              </div>
            </div>
            <div className='spec-white-space'>
              {specialClothing.review.filter(item => item.user === email).length === 0 ? (
                <div className='spec-rev-text-dark'>Lasa un Review</div>
              ) : (
                <div className='spec-rev-text-dark'>Editeaza</div>
              )}
              <div className='spec-rev-text-dark'>Alte Reviewuri</div>
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
                                  className={ratingValue <= review.star ? 'principal' : 'black'}
                                  onClick={() => handleStar(ratingValue)}
                                  style={{ cursor: 'pointer' }}
                                />
                              );
                            })}
                          </div>
                          <div className='spec-rev-left-text'>{review.type}</div>
                          <div className='flex flex-col items-start justify-start w-full'>
                            <div className='spec-rev-title'>Parerea ta conteaza</div>
                            <label className='spec-rev-label'>
                              <input className='spec-rev-input' type='text'
                                value={review.text}
                                placeholder='Spune-ti parerea' required minLength={10} maxLength={160}
                                onChange={e => setReview(r => { return { ...r, text: e.target.value } })}
                              />
                              {review.text.length >= 10 ? (
                                <div className='spec-place-holder'>{review.text.length}/160</div>
                              ) : (
                                <div className='spec-place-holder text-red-600'>{review.text.length}/160</div>
                              )}
                            </label>
                          </div>
                          <div className='my-3 flex items-center justify-around w-full'>
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
                                            className={ratingValue <= review.star ? 'principal' : 'black'}
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
                                          placeholder='Spune-ti parerea' required minLength={10} maxLength={160}
                                          onChange={e => setReview(r => { return { ...r, text: e.target.value } })}
                                        />
                                        {review.text.length >= 10 ? (
                                          <div className='spec-place-holder'>{review.text.length}/160</div>
                                        ) : (
                                          <div className='spec-place-holder text-red-600'>{review.text.length}/160</div>
                                        )}
                                      </label>
                                    </div>
                                    <div className='spec-rev-edit-flex'>
                                      <input type='submit' value={'Salveaza'} className='spec-rev-submit'
                                        onClick={() => { setReview({ ...review, anonim: false }) }}
                                      />
                                      <input type='submit' value={'Salveaza anonim'} className='spec-rev-submit-anonim'
                                        onClick={() => { setReview({ ...review, anonim: true }) }}
                                      />
                                      <div className='spec-rev-submit' onClick={() => setReview({ ...review, edit: false })}>Inapoi</div>
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
                                          <div className='spec-rev-user'>Anonim</div>
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
                                      <div className='spec-rev-submit' onClick={() => setReview({ ...review, edit: true })}>Editeaza</div>
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
                    <div className='spec-rev-name text-center p-2'>Nu esti conectat. Conecteaza-te pentru a lasa o parere.</div>
                    <div className='spec-rev-enter'>
                      <div className='spec-rev-type-submit' >
                        <Link to='/connect' className='spec-rev-submit'>Conecteaza</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='spec-review-right'>
                {specialClothing.review.map((rev, index) => {
                  if (index < review.load) {
                    return (
                      <div className='spec-review'>
                        <div className='spec-rev-upper'>
                          {rev.anonim ? (
                            <>
                              <div className='spec-rev-user'>Anonim</div>
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
                      </div>
                    )
                  }
                })}
                {specialClothing.review.length > review.load && (
                  <div className='spec-rev-more'
                    onClick={() => setReview({ ...review, load: review.load + 4 })}
                  >Incarca mai multe Reviewuri</div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
