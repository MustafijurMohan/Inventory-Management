import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SupplierList = lazy(() => import('../../components/Supplier/SupplierList'))

const SupplierListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <SupplierList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default SupplierListPage