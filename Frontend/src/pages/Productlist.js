import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {deleteAProductCategory} from "../features/pcategory/pcategorySlice";
import {Button} from "reactstrap";
import updateProduct from "../components/product/UpdateProduct";
import UpdateProduct from "../components/product/UpdateProduct";
import {useProductsContext} from "../components/product/contextProduct/ProductsProvider";
import {toast} from "react-toastify";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "description",
    dataIndex: "description",
    sorter: (a, b) => a.description.length - b.description.length,
  },
  {
    title: "stock",
    dataIndex: "stock",
    sorter: (a, b) => a.stock.length - b.stock.length,
  },
  {
    title: "category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () =>{
    const [showComponent, setShowComponent]=useState(false)
  // const [products, setProducts] = useState([])
  const { products } = useProductsContext();
  const [productID,setProductID] = useState(null)
  const deleteProduct = async (productId) => {
    try {
      const shouldDelete=window.confirm("Are you sure you want to delete")
      if (shouldDelete){
      await axios.delete(`http://localhost:5000/product/deleteProduct/${productId}`);
        toast.success("Product deleted Successfullly!");


        }
      else {
        console.log("Product not deleted ")
      }
    } catch (error) {
      console.error(error);
    }
  };
  //update product
  const displayMessage=async (product)=>{
    setProductID(product)
    setShowComponent(true)
  }


  useEffect(() => {





    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product/allProducts');
      //  setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const data1 = products.map((product, index) => ({
    key: product._id,
    name: product.name,
    description: product.description,
    stock: product.countInStock,

    // brand: product.brand,
    //
    category: product.category,
    // color: product.color,
    price: `${product.price}`,
    action: (
        <>
          {/*<Button className="ms-3 fs-3 text-danger" onClick={() => deleteProduct(product._id)}> <AiFillDelete /></Button>*/}

          <div style={{marginLeft:"-50px"}} id='headerCartIcon'>
            <div id='cartIconContainer'>
              <i
                  onClick={() => deleteProduct(product._id)}
                  id='cartIcon'
                  className='fa fa-trash'
              ></i>
            </div>
            <div id='cartIconContainer'>
              <i
                  onClick={() => displayMessage(product)}
                  id='cartIcon'
                  className='fa fa-edit'
              >
                {/*{showComponent && <UpdateProduct product={product}></UpdateProduct> }*/}


              </i>
            </div>
          </div>
          {/*<Link className="ms-3 fs-3 text-danger" to="/">*/}
          {/*  <AiFillDelete />*/}
          {/*</Link>*/}
        </>
    ),
  }));

  return (
      <div>
        <h3 className="mb-4 title">Products</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>

        {showComponent && (
            <UpdateProduct
                product={productID}
                onClose={() => setShowComponent(false)}
            />
        )}
      </div>
  );
};

export default Productlist;
