import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SalesList = lazy(() => import('../../components/Sales/SalesList'))


const SalesListPage = () => {
  return (
    <div>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <SalesList />
            </Suspense>
        </MasterLayout>
    </div>
  )
}

export default SalesListPage