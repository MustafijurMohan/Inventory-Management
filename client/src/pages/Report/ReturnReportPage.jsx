import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ReturnReport = lazy(() => import('../../components/Report/ReturnReport'))

const ReturnReportPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ReturnReport />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ReturnReportPage