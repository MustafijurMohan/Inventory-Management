import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ProductList = lazy(() => import('../../components/Product/ProductList'))


const ProductListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ProductList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ProductListPage