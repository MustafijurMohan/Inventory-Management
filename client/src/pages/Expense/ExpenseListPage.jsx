import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ExpenseList = lazy(() => import('../../components/Expense/ExpenseList'))

const ExpenseListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ExpenseList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ExpenseListPage