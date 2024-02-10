import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import moment from 'moment'
import CurrancyFormat from 'react-currency-format'
import { AiOutlineEye } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { ReturnListRequest } from '../../api/ReturnApiRequest';

const ReturnList = () => {

  const [searchKeyword, setSearchKeyword] = useState('0')
  const [perPage, setPerPage] = useState(20)

  useEffect(() => {
    (async () => {
      await ReturnListRequest(1, perPage, searchKeyword)
    })()
  }, [])

  const DataList = useSelector((state) => state.return.List)
  const Total = useSelector((state) => state.return.ListTotal)


  const handlePageClick = async (e) => {
    let pageNo = e.selected
    await ReturnListRequest(pageNo + 1, perPage, searchKeyword)
  }

  const perPageOnChange = async (e) => {
    setPerPage(parseInt(e.target.value))
    await ReturnListRequest(1, e.target.value, searchKeyword)
  }

  const searchKeywordOnChange = async (e) => {
    setSearchKeyword(e.target.value)
    if ((e.target.value).length === 0) {
      setSearchKeyword('0')
      await ReturnListRequest(1, perPage, '0')
    }
  }

  const searchData = async () => {
    await ReturnListRequest(1, perPage, searchKeyword)
  }

  const TextSearch = (e) => {
    const rows = document.querySelectorAll('tbody, tr')
    rows.forEach(row => {
      row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
    })
  }


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">

                  <div className="row">
                    <div className="col-4">
                      <h5>Return List</h5>
                    </div>

                    <div className="col-2">
                      <input onKeyUp={TextSearch} type="text" placeholder='Text Filter' className='form-control form-control-sm animated fadeInUp' />
                    </div>
                    <div className="col-2">
                      <select onChange={perPageOnChange} className="form-control mx-2 form-select-sm form-select form-control-sm animated fadeInUp">
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="100">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <div className="input-group">
                        <input onChange={searchKeywordOnChange} type="text" className="form-control form-control-sm animated fadeInUp" placeholder="Search.." />
                        <button onClick={searchData} className="btn  btn-success btn-sm mb-0 animated fadeInUp" type='button'>Search</button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive table-section">
                        <table className='table'>
                          <thead className='sticky-top bg-white'>
                            <tr>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Grand Total</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shipping Cost</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Vat/Tax</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Other Cost</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Discount</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                            </tr>
                          </thead>

                          <tbody>
                            {
                              DataList.map((item, i) => {
                                return (
                                  <tr key={i.toString()}>
                                    <td><p className="text-xs text-start">{item.customers[0]['CustomerName']}</p></td>
                                    <td><p className="text-xs text-start">
                                      <CurrancyFormat value={item.GrandTotal} displayType='text' thousandSeparator={true} prefix='$' />
                                    </p></td>
                                    <td><p className="text-xs text-start">
                                      <CurrancyFormat value={item.ShippingCost} displayType='text' thousandSeparator={true} prefix='$' />
                                    </p></td>
                                    <td><p className="text-xs text-start">
                                      <CurrancyFormat value={item.VatTax} displayType='text' thousandSeparator={true} prefix='$' />
                                    </p></td>
                                    <td><p className="text-xs text-start">
                                      <CurrancyFormat value={item.OtherCost} displayType='text' thousandSeparator={true} prefix='$' />
                                    </p></td>
                                    <td><p className="text-xs text-start">
                                      <CurrancyFormat value={item.Discount} displayType='text' thousandSeparator={true} prefix='$' />
                                    </p></td>
                                    <td>
                                      <p className="text-xs text-start">{moment(item.CreatedDate).format('MMMM Do YYYY')}</p>
                                    </td>
                                    <td>
                                      <button className="btn btn-outline-light text-success p-2 mb-0 btn-sm ms-2"><AiOutlineEye size={15} /></button>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>

                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label='Page navigation example'>
                        <ReactPaginate 
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={Total/perPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
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

export default ReturnList