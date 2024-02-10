import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const PurchaseList = lazy(() => import('../../components/Purchase/PurchaseList'))

const PurchaseListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <PurchaseList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default PurchaseListPage