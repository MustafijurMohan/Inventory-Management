import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { OnChangeCustomerInput, ResetCustomerFormValue, SetCustomerList, SetCustomerListTotal } from "../redux/state-slice/customer-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Customer Create Request
export const CustomerCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateCustomers'

        if (ObjectID !== 0) {
            URL = BaseURL + '/UpdateCustomers/'+ObjectID
        }
        const res = await axios.post(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast(' Request Successfull.')
            store.dispatch(ResetCustomerFormValue())
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

// Customer List Request
export const CustomerListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/CustomersList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetCustomerList(res.data['data'][0]['Rows']))
                store.dispatch(SetCustomerListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetCustomerList([]))
                store.dispatch(SetCustomerListTotal(0))
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

// Customer Fill Request
export const FillCustomerFormRequest = async ( ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/CustomersDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeCustomerInput({Name: 'CustomerName', Value: FormValue['CustomerName']}))
            store.dispatch(OnChangeCustomerInput({Name: 'Phone', Value: FormValue['Phone']}))
            store.dispatch(OnChangeCustomerInput({Name: 'Email', Value: FormValue['Email']}))
            store.dispatch(OnChangeCustomerInput({Name: 'Address', Value: FormValue['Address']}))
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

// Customer Delete Request
export const CustomerDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteCustomer/' + ObjectID
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