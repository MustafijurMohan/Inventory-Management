import React, { useRef } from 'react'
import { ErrorToast, IsEmail } from '../../helper/FormHelper'
import { RecoverVerifyEmailRequest } from '../../api/UserApiRequest'
import { useNavigate } from 'react-router-dom'

const SendOTP = () => {

    let emailRef = useRef()
    const navigate = useNavigate()

    const VerifyEmail = async () => {
        let email = emailRef.value

        if (IsEmail(email)) {
            ErrorToast('Valid Email Address Required !')
        } else {
            const result = await RecoverVerifyEmailRequest(email)
            if(result) {
                navigate('/verifyOTP')
            }
        }

    }


  return (
    <div>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-7 col-lg-6 mt-5">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4>EMAIL ADDRESS</h4>
                            <hr />
                            <label htmlFor="">Eamil Address</label>
                            <input ref={(input) => emailRef=input} type="email" className='form-control animated fadeInUp'  />
                            <br />
                            <button onClick={VerifyEmail} className='btn btn-success w-100 animated fadeInUp'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SendOTP