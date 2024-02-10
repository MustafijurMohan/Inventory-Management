const ExpenseSummaryService = require("../../services/summary/ExpenseSummaryService")
const PurchasesSummaryService = require("../../services/summary/PurchaseSummaryService")
const ReturnsSummaryService = require("../../services/summary/ReturnSummaryService")
const SalesSummaryService = require("../../services/summary/SalesSummaryService")


exports.ExpensesSummary = async (req, res) => {
    const Result = await ExpenseSummaryService(req)
    res.status(200).json(Result)
}

exports.ReturnSummary = async (req, res) => {
    const Result = await ReturnsSummaryService(req)
    res.status(200).json(Result)
}

exports.PurchaseSummary = async (req, res) => {
    const Result = await PurchasesSummaryService(req)
    res.status(200).json(Result)
}

exports.SalesSummary = async (req, res) => {
    const Result = await SalesSummaryService(req)
    res.status(200).json(Result)
}
