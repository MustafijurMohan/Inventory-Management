
const mongoose = require("mongoose");

const DetailsByIDService = async (Request, DataModel) => {
    try {
        const UserEmail = Request.headers['email'];
        const DetailsID = Request.params.id;

        const QueryObject = {
            _id: new mongoose.Types.ObjectId(DetailsID),
            UserEmail: UserEmail
        };

        const data = await DataModel.aggregate([
            { $match: QueryObject }
        ]);

        return { status: 'successfull', data: data };

    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
};

module.exports = DetailsByIDService;
