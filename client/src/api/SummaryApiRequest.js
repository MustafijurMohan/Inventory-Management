import axios from 'axios'
import { ErrorToast } from "../helper/FormHelper"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { BaseURL } from '../helper/config'
import { getToken } from '../helper/SessionHelper'
import { SetExpenseChart, SetExpenseTotal, SetPurchaseChart, SetPurchaseTotal, SetReturnChart, SetReturnTotal, SetSaleChart, SetSaleTotal } from '../redux/state-slice/dashboard-slice'

const AxiosHeader = {headers: {'token': getToken()}}


// Expense Summary
export const ExpenseSummary = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ExpensesSummary'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetExpenseChart(res.data['data'][0]['Last30Days']))
            store.dispatch(SetExpenseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}


// Return Summary
export const ReturnSummary = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ReturnSummary'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetReturnChart(res.data['data'][0]['Last30Days']))
            store.dispatch(SetReturnTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}


// Sale Summary
export const SaleSummary = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/SalesSummary'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetSaleChart(res.data['data'][0]['Last30Days']))
            store.dispatch(SetSaleTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}


// Purchase Summary
export const PurchaseSummary = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/PurchaseSummary'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetPurchaseChart(res.data['data'][0]['Last30Days']))
            store.dispatch(SetPurchaseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        store.dispatch(HideLoader())
        ErrorToast('Something Went Wrong !')
        return false
    }
}