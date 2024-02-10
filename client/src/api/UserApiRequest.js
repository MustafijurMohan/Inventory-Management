import axios from 'axios'

import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { ErrorToast, SuccessToast } from '../helper/FormHelper'
import { getToken, setEmail, setOTP, setToken, setUserDetails } from '../helper/SessionHelper'
import { SetProfile } from '../redux/state-slice/profile-slice'

const AxiosHeader = {headers: {'token': getToken()}}

//Registration Request 
export const  RegistrationRequest =  async (email, firstName, lastName, mobile, password, photo) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/Registration'
        const PostBody = {email, firstName, lastName, mobile, password, photo}
        const res = await axios.post(URL, PostBody)
        store.dispatch(HideLoader())

        if (res.status === 200) {
            if (res.data['status'] === 'fail') {
                if (res.data['data']['keyPattern']['email'] === 1) {
                    ErrorToast('Email Already Exits !')
                    return false
                } else {
                    ErrorToast('Something Went Wrong !')
                    return false
                }
            } else {
                SuccessToast('Registration Successfull.')
                return true
            }
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }

    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}

//Registration Request 
export const LoginRequest = async (email, password) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/Login'
        const PostBody = {email, password}
        const res = await axios.post(URL, PostBody)
        

        setToken(res.data['token'])
        setUserDetails(res.data['data'])
        SuccessToast('Login Successfull.')
        store.dispatch(HideLoader())
        return true
        

    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Invalid Email or Password !')
        return false
    }
}

// User Profile Details
export const GetProfileDetails = async() => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL+'/ProfileDetails'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200) {
            store.dispatch(SetProfile(res.data['data'][0]))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}

// User Profile Update
export const ProfileUpdateRequest = async (email, firstName, lastName, mobile, password, photo) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL+'/ProfileUpdate'
        const PostBody = {email ,firstName ,lastName ,mobile ,password ,photo}
        const UserDetails = {email ,firstName ,lastName ,mobile ,password ,photo}
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200) {
            SuccessToast('Profile Update Successfull.')
            setUserDetails(UserDetails)
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}


// Send OTP 
export const RecoverVerifyEmailRequest = async (email) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/RecoverVerifyEmail/'+email
        const res = await axios.get(URL)
        store.dispatch(HideLoader())

        if (res.status === 200) {
            if (res.data['status'] === 'fail') {
                ErrorToast('No User Found !')
                return false
            } else {
                setEmail(email)
                SuccessToast('A 6 digit verification code has been send to your email address.')
                return true
            }
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}


// Verify OTP 
export const RecoverVerifyOTPRequest = async (email, OTP) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/RecoverVerifyOTP/'+email+'/'+OTP
        const res = await axios.get(URL)
        store.dispatch(HideLoader())

        if (res.status === 200) {
            if (res.data['status'] === 'fail') {
                ErrorToast('Code Verification Fail')
                return false
            } else {
                setOTP(OTP)
                SuccessToast('Code Verification Successfull.')
                return true
            }
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}

// Recover Reset Password Request
export const RecoverResetPassRequest = async (email, OTP, password) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL+'/RecoverResetPass'
        const PostBody = {email, OTP, password}
        store.dispatch(HideLoader())

        const res = await axios.post(URL, PostBody)

        if (res.status === 200) {
            if (res.data['status'] === 'fail') {
                ErrorToast(res.data['data'])
                return false
            } else {
                setOTP(OTP)
                SuccessToast('New Password Created Successfull.')
                return true
            }
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }

    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}

