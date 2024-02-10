import React, { Suspense, lazy } from 'react'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const ExpenseReport = lazy(() => import('../../components/Report/ExpenseReport'))

const ExpenseReportPage = () => {
  return (
    <>
        <MasterLayout>
            <Suspense fallback={<LazyLoader />}>
                <ExpenseReport />
            </Suspense>
        </MasterLayout>
    </>
  )
}

export default ExpenseReportPage