import React, { Suspense, lazy } from 'react'
import LazyLoader from '../../components/MasterLayout/LazyLoader'
import MasterLayout from '../../components/MasterLayout/MasterLayout'
const Profile = lazy(() => import('../../components/Users/Profile'))

const ProfilePage = () => {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
            <Profile />
        </Suspense>
      </MasterLayout>
    </>
  )
}

export default ProfilePage