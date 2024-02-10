import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ReturnCreateUpdate = lazy(() => import('../../components/Return/ReturnCreateUpdate'))

const ReturnCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ReturnCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ReturnCreateUpdatePage