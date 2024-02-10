import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ExpenseTypeCreateUpdate = lazy(() => import('../../components/ExpenseType/ExpenseTypeCreateUpdate'))


const ExpenseTypeCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ExpenseTypeCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ExpenseTypeCreateUpdatePage