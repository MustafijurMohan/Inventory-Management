import React, { useRef } from 'react'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { PurchaseByDateRequest } from '../../api/ReportApiRequest'
import CurrencyFormat from 'react-currency-format'
import exportFromJSON from 'export-from-json'
import moment from 'moment'
import { useSelector } from 'react-redux'

const PurchaseReport = () => {


  let fromRef, toRef =  useRef()
  let DataList = useSelector((state) => state.report.PurchaseByDateList)


  const CreateReport = async () => {
    let fromRefValue = fromRef.value
    let toRefValue = toRef.value

    if(IsEmpty(fromRefValue)) {
      ErrorToast('From Date Required !')
    }
    else if(IsEmpty(toRefValue)) {
      ErrorToast('To Date Required !')
    }

    else {
      await PurchaseByDateRequest(fromRefValue, toRefValue)
    }

  }


  // Download Function
  const OnExport = (exportType, data) => {
    const fileName = 'ExpenseReport'
    if(data.length > 0) {
      let ReportData = []
      data.map((item) => {
        let listItem = {
          "Amount": item['Amount'],
          "Note": item['Note'],
          "Category": item['Category'],
          "Date": moment(item['CreatedDate']).format('MMMM Do YYYY')
        }
        ReportData.push(listItem)
      })
      exportFromJSON({data: ReportData, fileName: fileName, exportType: exportType})
    }
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5>Purchase Report By Date</h5>
                  <hr className='bg-light' />

                  <div className="col-4 p-2">
                    <label htmlFor="">From Date : </label>
                    <input ref={(input) => fromRef=input } type="date" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                  <div className="col-4 p-2">
                    <label htmlFor="">To Date : </label>
                    <input ref={(input) => toRef=input }  type="date" className='form-control form-control-sm animated fadeInUp' />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <button onClick={CreateReport} className='btn btn-success btn-sm my-3 animated fadeInUp' >Create</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            DataList.length > 0 ? (

              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col">
                        <h6>Total: {DataList[0]['Total'].length > 0 ? <CurrencyFormat value={DataList[0]['Total'][0]['TotalAmount']} displayType='text' thousandSeparator={true} prefix='$' /> : 0 } </h6>
                        <button onClick={OnExport.bind(this, 'csv', DataList[0]['Rows'])} className='btn btn-success btn-sm my-3 animated fadeInUp' >Download CSV</button>
                        <button onClick={OnExport.bind(this, 'xls', DataList[0]['Rows'])} className='btn btn-success btn-sm my-3 ms-3 animated fadeInUp' >Download XLS</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ):(
              <div></div>
            )
          }


        </div>
      </div>
    </>
  )
}

export default PurchaseReport