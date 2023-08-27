import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../features/pcategory/pcategorySlice";
import CustomModal from "../components/CustomModal";
import axios from "axios";
import {useCategoriesContext} from "../components/category/contextCategory/CategoryProvider";
import UpdateCategory from "../components/category/UpdateCategory";
import {toast} from "react-toastify";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];





const Categorylist = () => {
  const {categories} =useCategoriesContext();




  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };
  const [categoryID,setCategoryID] = useState(null)
  const [showComponent, setShowComponent]=useState(false)

  const deleteCategory = async (categoryId) => {
    try {
      const shouldDelete=window.confirm("Are you sure you want to delete")
      if (shouldDelete){
        await axios.delete(`http://localhost:5000/category/deleteCategory/${categoryId}`);
        toast.success("Category  deleted Successfullly!");



      }
      else {
        console.log("Category not deleted ")
      }
    } catch (error) {
      console.error(error);
    }
  };
  //update category
  const displayMessage=async (category)=>{
    // window.confirm('Are you sure you want to display this message when you click')
    setCategoryID(category)
    setShowComponent(true)
  }
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const data1 = categories.map ( (category,index)=>({
        key: category._id,
        name: category.name,
    action:(
        <>
          {/*<Button className="ms-3 fs-3 text-danger" onClick={() => deleteProduct(product._id)}> <AiFillDelete /></Button>*/}

          <div style={{marginLeft:"-50px"}} id='headerCartIcon'>
            <div id='cartIconContainer'>
              <i
                  onClick={() => deleteCategory(category._id)}
                  id='cartIcon'
                  className='fa fa-trash'
              ></i>
            </div>
            <div id='cartIconContainer'>
              <i
                  onClick={() => displayMessage(category)}
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
    )
  }) )

  return (
      <div>
        <h3 className="mb-4 title">Categories</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>

        {showComponent && (
            <UpdateCategory
                category={categoryID}
                onClose={() => setShowComponent(false)}
            />
        )}
      </div>
  );
};


export default Categorylist;
