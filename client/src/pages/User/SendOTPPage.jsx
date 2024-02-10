import React, { Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
const SendOTP = lazy(() => import('../../components/Users/SendOTP'))


const SendOTPPage = () => {
  return (
    <div>
        <Suspense fallback={<LazyLoader />}>
            <SendOTP />
        </Suspense>
    </div>
  )
}

export default SendOTPPage