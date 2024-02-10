import { createSlice } from "@reduxjs/toolkit";


export const returnSlice = createSlice({
    name: 'return',
    initialState: {
        List: [],
        ListTotal: 0,
        CustomerDropDown: [],
        ProductDropDown: [],
        ReturnItemList: [],
        ReturnFormValue: {
            CustomerID: '',
            VatTax: '',
            Discount: '',
            OtherCost: '',
            ShippingCost: '',
            GrandTotal: '',
            Note: '',
        }
    },
    reducers: {
        SetReturnList : (state, action) => {
            state.List = action.payload
        },
        SetReturnListTotal : (state, action) => {
            state.ListTotal = action.payload
        },
        SetCustomerDropDown: (state, action) => {
            state.CustomerDropDown = action.payload
        },
        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },
        OnChangeReturnInput: (state, action) => {
            state.ReturnFormValue[`${action.payload.Name}`] = action.payload.Value
        },
        ResetReturnFormValue: (state, action) => {
            Object.keys(state.ReturnFormValue).forEach((i) => state.ReturnFormValue[i] = '')
        },
        SetReturnItemList: (state, action) => {
            state.ReturnItemList.push(action.payload)
        },
        RemoveReturnItem: (state, action) => {
            state.ReturnItemList.splice(action.payload, 1)
        }
    }
})

export const {SetReturnList, SetReturnListTotal, SetCustomerDropDown, SetProductDropDown, OnChangeReturnInput, ResetReturnFormValue, SetReturnItemList, RemoveReturnItem} = returnSlice.actions

export default returnSlice.reducer 