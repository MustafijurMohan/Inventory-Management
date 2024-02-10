const { default: mongoose } = require('mongoose')
const DataModel = require('../../models/Expenses/ExpensesTypesModel')
const ExpensesModel = require('../../models/Expenses/ExpensesModel')

const CreateService = require('../../services/common/CreateService')
const DropDownService = require('../../services/common/DropDownService')
const ListService = require('../../services/common/ListService')
const UpdateService = require('../../services/common/UpdateService')
const CheckAssociateService = require('../../services/common/CheckAssociateService')
const DeleteService = require('../../services/common/DeleteService')
const DetailsByIDService = require('../../services/common/DetailsByIDService')


exports.CreateExpensesTypes = async (req, res) => {
    const Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.UpdateExpensesTypes = async (req, res) => {
    const Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}

exports.ExpensesTypesList = async (req, res) => {
    let SearchRgx = {'$regex': req.params.searchKeyword, '$options': 'i'}
    let SearchArray = [{Name: SearchRgx}]

    const Result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(Result)
}


exports.ExpensesTypesDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, {_id: 1, Name: 1})
    res.status(200).json(Result)
}

exports.ExpensesTypesDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel)
    res.status(200).json(Result)
}

exports.DeleteExpenseTypes = async (req, res) => {
    const DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId

    const CheckAssociate = await CheckAssociateService({TypeID: new ObjectId(DeleteID)}, ExpensesModel)

    if (CheckAssociate) {
        res.status(200).json({status: 'associate', data: 'Associate With Expense'})
    } else {
        const Result = await DeleteService(req, DataModel)
        res.status(200).json(Result)
    }
}
