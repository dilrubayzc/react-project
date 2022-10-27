import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import { Button, Input, Space, Table } from 'antd';
import { useParams } from 'react-router';
import 'antd/dist/antd.css';
function CustomerDetail() {
  const { id } = useParams();
    const[addresses,setAddresses]=useState([]);
    useEffect(()=>{
        getCustomerAddressById()
      },[])
    const getCustomerAddressById=()=>{
        
        axios.get('https://northwind.vercel.app/api/customers/'+ id)
      
        .then(response=>{
            console.log(response.data.address)
            setAddresses([response.data.address])
        }
        ).catch(err=>{
          console.log('err',err);
        })
      }
    const columns = [ 
        { 
        key: "street", 
        title: "Street", 
        dataIndex: "street", 
        }, 
        { 
        key: "city", 
        title: "City", 
        dataIndex: "city", 
      
        }, 
        { 
        key: "region", 
        title: "region", 
        dataIndex: "region", 
        }, 
        { 
        key: "postalCode", 
        title: "postalCode", 
        dataIndex: "postalCode", 
        
        }, 
        { 
            key: "country", 
            title: "country", 
            dataIndex: "country", 
            
        }, 
         { 
                key: "phone", 
                title: "phone", 
                dataIndex: "phone", 
                
        }, 
        
        ] 
  return (
    <>
       <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
      </div>
      <Table  columns={columns} dataSource={addresses} />
    </div>
    </>
  )
}

export default CustomerDetail