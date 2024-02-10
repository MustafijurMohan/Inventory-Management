import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { ResetPurchaseFormValue, SetProductDropDown, SetPurchaseList, SetPurchaseListTotal, SetSupplierDropDown } from "../redux/state-slice/purchase-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Purchase List Request
export const PurchaseListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/PurchasesList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetPurchaseList(res.data['data'][0]['Rows']))
                store.dispatch(SetPurchaseListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetPurchaseList([]))
                store.dispatch(SetPurchaseListTotal(0))
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

// Purchase Supplier Drop Down Request
export const PurchaseSupplierDropDownRequest = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/SuppliersDropDown'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'].length > 0) {
                store.dispatch(SetSupplierDropDown(res.data['data']))
                return true
            } else {
                store.dispatch(SetSupplierDropDown([]))
                ErrorToast('No Supplier Data Found !')
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

// Purchase Product Drop Down Request
export const PurchaseProductDropDownRequest = async () => {
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

// Create Purchase Request
export const CreatePurchaseRequest = async (ParentBody, ChildsBody) => {
    try {
        store.dispatch(ShowLoader())
        const PostBody = {'Parent': ParentBody, 'Childs': ChildsBody}
        const URL = BaseURL + '/CreatePurchases'
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull !')
            store.dispatch(ResetPurchaseFormValue())
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