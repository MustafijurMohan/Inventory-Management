import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { GetProfileDetails, ProfileUpdateRequest } from '../../api/UserApiRequest'
import { useNavigate } from 'react-router-dom'
import { ErrorToast, IsEmail, IsEmpty, IsMobile, getBase64 } from '../../helper/FormHelper'

const Profile = () => {

  let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef, userImgRef, userImgView = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      await GetProfileDetails()
    })()
  }, [])

const ProfileData = useSelector((state) => state.profile.value)

// Base64 Convert
const PreviewImage = () => {
  let ImgFile = userImgRef.files[0]
  getBase64(ImgFile).then((base64Img) => {
    userImgView.src = base64Img
  })
}


const UpdateMyProfile = async () => {

  let email = emailRef.value
  let firstName = firstNameRef.value
  let lastName = lastNameRef.value
  let mobile = mobileRef.value
  let password = passwordRef.value
  let photo = userImgView.src

  if(IsEmail(email)) {
    ErrorToast('Valid Email Address Required !')
  }
  else if(IsEmpty(firstName)) {
    ErrorToast('First Name Required !')
  }
  else if(IsEmpty(lastName)) {
    ErrorToast('Last Name Required !')
  }
  else if(IsMobile(mobile)) {
    ErrorToast('Mobile Number Required !')
  }
  else if(IsEmpty(password)) {
    ErrorToast('Password Required !')
  }
  else {
    const res = await ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo)
    if (res) {
      navigate('/')
    }
  }

}

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center ">
          <div className="col-md-12 mt-4">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <img ref={(input) => userImgView=input} src={ProfileData['photo']} className='icon-nav-img-lg' alt="" />
                  <hr />

                  <div className="row">
                    <div className="col-4 p-2">
                      <label htmlFor="">Profile Picture</label>
                      <input onChange={PreviewImage} ref={(input) => userImgRef=input} type="file" className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Email Address</label>
                      <input key={Date.now()} ref={(input) => emailRef=input} defaultValue={ProfileData['email']} type="email" placeholder='User Email'  className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">First Name</label>
                      <input key={Date.now()} ref={(input) => firstNameRef=input} defaultValue={ProfileData['firstName']} type="text" placeholder='First Name' className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Last Name</label>
                      <input key={Date.now()} ref={(input) => lastNameRef=input} defaultValue={ProfileData['lastName']} type="text" placeholder='Last Name' className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Mobile Number</label>
                      <input key={Date.now()} ref={(input) => mobileRef=input} defaultValue={ProfileData['mobile']} type="mobile" placeholder='Mobile' className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Password</label>
                      <input key={Date.now()} ref={(input) => passwordRef=input} defaultValue={ProfileData['password']} type="password" placeholder='User Password' className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <button onClick={UpdateMyProfile} className='btn btn-success animated fadeInUp w-100' >Update</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile