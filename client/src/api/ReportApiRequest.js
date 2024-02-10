import axios from 'axios'
import { ErrorToast } from "../helper/FormHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { getToken } from '../helper/SessionHelper'
import { SetExpensesByDateList, SetPurchaseByDateList, SetReturnByDateList, SetSalesByDateList } from '../redux/state-slice/report-slice'
const AxiosHeader = {headers: {'token': getToken()}}


// Expense Date Request
export const ExpenseByDateRequest = async (FormDate, ToDate) => {
    try {
        store.dispatch(ShowLoader())
        let PostBody = {"FormDate":FormDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let URL = BaseURL + '/ExpensesByDate'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetExpensesByDateList(res.data['data']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}

// Sales Date Request
export const SalesByDateRequest = async (FormDate, ToDate) => {
    try {
        store.dispatch(ShowLoader())
        let PostBody = {"FormDate":FormDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let URL = BaseURL + '/SalesByDate'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetSalesByDateList(res.data['data']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}


// Purchase Date Request
export const PurchaseByDateRequest = async (FormDate, ToDate) => {
    try {
        store.dispatch(ShowLoader())
        let PostBody = {"FormDate":FormDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let URL = BaseURL + '/PurchaseByDate'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetPurchaseByDateList(res.data['data']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}

// Return Date Request
export const ReturnByDateRequest = async (FormDate, ToDate) => {
    try {
        store.dispatch(ShowLoader())
        let PostBody = {"FormDate":FormDate+"T00:00:00.000+00:00","ToDate":ToDate+"T00:00:00.000+00:00"}
        let URL = BaseURL + '/ReturnByDate'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            store.dispatch(SetReturnByDateList(res.data['data']))
            return true
        } else {
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}