import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FillProductFormRequest, ProductBrandDropDownRequest, ProductCatagoryDropDownRequest, ProductCreateRequest } from '../../api/ProductApiRequest'
import store from '../../redux/store/store'
import { OnChangeProductInput } from '../../redux/state-slice/product-slice'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { useNavigate } from 'react-router-dom'

const ProductCreateUpdate = () => {


let ProductCategoryDropDown = useSelector((state) => state.product.ProductCategoryDropDown)
let ProductBrandDropDown  = useSelector((state) => state.product.ProductBrandDropDown)
let FormValue  = useSelector((state) => state.product.FormValue)
const navigate = useNavigate()

let [ObjectID, SetObjectID] = useState(0);


useEffect(() => {

  (async () => {
    await ProductCatagoryDropDownRequest()
    await ProductBrandDropDownRequest()
  })()

  let params= new URLSearchParams(window.location.search);
  let id= params.get('id');
  if(id !== null){
      SetObjectID(id);
      (async () => {
        await FillProductFormRequest(id)
      })();
  }


  
}, [])



const SaveChange = async () => {
  if(IsEmpty(FormValue.Name)) {
    ErrorToast('Product Name Required !')
  }
  else if(IsEmpty(FormValue.BrandID)) {
    ErrorToast('Product Brand Required !')
  }
  else if(IsEmpty(FormValue.CategoryID)) {
    ErrorToast('Product Category Required !')
  }
  else if(IsEmpty(FormValue.Unit)) {
    ErrorToast('Product Unit Required !')
  }
  else if(IsEmpty(FormValue.Details)) {
    ErrorToast('Product Details Required !')
  } 

  else {
    if (await ProductCreateRequest(FormValue, ObjectID)) {
      navigate('/ProductListPage')
    }
    
  }

}


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5>Save Product</h5>
                  <hr className='bg-light' />

                    <div className="col-4 p-2">
                      <label htmlFor="">Product Name</label>
                      <input onChange={(e) => store.dispatch(OnChangeProductInput({Name: 'Name', Value: e.target.value}))} value={FormValue.Name} type="text" placeholder='Name' className='form-control form-control-sm animated fadeInUp' />
                    </div>
                    
                    <div className="col-4 p-2">
                      <label htmlFor="">Brand Name</label>
                      <select onChange={(e) => store.dispatch(OnChangeProductInput({Name: 'BrandID', Value: e.target.value}))} value={FormValue.BrandID} className='form-select form-select-sm animated fadeInUp'>
                        <option value="">Select Type</option>
                        {
                          ProductBrandDropDown.map((item, i) => {
                            return (
                              <option key={i.toString()} value={item._id} >{item.Name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Category Name</label>
                      <select onChange={(e) => store.dispatch(OnChangeProductInput({Name: 'CategoryID', Value: e.target.value}))} value={FormValue.CategoryID} className='form-select form-select-sm animated fadeInUp'>
                        <option value="">Select Type</option>
                        {
                          ProductCategoryDropDown.map((item, i) => {
                            return (
                              <option key={i.toString()} value={item._id} >{item.Name}</option>
                            )
                          })
                        }
                      </select>
                    </div>

                    <div className="col-4 p-2">
                      <label htmlFor="">Product Unit</label>
                      <input onChange={(e) => store.dispatch(OnChangeProductInput({Name: 'Unit', Value: e.target.value}))} value={FormValue.Unit} type="text" placeholder='Unit' className='form-control form-control-sm animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Product Details</label>
                      <input onChange={(e) => store.dispatch(OnChangeProductInput({Name: 'Details', Value: e.target.value}))} value={FormValue.Details} type="text" placeholder='Details' className='form-control form-control-sm animated fadeInUp' />
                    </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                  <button onClick={SaveChange} className='btn btn-success btn-sm my-3 animated fadeInUp' >Save Change</button>
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

export default ProductCreateUpdate