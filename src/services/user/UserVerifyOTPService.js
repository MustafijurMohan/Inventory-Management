const UserVerifyOtpService = async (Request, DataModel) => {

    try {
        const email = Request.params.email
        const OTPCode = Request.params.otp
        const status = 0
        const statusUpdate = 1

        // Database First Process

        const OTPCount = await DataModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: 'Total'}])

        if (OTPCount.length > 0) {

            // Database Second Process
            const OTPUpdate = await DataModel.updateOne({email: email, otp: OTPCode, status: status}, {email: email, otp: OTPCode, status: statusUpdate} )

            return {status: 'successfull', data: OTPUpdate}
            
        } else {
            return {status: 'fail', data: 'Invalid OTP Code'}
        }
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }

}

module.exports = UserVerifyOtpService
