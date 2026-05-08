import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { CartItem, Product } from '../data/types';
import { SERVER_BASE_URL } from '../utils/settings';
import { useSession } from './SessionContext';
import { useData } from './DataContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, cartId, setCartId, removeCartId } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
   const {products} = useData();
  const cartRestored = useRef(false);
  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  

  useEffect(()=>{
      if(user && cartId){
          const load = async ()=>{
              try {
                  let response = await fetch(`${SERVER_BASE_URL}/api/orders/cart/read`, {
                      method: 'POST',
                      headers: {
                      'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                      cartId: cartId,
                      customerId: user?.id
                      })
                  });
                  let json = await response.json();
                  if(json.success){
                      const data = json.cart_data;
                      console.log(`loaded ${Object.keys(data.items).length} items from cart`);
                      if(data.cart_id !== cartId){
                          setCartId(data.cart_id);
                          sessionStorage.setItem('user:cart_id', data.cart_id);
                      }
                     
                      console.log(Object.keys(data.items).length)
                      for(const [productId, qty] of Object.entries(data.items)){
                          const existing = products.find(pr => Number(pr.id) === Number(productId));
                          if(existing){
                            console.log(`Product ${productId} added to cart`);
                              addToCart(existing);
                              updateQuantity(Number(productId), Number(qty));
                          } else {
                            console.log(`Product ${productId} not added to cart`);
                          }
                      }
                  } else {
                      console.log(json.message);
                  }
                  cartRestored.current = true;
              } catch(err){
                  console.error(err);
              }
          }
          if(products.length === 0) return;
          if(!cartRestored.current) load();
      } else {
          console.log('no cart to restore');
      }
  }, [cartId, user, products]);

  const addToCart = (product: Product) => {
    
    setCartItems(current => {
      
      let newCart: CartItem[] = [];
      const existing = current.find(item => item.product.id === product.id);
      if (existing) {
        
        newCart = current.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...current, {product: product, quantity: 1}];
      }
      if(cartId){
        fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/add`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerId: user?.id,
            productId: product.id,
            quantity: existing ? existing.quantity + 1 : 1
          })
        });
      } else {
        fetch(`${SERVER_BASE_URL}/api/orders/cart/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customerId: user?.id,
            productId: product.id,
            quantity: 1
          })
        })
        .then(response => response.json())
        .then(data => {
          if(data.success){
            sessionStorage.setItem(`user:cart_id`, data.cart_id);
            setCartId(data.cart_id);
          } else {
            console.error(data.message);
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
      
      return newCart; 

    });
  };

  const removeFromCart = (productId: number) => {
    fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: user?.id,
        productId: productId
      })
    });
    setCartItems(current => {
      let newCart = current.filter(item => item.product.id !== productId);
      if(newCart.length === 0){ removeCartId(); sessionStorage.removeItem('user:cart_id'); }
      return newCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/add`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: user?.id,
        productId: productId,
        quantity: quantity
      })
    });
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    fetch(`${SERVER_BASE_URL}/api/orders/cart/id/${cartId}/clear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: user?.id
      })
    });
    sessionStorage.removeItem('user:cart_id');
    removeCartId();
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
