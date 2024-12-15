import { createContext } from "react";
import Order from "../components/Orders/orderspage/Order";

export const OrderContext=createContext();

function OrderContextProvider({children}){
    const url="https://shop-sphere-react-default-rtdb.firebaseio.com/orders.json";

    return <OrderContext.Provider>
         {children}
    </OrderContext.Provider>
}

export default OrderContextProvider;