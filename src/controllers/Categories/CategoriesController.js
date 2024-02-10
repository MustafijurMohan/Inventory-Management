const { default: mongoose } = require('mongoose')
const DataModel = require('../../models/Categories/CategoriesModel')
const ProductsModel = require('../../models/Products/ProductsModel')

const CreateService = require('../../services/common/CreateService')
const DropDownService = require('../../services/common/DropDownService')
const ListService = require('../../services/common/ListService')
const UpdateService = require('../../services/common/UpdateService')
const CheckAssociateService = require('../../services/common/CheckAssociateService')
const DeleteService = require('../../services/common/DeleteService')
const DetailsByIDService = require('../../services/common/DetailsByIDService')


exports.CreateCategories = async (req, res) => {
    const Result = await CreateService(req, DataModel)
    res.status(200).json(Result)
}

exports.UpdateCategories = async (req, res) => {
    const Result = await UpdateService(req, DataModel)
    res.status(200).json(Result)
}

exports.CategoriesList = async (req, res) => {
    let SearchRgx = {'$regex': req.params.searchKeyword, '$options': 'i'}
    let SearchArray = [{Name: SearchRgx}]

    const Result = await ListService(req, DataModel, SearchArray)
    res.status(200).json(Result)
}


exports.CategoriesDropDown = async (req, res) => {
    const Result = await DropDownService(req, DataModel, {_id: 1, Name: 1})
    res.status(200).json(Result)
}

exports.CategoriesDetailsByID = async (req, res) => {
    const Result = await DetailsByIDService(req, DataModel)
    res.status(200).json(Result)
}

exports.DeleteCategories = async (req, res) => {
    const DeleteID = req.params.id
    const ObjectId = mongoose.Types.ObjectId

    const CheckAssociate = await CheckAssociateService({CategoryID: new ObjectId(DeleteID)}, ProductsModel)

    if (CheckAssociate) {
        res.status(200).json({status: 'associate', data: 'Associate With Product'})
    } else {
        const Result = await DeleteService(req, DataModel)
        res.status(200).json(Result)
    }
}





