import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { Order, Product } from '../data/types';
import { SERVER_BASE_URL } from '../utils/settings';
import { useSession } from './SessionContext';


interface DataContextType {
    products: Product[];
    orders: Order[];
    categories: string[];
};


const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [products, setproducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    
    const { user } = useSession();
    const productsLoaded = useRef(false);

    useEffect(()=>{
        const loadProducts = async ()=>{
            try {
                const response = await fetch(`${SERVER_BASE_URL}/api/data/products`);
                const result = await response.json();
                if(result.success){
                    setproducts(result.data.products as Product[]);
                    productsLoaded.current = true;
                    console.log("successfully fetched products")
                } else {
                    console.error(result.message);
                }
            } catch(err){
                console.error(err);
            }
        };

        const loadOrders = async ()=>{
            try {
                const response = await fetch(`${SERVER_BASE_URL}/api/data/orders?cid=${user?.id}`);
                const result = await response.json();
                if(result.success){
                    setOrders(result.data.orders as Order[]);
                    console.log(`successfully fetched ${result.data.orders.length} orders`)
                } else {
                    console.error(result.message);
                }
            } catch(err){
                console.error(err);
            }
        }

        const removeOrders = ()=>{
            setOrders([]);
        }
        if(!productsLoaded.current) loadProducts();
        if(user){
            loadOrders();
        } else removeOrders();
    }, [user]);

    useEffect(()=>{
        if(products.length > 0){
            setCategories(Array.from(new Set(products.map(product => product.category))));
        }
    }, [products]);

    return (
    <DataContext.Provider
      value={{
        orders,
        products,
        categories
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}