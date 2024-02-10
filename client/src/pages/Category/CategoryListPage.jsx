import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const CategoryList = lazy(() => import('../../components/Category/CategoryList'))

const CategoryListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <CategoryList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default CategoryListPage