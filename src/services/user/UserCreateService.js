const UserCreateService = async (Request, DataModel) => {

    try {
        const PostBody = Request.body
        const data = await DataModel.create(PostBody)

        return {status: 'successfull', data: data}

    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }

}

module.exports = UserCreateService
