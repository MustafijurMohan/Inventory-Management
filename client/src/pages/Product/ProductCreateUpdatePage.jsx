import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ProductCreateUpdate = lazy(() => import('../../components/Product/ProductCreateUpdate'))

const ProductCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ProductCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ProductCreateUpdatePage