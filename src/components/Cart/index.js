import {Component} from 'react'
import Popup from 'reactjs-popup'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

class Cart extends Component {
  state = {
    selectedPaymentMethod: '',
    isOrderConfirmed: false,
  }

  setSelectedPaymentMethod = event => {
    this.setState({selectedPaymentMethod: event.target.value})
  }

  handleConfirmOrder = () => {
    const {selectedPaymentMethod} = this.state
    if (selectedPaymentMethod === 'Cash on Delivery')
      this.setState({isOrderConfirmed: true})
    // } else {
    //   // Handle other payment methods
    // }
  }

  render() {
    const {selectedPaymentMethod, isOrderConfirmed} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const showEmptyView = cartList.length === 0

          const onClickRemoveAll = () => {
            removeAllCartItems()
          }

          const onClickContinueShopping = () => {
            removeAllCartItems()
            const {history} = this.props
            history.replace('/products')
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
                        <Popup
                          modal
                          closeOnDocumentClick
                          closeOnEscape
                          trigger={
                            <button type="button" className="checkout-btn">
                              Checkout
                            </button>
                          }
                        >
                          {isOrderConfirmed ? (
                            <div className="payment-popup">
                              <p>Your order has been placed successfully</p>
                              <button
                                type="button"
                                onClick={onClickContinueShopping}
                              >
                                Continue Shopping
                              </button>
                            </div>
                          ) : (
                            <div className="payment-popup">
                              <h2>Select Payment Method</h2>
                              <div>
                                <label htmlFor="card">
                                  <input
                                    id="card"
                                    type="radio"
                                    value="Card"
                                    disabled
                                    checked={selectedPaymentMethod === 'Card'}
                                    onChange={this.setSelectedPaymentMethod}
                                  />
                                  Card
                                </label>
                                <label htmlFor="netbanking">
                                  <input
                                    id="netbanking"
                                    type="radio"
                                    value="Net Banking"
                                    disabled
                                    checked={
                                      selectedPaymentMethod === 'Net Banking'
                                    }
                                    onChange={this.setSelectedPaymentMethod}
                                  />
                                  Net Banking
                                </label>
                                <label htmlFor="upi">
                                  <input
                                    id="upi"
                                    type="radio"
                                    value="UPI"
                                    disabled
                                    checked={selectedPaymentMethod === 'UPI'}
                                    onChange={this.setSelectedPaymentMethod}
                                  />
                                  UPI
                                </label>
                                <label htmlFor="wallet">
                                  <input
                                    id="wallet"
                                    type="radio"
                                    value="Wallet"
                                    disabled
                                    checked={selectedPaymentMethod === 'Wallet'}
                                    onChange={this.setSelectedPaymentMethod}
                                  />
                                  Wallet
                                </label>
                                <label htmlFor="cashondelivery">
                                  <input
                                    id="cashondelivery"
                                    type="radio"
                                    value="Cash on Delivery"
                                    checked={
                                      selectedPaymentMethod ===
                                      'Cash on Delivery'
                                    }
                                    onChange={this.setSelectedPaymentMethod}
                                  />
                                  Cash on Delivery
                                </label>
                              </div>
                              <div>
                                <p>Number of items: {cartList.length}</p>
                                <p>Total Price: {renderAmount()}</p>
                              </div>
                              <button
                                type="button"
                                onClick={this.handleConfirmOrder}
                                disabled={!selectedPaymentMethod}
                              >
                                Confirm Order
                              </button>
                            </div>
                          )}
                        </Popup>
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
  }
}

export default Cart
