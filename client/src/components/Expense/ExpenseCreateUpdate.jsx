import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { ExpenseCreateRequest, ExpenseTypeDropDownRequest, FillExpenseFormRequest } from '../../api/ExpenseApiRequest'
import store from '../../redux/store/store'
import { OnChangeExpenseInput } from '../../redux/state-slice/expense-slice'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { useNavigate } from 'react-router-dom'


const ExpenseCreateUpdate = () => {


let ExpenseTypeDropDown = useSelector((state) => state.expense.ExpenseTypeDropDown)
let FormValue = useSelector((state) => state.expense.FormValue)
const navigate = useNavigate()
let [ObjectID,SetObjectID]=useState(0);



useEffect(() => {
  (async () => {
    await ExpenseTypeDropDownRequest()
  })()

  let params= new URLSearchParams(window.location.search);
  let id=params.get('id');
  if(id!==null){
      SetObjectID(id);
      (async () => {
         await FillExpenseFormRequest(id)
      })();
  }

}, [])

const SaveChange = async () => {
  if(IsEmpty(FormValue.TypeID)) {
    ErrorToast('Expense Type Required !')
  }
  else if(FormValue.Amount === 0) {
    ErrorToast('Expense Amount Required !')
  } 
  else {
    if(await ExpenseCreateRequest(FormValue, ObjectID)) {
        navigate('/ExpenseListPage')
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
                  <h5>Save Expense</h5>
                  <hr className='bg-light' />

                  <div className="col-4 p-2">
                    <label htmlFor="">Expense Type</label>
                    <select onChange={(e) => store.dispatch(OnChangeExpenseInput({Name: 'TypeID', Value: e.target.value}))} value={FormValue.TypeID} className='form-select form-select-sm animated fadeInUp'>
                      <option value="">Select type</option>
                      {
                        ExpenseTypeDropDown.map((item, i) => {
                          return (
                            <option key={i.toString()} value={item._id} >{item.Name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="">Expense Amount</label>
                    <input onChange={(e) => store.dispatch(OnChangeExpenseInput({Name: 'Amount', Value: parseInt( e.target.value)}))} value={FormValue.Amount} type="number" className='form-control form-control-sm animated fadeInUp'  />
                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="">Expense Note</label>
                    <input onChange={(e) => store.dispatch(OnChangeExpenseInput({Name: 'Note', Value: e.target.value}))} value={FormValue.Note} type="text" className='form-control form-control-sm animated fadeInUp'  />
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

export default ExpenseCreateUpdate