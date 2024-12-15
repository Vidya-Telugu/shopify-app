import { createContext} from "react";
import { useState,useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
//import { Authcontext } from "./Authcontext";
export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const[billamount,setBillamount]=useState(0);
  const OrderItems={
    items:cart,
    status:"Processing",
    totalAmount:billamount+10,
    date:new Date().toISOString(),
 }
  const[orders,setOrders]=useState();
  const userId=localStorage.getItem("uid");
  //const {token}=useContext(Authcontext);
  const url=`https://shop-sphere-react-default-rtdb.firebaseio.com/${userId}/cart.json`;
  const updateBillAmount = (cartItems) => {
    const total = cartItems.reduce((acc, item) => acc + item.pprice * item.quantity, 0);
    setBillamount(total);
  };
  async function getCartItems(){
    try{
      const response=await axios.get(url);
      const items = Object.values(response.data).filter(item => item !== null);
      console.log(items);
      setCart(items);
      updateBillAmount(items);
    }catch(error){
        toast.error(error);
    }
  } 
  useEffect(()=>{
    if(userId)
    getCartItems();
  },[]);
  async function addToCart(item) {
   // const uerId=localStorage.getItem("uid")
    try {
      const response = await axios.get(url);
      let updatedCart = [];
      if (response.data) {
        updatedCart = Object.values(response.data);
      }
      const existingItem = updatedCart.find((product) => product.id === item.id);
      if (existingItem) {
        updatedCart = updatedCart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
        const itemKey = Object.keys(response.data).find(key => response.data[key].id === item.id);
        await axios.put(`https://shop-sphere-react-default-rtdb.firebaseio.com/${userId}/cart/${itemKey}.json`, {
          ...existingItem,
          quantity: existingItem.quantity + 1
        });
  
      } else {
        updatedCart.push({ ...item, quantity: 1 });
        await axios.post(url, { ...updatedCart[updatedCart.length - 1] });
      }
      toast.success("Product added to cart");
      setCart(updatedCart);
      updateBillAmount(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }
  
  const handleIncQuantity = (pname) => {
    setCart((prevCart) => {
      const updatedCart =prevCart.map((item) => {
        if (item.pname === pname) {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          updateCartItem(updatedItem); 
          return updatedItem;
        }
        return item;
      });
      updateBillAmount(updatedCart);
      return updatedCart;
    });
  };
  async function updateCartItem(updatedItem) {
    try {
      const item = cart.find((item) => item.id === updatedItem.id);
      if (item){ 
        await axios.put(`https://shop-sphere-react-default-rtdb.firebaseio.com/${userId}/cart/${item.id}.json`, updatedItem);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id=== updatedItem.id ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
      }
    } catch (error) {
      toast.error("Error updating cart item.");
    }
  }
  const handleDecQuantity = (pname) => {
    setCart((prevCart) => {
      const updatedCart=prevCart.map((item) => {
        if (item.pname === pname && item.quantity > 1) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          updateCartItem(updatedItem);  
          return updatedItem;
        }
        return item;
      });
      updateBillAmount(updatedCart);
      return updatedCart;
    });
  };
  async function handleDeletefromCart(item) {
    try {
      const response = await axios.get(url);
      const itemKey = Object.keys(response.data).find(key => response.data[key].id === item.id);  
        await axios.delete(`https://shop-sphere-react-default-rtdb.firebaseio.com/${userId}/cart/${itemKey}.json`);
      const newCart = cart.filter((product) => product.id!==item.id);
      setCart(newCart);  
      updateBillAmount(newCart);
      toast.success("Product deleted Successfully");
    } catch (error) {
      console.error("Error deleting item from cart: ", error);
      toast.error("Error deleting item from cart.");
    }
  }
  async function clearCart(){
    try{
      await axios.delete(`https://shop-sphere-react-default-rtdb.firebaseio.com/${userId}/cart.json`);
    }
    catch(error){
      toast.error("Error occured while clearing cart",error);
    }
  }
    async function handleOrders(){
      try{
         const response=await axios.post("https://shop-sphere-react-default-rtdb.firebaseio.com/orders.json",OrderItems);
         setOrders(response.data)
         if(response.status==200){
          clearCart();
         }
         toast.success("order placed successfully");
         console.log("order details",response.data);
      }
      catch(error){
         alert(error);
      }
    }
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "https://shop-sphere-react-default-rtdb.firebaseio.com/orders.json"
        );
        const orders = Object.values(response.data);
        setOrders(orders);
        console.log(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    
    useEffect(() => {
      fetchOrders();
    }, []);
    
  return <CartContext.Provider value={{orders,handleOrders,OrderItems,addToCart,cart,setCart,setBillamount,billamount,handleDecQuantity,handleIncQuantity,handleDeletefromCart}}>
    {children}
  </CartContext.Provider>
}