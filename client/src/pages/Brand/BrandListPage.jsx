import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const BrandList = lazy(() => import('../../components/Brand/BrandList'))


const BrandListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <BrandList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default BrandListPage