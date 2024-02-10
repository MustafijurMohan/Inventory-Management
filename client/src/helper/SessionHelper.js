
class SessionHelper {

    setToken(token) {
        localStorage.setItem('Token',token)
    }
    getToken() {
        return localStorage.getItem('Token')
    }

    setUserDetails(UserDetails) {
        localStorage.setItem('UserDetails',JSON.stringify(UserDetails))
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem('UserDetails'))
    }

    setEmail(Email) {
        localStorage.setItem('Email', Email)
    }
    getEmail() {
        return localStorage.getItem('Email')
    }

    setOTP(OTP) {
        localStorage.setItem('OTP', OTP)
    }

    getOTP() {
        return localStorage.getItem('OTP')
    }

    removeSessions = () => {
        localStorage.clear()
        window.location.href = '/login'
    }
}

export const {setToken, getToken, setUserDetails, getUserDetails, setEmail, getEmail, setOTP, getOTP, removeSessions } = new SessionHelper
