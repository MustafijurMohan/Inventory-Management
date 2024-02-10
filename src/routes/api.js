const express = require('express')
const router = new express.Router()


const { Registration, Login, ProfileUpdate, ProfileDetails, RecoverVerifyEmail, RecoverVerifyOTP, RecoverResetPass } = require('../controllers/Users/UserController')
const AuthVerifyMiddleware = require('../middlewares/AuthVerifyMiddleware')
const { CreateBrand, UpdateBrand, BrandList, BrandDropDown, DeleteBrand, BrandDetailsByID } = require('../controllers/Brands/BrandsController')
const { CreateCategories, UpdateCategories, CategoriesList, CategoriesDropDown, DeleteCategories, CategoriesDetailsByID } = require('../controllers/Categories/CategoriesController')
const { CreateCustomers, UpdateCustomers, CustomersList, CustomersDropDown, DeleteCustomer, CustomersDetailsByID } = require('../controllers/Customers/CustomersController')
const { CreateSuppliers, UpdateSuppliers, SuppliersList, SuppliersDropDown, DeleteSuppliers, SuppliersDetailsByID } = require('../controllers/Suppliers/SuppliersController')
const { CreateExpensesTypes, UpdateExpensesTypes, ExpensesTypesList, ExpensesTypesDropDown, DeleteExpenseTypes, ExpensesTypesDetailsByID } = require('../controllers/Expenses/ExpensesTypesController')
const { CreateExpenses, UpdateExpenses, ExpensesList, DeleteExpense, ExpensesDetailsByID } = require('../controllers/Expenses/ExpensesController')
const { CreateProducts, UpdateProducts, ProductsList, DeleteProduct, ProductsDetailsByID, ProductsDropDown } = require('../controllers/Products/ProductsController')
const { CreatePurchases, PurchasesList, PurchasesDelete } = require('../controllers/Purchases/PurchasesController')
const { CreateSales, SalesList, SaleDelete } = require('../controllers/Sales/SalesController')
const { CreateReturns, ReturnsList, ReturnDelete } = require('../controllers/Returns/ReturnsController')
const { ExpensesByDate, PurchaseByDate, ReturnByDate, SalesByDate } = require('../controllers/Report/ReportController')
const { ExpensesSummary, ReturnSummary, PurchaseSummary, SalesSummary } = require('../controllers/Summary/SummaryController')




// User Profile api
router.post('/Registration', Registration)
router.post('/Login', Login)
router.post('/ProfileUpdate', AuthVerifyMiddleware, ProfileUpdate)
router.get('/ProfileDetails', AuthVerifyMiddleware, ProfileDetails)
router.get('/RecoverVerifyEmail/:email', RecoverVerifyEmail)
router.get('/RecoverVerifyOTP/:email/:otp', RecoverVerifyOTP)
router.post('/RecoverResetPass', RecoverResetPass)


