import React, { useState } from 'react'
import ReactCodeInput from 'react-code-input'
import { RecoverVerifyOTPRequest } from '../../api/UserApiRequest'
import { getEmail } from '../../helper/SessionHelper'
import { useNavigate } from 'react-router-dom'
import { ErrorToast } from '../../helper/FormHelper'

const VerifyOTP = () => {
    const [OTP, setOTP] = useState('')
    const navigate = useNavigate()

    let  defaultInputStyle= {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }

    const SubmitOTP = async () => {
        if (OTP.length === 6) {
            const result = await RecoverVerifyOTPRequest(getEmail(), OTP)
            if (result) {
                navigate('/createPassword')
            }
        } else {
            ErrorToast('Enter 6 Digit Code.')
        }
    }

  return (
    <div>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-100">
                        <div className="card-body">
                            <h4>OTP Verification</h4>
                            <p>A 6 digit verification code has been send to your email address.</p>
                            <ReactCodeInput onChange={(value) => setOTP(value)} inputStyle={defaultInputStyle} fields={6} />
                            <br /> <br />
                            <button onClick={SubmitOTP} className='btn btn-success w-100 animated fadeInUp' >Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyOTP