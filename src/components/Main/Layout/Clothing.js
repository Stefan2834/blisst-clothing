import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useDefault } from "../../../contexts/DefaultContext";

export default function Clothing() {
  const { product,
    filter, favorite, dispatchFav, currentUser
  } = useAuth()
  const { productLoad, setProductLoad,
    search, setSearch,
    startTransition, isPending
  } = useDefault()
  const [sortedProducts, setSortedProducts] = useState([...product])
  let noProduct = 0;

  useEffect(() => {
    const sort = [...product]
    startTransition(() => {

      if (filter.sort === 'price+') {
        sort.sort((a, b) => {
          const priceA = a.price + 0.01 - ((a.price + 0.01) * a.discount) - 0.01
          const priceB = b.price + 0.01 - ((b.price + 0.01) * b.discount) - 0.01
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }
          return 0;
        });
      } else if (filter.sort === 'price-') {
        sort.sort((a, b) => {
          const priceA = a.price + 0.01 - ((a.price + 0.01) * a.discount) - 0.01
          const priceB = b.price + 0.01 - ((b.price + 0.01) * b.discount) - 0.01
          if (priceA < priceB) {
            return 1;
          }
          if (priceA > priceB) {
            return -1;
          }
          return 0;
        });
      } else if (filter.sort === 'review+') {
        sort.sort((a, b) => {
          const reviewA = a.star.total / a.star.nr
          const reviewB = b.star.total / b.star.nr
          if (reviewA < reviewB) {
            return -1;
          } else {
            return 1
          }
        })
      } else if (filter.sort === 'review-') {
        sort.sort((a, b) => {
          const reviewA = a.star.total / a.star.nr
          const reviewB = b.star.total / b.star.nr
          if (reviewA < reviewB) {
            return 1;
          } else {
            return -1
          }
        })
      }
      setSortedProducts([...sort])
    })
  }, [filter.sort])
  useEffect(() => {
    startTransition(() => {
      setSearch()
    })
  }, [])

  const handleFilter = (product) => {
    if (search) {
      if (product.id.includes(search.toLowerCase())) {
        noProduct += 1;
        return true
      }
    } else {
      if (product.type.includes(filter.type)) {
        const productDiscount = product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01
        if ((filter.maxPrice >= productDiscount && filter.minPrice <= productDiscount) ||
          (filter.maxPrice >= productDiscount && filter.minPrice === '') ||
          (filter.minPrice <= productDiscount && filter.maxPrice === '')) {
          if (filter.size === '' || product.size[filter.size] !== 0) {
            noProduct += 1;
            return true
          }
        }
      }
    }
    return false
  }



  return (
    <>
      {isPending && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='cloth'>
        {sortedProducts.map((product) => {
          if (noProduct < productLoad) {
            if (handleFilter(product)) {
              return (
                <div className='cloth-div'>
                  <Link to={`/product/${product.id}`}>
                    <div className="cloth-photo">
                      <img src={product.photo} className="cloth-img" />
                    </div>
                  </Link>
                  <div className={product.sex === 'man' ? 'cloth-det cloth-grad-man' : 'cloth-det cloth-grad-woman'}>
                    <Link to={`/product/${product.id}`}>
                      <div className="cloth-left">
                        <div className="cloth-name">
                          {product.nume}
                          <span className="font-normal text-xs">({(product.star.total / product.star.nr).toFixed(2)})</span>
                        </div>
                        <div className="cloth-price">
                          {product.discount > 0 ? (
                            <>
                              <div className="cloth-price-flex">
                                <div className="cloth-price-old">{product.price}
                                  <span className="cloth-span">Lei</span>
                                </div>
                                <span className="cloth-price"> - {product.discount * 100} %</span>
                              </div>
                              <div className="cloth-price-new text-red-600">{product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01}
                                <span className="cloth-span text-red-600">Lei</span>
                              </div>
                            </>
                          ) : (
                            <>
                              {product.price} <span className="cloth-span">Lei</span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="cloth-right">
                      {favorite.some(item => item.id === product.id) ? (
                        <div className="cloth-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: product } })} />
                      ) : (
                        <div className="cloth-fav" onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: product, user: currentUser } })} />
                      )}
                    </div>
                  </div>
                </div>
              )
            }
          }
        })}
        {noProduct >= productLoad && (
          <div className="cloth-more">
            <div className="cloth-more-btn" onClick={() => startTransition(() => setProductLoad(p => p + 10))}>Incarca mai multe produse</div>
          </div>
        )}
        {noProduct === 0 && (
          <div className="mt-8">Nici un product in stoc nu indeplineste filtrele</div>
        )}
      </div>
    </>
  )
}