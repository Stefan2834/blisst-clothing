import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import axios from 'axios'
import { useDefault } from '../../../contexts/DefaultContext'
import Swal from 'sweetalert2';


export default function Navbar() {
  const {
    currentUser,
    favorite,
    cart,
    setCurrentUser,
    server,
    dispatchCart, dispatchFav,
  } = useAuth()
  const { setError, setActiveForm,
    darkTheme, setDarkTheme,
  } = useDefault()
  const [drop, setDrop] = useState([false, false, false, false, false, false])
  const navIconRefs = useRef([])
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      setError()
      setActiveForm(false)
      const response = await axios.post(`${server}/connect/logout`)
      if (response.data.success) {
        navigate('/connect');
        setCurrentUser()
      }
    } catch {
      setError('Failed to log out')
    }
  }
  function handleDeleteCart(e, product) {
    e.preventDefault();
    Swal.fire({
      title: 'Esti sigur?',
      text: 'Asta o sa iti stearga produsul din cos.',
      icon: 'warning',
      cancelButtonText: 'Inapoi',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sterge-l'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchCart({ type: 'cartRemove', payload: { cart: product } })
      }
    });
  }
  function handleDeleteFav(e, product) {
    e.preventDefault()
    Swal.fire({
      title: 'Esti sigur?',
      text: 'Asta o sa iti stearga produsul de la favorite.',
      icon: 'warning',
      cancelButtonText: 'Inapoi',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sterge-l'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchFav({ type: 'favRemove', payload: { fav: product } }) 
      }
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navIconRefs.current.every((ref) => !ref.contains(event.target))) {
        setDrop([false, false, false, false, false, false]);
      }
    };
    const handleScroll = () => {
      setDrop([false, false, false, false, false, false])
    }

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll)
    };
  }, [navIconRefs]);

  return (
    <div className='navbar'>
      <div className='nav-left'>
        <div className='nav-logo'><Link to='/main' className='text-orange-600'>Fashionista</Link></div>
        <div className='nav-left-btn'>
          <div className='nav-left-type'
            ref={(el) => (navIconRefs.current[4] = el)}
            onClick={() => { setDrop([false, false, false, false, !drop[4], false]) }}
          >Barbati</div>
          <div className={drop[4] ? 'nav-drop-active' : 'nav-drop'} >
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/man top'>Topuri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man top tricouri'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man top bluze'>Bluze</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/man bottom'>Pantaloni</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man bottom scurti'>Scurti</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man bottom lungi'>Lungi</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/man foot'>Incaltaminte</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man foot adidasi'>Adidasi</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/man foot papuci'>Papuci</NavLink></div>
            </div>
          </div>
        </div>
        <div className='nav-left-btn'>
          <div className='nav-left-type'
            ref={(el) => (navIconRefs.current[5] = el)}
            onClick={() => { setDrop([false, false, false, false, false, !drop[5]]) }}
          >Femei</div>
          <div className={drop[5] ? 'nav-drop-active' : 'nav-drop'}>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/woman top'>Topuri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman top tricouri'>Tricouri</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman top bluze'>Bluze</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/woman bottom'>Pantaloni</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman bottom scurti'>Scurti</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman bottom lungi'>Lungi</NavLink></div>
            </div>
            <div className='nav-collumn'>
              <div className='nav-collumn-title'><NavLink to='/main/cloth/woman foot'>Incaltaminte</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman foot adidasi'>Adidasi</NavLink></div>
              <div className='nav-collumn-prod'><NavLink to='/main/cloth/woman foot papuci'>Papuci</NavLink></div>
            </div>
          </div>
        </div>
      </div>
      <div className='nav-right'>
        <div className='nav-theme'>
          <label>
            <input type='checkbox' value={darkTheme} className='nav-theme-input'
              onChange={() => setDarkTheme(c => !c)}
            />
            <span className='nav-switch'>
              <span className={darkTheme ? 'nav-handle' : 'nav-handle-dark'} />
            </span>
          </label>
        </div>
        <div className={drop[0] ? 'nav-icon nav-icon-active' : 'nav-icon'}
          ref={(el) => (navIconRefs.current[0] = el)}
        >
          <div className={darkTheme ? 'nav-icon-dark-img1' : 'nav-icon-img1'}
            onClick={() => { setDrop([!drop[0], false, false, false, false, false]) }}
          />
          <div className='nav-drop-right nav-spec'>
            <div className='nav-fav-title'>Favorite</div>
            {currentUser ? (
              favorite.length === 0 ? (
                <div className='nav-none'>Nu ai nimic la favorite!</div>
              ) : (
                <>
                  {favorite.map((product, index) => {
                    if (index < 4) {
                      return (
                        <Link to={`/product/${product.id}`}>
                          <div className={product.sex === 'man' ? (
                            'nav-fav nav-fav-man'
                          ) : (
                            'nav-fav nav-fav-woman'
                          )}>
                            <img src={product.photo} alt='Poza' className='nav-fav-photo' />
                            <div className='nav-fav-flex'>
                              <div className='nav-fav-nume'>{product.nume}</div>
                              <div className='nav-fav-price'>
                                {product.discount > 0 ? (
                                  <>
                                    {product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01} Lei
                                  </>
                                ) : (
                                  <>
                                    {product.price} Lei
                                  </>
                                )}
                                <div className='nav-fav-del1' onClick={e => { handleDeleteFav(e, product)}} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    } else if (index === 4) {
                      return (
                        <div>
                          + Alte {favorite.length - 4} produse
                        </div>
                      )
                    }
                  })}
                  <div className='nav-tot'><Link className='flex' to='/main/fav'>Vezi Favoritele<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                </>
              )
            ) : (
              <div className='nav-connect'><NavLink to='/connect'>Conecteaza-te</NavLink></div>
            )}
          </div>
        </div>
        <div className={drop[1] ? 'nav-icon nav-icon-active' : 'nav-icon'}
          ref={(el) => (navIconRefs.current[1] = el)}
        >
          <div className={darkTheme ? 'nav-icon-dark-img2' : 'nav-icon-img2'}
            onClick={() => { setDrop([false, !drop[1], false, false, false, false]) }}
          />
          <div className='nav-drop-right nav-spec'>
            <div className='nav-fav-title'>Cosul meu</div>
            {currentUser ? (
              cart.length === 0 ? (
                <div className='nav-none'>Nu ai nimic in cos!</div>
              ) : (
                <>
                  {cart.map((product, index) => {
                    if (index < 4) {
                      return (
                        <Link to={`/product/${product.id}`}>
                          <div className={product.sex === 'man' ? (
                            'nav-fav nav-fav-man'
                          ) : (
                            'nav-fav nav-fav-woman'
                          )}>
                            <img src={product.photo} alt='Poza' className='nav-fav-photo' />
                            <div className='nav-fav-flex'>
                              <div className='nav-fav-nume'>{product.nume}</div>
                              <div className='nav-fav-size'>Marime: {product.selectedSize}</div>
                              <div className='nav-fav-nr'>Numar: {product.number}</div>
                              <div className='nav-fav-price'>
                                {product.discount ? (
                                  <>
                                    {product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01} Lei
                                  </>
                                ) : (
                                  <>
                                    {product.price} Lei
                                  </>
                                )}
                                <div className='nav-fav-del2' onClick={e => { handleDeleteCart(e, product) }} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    } else if (index === 4) {
                      return (
                        <div>
                          + Alte {cart.length - 4} produse
                        </div>
                      )
                    }
                  })}
                  <div className='nav-tot'><Link className='flex' to='/main/cart'>Vezi Cosul<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                </>
              )
            ) : (
              <div className='nav-connect'><NavLink to='/connect'>Conecteaza-te</NavLink></div>
            )}
          </div>
        </div>
        <div className={drop[2] ? 'nav-icon nav-icon-active' : 'nav-icon'}
          ref={(el) => (navIconRefs.current[2] = el)}
        >
          <div className={darkTheme ? 'nav-icon-dark-img3' : 'nav-icon-img3'}
            onClick={() => { setDrop([false, false, !drop[2], false, false, false]) }}
          />
          <div className='nav-drop-right'>
            <div className='nav-fav-title'>Profil</div>
            {currentUser ? (
              <>
                <div className='nav-profile-email'>{currentUser.email}</div>
                <div className='nav-tot'><Link className='flex' to='/main/profile'>Vezi Profilul<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
              </>
            ) : (
              <div className='nav-connect'><Link to='/connect'>Conecteaza-te</Link></div>
            )}
          </div>
        </div>
        {currentUser ? (
          <div className={drop[3] ? 'nav-icon nav-icon-active' : 'nav-icon'}
            ref={(el) => (navIconRefs.current[3] = el)}
          >
            <div className={darkTheme ? 'nav-icon-dark-img4' : 'nav-icon-img4'}
              onClick={() => setDrop([false, false, false, !drop[3], false, false])}
            />
            <div className='nav-drop-right nav-drop-set'>
              <div className='nav-fav-title'>Optiuni</div>
              <div className='nav-set' onClick={() => handleLogout()}>Deconectare</div>
            </div>
          </div>
        ) : (
          <div className={drop[3] ? 'nav-icon nav-icon-active' : 'nav-icon'}
            ref={(el) => (navIconRefs.current[3] = el)}
          >
            <div className={darkTheme ? 'nav-icon-dark-img5' : 'nav-icon-img5'}
              onClick={() => setDrop([false, false, false, !drop[3], false, false])}
            />
            <div className='nav-drop-right nav-drop-set'>
              <div className='nav-fav-title'>Optiuni</div>
              <div className='nav-set' onClick={() => navigate('/connect')}>Conectare</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
