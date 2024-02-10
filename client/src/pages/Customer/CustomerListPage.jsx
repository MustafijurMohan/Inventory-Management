import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const CustomerList = lazy(() => import('../../components/Customer/CustomerList'))

const CustomerListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <CustomerList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default CustomerListPage