
const UserDetailsServide = async (Request, DataModel) => {
    try {
        const data = await DataModel.aggregate([{$match: {email: Request.headers['email']}}])
        return {status: 'successfull', data: data}
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}

module.exports = UserDetailsServide

