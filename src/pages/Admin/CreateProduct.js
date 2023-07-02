import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
const { Option } = Select

const CreateProduct = () => {
  const navigate= useNavigate();
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState("")
  const [shipping, setShipping] = useState("");
  const [prodDesc, setProdDesc] = useState({ name: "", photo: "", description: "", price: "", quantity: ""});

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in getting categories')
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  const handleOnChange = (e) => {
    setProdDesc({ ...prodDesc, [e.target.name]: e.target.value })
  }
  const handlePhotoChange = (e) => {
    setProdDesc({ ...prodDesc, [e.target.name]: e.target.files[0] })
  }

  // creating product
  const handleCreate=async(e)=>{
    e.preventDefault();
    try {
      // if you dont want to use the form data then wrap all the input and select tags within form tag and add handle create function on form onSubmit event
      const productData=new FormData()
      productData.append("name",prodDesc.name)
      productData.append("description",prodDesc.description)
      productData.append("quantity",prodDesc.quantity)
      productData.append("price",prodDesc.price)
      productData.append("photo",prodDesc.photo)
      productData.append("category",category)
      productData.append("shipping",shipping)

      const {data}=await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData)

      if(data.success){
        toast.success('Prouduct Created Successfully');
        navigate('/dashboard/admin/products');
      }else{
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  return (
    <Layout title="Dashboard - Create Product">
      <div style={{ minHeight: '84.5vh' }} className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input type="text"
                  value={prodDesc.name}
                  name='name'
                  placeholder="Enter the Product's name"
                  className='form-control'
                  onChange={handleOnChange}
                />
              </div>
              <Select bordered={false}
                placeholder="Select a category"
                size='large'
                showSearch
                className='form-select mb-3'
                onChange={(value) => { setCategory(value) }}
              >
                {/* the value given inside the onchange function is given by the antd library */}
                {categories?.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={prodDesc.description}
                  name='description'
                  placeholder="write a description for the product"
                  className="form-control"
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <input type="number"
                  value={prodDesc.price}
                  name='price'
                  placeholder="Enter the Product's price"
                  className='form-control'
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <input type="number"
                  value={prodDesc.quantity}
                  name='quantity'
                  placeholder="Enter the Product's quantity"
                  className='form-control'
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                  {prodDesc.photo ? prodDesc.photo.name : "Upload  Photo"}
                  <input type="file" name='photo' accept='image/*' onChange={handlePhotoChange} hidden />
                </label>
              </div>
              <div className="mb-3">
                {prodDesc.photo && (
                  <div className="text-center">
                    <img src={URL.createObjectURL(prodDesc.photo)} alt="product_photo" height={'200px'} className='img img-responsive' />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct

/*
subscription model
rating system
if milk amount reduced then how handled
*/