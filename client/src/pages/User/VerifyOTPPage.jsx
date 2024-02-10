import React, { Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const VerifyOTP = lazy(() => import('../../components/Users/VerifyOTP'))

const VerifyOTPPage = () => {
  return (
    <div>
        <Suspense fallback={<LazyLoader />}>
            <VerifyOTP />
        </Suspense>
    </div>
  )
}

export default VerifyOTPPage