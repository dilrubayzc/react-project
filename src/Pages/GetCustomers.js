import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';

function CategoryPage() {
const [products,setProducts]=useState([]);
useEffect(()=>{
  getCustomer()
},[])
const getCustomer=()=>{
  axios.get('https://northwind.vercel.app/api/customers')

  .then(response=>{
    
    setProducts(response.data)
  }
  ).catch(err=>{
    console.log('err',err);
  })
}
const deleteCustomer=(id)=>{
  axios.delete('https://northwind.vercel.app/api/customers/'+id).then(resp=>{
    console.log(resp)
    if(resp.status===200){
      alert('silme işlemi başarılı')
      getCustomer()
    }
  }).catch(
    err=>{
      console.log(err)
    }
  )
}
const getDetail=(id)=>{
  window.location.href = "customer/detail/"+id; 
 
}
const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
 
const columns = [ 
  { 
  key: "id", 
  title: "Id", 
  dataIndex: "id", 
  }, 
  { 
  key: "companyName", 
  title: "Şirket İsmi", 
  dataIndex: "companyName", 
  render: (text) => <a>{text}</a>,
  ...getColumnSearchProps('companyName'),
  sorter: (a, b) =>a.companyName.localeCompare(b.companyName),

  }, 
  { 
  key: "contactName", 
  title: "Kişi İsmi", 
  dataIndex: "contactName", 
  ...getColumnSearchProps('contactName'),
  }, 
  { 
  key: "contactTitle", 
  title: "Kişi Ünvanı", 
  dataIndex: "contactTitle", 
  ...getColumnSearchProps('contactTitle'),
  
  }, 
  {
    title: 'Eylem',
    key: 'acon',
    render: (_,record) => (
      <Space size="middle">
        <Button type="link" value="" onClick={() => {deleteCustomer(record.id)}}>delete</Button>
      </Space>
    ),
  },
  {
    title: 'Eylem',
    key: 'acon',
    render: (_,record) => (
      <Space size="middle">
        <Button type="link" value="" onClick={() => {getDetail(record.id)}}>detay</Button>
      </Space>
    ),
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
      <Table  columns={columns} dataSource={products} />
    </div>
  );
    </>
  )
}

export default CategoryPage