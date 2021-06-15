function Main({ store, cart, addToCart, removeFromCart, total }) {
  return (
    <main id="cart">
      <h2>Your Cart</h2>
      <div className="cart--item-list-container">
        <ul className="item-list cart--item-list">
          {cart.map(cartItem => {
            const storeItem = store.find(
              storeItem => storeItem.id === cartItem.id
            )
            return (
              <li key={cartItem.id}>
                <img
                  className="cart--item-icon"
                  src={`assets/icons/${cartItem.id}.svg`}
                  alt={storeItem.name}
                />
                <p>{storeItem.name}</p>
                <button
                  onClick={() => {
                    removeFromCart(cartItem.id)
                  }}
                  className="quantity-btn remove-btn center"
                >
                  -
                </button>
                <span className="quantity-text center">
                  {cartItem.quantity}
                </span>
                <button
                  onClick={() => {
                    addToCart(cartItem.id)
                  }}
                  className="quantity-btn add-btn center"
                >
                  +
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="total-section">
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span className="total-number">{total.toFixed(2)}</span>
        </div>
      </div>
    </main>
  )
}
export default Main
