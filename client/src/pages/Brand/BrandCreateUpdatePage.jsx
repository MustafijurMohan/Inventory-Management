import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const BrandCreateUpdate = lazy(() => import('../../components/Brand/BrandCreateUpdate'))


const BrandCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <BrandCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default BrandCreateUpdatePage