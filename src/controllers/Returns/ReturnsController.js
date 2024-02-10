const ParentModel = require('../../models/Returns/ReturnsModel')
const ChildsModel = require('../../models/Returns/ReturnProductsModel')

const CreateParentChildsService = require('../../services/common/CreatParentChildsService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')
const DeleteParnetChildsService = require('../../services/common/DeleteParentChildsService')




exports.CreateReturns = async (req, res) => {
    const Result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'ReturnID')
    res.status(200).json(Result)
}

exports.ReturnsList = async (req, res) => {
    let SearchRgx = {'$regex': req.params.searchKeyword, '$options': 'i'}
    let JoinStage = {$lookup: {from: 'customers', localField: 'CustomerID', foreignField: '_id', as: 'customers'}}
    let SearchArray = [{Note: SearchRgx}, {'customers.Name': SearchRgx}, {'customers.Email': SearchRgx}, {'customers.Phone': SearchRgx}, {'customers.Address': SearchRgx}]
    const Result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage)
    res.status(200).json(Result)
}

exports.ReturnDelete = async (req, res) => {
    const Result = DeleteParnetChildsService(req, ParentModel, ChildsModel, 'ReturnID')
    res.status(200).json(Result)
}

