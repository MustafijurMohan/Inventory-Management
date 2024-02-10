import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ExpenseCreateUpdate = lazy(() => import('../../components/Expense/ExpenseCreateUpdate'))

const ExpenseCreateUpdatePage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ExpenseCreateUpdate />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ExpenseCreateUpdatePage