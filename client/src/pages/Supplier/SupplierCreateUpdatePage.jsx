import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SupplierCreateUpdate = lazy(() => import('../../components/Supplier/SupplierCreateUpdate'))

const SupplierCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <SupplierCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default SupplierCreateUpdatePage