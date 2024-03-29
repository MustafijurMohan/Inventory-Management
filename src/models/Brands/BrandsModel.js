const mongoose = require('mongoose')

const DataSchema = mongoose.Schema({
    UserEmail: {type: String},
    Name: {type: String, unique: true},
    CreatedDate: {type: Date, default: Date.now()}
}, {versionKey: false})

const BrandModel = mongoose.model('brands', DataSchema)
module.exports = BrandModel



