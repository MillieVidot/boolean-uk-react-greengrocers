import './styles/index.css'
import { useEffect, useState } from 'react'

import initialStore from './data/products'
import initialCart from './data/cart'

import Icons from './components/Icons'
import Header from './components/Header'
import Main from './components/Main'
import { response } from 'express'

const getStoreItems = () =>
  fetch('http://localhost:4000/items').then(response => response.json)

export default function App() {
  const [store, setStore] = useState(initialStore)
  const [cart, setCart] = useState(initialCart)

  useEffect(() => {
    console.log('What am I doing?? Fetch')
    getStoreItems().then(function (storeItems) {
      setStore(storeItems)
    })
  }, [])

  useEffect(() => {
    console.log('Cart fetch?')
  }, [cart])

  function addToCart(itemId) {
    const foundItem = cart.find(cartItem => cartItem.id === itemId)

    // if item IS in cart
    if (foundItem !== undefined) {
      console.log('already here!! ADD ONE')
      const updatedCart = cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      setCart(updatedCart)
    } else {
      // if it is NOT in cart
      const newCartItem = {
        id: itemId,
        quantity: 1
      }
      console.log('new cart item')
      setCart([...cart, newCartItem])
    }
  }

  function removeFromCart(itemId) {
    const foundItem = cart.find(cartItem => cartItem.id === itemId)
    if (foundItem.quantity === 1) {
      const updatedCart = cart.filter(cartItem => cartItem.id !== itemId)
      setCart(updatedCart)
    } else {
      if (foundItem !== undefined) {
        console.log('one deleted', updatedCart)
        const updatedCart = cart.map(cartItem =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        setCart(updatedCart)
      }
    }
  }

  let total = 0
  for (const cartItem of cart) {
    const storeItem = store.find(storeItem => storeItem.id === cartItem.id)
    total += cartItem.quantity * storeItem.price
  }

  return (
    <div className="App">
      <Header store={store} addToCart={addToCart} />
      <Main
        store={store}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        total={total}
      />
      <Icons />
    </div>
  )
}
