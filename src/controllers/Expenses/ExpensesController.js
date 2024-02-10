const DataModel = require('../../models/Expenses/ExpensesModel')

const CreateService = require('../../services/common/CreateService')
const DeleteService = require('../../services/common/DeleteService')
const DetailsByIDService = require('../../services/common/DetailsByIDService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')
const UpdateService = require('../../services/common/UpdateService')


exports.CreateExpenses = async (req, res) => {
    const Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.UpdateExpenses = async (req, res) => {
    const Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}

exports.ExpensesList = async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": 'i'}
    let SearchArray = [{Note: SearchRgx}, {Amount: SearchRgx}, {'Type.Name': SearchRgx}]
    let JoinStage = {$lookup: {from: 'expensetypes', localField: 'TypeID', foreignField: '_id', as: 'Type'}}
    const Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage)
    res.status(200).json(Result)
}

exports.ExpensesDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel)
    res.status(200).json(Result)
}

exports.DeleteExpense = async (req, res) => {
    const Result = await DeleteService(req, DataModel)
    res.status(200).json(Result)
}


