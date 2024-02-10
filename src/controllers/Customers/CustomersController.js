const { default: mongoose } = require('mongoose')
const DataModel = require('../../models/Customers/CustomersModel')
const SalesModel = require('../../models/Sales/SalesModel')


const CreateService = require('../../services/common/CreateService')
const DeleteService = require('../../services/common/DeleteService')
const DropDownService = require('../../services/common/DropDownService')
const ListService = require('../../services/common/ListService')
const UpdateService = require('../../services/common/UpdateService')
const CheckAssociateService = require('../../services/common/CheckAssociateService')
const DetailsByIDService = require('../../services/common/DetailsByIDService')

exports.CreateCustomers = async (req, res) => {
    const Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.UpdateCustomers = async (req, res) => {
    const Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}

exports.CustomersList = async (req, res) => {
    let SearchRgx = {'$regex': req.params.searchKeyword, '$options': 'i'}
    let SearchArray = [{CustomerName: SearchRgx}, {Phone: SearchRgx}, {Email: SearchRgx}, {Address: SearchRgx}]

    const Result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(Result)
}


exports.CustomersDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, {_id: 1, CustomerName: 1})
    res.status(200).json(Result)
}

exports.CustomersDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel)
    res.status(200).json(Result)
} 

exports.DeleteCustomer = async (req, res) => {
    const DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId

    const CheckAssociate = await CheckAssociateService({CustomerID: new ObjectId(DeleteID)}, SalesModel)

    if (CheckAssociate) {
        res.status(200).json({status: 'associate', data: 'Associate With Sales'})
    } else {
        const Result = await DeleteService(req, DataModel)
        res.status(200).json(Result)
    }
}
