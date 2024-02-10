
const UserUpdateService = async (Request, DataModel) => {
    try {
        const data = await DataModel.updateOne({email: Request.headers['email']}, Request.body)
        return {status: 'successfull', data: data}
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}

module.exports = UserUpdateService