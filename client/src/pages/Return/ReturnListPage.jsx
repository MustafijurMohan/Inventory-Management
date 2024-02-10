import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ReturnList = lazy(() => import('../../components/Return/ReturnList'))

const ReturnListPage = () => {
  return (
    <div>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ReturnList />
            </Suspense>
        </MasterLayout>
    </div>
  )
}

export default ReturnListPage