const ParentModel = require('../../models/Purchases/PurchasesModel')
const ChildsModel = require('../../models/Purchases/PurchasesProductsModel')

const CreateParentChildsService = require('../../services/common/CreatParentChildsService')
const DeleteParnetChildsService = require('../../services/common/DeleteParentChildsService')
const ListOneJoinService = require('../../services/common/ListOneJoinService')




exports.CreatePurchases = async (req, res) => {
    const Result = await CreateParentChildsService(req, ParentModel, ChildsModel, 'PurchaseID')
    res.status(200).json(Result)
}

exports.PurchasesList = async (req, res) => {
    let SearchRgx = {'$regex': req.params.searchKeyword, '$options': 'i'}
    let JoinStage = {$lookup: {from: 'suppliers', localField: 'SupplierID', foreignField: '_id', as: 'supplier'}}
    let SearchArray = [{Note: SearchRgx}, {'supplier.Name': SearchRgx}, {'supplier.Email': SearchRgx}, {'supplier.Phone': SearchRgx}, {'supplier.Address': SearchRgx}]
    const Result = await ListOneJoinService(req, ParentModel, SearchArray, JoinStage)
    res.status(200).json(Result)
}

exports.PurchasesDelete = async (req, res) => {
    const Result = DeleteParnetChildsService(req, ParentModel, ChildsModel, 'PurchaseID')
    res.status(200).json(Result)
}








