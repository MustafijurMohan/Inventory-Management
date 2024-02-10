import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { ResetReturnFormValue, SetCustomerDropDown, SetProductDropDown, SetReturnList, SetReturnListTotal } from "../redux/state-slice/return-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Return List Request
export const ReturnListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ReturnsList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetReturnList(res.data['data'][0]['Rows']))
                store.dispatch(SetReturnListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetReturnList([]))
                store.dispatch(SetReturnListTotal(0))
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

// Return Customer Drop Down Request
export const ReturnCustomerDropDownRequest = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/CustomersDropDown'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'].length > 0) {
                store.dispatch(SetCustomerDropDown(res.data['data']))
                return true
            } else {
                store.dispatch(SetCustomerDropDown([]))
                ErrorToast('No Customer Data Found !')
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


// Return Product Drop Down Request
export const ReturnProductDropDownRequest = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ProductsDropDown'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'].length > 0) {
                store.dispatch(SetProductDropDown(res.data['data']))
                return true
            } else {
                store.dispatch(SetProductDropDown([]))
                ErrorToast('No Product Data Found !')
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

// Create Return Request
export const CreateReturnRequest = async (ParentBody, ChildsBody) => {
    try {
        store.dispatch(ShowLoader())
        const PostBody = {'Parent': ParentBody, 'Childs': ChildsBody}
        const URL = BaseURL + '/CreateReturns'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull !')
            store.dispatch(ResetReturnFormValue())
            return true
        } else {
            ErrorToast('Request Failed Try Again !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}