// Brands
router.post('/CreateBrand', AuthVerifyMiddleware, CreateBrand)
router.post('/UpdateBrand/:id', AuthVerifyMiddleware, UpdateBrand)
router.get('/BrandList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, BrandList)
router.get('/BrandDropDown', AuthVerifyMiddleware, BrandDropDown)
router.get('/BrandDetailsByID/:id', AuthVerifyMiddleware, BrandDetailsByID)
router.delete('/DeleteBrand/:id', AuthVerifyMiddleware, DeleteBrand)

// Categories
router.post('/CreateCategories', AuthVerifyMiddleware, CreateCategories)
router.post('/UpdateCategories/:id', AuthVerifyMiddleware, UpdateCategories)
router.get('/CategoriesList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, CategoriesList)
router.get('/CategoriesDropDown', AuthVerifyMiddleware, CategoriesDropDown)
router.get('/CategoriesDetailsByID/:id', AuthVerifyMiddleware, CategoriesDetailsByID)
router.delete('/DeleteCategories/:id', AuthVerifyMiddleware, DeleteCategories)

// Customers
router.post('/CreateCustomers', AuthVerifyMiddleware, CreateCustomers)
router.post('/UpdateCustomers/:id', AuthVerifyMiddleware, UpdateCustomers)
router.get('/CustomersList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, CustomersList)
router.get('/CustomersDropDown', AuthVerifyMiddleware, CustomersDropDown)
router.get('/CustomersDetailsByID/:id', AuthVerifyMiddleware, CustomersDetailsByID)
router.delete('/DeleteCustomer/:id', AuthVerifyMiddleware, DeleteCustomer)

// Suppliers
router.post('/CreateSuppliers', AuthVerifyMiddleware, CreateSuppliers)
router.post('/UpdateSuppliers/:id', AuthVerifyMiddleware, UpdateSuppliers)
router.get('/SuppliersList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, SuppliersList)
router.get('/SuppliersDropDown', AuthVerifyMiddleware, SuppliersDropDown)
router.get('/SuppliersDetailsByID/:id', AuthVerifyMiddleware, SuppliersDetailsByID)
router.delete('/DeleteSuppliers/:id', AuthVerifyMiddleware, DeleteSuppliers)

// Expense Types
router.post('/CreateExpensesTypes', AuthVerifyMiddleware, CreateExpensesTypes)
router.post('/UpdateExpensesTypes/:id', AuthVerifyMiddleware, UpdateExpensesTypes)
router.get('/ExpensesTypesList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, ExpensesTypesList)
router.get('/ExpensesTypesDropDown', AuthVerifyMiddleware, ExpensesTypesDropDown)
router.get('/ExpensesTypesDetailsByID/:id', AuthVerifyMiddleware, ExpensesTypesDetailsByID)
router.delete('/DeleteExpenseTypes/:id', AuthVerifyMiddleware, DeleteExpenseTypes)


// Expense
router.post('/CreateExpenses', AuthVerifyMiddleware, CreateExpenses)
router.post('/UpdateExpenses/:id', AuthVerifyMiddleware, UpdateExpenses)
router.get('/ExpensesList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, ExpensesList)
router.get('/ExpensesDetailsByID/:id', AuthVerifyMiddleware, ExpensesDetailsByID)
router.delete('/DeleteExpense/:id', AuthVerifyMiddleware, DeleteExpense)

// Products
router.post('/CreateProducts', AuthVerifyMiddleware, CreateProducts)
router.post('/UpdateProducts/:id', AuthVerifyMiddleware, UpdateProducts)
router.get('/ProductsList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, ProductsList)
router.get('/ProductsDropDown', AuthVerifyMiddleware, ProductsDropDown)
router.get('/ProductsDetailsByID/:id', AuthVerifyMiddleware, ProductsDetailsByID)
router.delete('/DeleteProduct/:id', AuthVerifyMiddleware, DeleteProduct)

// Purchase
router.post('/CreatePurchases', AuthVerifyMiddleware, CreatePurchases)
router.get('/PurchasesList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, PurchasesList)
router.delete('/PurchasesDelete/:id', AuthVerifyMiddleware, PurchasesDelete)


// Sales
router.post('/CreateSales', AuthVerifyMiddleware, CreateSales)
router.get('/SalesList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, SalesList)
router.delete('/SaleDelete/:id', AuthVerifyMiddleware, SaleDelete)


// Returns
router.post('/CreateReturns', AuthVerifyMiddleware, CreateReturns)
router.get('/ReturnsList/:pageNo/:perPage/:searchKeyword', AuthVerifyMiddleware, ReturnsList)
router.delete('/ReturnDelete/:id', AuthVerifyMiddleware, ReturnDelete)


// Report
router.post('/ExpensesByDate', AuthVerifyMiddleware, ExpensesByDate)
router.post('/PurchaseByDate', AuthVerifyMiddleware, PurchaseByDate)
router.post('/ReturnByDate', AuthVerifyMiddleware, ReturnByDate)
router.post('/SalesByDate', AuthVerifyMiddleware, SalesByDate)


// Summary
router.get('/ExpensesSummary', AuthVerifyMiddleware, ExpensesSummary)
router.get('/ReturnSummary', AuthVerifyMiddleware, ReturnSummary)
router.get('/PurchaseSummary', AuthVerifyMiddleware, PurchaseSummary)
router.get('/SalesSummary', AuthVerifyMiddleware, SalesSummary)

module.exports = router

