import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import store from '../../redux/store/store'
import { ErrorToast, IsEmail, IsEmpty, IsMobile } from '../../helper/FormHelper'
import {useNavigate} from 'react-router-dom'
import { FillSupplierFormRequest, SupplierCreateRequest } from '../../api/SupplierApiRequest'
import { OnChangeSupplierInput } from '../../redux/state-slice/supplier-slice'

const SupplierCreateUpdate = () => {

  let FormValue = useSelector((state) => state.supplier.FormValue)
  let navigate = useNavigate()
  let [ObjectID,SetObjectID]=useState(0);

  useEffect(()=>{
    let params= new URLSearchParams(window.location.search);
    let id=params.get('id');
    if(id!==null){
        SetObjectID(id);
        (async () => {
            await FillSupplierFormRequest(id);
        })();
    }
},[])


  const SaveChange = async () => {

    if (IsEmpty(FormValue.Name)) {
      ErrorToast('Supplier Name Required !')
    }
    else if (IsMobile(FormValue.Phone)) {
      ErrorToast('Supplier Phone Number Required !')
    }
    else if (IsEmail(FormValue.Email)) {
      ErrorToast('Valid Email Address Required !')
    }

    else {
      if (await SupplierCreateRequest(FormValue,ObjectID)) {
        navigate('/SupplierListPage')
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
                  <h5>Save Supplier</h5>
                  <hr className='bg-light' />

                  <div className="col-4 p-2">
                    <label htmlFor="">Supplier Name</label>
                    <input onChange={(e) => store.dispatch(OnChangeSupplierInput({Name: 'Name', Value: e.target.value}))} value={FormValue.Name} type="text" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="">Mobile No</label>
                    <input onChange={(e) => store.dispatch(OnChangeSupplierInput({Name: 'Phone', Value: e.target.value}))} value={FormValue.Phone} type="number" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="">Email</label>
                    <input onChange={(e) => store.dispatch(OnChangeSupplierInput({Name: 'Email', Value: e.target.value}))} value={FormValue.Email} type="email" className='form-control form-control-sm animated fadeInUp' />
                  </div>

                  <div className="col-12 p-2">
                    <label htmlFor="">Address</label>
                    <textarea onChange={(e) => store.dispatch(OnChangeSupplierInput({Name: 'Address', Value: e.target.value}))} value={FormValue.Address} className='form-control form-control-sm animated fadeInUp' rows="5"></textarea>
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

export default SupplierCreateUpdate