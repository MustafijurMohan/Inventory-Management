import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { OnChangeExpenseInput, ResetExpenseFormValue, SetExpenseList, SetExpenseListTotal, SetExpenseTypeDropDown } from "../redux/state-slice/expense-slice"

const AxiosHeader = {headers: {'token': getToken()}}



// Expense List Request
export const ExpenseListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ExpensesList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetExpenseList(res.data['data'][0]['Rows']))
                store.dispatch(SetExpenseListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetExpenseList([]))
                store.dispatch(SetExpenseListTotal(0))
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

// Expense Drop Down Request
export const ExpenseTypeDropDownRequest = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ExpensesTypesDropDown'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'].length > 0) {
                store.dispatch(SetExpenseTypeDropDown(res.data['data']))
                return true
            } else {
                store.dispatch(SetExpenseTypeDropDown([]))
                ErrorToast('No Expense Type Found !')
                return false
            }
        } else {
            store.dispatch(HideLoader())
            return false
        }

    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}


// Expense Create Request
export const ExpenseCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateExpenses' 
        if(ObjectID !== 0) {
            URL = BaseURL + '/UpdateExpenses/' + ObjectID
        }
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull.')
            store.dispatch(ResetExpenseFormValue())
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

// Fill Expense Form Request
export const FillExpenseFormRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ExpensesDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())


        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeExpenseInput({Name: 'TypeID', Value: FormValue['TypeID']}))
            store.dispatch(OnChangeExpenseInput({Name: 'Amount', Value: FormValue['Amount']}))
            store.dispatch(OnChangeExpenseInput({Name: 'Note', Value: FormValue['Note']}))
            return true
        } else {
            ErrorToast('Request Faild ! Try Again')
            return false
        }

    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}

// Expense Delete Request
export const ExpenseDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteExpense/'+ObjectID
        const res = await axios.delete(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull.')
            return true
        } else {
            ErrorToast('Request Failed ! Try Again ')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}