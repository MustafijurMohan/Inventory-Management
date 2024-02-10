import React, { useRef } from 'react'
import { getEmail, getOTP } from '../../helper/SessionHelper'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { RecoverResetPassRequest } from '../../api/UserApiRequest'
import { useNavigate } from 'react-router-dom'

const CreatePassword = () => {

  let passwordRef, confirmPasswordRef = useRef()
  const navigate = useNavigate()

  const ResetPass = async () => {
    let Password = passwordRef.value
    let ConfirmPassword = confirmPasswordRef.value

    if(IsEmpty(Password)) {
      ErrorToast('Password Required !')
    }
    else if(IsEmpty(ConfirmPassword)) {
      ErrorToast('Confirm Password Required !')
    }
    else if( Password!== ConfirmPassword) {
      ErrorToast('Password & Confirm Password Should be Same !')
    }
    else {
      const result = await RecoverResetPassRequest(getEmail(), getOTP(), Password)
      if (result) {
        navigate('/login')
      }
    }

  }

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 col-lg-6 mt-5">
            <div className="card w-100 p-4">
              <div className="card-body">
                <h4>SET NEW PASSWORD</h4>
                <hr />

                <label htmlFor="">Your Email Address</label>
                <input readOnly={true} value={getEmail()} placeholder='User Email' type="email" className='form-control animated fadeInUp' />
                <br />
                <label htmlFor="">New Password</label>
                <input ref={(input) => passwordRef=input} type="password" placeholder='New Password' className='form-control animated fadeInUp' />
                <br />
                <label htmlFor="">Confirm Password</label>
                <input ref={(input) => confirmPasswordRef=input} type="password" placeholder='Confirm Password' className='form-control animated fadeInUp' />
                <br />
                <button onClick={ResetPass} className='btn btn-success w-100 animated fadeInUp'>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePassword