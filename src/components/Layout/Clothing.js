import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDefault } from "../../contexts/DefaultContext";
import Product from "../SmallComponents/Product";

export default function Clothing() {
  const { product } = useAuth()
  const { productLoad, setProductLoad,
    filter, setFilter,
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
      } else if (filter.sort === 'nrReview') {
        sort.sort((a, b) => {
          return b.review.length - a.review.length;
        })
      }
      setSortedProducts([...sort])
    })
  }, [filter.sort])
  useEffect(() => {
    startTransition(() => {
      setFilter({ ...filter, search: '' })
    })
  }, [])

  const handleFilter = (product) => {
    if (filter.search !== "") {
      if (product.id.includes(filter.search.toLowerCase())) {
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
            if (filter.color === product.color || filter.color === "") {
              noProduct += 1;
              return true
            }
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
                <Product product={product} />
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