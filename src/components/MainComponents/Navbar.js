import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useDefault } from '../../contexts/DefaultContext'
import Swal from 'sweetalert2';


export default function Navbar() {
  const {
    currentUser,
    favorite,
    cart,
    server,
    dispatchCart, dispatchFav,
  } = useAuth()
  const { setError, setActiveForm,
    darkTheme, setDarkTheme,
  } = useDefault()
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState([false, false, false, false, false, false])
  const [hover, setHover] = useState([true, false, false])
  const navIconRefs = useRef([])
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      setError()
      setActiveForm(false)
      const response = await axios.post(`${server}/connect/logout`)
      if (response.data.success) {
        navigate('/connect');
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
    setDrop([false, false, false, false, false, false])
    document.addEventListener('scroll', () => { setOpen(false) })

    return () => {
      document.removeEventListener('scroll', () => { setOpen(false) })
    }
  }, [pathname]);

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
    <>
      <div className='navbar-top-container'>
        <div className='nav-open' onClick={() => setOpen(o => !o)} />
        <div className='nav-logo-second'>
          <Link to='/main' className='principal'>Blisst</Link>
        </div>
      </div>
      <div className={open ? 'navbar-bg' : 'navbar-bg-closed'} onClick={() => setOpen(false)} />
      <div className={open ? 'navbar' : 'navbar-closed'}>
        <div className='nav-left'>
          <div className='nav-logo'><Link to='/main' className='principal'>Blisst</Link></div>
          <div className='nav-left-btn'
            ref={(el) => (navIconRefs.current[4] = el)}
          >
            <div className='nav-left-type nav-left-photo1'
              onClick={() => { setDrop([false, false, false, false, !drop[4], false]) }}
            />
            <div className={drop[4] ? 'nav-drop-active' : 'nav-drop'}>
              <div className='nav-drop-top'>
                <div className={hover[0] ? 'nav-drop-link-active' : 'nav-drop-link'}
                  onMouseEnter={() => setHover([true, false, false])}
                >Topuri</div>
                <div className={hover[1] ? 'nav-drop-link-active' : 'nav-drop-link'}
                  onMouseEnter={() => setHover([false, true, false])}
                >Pantaloni</div>
                <div className={hover[2] ? 'nav-drop-link-active' : 'nav-drop-link'}
                  onMouseEnter={() => setHover([false, false, true])}
                >Incaltaminte</div>
              </div>
              <div className='nav-drop-content'>
                <div className={hover[0] ? 'nav-drop-content-top' : 'hidden'}>
                  <Link className='nav-drop-square' to='/main/cloth/barbati top tricouri'>
                    <div className='nav-drop-img nav-1' />
                    <div className='nav-square-text-man'>Tricouri</div>
                  </Link>
                  <Link className='nav-drop-square' to='/main/cloth/barbati top bluze'>
                    <div className='nav-drop-img nav-2' />
                    <div className='nav-square-text-man'>Bluze</div>
                  </Link>
                </div>
                <div className={hover[1] ? 'nav-drop-content-top' : 'hidden'}>
                  <Link className='nav-drop-square' to='/main/cloth/barbati bottom scurti'>
                    <div className='nav-drop-img nav-3' />
                    <div className='nav-square-text-man'>Scurti</div>
                  </Link>
                  <Link className='nav-drop-square' to='/main/cloth/barbati bottom lungi'>
                    <div className='nav-drop-img nav-4' />
                    <div className='nav-square-text-man'>Lungi</div>
                  </Link>
                </div>
                <div className={hover[2] ? 'nav-drop-content-top' : 'hidden'}>
                  <Link className='nav-drop-square' to='/main/cloth/barbati foot adidasi'>
                    <div className='nav-drop-img nav-5' />
                    <div className='nav-square-text-man'>Adidasi</div>
                  </Link>
                  <Link className='nav-drop-square' to='/main/cloth/barbati foot papuci'>
                    <div className='nav-drop-img nav-6' />
                    <div className='nav-square-text-man'>Papuci</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='nav-left-btn'
            ref={(el) => (navIconRefs.current[5] = el)}
          >
            <div className='nav-left-type nav-left-photo2'
              onClick={() => { setDrop([false, false, false, false, false, !drop[5]]) }}
            />
            <div className={drop[5] ? 'nav-drop-active' : 'nav-drop'}>
              <div className='nav-drop-top'>
                <div className={hover[0] ? 'nav-drop-link-active' : 'nav-drop-link'}
                  onMouseEnter={() => setHover([true, false, false])}
                >Topuri</div>
                <div className={hover[1] ? 'nav-drop-link-active' : 'nav-drop-link'}
                  onMouseEnter={() => setHover([false, true, false])}
                >Pantaloni</div>
                <div className={hover[2] ? 'nav-drop-link-active' : 'nav-drop-link'}
                  onMouseEnter={() => setHover([false, false, true])}
                >Incaltaminte</div>
              </div>
              <div className='nav-drop-content'>
                <div className={hover[0] ? 'nav-drop-content-top' : 'hidden'}>
                  <Link className='nav-drop-square' to='/main/cloth/femei top tricouri'>
                    <div className='nav-drop-img nav-7' />
                    <div className='nav-square-text-woman'>Tricouri</div>
                  </Link>
                  <Link className='nav-drop-square' to='/main/cloth/femei top bluze'>
                    <div className='nav-drop-img nav-8' />
                    <div className='nav-square-text-woman'>Bluze</div>
                  </Link>
                </div>
                <div className={hover[1] ? 'nav-drop-content-top' : 'hidden'}>
                  <Link className='nav-drop-square' to='/main/cloth/femei bottom scurti'>
                    <div className='nav-drop-img nav-9' />
                    <div className='nav-square-text-woman'>Scurti</div>
                  </Link>
                  <Link className='nav-drop-square' to='/main/cloth/femei bottom lungi'>
                    <div className='nav-drop-img nav-10' />
                    <div className='nav-square-text-woman'>Lungi</div>
                  </Link>
                </div>
                <div className={hover[2] ? 'nav-drop-content-top' : 'hidden'}>
                  <Link className='nav-drop-square' to='/main/cloth/femei foot adidasi'>
                    <div className='nav-drop-img nav-11' />
                    <div className='nav-square-text-woman'>Adidasi</div>
                  </Link>
                  <Link className='nav-drop-square' to='/main/cloth/femei foot papuci'>
                    <div className='nav-drop-img nav-12' />
                    <div className='nav-square-text-woman'>Papuci</div>
                  </Link>
                </div>
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
              onClick={() => {
                setDrop([!drop[0], false, false, false, false, false])
              }}
            />
            {currentUser && (
              <div className='nav-nr-absolute'
                onClick={() => { setDrop([!drop[0], false, false, false, false, false]) }}
              >{favorite.length}</div>
            )}
            <div className='nav-drop-right nav-spec'>
              <div className='nav-fav-title'>Favorite</div>
              {currentUser ? (
                favorite.length === 0 ? (
                  <div className='nav-none'>Nu ai nimic la favorite!</div>
                ) : (
                  <>
                    {favorite.map((product, index) => {
                      if (index < 3) {
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
                                  <div className='nav-fav-del1' onClick={e => { handleDeleteFav(e, product) }} />
                                </div>
                              </div>
                            </div>
                          </Link>
                        )
                      } else if (index === 3) {
                        return (
                          <div>
                            + Alte {favorite.length - 3} produse
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
            {currentUser && (
              <div className='nav-nr-absolute'
                onClick={() => { setDrop([false, !drop[1], false, false, false, false]) }}
              >{cart.reduce((total, cart) => total + Number(cart.number), 0)}</div>
            )}
            <div className='nav-drop-right nav-spec'>
              <div className='nav-fav-title'>Cosul meu</div>
              {currentUser ? (
                cart.length === 0 ? (
                  <div className='nav-none'>Nu ai nimic in cos!</div>
                ) : (
                  <>
                    {cart.map((product, index) => {
                      if (index < 3) {
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
                      } else if (index === 3) {
                        return (
                          <div>
                            + Alte {cart.length - 3} produse
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
                  <div className='nav-profile-email principal'>{currentUser.email}</div>
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
    </>
  )
}
