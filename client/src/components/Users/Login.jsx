import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/FormHelper'
import { LoginRequest } from '../../api/UserApiRequest'

const Login = () => {

let emailRef, passwordRef = useRef()



const SubmitLogin = async () => {
  let email = emailRef.value
  let password = passwordRef.value

  if(IsEmail(email)) {
    ErrorToast('Invalid Email Address !')
  }
  else if (IsEmpty(password)) {
    ErrorToast('Password Required !')
  }
  else {
    const Result = await LoginRequest(email, password)
    if(Result) {
      window.location.href = '/'
    }
  }
  
}

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 col-lg-6 mt-5">
            <div className="card w-100 p-4">
              <div className="card-body">
                <h3>SIGN IN</h3>
                <hr />
                <input ref={(input) => emailRef=input } type="email" placeholder='User Email' className='form-control animated fadeInUp' />
                <br />
                <input ref={(input) => passwordRef=input } type="password" placeholder='User Password' className='form-control animated fadeInUp' />
                <br />
                <button onClick={SubmitLogin} className='btn btn-success w-100 animated fadeInUp'>Next</button>

                <div className="float-end mt-3">
                  <span>
                    <Link className='text-center ms-3 h6' to='/registration' >Sign Up</Link>
                    <span className='ms-1'>|</span>
                    <Link className='text-center ms-3 h6' to='/sendOTP' >Forget Password</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login