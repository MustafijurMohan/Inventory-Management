import React, { Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const CreatePassword = lazy(() => import('../../components/Users/CreatePassword'))


const CreatePasswordPage = () => {
  return (
    <div>
        <Suspense fallback={<LazyLoader />}>
            <CreatePassword />
        </Suspense>
    </div>
  )
}

export default CreatePasswordPage