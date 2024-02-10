import React, { useEffect, useState } from 'react'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import store from '../../redux/store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CategoryCreateRequest, FillCategoryFormRequest } from '../../api/CategoryApiRequest'
import { OnChangeCategoryInput } from '../../redux/state-slice/category-slice'

const CategoryCreateUpdate = () => {


  let [ObjectID,SetObjectID]=useState(0)
  let FormValue = useSelector((state) => state.category.FormValue)
  const navigate = useNavigate()

  useEffect(()=>{
    let params= new URLSearchParams(window.location.search);
    let id=params.get('id');
    if(id!==null){
        SetObjectID(id);
        (async () => {
            await FillCategoryFormRequest(id);
        })();
    }
},[])
  


  const SaveChange = async () => {
    if(IsEmpty(FormValue.Name)) {
      ErrorToast('Category Name Required !')
    } else {
      if (await CategoryCreateRequest(FormValue, ObjectID)) {
        navigate('/CategoryListPage')
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
                  <h5>Save Category</h5>
                  <hr className='bg-light'/>

                  <div className="col-4 p-2">
                    <label htmlFor="">Category Name</label>
                    <input onChange={(e) => store.dispatch(OnChangeCategoryInput({Name: 'Name', Value: e.target.value}))} value={FormValue.Name} type="text" className='form-control animated fadeInUp' />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4 p-2">
                    <button onClick={SaveChange} className='btn btn-success my-2 animated fadeInUp' >Save Change</button>
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

export default CategoryCreateUpdate