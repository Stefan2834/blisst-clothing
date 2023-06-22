import React, { useMemo, useState, useLayoutEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDefault } from "../../contexts/DefaultContext";
import Fuse from "fuse.js";
import Product from "../SmallComponents/Product";
import axios from "axios";
import { useParams } from "react-router-dom";

const options = {
  keys: ["name", "type"],
  threshold: 0.4,
  includeScore: true,
}

export default function Clothing() {
  const { server } = useAuth()
  const { productLoad, setProductLoad,
    filter,
    deferredSearch, t
  } = useDefault()
  const { id } = useParams()
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortedProducts, setSortedProducts] = useState([...product])
  const fuse = new Fuse(product, options);
  const searchResult = useMemo(() => {
    if (filter.searchName !== '') {
      return fuse.search(deferredSearch)
    } else if (filter.searchId !== "") {
      return product.map((p) => {
        if (p.id.toLowerCase().includes(filter.searchId.toLowerCase())) {
          return p
        } else {
          return null
        }
      }).filter(p => p != null)
    }
  }, [filter.searchName, filter.searchId])


  useLayoutEffect(() => {
    setLoading(true)
    axios.post(`${server}/product/getMany`, { path: id })
      .then(data => {
        setProduct(data.data.product)
        const sort = [...data.data.product]
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
            const reviewA = a.star.nr === 0 ? 0 : a.star.total / a.star.nr;
            const reviewB = b.star.nr === 0 ? 0 : b.star.total / b.star.nr;

            if (reviewA < reviewB) {
              return -1;
            } else if (reviewA > reviewB) {
              return 1;
            } else {
              if (a.star.nr < b.star.nr) {
                return -1;
              } else {
                return 1;
              }
            }
          });
        } else if (filter.sort === 'review-') {
          sort.sort((a, b) => {
            const reviewA = a.star.nr === 0 ? 0 : a.star.total / a.star.nr
            const reviewB = b.star.nr === 0 ? 0 : b.star.total / b.star.nr
            if (reviewA < reviewB) {
              return 1;
            } else if (reviewB > reviewA) {
              return -1
            } else {
              if (a.star.nr < b.star.nr) {
                return 1
              } else {
                return -1
              }
            }
          })
        } else if (filter.sort === 'nrReview') {
          sort.sort((a, b) => {
            return b.star.nr - a.star.nr;
          })
        }
        setSortedProducts([...sort])
        setLoading(false)
      })
      .catch(err => console.error(err))
  }, [filter.sort, id])

  const handleFilter = useMemo(() => (product) => {
    const productDiscount = product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01
    if ((filter.maxPrice >= productDiscount && filter.minPrice <= productDiscount) ||
      (filter.maxPrice >= productDiscount && filter.minPrice === '') ||
      (filter.minPrice <= productDiscount && filter.maxPrice === '')) {
      if (filter.size === '' || product.size[filter.size] !== 0) {
        if (product.colors.includes(filter.color) || filter.color === "") {
          return true
        }
      }
    }
    return false
  }, [filter])

  let noProduct = 0
  return (
    <>
      {loading ? (
        <>
        <div className="loading-bg">
          <div className="loading-spin">{t('Main.Se încarcă')}...</div>
        </div>
        <div className="h-screen" />
        </>
      ) : (
        <div className='cloth'>
          {filter.searchName.length < 2 && filter.searchId.length < 2 ? (
            sortedProducts.map((product, index) => {
              if (handleFilter(product)) {
                noProduct += 1;
                if (noProduct - 1 < productLoad) {
                  return (
                    <Product key={index} product={product} />
                  )
                }
              }
            })
          ) : (
            searchResult.map((product, index) => {
              if (noProduct < productLoad) {
                noProduct += 1;
                if (filter.searchId !== '') {
                  return (
                    <Product key={index} product={product} />
                  )
                } else if (filter.searchName !== '') {
                  return (
                    <Product key={index} product={product.item} />
                  )
                }
              }
            })
          )}
          {noProduct > productLoad && (
            <div className="cloth-more">
              <div className="cloth-more-btn" onClick={() => {
                if (window.innerWidth > 1770) {
                  setProductLoad(p => p + 10)
                } else {
                  setProductLoad(p => p + 8)
                }
              }}>{t('Clothing.Încarcă mai multe')}</div>
            </div>
          )}
          {noProduct === 0 && (
            <div className="cloth-no">{t('Clothing.Nici un produs în stoc nu îndeplinește filtrele')}</div>
          )}
        </div>
      )}
    </>
  )
}