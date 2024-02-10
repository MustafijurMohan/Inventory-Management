
const DeleteService = async (Request, DataModel) => {
    try {
        
        const DeleteID = Request.params.id
        const UserEmail = Request.headers['email']

        const DeleteQueryObject = {}
        DeleteQueryObject['_id'] = DeleteID
        DeleteQueryObject['UserEmail'] = UserEmail

        const Delete = await DataModel.deleteMany(DeleteQueryObject)

        return {status: 'successfull', Delete: Delete}
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}


module.exports = DeleteService