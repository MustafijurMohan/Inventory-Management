import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const PurchaseReport = lazy(() => import('../../components/Report/PurchaseReport'))

const PurchaseReportPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <PurchaseReport />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default PurchaseReportPage