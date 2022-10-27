import AddCustomer from "./Pages/AddCustomer";
  import GetCustomers from "./Pages/GetCustomers";
import CustomerDetail from "./Pages/CustomerDetail";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import React , { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation,Link } from "react-router-dom";
import { Breadcrumb, Layout, Menu } from 'antd';


function App() {
const { Header, Content, Footer, Sider } = Layout;

  let location = useLocation();

  React.useEffect(() => {
    console.log(location)
    if(location.pathname === "/logout"){
      localStorage.setItem('isAuth',false)
    }
    var isAuth= localStorage.getItem('isAuth')
    if(isAuth == "false" && location.pathname != "/login"){
      console.log(location)
      window.location.href = "/login"; 
    }
  }, [location]);
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div className="logo" />
    <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}

    >
        <Menu.Item key={1}><Link to='/login'>Giriş Yap</Link> </Menu.Item>
        <Menu.Item key={2}><Link to='/addCustomer'>Müşteri Ekle</Link></Menu.Item>
        <Menu.Item key={3}><Link to='/customer'>Müşteriler</Link></Menu.Item>
        <Menu.Item key={4}><Link to='logout'>Çıkış Yap</Link></Menu.Item>

    </Menu>
      <Routes>

        <Route path="/login" element={<Login />}/>
        <Route path="customer/detail/:id" element={<CustomerDetail />}/>
        <Route path="customer" element={<GetCustomers />}/>
          <Route path="logout" element={<Logout />} />
          <Route path="/addCustomer" element={<AddCustomer />} />
      </Routes>
</Header>
  );
}

export default App;
