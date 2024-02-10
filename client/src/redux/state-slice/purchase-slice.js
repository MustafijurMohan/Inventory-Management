import { createSlice } from "@reduxjs/toolkit";


export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: {
        List: [],
        ListTotal: 0,
        SupplierDropDown: [],
        ProductDropDown: [],
        PurchaseItemList: [],
        PurchaseFormValue: {
            SupplierID: '',
            VatTax: '',
            Discount: '',
            OtherCost: '',
            ShippingCost: '',
            GrandTotal: '',
            Note: '',
        }
    },
    reducers: {
        SetPurchaseList : (state, action) => {
            state.List = action.payload
        },
        SetPurchaseListTotal : (state, action) => {
            state.ListTotal = action.payload
        },
        SetSupplierDropDown: (state, action) => {
            state.SupplierDropDown = action.payload
        },
        SetProductDropDown: (state, action) => {
            state.ProductDropDown = action.payload
        },
        OnChangePurchaseInput: (state, action) => {
            state.PurchaseFormValue[`${action.payload.Name}`] = action.payload.Value
        },
        ResetPurchaseFormValue: (state, action) => {
            Object.keys(state.PurchaseFormValue).forEach((i) => state.PurchaseFormValue[i] = '')
        },
        SetPurchaseItemList: (state, action) => {
            state.PurchaseItemList.push(action.payload)
        },
        RemovePurchaseItem: (state, action) => {
            state.PurchaseItemList.splice(action.payload, 1)
        }
    }
})

export const {SetPurchaseList, SetPurchaseListTotal, SetSupplierDropDown, SetProductDropDown, OnChangePurchaseInput,  ResetPurchaseFormValue, SetPurchaseItemList, RemovePurchaseItem} = purchaseSlice.actions

export default purchaseSlice.reducer