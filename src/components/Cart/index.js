import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const showEmptyView = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      const renderAmount = () => {
        let amount = 0
        cartList.forEach(each => {
          const {quantity, price} = each
          amount += quantity * price
        })
        return amount
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="cart-button-container">
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={onClickRemoveAll}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                {cartList.length > 0 && (
                  <div className="show-summary-container">
                    <div className="summary-container">
                      <h1 className="order-rate">
                        Order Total:
                        <span className="rate"> Rs {renderAmount()}/-</span>
                      </h1>
                      <p className="cart-count">
                        {cartList.length} items in cart
                      </p>
                    </div>
                    <button type="button" className="checkout-btn">
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
