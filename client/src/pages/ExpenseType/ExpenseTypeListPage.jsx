import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ExpenseTypeList = lazy(() => import('../../components/ExpenseType/ExpenseTypeList'))


const ExpenseTypeListPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ExpenseTypeList />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ExpenseTypeListPage