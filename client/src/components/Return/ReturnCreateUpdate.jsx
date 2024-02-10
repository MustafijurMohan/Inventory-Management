import React, { useEffect, useRef } from 'react'
import { BsCartCheck, BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store/store'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { OnChangeReturnInput, RemoveReturnItem, SetReturnItemList } from '../../redux/state-slice/return-slice'
import { CreateReturnRequest, ReturnCustomerDropDownRequest, ReturnProductDropDownRequest } from '../../api/ReturnApiRequest'

const ReturnCreateUpdate = () => {


  let productRef, qtyRef, unitPriceRef = useRef()

  let CustomerDropDown = useSelector((state) => state.return.CustomerDropDown)
  let ProductDropDown = useSelector((state) => state.return.ProductDropDown)
  let ReturnFormValue = useSelector((state) => state.return.ReturnFormValue)
  let ReturnItemList = useSelector((state) => state.return.ReturnItemList)
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      await ReturnCustomerDropDownRequest()
      await ReturnProductDropDownRequest()
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
      store.dispatch(SetReturnItemList(item))
    }
  }
  
  // Remove Cart
  const removeCart = (i) => {
    store.dispatch(RemoveReturnItem(i))
  }

  // Create Return
  const CreateNewReturn = async () => {
    if(IsEmpty(ReturnFormValue.CustomerID)) {
      ErrorToast('Customer Name Required !')
    }
    else if(IsEmpty(ReturnFormValue.VatTax)) {
      ErrorToast('VatTax Required !')
    }
    else if(IsEmpty(ReturnFormValue.Discount)) {
      ErrorToast('Discount Required !')
    }
    else if(IsEmpty(ReturnFormValue.OtherCost)) {
      ErrorToast('OtherCost Required !')
    }
    else if(IsEmpty(ReturnFormValue.ShippingCost)) {
      ErrorToast('ShippingCost Required !')
    }
    else if(IsEmpty(ReturnFormValue.GrandTotal)) {
      ErrorToast('GrandTotal Required !')
    }
    else if(IsEmpty(ReturnFormValue.Note)) {
      ErrorToast('Note Required !')
    }

    else {
      await CreateReturnRequest(ReturnFormValue, ReturnItemList)
      navigate('/ReturnListPage')
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
                  <h5>Create Return</h5>
                  <hr className='bg-light' />

                  <div className="col-12 p-1">
                    <label htmlFor=""> Select Customer</label>
                    <select onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'CustomerID', Value: e.target.value}))}} value={ReturnFormValue.CustomerID} className='form-select form-select-sm animated fadeInUp' >
                      <option value="">Select Type</option>
                      {
                        CustomerDropDown.map((item, i) => (
                            <option key={i.toString()} value={item._id} >{item.CustomerName}</option>
                          )
                        )
                      }
                    </select>
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Vat/Tax</label>
                    <input onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'VatTax', Value: e.target.value}))}} value={ReturnFormValue.VatTax} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Discount</label>
                    <input onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'Discount', Value: e.target.value}))}} value={ReturnFormValue.Discount} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Other Cost</label>
                    <input onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'OtherCost', Value: e.target.value}))}} value={ReturnFormValue.OtherCost} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Shipping Cost</label>
                    <input onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'ShippingCost', Value: e.target.value}))}} value={ReturnFormValue.ShippingCost} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Grand Total</label>
                    <input onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'GrandTotal', Value: e.target.value}))}} value={ReturnFormValue.GrandTotal} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-12 p-1">
                    <label htmlFor="">Note</label>
                    <input onChange={(e) => {store.dispatch(OnChangeReturnInput({Name: 'Note', Value: e.target.value}))}} value={ReturnFormValue.Note} type="text" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <button onClick={CreateNewReturn} className='btn btn-success btn-sm my-3 animated fadeInUp' >Create</button>
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
                            ReturnItemList.map((item, i) => {
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

export default ReturnCreateUpdate