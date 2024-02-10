import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { ResetSaleFormValue, SetCustomerDropDown, SetProductDropDown, SetSaleList, SetSaleListTotal } from "../redux/state-slice/sale-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Sale List Request
export const SaleListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/SalesList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetSaleList(res.data['data'][0]['Rows']))
                store.dispatch(SetSaleListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetSaleList([]))
                store.dispatch(SetSaleListTotal(0))
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

// Sale Customer Drop Down Request
export const SaleCustomerDropDownRequest = async () => {
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
            ErrorToast('Something Went Wrong !')
            return false
        }
    } catch (error) {
        ErrorToast('Something Went Wrong !')
        store.dispatch(HideLoader())
        return false
    }
}


// Sale Product Drop Down Request
export const SaleProductDropDownRequest = async () => {
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

// Create Sale Request
export const CreateSaleRequest = async (ParentBody, ChildsBody) => {
    try {
        store.dispatch(ShowLoader())
        const PostBody = {'Parent': ParentBody, 'Childs': ChildsBody}
        const URL = BaseURL + '/CreateSales'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull !')
            store.dispatch(ResetSaleFormValue())
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