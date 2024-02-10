import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { SetProductList, SetProductListTotal, ResetProductFormValue, SetProductCategoryDropDown, SetProductBrandDropDown, OnChangeProductInput} from "../redux/state-slice/product-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Product Create Request
export const ProductCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateProducts' 
        if(ObjectID !== 0) {
            URL = BaseURL + '/UpdateProducts/' + ObjectID
        }
        const res = await axios.post(URL, PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast('Request Successfull.')
            store.dispatch(ResetProductFormValue())
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

// Product Category Drop Down Request
export const ProductCatagoryDropDownRequest = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/CategoriesDropDown'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'].length > 0) {
                store.dispatch(SetProductCategoryDropDown(res.data['data']))
                return true
            } else {
                store.dispatch(SetProductCategoryDropDown([]))
                ErrorToast('No Product Category Found !')
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

// Product Brand Drop Down Request
export const ProductBrandDropDownRequest = async () => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/BrandDropDown'
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'].length > 0) {
                store.dispatch(SetProductBrandDropDown(res.data['data']))
                return true
            } else {
                store.dispatch(SetProductBrandDropDown([]))
                ErrorToast('No Product Brand Found !')
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


// Product List Request
export const ProductListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ProductsList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetProductList(res.data['data'][0]['Rows']))
                store.dispatch(SetProductListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetProductList([]))
                store.dispatch(SetProductListTotal(0))
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

// Fill Expense Form Request
export const FillProductFormRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/ProductsDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())


        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeProductInput({Name: 'CategoryID', Value: FormValue['CategoryID']}))
            store.dispatch(OnChangeProductInput({Name: 'BrandID', Value: FormValue['BrandID']}))
            store.dispatch(OnChangeProductInput({Name: 'Name', Value: FormValue['Name']}))
            store.dispatch(OnChangeProductInput({Name: 'Unit', Value: FormValue['Unit']}))
            store.dispatch(OnChangeProductInput({Name: 'Details', Value: FormValue['Details']}))
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


// Product Delete Request
export const ProductDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteProduct/' + ObjectID
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