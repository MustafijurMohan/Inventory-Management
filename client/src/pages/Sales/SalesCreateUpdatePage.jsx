import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SalesCreateUpdate = lazy(() => import('../../components/Sales/SalesCreateUpdate'))

const SalesCreateUpdatePage = () => {
  return (
    <div>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <SalesCreateUpdate />
            </Suspense>
        </MasterLayout>
    </div>
  )
}

export default SalesCreateUpdatePage