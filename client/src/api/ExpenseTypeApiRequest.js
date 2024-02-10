import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { OnChangeExpenseTypeInput, ResetExpenseTypeFormValue, SetExpenseTypeList, SetExpenseTypeListTotal } from "../redux/state-slice/expensetype-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Expense Type Create Request
export const ExpenseTypeCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateExpensesTypes'

        if (ObjectID !== 0) {
            URL = BaseURL + '/UpdateExpensesTypes/'+ObjectID
        }
        const res = await axios.post(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast(' Request Successfull.')
            store.dispatch(ResetExpenseTypeFormValue())
            return true
        } 
        else if(res.status === 200 && res.data['status'] === 'fail') {
            if (res.data['data']['keyPattern']['Name'] === 1) {
                ErrorToast('Expense Type Name Already Exits.')
                return false
            }
        }
        else {
            ErrorToast('Request Failed !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }

}

// Expense Type List Request
export const ExpenseTypeListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ExpensesTypesList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetExpenseTypeList(res.data['data'][0]['Rows']))
                store.dispatch(SetExpenseTypeListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetExpenseTypeList([]))
                store.dispatch(SetExpenseTypeListTotal(0))
                ErrorToast('No Data Found')
                return false
            }
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


// Expense Type Fill Request
export const FillExpenseTypeFormRequest = async ( ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ExpensesTypesDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeExpenseTypeInput({Name: 'Name', Value: FormValue['Name']}))
            return true
        } else {
            ErrorToast('Request Failed ! Try Again')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}

// Expense Type Delete Request
export const ExpenseTypeDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteExpenseTypes/' + ObjectID
        const res = await axios.delete(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'associate') {
            ErrorToast(res.data['data'])
            return false
        } 
        else if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull.')
            return true
        }
        else {
            ErrorToast('Request Failed ! Try Again ')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}