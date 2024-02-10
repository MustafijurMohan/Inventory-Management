import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
// import  { Toaster } from 'react-hot-toast';

import DashboardPage from './pages/Dashboard/DashboardPage'
import FullscreenLoader from './components/MasterLayout/FullScreenLoader'
import RegistrationPage from './pages/User/RegistrationPage';
import LoginPage from './pages/User/LoginPage';
import { getToken } from './helper/SessionHelper';
import ProfilePage from './pages/User/ProfilePage';
import SendOTPPage from './pages/User/SendOTPPage';
import VerifyOTPPage from './pages/User/VerifyOTPPage';
import CreatePasswordPage from './pages/User/CreatePasswordPage';
import Page404 from './pages/NotFound/Page404';
import BrandCreateUpdatePage from './pages/Brand/BrandCreateUpdatePage';
import BrandListPage from './pages/Brand/BrandListPage';
import CategoryCreateUpdatePage from './pages/Category/CategoryCreateUpdatePage';
import CategoryListPage from './pages/Category/CategoryListPage';
import CustomerCreateUpdatePage from './pages/Customer/CustomerCreateUpdatePage';
import CustomerListPage from './pages/Customer/CustomerListPage';
import ExpenseCreateUpdatePage from './pages/Expense/ExpenseCreateUpdatePage';
import ExpenseListPage from './pages/Expense/ExpenseListPage';
import ExpenseTypeCreateUpdatePage from './pages/ExpenseType/ExpenseTypeCreateUpdatePage';
import ExpenseTypeListPage from './pages/ExpenseType/ExpenseTypeListPage';
import ProductCreateUpdatePage from './pages/Product/ProductCreateUpdatePage';
import ProductListPage from './pages/Product/ProductListPage';
import PurchaseCreateUpdatePage from './pages/Purchase/PurchaseCreateUpdatePage';
import PurchaseListPage from './pages/Purchase/PurchaseListPage';
import ReturnCreateUpdatePage from './pages/Return/ReturnCreateUpdatePage';
import ReturnListPage from './pages/Return/ReturnListPage';
import SalesCreateUpdatePage from './pages/Sales/SalesCreateUpdatePage';
import SalesListPage from './pages/Sales/SalesListPage';
import SupplierCreateUpdatePage from './pages/Supplier/SupplierCreateUpdatePage';
import SupplierListPage from './pages/Supplier/SupplierListPage';
import ExpenseReportPage from './pages/Report/ExpenseReportPage';
import PurchaseReportPage from './pages/Report/PurchaseReportPage';
import ReturnReportPage from './pages/Report/ReturnReportPage';
import SaleReportPage from './pages/Report/SaleReportPage';

const App = () => {

  if (getToken()) {
    return (
      <>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/profile' element={<ProfilePage />} />

            <Route path='/BrandCreateUpdatePage' element={<BrandCreateUpdatePage />} />
            <Route path='/BrandListPage' element={<BrandListPage />} />

            <Route path='/CategoryCreateUpdatePage' element={<CategoryCreateUpdatePage />} />
            <Route path='/CategoryListPage' element={<CategoryListPage />} />

            <Route path='/CustomerCreateUpdatePage' element={<CustomerCreateUpdatePage />} />
            <Route path='/CustomerListPage' element={<CustomerListPage />} />

            <Route path='/ExpenseCreateUpdatePage' element={<ExpenseCreateUpdatePage />} />
            <Route path='/ExpenseListPage' element={<ExpenseListPage />} />

            <Route path='/ExpenseTypeCreateUpdatePage' element={<ExpenseTypeCreateUpdatePage />} />
            <Route path='/ExpenseTypeListPage' element={<ExpenseTypeListPage />} />

            <Route path='/ProductCreateUpdatePage' element={<ProductCreateUpdatePage />} />
            <Route path='/ProductListPage' element={<ProductListPage />} />

            <Route path='/PurchaseCreateUpdatePage' element={<PurchaseCreateUpdatePage />} />
            <Route path='/PurchaseListPage' element={<PurchaseListPage />} />

            <Route path='/ReturnCreateUpdatePage' element={<ReturnCreateUpdatePage />} />
            <Route path='/ReturnListPage' element={<ReturnListPage />} />

            <Route path='/SalesCreateUpdatePage' element={<SalesCreateUpdatePage />} />
            <Route path='/SalesListPage' element={<SalesListPage />} />

            <Route path='/SupplierCreateUpdatePage' element={<SupplierCreateUpdatePage />} />
            <Route path='/SupplierListPage' element={<SupplierListPage />} />

            <Route path='/ExpenseReportPage' element={<ExpenseReportPage />} />
            <Route path='/PurchaseReportPage' element={<PurchaseReportPage />} />
            <Route path='/ReturnReportPage' element={<ReturnReportPage />} />
            <Route path='/SaleReportPage' element={<SaleReportPage />} />




            <Route path='*' element={<Page404 />} />

          </Routes>
        </Router>
        <FullscreenLoader />
      </>
    )
  } else {
    return (
      <>
        <Router>
          <ToastContainer />
          <Routes>
          <Route path='/' element={<Navigate to='/' replace />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route path='/sendOTP' element={<SendOTPPage />} />
            <Route path='/verifyOTP' element={<VerifyOTPPage />} />
            <Route path='/createPassword' element={<CreatePasswordPage />} />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </Router>
        <FullscreenLoader />
      </>
    )
  }

  
}

export default App
