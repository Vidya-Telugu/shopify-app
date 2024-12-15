import { createContext, useEffect } from "react"
import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export const FilterContext = createContext();


export default function FilterContextProvider({ children }) {
  const { categoryName } = useParams();
  const[searchitems,setSearchitems]=useState([]);
  const[searchtext,setSearchtext]=useState("");
  const [categorized, setCategorized] = useState([]);
  const token=localStorage.getItem("token");
  const fetchCategory = useCallback(async (category) => {
    try {
      const url = "https://shop-sphere-react-default-rtdb.firebaseio.com/products.json";
      console.log("Requesting with token:", token); 
      const response = await axios.get(url
      //   ,{
      //   headers: { 
      //     'Content-Type': 'application/json', 
      //     'Authorization': `Bearer ${token}` 
      //   }
      // }
      );
      const products = Object.values(response.data);
      console.log(products);
      setCategorized(products.filter((item) => item.pcategory === category));

    }
    catch (error) {
      console.log(error)
    }
  }, [])
 const deleteProduct=useCallback(async (name)=>{
    try {
      const url = "https://shop-sphere-react-default-rtdb.firebaseio.com/products.json";
      const response = await axios.get(url,{
        headers: { 
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
           }
      });
      const products = response.data ? Object.values(response.data) : [];
      console.log("Available products:", products);
      const productKeyToDelete = Object.keys(response.data).find(key => {
        const product = response.data[key];
        console.log("Checking product:", product);
        return product && product.pname === name;
      });
      if (productKeyToDelete) {
        await axios.delete(`https://shop-sphere-react-default-rtdb.firebaseio.com/products/${productKeyToDelete}.json`
        //   ,{
        //   headers: { 
        //      'Content-Type': 'application/json',
        //      'Authorization': `Bearer ${token}`
        //      }
        // }
      );
        console.log(`Product "${name}" deleted successfully.`);
        setCategorized(prev => {
          const updated = prev.filter(item => item.pname !== name);
          console.log("Updated categorized products:", updated);
          return updated;
        });
      } else {
        console.log("Product not found.");
      }
    } catch (error) {
      alert("Error deleting product: " + error.message);
    }
  },[]);

  useEffect(() => {
    fetchCategory(categoryName)
  }, [categoryName,fetch])
  const value=useMemo(()=>({categorized,fetchCategory,deleteProduct,setSearchtext,searchitems,setSearchitems,searchtext}))
  return <FilterContext.Provider value={value}>
    {children}
  </FilterContext.Provider>
}