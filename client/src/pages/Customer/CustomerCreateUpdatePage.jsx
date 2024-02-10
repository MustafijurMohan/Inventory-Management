import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const CustomerCreateUpdate = lazy(() => import('../../components/Customer/CustomerCreateUpdate'))

const CustomerCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <CustomerCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default CustomerCreateUpdatePage