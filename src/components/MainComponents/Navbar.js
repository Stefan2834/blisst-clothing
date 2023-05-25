import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import Swal from 'sweetalert2';



export default function Navbar() {
  const {
    currentUser,
    favorite,
    cart,
    admin,
    dispatchCart, dispatchFav,
    collections
  } = useAuth()
  const { darkTheme, setDarkTheme,
    setFilterOpen, t, lang, setLang
  } = useDefault()
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState([false, false, false, false, false, false])
  const [hover, setHover] = useState([true, false, false])
  const navIconRefs = useRef([])
  const navigate = useNavigate()

  function handleDeleteCart(e, product) {
    e.preventDefault();
    Swal.fire({
      title: t('Nav.Ești sigur?'),
      text: t('Nav.Asta o să îți șteargă produsul din coș.'),
      icon: 'warning',
      cancelButtonText: t('Nav.Înapoi'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Nav.Șterge')
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchCart({ type: 'cartRemove', payload: { cart: product } })
      }
    });
  }// daca utilizatorul vrea sa stearga produsul din cos, intreaba-l daca e sigur si apoi sterge-l
  function handleDeleteFav(e, product) {
    e.preventDefault()
    Swal.fire({
      title: t('Nav.Ești sigur?'),
      text: t('Nav.Asta o să îți șteargă produsul de la favorite.'),
      icon: 'warning',
      cancelButtonText: t('Nav.Înapoi'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Nav.Șterge')
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchFav({ type: 'favRemove', payload: { fav: product } })
      }
    });
  }//la fel ca la handleDeleteCart, dar pentru favorite

  useEffect(() => {
    setDrop([false, false, false, false, false, false])
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navIconRefs.current.every((ref) => !ref.contains(event.target))) {
        setDrop([false, false, false, false, false, false]);
      }
    };
    const handleScroll = () => {
      if (window.innerWidth > 1000) {
        setOpen(false)
      }
      setDrop([false, false, false, false, false, false])
    }

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll)
    };
  }, [navIconRefs]);//logica pentru deschidere/inchidere drop down-uri

  return (
    <>
      <div className='navbar-top-container'>
        <div className={darkTheme ? 'nav-open-dark' : 'nav-open'} onClick={() => setOpen(o => !o)} />
        {pathname.includes('/main/cloth/') && (
          <div className={darkTheme ? 'side-switch-dark' : 'side-switch'} onClick={() => setFilterOpen(o => !o)} />
        )}
        <div className='nav-logo-second'>
          <Link to='/main' className='principal'></Link>
        </div>
      </div>
      <div className={open ? 'navbar-bg' : 'navbar-bg-closed'} onClick={() => setOpen(false)} />
        <div className={open ? 'navbar' : 'navbar-closed'}>
          <div className='nav-left'>
            <div className='nav-logo'><Link to='/main' className='principal'></Link></div>
            <div className='nav-left-btn'
              ref={(el) => (navIconRefs.current[4] = el)}
            >
              <div className='nav-left-type nav-left-photo1'
                onClick={() => { setDrop([false, false, false, false, !drop[4], false, false]) }}
              />
              <div className={drop[4] ? 'nav-drop-active' : 'nav-drop'}>
                <div className='nav-drop-top'>
                  <div className={hover[0] ? 'nav-drop-link-active' : 'nav-drop-link'}
                    onMouseEnter={() => setHover([true, false, false])}
                  >{t('Nav.Topuri')}</div>
                  <div className={hover[1] ? 'nav-drop-link-active' : 'nav-drop-link'}
                    onMouseEnter={() => setHover([false, true, false])}
                  >{t('Nav.Pantaloni')}</div>
                  <div className={hover[2] ? 'nav-drop-link-active' : 'nav-drop-link'}
                    onMouseEnter={() => setHover([false, false, true])}
                  >{t('Nav.Încălțăminte')}</div>
                </div>
                <div className='nav-drop-content'>
                  <div className={hover[0] ? 'nav-drop-content-top' : 'hidden'}>
                    <Link className='nav-drop-square' to='/main/cloth/barbati top'>
                      <div className='nav-drop-img nav-1' />
                      <div className='nav-square-text-man'>{t('Nav.Toate')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/barbati top tricouri'>
                      <div className='nav-drop-img nav-2' />
                      <div className='nav-square-text-man'>{t('Nav.Tricouri')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/barbati top bluze'>
                      <div className='nav-drop-img nav-3' />
                      <div className='nav-square-text-man'>{t('Nav.Bluze')}</div>
                    </Link>
                  </div>
                  <div className={hover[1] ? 'nav-drop-content-top' : 'hidden'}>
                    <Link className='nav-drop-square' to='/main/cloth/barbati bottom'>
                      <div className='nav-drop-img nav-4' />
                      <div className='nav-square-text-man'>{t('Nav.Toate')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/barbati bottom scurti'>
                      <div className='nav-drop-img nav-5' />
                      <div className='nav-square-text-man'>{t('Nav.Scurți')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/barbati bottom lungi'>
                      <div className='nav-drop-img nav-6' />
                      <div className='nav-square-text-man'>{t('Nav.Lungi')}</div>
                    </Link>
                  </div>
                  <div className={hover[2] ? 'nav-drop-content-top' : 'hidden'}>
                    <Link className='nav-drop-square' to='/main/cloth/barbati foot adidasi'>
                      <div className='nav-drop-img nav-7' />
                      <div className='nav-square-text-man'>{t('Nav.Toate')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/barbati foot adidasi'>
                      <div className='nav-drop-img nav-8' />
                      <div className='nav-square-text-man'>{t('Nav.Adidași')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/barbati foot papuci'>
                      <div className='nav-drop-img nav-9' />
                      <div className='nav-square-text-man'>{t('Nav.Șosete')}</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='nav-left-btn'
              ref={(el) => (navIconRefs.current[5] = el)}
            >
              <div className='nav-left-type nav-left-photo2'
                onClick={() => { setDrop([false, false, false, false, false, !drop[5], false]) }}
              />
              <div className={drop[5] ? 'nav-drop-active' : 'nav-drop'}>
                <div className='nav-drop-top'>
                  <div className={hover[0] ? 'nav-drop-link-active' : 'nav-drop-link'}
                    onMouseEnter={() => setHover([true, false, false])}
                  >{t('Nav.Topuri')}</div>
                  <div className={hover[1] ? 'nav-drop-link-active' : 'nav-drop-link'}
                    onMouseEnter={() => setHover([false, true, false])}
                  >{t('Nav.Pantaloni')}</div>
                  <div className={hover[2] ? 'nav-drop-link-active' : 'nav-drop-link'}
                    onMouseEnter={() => setHover([false, false, true])}
                  >{t('Nav.Încălțăminte')}</div>
                </div>
                <div className='nav-drop-content'>
                  <div className={hover[0] ? 'nav-drop-content-top' : 'hidden'}>
                    <Link className='nav-drop-square' to='/main/cloth/femei top'>
                      <div className='nav-drop-img nav-10' />
                      <div className='nav-square-text-woman'>{t('Nav.Toate')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/femei top tricouri'>
                      <div className='nav-drop-img nav-11' />
                      <div className='nav-square-text-woman'>{t('Nav.Tricouri')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/femei top bluze'>
                      <div className='nav-drop-img nav-12' />
                      <div className='nav-square-text-woman'>{t('Nav.Bluze')}</div>
                    </Link>
                  </div>
                  <div className={hover[1] ? 'nav-drop-content-top' : 'hidden'}>
                    <Link className='nav-drop-square' to='/main/cloth/femei bottom'>
                      <div className='nav-drop-img nav-13' />
                      <div className='nav-square-text-woman'>{t('Nav.Toate')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/femei bottom scurti'>
                      <div className='nav-drop-img nav-14' />
                      <div className='nav-square-text-woman'>{t('Nav.Scurți')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/femei bottom lungi'>
                      <div className='nav-drop-img nav-15' />
                      <div className='nav-square-text-woman'>{t('Nav.Lungi')}</div>
                    </Link>
                  </div>
                  <div className={hover[2] ? 'nav-drop-content-top' : 'hidden'}>
                    <Link className='nav-drop-square' to='/main/cloth/femei foot'>
                      <div className='nav-drop-img nav-16' />
                      <div className='nav-square-text-woman'>{t('Nav.Toate')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/femei foot adidasi'>
                      <div className='nav-drop-img nav-17' />
                      <div className='nav-square-text-woman'>{t('Nav.Adidași')}</div>
                    </Link>
                    <Link className='nav-drop-square' to='/main/cloth/femei foot papuci'>
                      <div className='nav-drop-img nav-18' />
                      <div className='nav-square-text-woman'>{t('Nav.Șosete')}</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='nav-left-btn'
              ref={(el) => (navIconRefs.current[6] = el)}
            >
              <div className={darkTheme ? 'nav-left-type nav-left-photo3-dark' : 'nav-left-type nav-left-photo3'}
                onClick={() => { setDrop([false, false, false, false, false, false, !drop[6]]) }}
              />
              <div className={drop[6] ? 'nav-drop-active' : 'nav-drop'}>
                <div className='nav-drop-top-colection'>
                  <div className='nav-drop-colection'>{t('Nav.Colecții')}</div>
                </div>
                <div className='nav-drop-content'>
                  <div className='nav-drop-content-top'>
                    <Link className='nav-drop-square' to='/main/cloth/collection'>
                      <div className={darkTheme ? 'nav-drop-img nav-19-dark' : 'nav-drop-img nav-19'} />
                      <div className='nav-square-text'>{t('Nav.Toate')}</div>
                    </Link>
                    {[...collections].reverse().map((collection, index) => {
                      if (index < 2) {
                        return (
                          <Link className='nav-drop-square' key={index} to={`/main/cloth/collection ${collection.name}`}>
                            <img className='nav-drop-img nav-drop-coll' src={collection.photo} />
                            <div className='nav-square-text nav-text-coll w-full text-center'>{collection.name}</div>
                          </Link>
                        )
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='nav-right'>
            <select value={lang} className='nav-lang'
              onChange={e => { setLang(e.target.value); }}
            >
              <option value="en" className='nav-lang'>En</option>
              <option value='ro' className='nav-lang'>Ro</option>
            </select>
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
                  setDrop([!drop[0], false, false, false, false, false, false])
                }}
              />
              {currentUser && (
                <div className='nav-nr-absolute'
                  onClick={() => { setDrop([!drop[0], false, false, false, false, false, false]) }}
                >{favorite.length}</div>
              )}
              <div className='nav-drop-right nav-spec'>
                <div className='nav-fav-title'>{t('Nav.Favorite')}</div>
                {currentUser ? (
                  favorite.length === 0 ? (
                    <div className='nav-none'>{t('Nav.Nu ai nimic la favorite!')}</div>
                  ) : (
                    <>
                      {[...favorite].reverse().map((product, index) => {
                        if (index < 3) {
                          return (
                            <Link to={`/product/${product.id}`} key={index}>
                              <div className={product.sex === 'man' ? (
                                'nav-fav nav-fav-man'
                              ) : (
                                'nav-fav nav-fav-woman'
                              )}>
                                <img src={product.photo} alt='Poza' className='nav-fav-photo' />
                                <div className='nav-fav-flex'>
                                  <div className='nav-fav-nume'>{product.name}</div>
                                  <div className='nav-fav-price'>
                                    {product.discount > 0 ? (
                                      <>
                                        {(product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01).toFixed(2)} Lei
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
                              + {t('Nav.Alte')} {favorite.length - 3} {t('Nav.produse')}
                            </div>
                          )
                        }
                      })}
                      <div className='nav-tot'><Link className='flex' to='/main/fav'>{t('Nav.Vezi Favoritele')}<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                    </>
                  )
                ) : (
                  <div className='nav-connect'><NavLink to='/connect'>{t('Nav.Conectează-te')}</NavLink></div>
                )}
              </div>
            </div>
            <div className={drop[1] ? 'nav-icon nav-icon-active' : 'nav-icon'}
              ref={(el) => (navIconRefs.current[1] = el)}
            >
              <div className={darkTheme ? 'nav-icon-dark-img2' : 'nav-icon-img2'}
                onClick={() => { setDrop([false, !drop[1], false, false, false, false, false]) }}
              />
              {currentUser && (
                <div className='nav-nr-absolute'
                  onClick={() => { setDrop([false, !drop[1], false, false, false, false, false]) }}
                >{cart.reduce((total, cart) => total + Number(cart.number), 0)}</div>
              )}
              <div className='nav-drop-right nav-spec'>
                <div className='nav-fav-title'>{t('Nav.Coșul meu')}</div>
                {currentUser ? (
                  cart.length === 0 ? (
                    <div className='nav-none'>{t('Nav.Nu ai nimic în coș!')}</div>
                  ) : (
                    <>
                      {[...cart].reverse().map((product, index) => {
                        if (index < 3) {
                          return (
                            <Link to={`/product/${product.id}`} key={index}>
                              <div className={product.sex === 'man' ? (
                                'nav-fav nav-fav-man'
                              ) : (
                                'nav-fav nav-fav-woman'
                              )}>
                                <img src={product.photo} alt='Poza' className='nav-fav-photo' />
                                <div className='nav-fav-flex'>
                                  <div className='nav-fav-nume'>{product.name}</div>
                                  <div className='nav-fav-size'>{t('Nav.Mărime')}: {product.selectedSize}</div>
                                  <div className='nav-fav-nr'>{t('Nav.Cantitate')}: {product.number}</div>
                                  <div className='nav-fav-price'>
                                    {product.discount ? (
                                      <>
                                        {(product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01).toFixed(2)} Lei
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
                              + {t('Nav.Alte')} {cart.length - 3} {t('Nav.produse')}
                            </div>
                          )
                        }
                      })}
                      <div className='nav-tot'><Link className='flex' to='/main/cart'>{t('Nav.Vezi Coșul')}<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                    </>
                  )
                ) : (
                  <div className='nav-connect'><NavLink to='/connect'>{t('Nav.Conectează-te')}</NavLink></div>
                )}
              </div>
            </div>
            <div className={drop[2] ? 'nav-icon nav-icon-active' : 'nav-icon'}
              ref={(el) => (navIconRefs.current[2] = el)}
            >
              {admin ? (
                <div className={darkTheme ? 'nav-icon-dark-img6' : 'nav-icon-img6'}
                  onClick={() => { setDrop([false, false, !drop[2], false, false, false, false]) }}
                />
              ) : (
                <div className={darkTheme ? 'nav-icon-dark-img3' : 'nav-icon-img3'}
                  onClick={() => { setDrop([false, false, !drop[2], false, false, false, false]) }}
                />
              )}
              <div className='nav-drop-right'>
                <div className='nav-fav-title'>{t('Nav.Profil')}</div>
                {currentUser ? (
                  <>
                    <div className='nav-profile-email principal'>{currentUser.email}</div>
                    <div className='nav-tot'><Link className='flex' to='/main/profile'>{t('Nav.Vezi Profilul')}<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                    {admin && (
                      <>
                        <div className='nav-tot'><Link className='flex' to='/main/admin'>{t('Nav.Vezi Admin')}<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                      </>
                    )}
                  </>
                ) : (
                  <div className='nav-connect'><Link to='/connect'>{t('Nav.Conectează-te')}</Link></div>
                )}
              </div>
            </div>
            {currentUser ? (
              <div className={drop[3] ? 'nav-icon nav-icon-active' : 'nav-icon'}
                ref={(el) => (navIconRefs.current[3] = el)}
              >
                <div className={darkTheme ? 'nav-icon-dark-img4' : 'nav-icon-img4'}
                  onClick={() => setDrop([false, false, false, !drop[3], false, false, false])}
                />
                <div className='nav-drop-right nav-drop-set'>
                  <div className='nav-fav-title'>{t('Nav.Opțiuni')}</div>
                  <div className='nav-set' onClick={() => navigate('/connect')}>{t('Nav.Deconectare')}</div>
                </div>
              </div>
            ) : (
              <div className={drop[3] ? 'nav-icon nav-icon-active' : 'nav-icon'}
                ref={(el) => (navIconRefs.current[3] = el)}
              >
                <div className={darkTheme ? 'nav-icon-dark-img5' : 'nav-icon-img5'}
                  onClick={() => setDrop([false, false, false, !drop[3], false, false, false])}
                />
                <div className='nav-drop-right nav-drop-set'>
                  <div className='nav-fav-title'>{t('Nav.Opțiuni')}</div>
                  <div className='nav-set' onClick={() => navigate('/connect')}>{t('Nav.Conectare')}</div>
                </div>
              </div>
            )}
          </div>
        </div>
    </>
  )
}
