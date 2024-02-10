import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SaleReport = lazy(() => import('../../components/Report/SaleReport'))

const SaleReportPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <SaleReport />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default SaleReportPage