import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const PurchaseCreateUpdate = lazy(() => import('../../components/Purchase/PurchaseCreateUpdate'))


const PurchaseCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <PurchaseCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default PurchaseCreateUpdatePage