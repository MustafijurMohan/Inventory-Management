import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const CategoryCreateUpdate = lazy(() => import('../../components/Category/CategoryCreateUpdate'))


const CategoryCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <CategoryCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default CategoryCreateUpdatePage