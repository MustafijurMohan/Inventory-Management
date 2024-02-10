const mongoose = require("mongoose")


const DeleteParnetChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {
    // const session = await mongoose.startSession()
    try {
        // Begin Transction
        // await session.startTransaction()

        // Parent Creation
        let DeleteID = Request.params.id
        let UserEmail = Request.headers['email']


        let ChildQueryObject = {}
        ChildQueryObject[JoinPropertyName] = DeleteID
        ChildQueryObject['UserEmail'] = UserEmail

        let ParentQueryObject = {}
        ParentQueryObject['_id'] = DeleteID
        ParentQueryObject['UserEmail'] = UserEmail

        // First Process
        let ChildsDelete = await ChildsModel.deleteMany(ChildQueryObject)

         // Second Process
        let ParentDelete = await ParentModel.deleteMany(ParentQueryObject)

        // Commit Transction
        // await session.commitTransaction()
        // session.endSession()

        return {status: 'successfull', Parent: ParentDelete, Childs: ChildsDelete}

    } catch (error) {
        // RollBack Transctioin 
        // await session.abortTransaction()
        // session.endSession()
        return {status: 'fail', data: error.toString()}
    }
}

module.exports = DeleteParnetChildsService



