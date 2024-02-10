import React, { useEffect, useRef } from 'react'
import { BsCartCheck, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store/store'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { OnChangePurchaseInput, RemovePurchaseItem, SetPurchaseItemList } from '../../redux/state-slice/purchase-slice'
import { CreatePurchaseRequest, PurchaseProductDropDownRequest, PurchaseSupplierDropDownRequest } from '../../api/PurchaseApiRequest'

const PurchaseCreateUpdate = () => {

  let productRef, qtyRef, unitPriceRef = useRef()

  let SupplierDropDown = useSelector((state) => state.purchase.SupplierDropDown)
  let ProductDropDown = useSelector((state) => state.purchase.ProductDropDown)
  let PurchaseFormValue = useSelector((state) => state.purchase.PurchaseFormValue)
  let PurchaseItemList = useSelector((state) => state.purchase.PurchaseItemList)
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      await PurchaseSupplierDropDownRequest()
      await PurchaseProductDropDownRequest()
    })()
  }, [])

// Create Child 
  const OnAddCart = async () => {
    let productValue = productRef.value
    let productName = productRef.selectedOptions[0].text
    let qtyValue = qtyRef.value
    let unitPriceValue = unitPriceRef.value

    if(IsEmpty(productValue)) {
      ErrorToast('Product Name Required !')
    }
    else if(IsEmpty(qtyValue)) {
      ErrorToast('Quanty Required !')
    }
    else if(IsEmpty(unitPriceValue)) {
      ErrorToast('Unit Price Required !')
    }
    else {
      let item = {
        "ProductID" : productValue,
        "ProductName" : productName,
        "Qty": qtyValue,
        "UnitCost": unitPriceValue,
        "Total": (parseInt(qtyValue)) * (parseInt(unitPriceValue))
      }
      store.dispatch(SetPurchaseItemList(item))
    }
  }
  
  // Remove Cart
  const removeCart = (i) => {
    store.dispatch(RemovePurchaseItem(i))
  }

  // Create Purchase
  const CreateNewPurchase = async () => {
    if(IsEmpty(PurchaseFormValue.SupplierID)) {
      ErrorToast('Supplier Name Required !')
    }
    else if(IsEmpty(PurchaseFormValue.VatTax)) {
      ErrorToast('VatTax Required !')
    }
    else if(IsEmpty(PurchaseFormValue.Discount)) {
      ErrorToast('Discount Required !')
    }
    else if(IsEmpty(PurchaseFormValue.OtherCost)) {
      ErrorToast('OtherCost Required !')
    }
    else if(IsEmpty(PurchaseFormValue.ShippingCost)) {
      ErrorToast('ShippingCost Required !')
    }
    else if(IsEmpty(PurchaseFormValue.GrandTotal)) {
      ErrorToast('GrandTotal Required !')
    }
    else if(IsEmpty(PurchaseFormValue.Note)) {
      ErrorToast('Note Required !')
    }

    else {
      await CreatePurchaseRequest(PurchaseFormValue, PurchaseItemList)
      navigate('/PurchaseListPage')
    }
  }



  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="row">
                  <h5>Create Purchase</h5>
                  <hr className='bg-light' />

                  <div className="col-12 p-1">
                    <label htmlFor=""> Select Supplier</label>
                    <select onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'SupplierID', Value: e.target.value}))}} value={PurchaseFormValue.SupplierID} className='form-select form-select-sm animated fadeInUp' >
                      <option value="">Select Type</option>
                      {
                        SupplierDropDown.map((item, i) => (
                            <option key={i.toString()} value={item._id} >{item.Name}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Vat/Tax</label>
                    <input onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'VatTax', Value: e.target.value}))}} value={PurchaseFormValue.VatTax} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Discount</label>
                    <input onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'Discount', Value: e.target.value}))}} value={PurchaseFormValue.Discount} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Other Cost</label>
                    <input onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'OtherCost', Value: e.target.value}))}} value={PurchaseFormValue.OtherCost} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Shipping Cost</label>
                    <input onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'ShippingCost', Value: e.target.value}))}} value={PurchaseFormValue.ShippingCost} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Grand Total</label>
                    <input onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'GrandTotal', Value: e.target.value}))}} value={PurchaseFormValue.GrandTotal} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Note</label>
                    <input onChange={(e) => {store.dispatch(OnChangePurchaseInput({Name: 'Note', Value: e.target.value}))}} value={PurchaseFormValue.Note} type="text" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <button onClick={CreateNewPurchase} className='btn btn-success btn-sm my-3 animated fadeInUp' >Create</button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="col-12 col-md-8 col-lg-8 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-6 p-1">
                    <label htmlFor="">Select Product</label>
                    <select ref={(input) => productRef=input} className='form-select form-select-sm animated fadeInUp' >
                      <option value="">Select Product</option>
                      {
                        ProductDropDown.map((item, i) => (
                          <option key={i.toString()} value={item._id} >{item.Name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="col-2 p-1">
                    <label htmlFor="">Qty</label>
                    <input ref={(input) => qtyRef=input} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-2 p-1">
                    <label htmlFor="">Unit Price</label>
                    <input ref={(input) => unitPriceRef=input} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-2 p-1">
                    <label htmlFor="">Add to Cart</label>
                    <button onClick={OnAddCart} className='btn btn-success btn-sm animated fadeInUp'><BsCartCheck/></button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive">
                      <table className='table table-sm text-center'>
                        <thead className='sticky-top bg-white'>
                          <tr>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Total</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            PurchaseItemList.map((item, i) => {
                              return (
                                <tr key={i.toString()}>
                                  <th>{item.ProductName}</th>
                                  <th>{item.Qty}</th>
                                  <th>{item.UnitCost}</th>
                                  <th>{item.Total}</th>
                                  <th><button onClick={removeCart.bind(this, i)} className='btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2' ><BsTrash /></button></th>
                                </tr> 
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  )
}

export default PurchaseCreateUpdate