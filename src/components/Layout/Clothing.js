import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDefault } from "../../contexts/DefaultContext";
import Fuse from "fuse.js";
import Product from "../SmallComponents/Product";

const options = {
  keys: ["name", "type"],
  threshold: 0.4,
  includeScore: true,
}

export default function Clothing() {
  const { product } = useAuth()
  const { productLoad, setProductLoad,
    filter,
    startTransition, isPending,
    deferredSearch, t
  } = useDefault()
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
      } else if (filter.sort === 'nrReview') {
        sort.sort((a, b) => {
          return b.star.nr - a.star.nr;
        })
      }
      setSortedProducts([...sort])
    })
  }, [filter.sort])

  const handleFilter = useMemo(() => (product) => {
    if (product.type.includes(filter.type)) {
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
    }
    return false
  }, [filter])

  let noProduct = 0
  return (
    <>
      {isPending && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
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
              console.log(product)
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
            <div className="cloth-more-btn" onClick={() => startTransition(() => setProductLoad(p => p + 10))}>{t('Clothing.Încarcă mai multe')}</div>
          </div>
        )}
        {noProduct === 0 && (
          <div className="mt-8">{t('Clothing.Nici un produs în stoc nu îndeplinește filtrele')}</div>
        )}
      </div>
    </>
  )
}