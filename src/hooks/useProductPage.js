import React from 'react'
import useMutation from './useMutation'
import { productService } from '../services/productsService'

const useProductPage = () => {

  const {
      data:productsData,
      loading:productsLoading,
      error: productError,
      execute:fetchProducts,
  } = useMutation((query)=>productService.getProducts(query|| `?limit=${PRODUCT_LIMITS}`))
  return (
    <div>useProductPage</div>
  )
}

export default useProductPage