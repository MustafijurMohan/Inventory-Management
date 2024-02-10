import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { OnChangeBrandInput, ResetBrandFormValue, SetBrandList, SetBrandListTotal } from "../redux/state-slice/brand-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Brand Create Request
export const BrandCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateBrand'

        if (ObjectID !== 0) {
            URL = BaseURL + '/UpdateBrand/'+ObjectID
        }
        const res = await axios.post(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast(' Request Successfull.')
            store.dispatch(ResetBrandFormValue())
            return true
        } 
        else if(res.status === 200 && res.data['status'] === 'fail') {
            if (res.data['data']['keyPattern']['Name'] === 1) {
                ErrorToast('Brand Name Already Exits.')
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


// Brand List Request
export const BrandListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/BrandList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetBrandList(res.data['data'][0]['Rows']))
                store.dispatch(SetBrandListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetBrandList([]))
                store.dispatch(SetBrandListTotal(0))
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


// Brand Fill Request
export const FillBrandFormRequest = async ( ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/BrandDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeBrandInput({Name: 'Name', Value: FormValue['Name']}))
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

// Brand Delete Request
export const BrandDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteBrand/' + ObjectID
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