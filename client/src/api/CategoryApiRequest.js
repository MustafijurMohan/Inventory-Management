import axios from "axios"
import { ErrorToast, SuccessToast } from "../helper/FormHelper"
import { getToken } from "../helper/SessionHelper"
import { BaseURL } from "../helper/config"
import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
import store from "../redux/store/store"
import { OnChangeCategoryInput, ResetCategoryFormValue, SetCategoryList, SetCategoryListTotal } from "../redux/state-slice/category-slice"

const AxiosHeader = {headers: {'token': getToken()}}


// Category Create Request
export const CategoryCreateRequest = async (PostBody, ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL + '/CreateCategories'

        if (ObjectID !== 0) {
            URL = BaseURL + '/UpdateCategories/'+ObjectID
        }
        const res = await axios.post(URL,PostBody, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            SuccessToast(' Request Successfull.')
            store.dispatch(ResetCategoryFormValue())
            return true
        } 
        else if(res.status === 200 && res.data['status'] === 'fail') {
            if (res.data['data']['keyPattern']['Name'] === 1) {
                ErrorToast('Category Name Already Exits.')
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


// Category List Request
export const CategoryListRequest = async (pageNo, perPage, searchKeyword) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/CategoriesList/' + pageNo + '/' + perPage + '/' + searchKeyword
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            if (res.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetCategoryList(res.data['data'][0]['Rows']))
                store.dispatch(SetCategoryListTotal(res.data['data'][0]['Total'][0]['Count']))
            } else {
                store.dispatch(SetCategoryList([]))
                store.dispatch(SetCategoryListTotal(0))
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


// Category Fill Request
export const FillCategoryFormRequest = async ( ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/CategoriesDetailsByID/' + ObjectID
        const res = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())

        if (res.status === 200 && res.data['status'] === 'successfull') {
            let FormValue = res.data['data'][0]
            store.dispatch(OnChangeCategoryInput({Name: 'Name', Value: FormValue['Name']}))
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

// Category Delete Request
export const CategoryDeleteRequest = async (ObjectID) => {
    try {
        store.dispatch(ShowLoader())
        const URL = BaseURL + '/DeleteCategories/' + ObjectID
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