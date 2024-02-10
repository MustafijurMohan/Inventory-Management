import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { OnChangeSupplierInput, ResetSupplierFormValue, SetSupplierList, SetSupplierListTotal } from "../redux/state-slice/supplier-slice"

const AxiosHeader = {headers: {'token': getToken()}}



// Supplier Create Request
export const SupplierCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateSuppliers'

        if (ObjectID !== 0) {
            URL = BaseURL + '/UpdateSuppliers/'+ObjectID
        }
        const res = await axios.post(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast(' Request Successfull.')
            store.dispatch(ResetSupplierFormValue())
            return true
        } 
        else if(res.status === 200 && res.data['status'] === 'fail') {
            if (res.data['data']['keyPattern']['Phone'] === 1) {
                ErrorToast('Mobile Number Already Exits.')
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

// Supplier List Request
export const SupplierListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/SuppliersList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetSupplierList(res.data['data'][0]['Rows']))
                store.dispatch(SetSupplierListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetSupplierList([]))
                store.dispatch(SetSupplierListTotal(0))
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


// Supplier Fill Request
export const FillSupplierFormRequest = async ( ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/SuppliersDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeSupplierInput({Name: 'Name', Value: FormValue['Name']}))
            store.dispatch(OnChangeSupplierInput({Name: 'Phone', Value: FormValue['Phone']}))
            store.dispatch(OnChangeSupplierInput({Name: 'Email', Value: FormValue['Email']}))
            store.dispatch(OnChangeSupplierInput({Name: 'Address', Value: FormValue['Address']}))
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

// Supplier Delete Request
export const SupplierDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteSuppliers/' + ObjectID
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
