import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

class Cart extends Component {
  state = {
    name: '',
    address: '',
    state: '',
    city: '',
    phoneNumber: '',
    isOrderPlaced: false,
    isError: false,
    errorMsgText: '',
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeAdress = event => {
    this.setState({address: event.target.value})
  }

  onChangeState = event => {
    this.setState({state: event.target.value})
  }

  onChangeCity = event => {
    this.setState({city: event.target.value})
  }

  onChangePhoneNumber = event => {
    this.setState({phoneNumber: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {state, address, city, name, phoneNumber} = this.state
    if (
      state !== '' &&
      address !== '' &&
      city !== '' &&
      name !== '' &&
      phoneNumber !== ''
    ) {
      this.setState({isOrderPlaced: true, isError: false})
    } else {
      this.setState({
        isError: true,
        errorMsgText: 'Please fill out the details',
      })
    }
  }

  render() {
    const {
      isOrderPlaced,
      state,
      city,
      phoneNumber,
      name,
      address,
      isError,
      errorMsgText,
    } = this.state
    return (
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

          const onClickShopping = () => {
            removeAllCartItems()
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
                          trigger={
                            <button type="button" className="checkout-btn">
                              Checkout
                            </button>
                          }
                        >
                          {close => (
                            <div className="cart-popup-container">
                              <button type="button" onClick={() => close()}>
                                <IoMdCloseCircleOutline aria-label="button" />
                              </button>
                              {isOrderPlaced ? (
                                <>
                                  <p className="cart-heading">
                                    Your Order is Placed
                                  </p>
                                  <Link to="/products">
                                    <button
                                      style={{alignSelf: 'flex-end'}}
                                      type="button"
                                      className="checkout-btn"
                                      onClick={onClickShopping}
                                    >
                                      Continue Shopping
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                <form
                                  className="cart-form-container"
                                  onSubmit={this.onSubmitForm}
                                >
                                  <label className="input-label" htmlFor="name">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    id="name"
                                    className="username-input-field"
                                    placeholder="Name"
                                    value={name}
                                    onChange={this.onChangeName}
                                  />
                                  <label
                                    className="input-label"
                                    htmlFor="address"
                                  >
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    id="address"
                                    className="username-input-field"
                                    placeholder="Address"
                                    value={address}
                                    onChange={this.onChangeAdress}
                                  />
                                  <label className="input-label" htmlFor="city">
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    id="city"
                                    className="username-input-field"
                                    placeholder="City"
                                    value={city}
                                    onChange={this.onChangeCity}
                                  />
                                  <label
                                    className="input-label"
                                    htmlFor="state"
                                  >
                                    State , pincode
                                  </label>
                                  <input
                                    type="text"
                                    id="state"
                                    className="username-input-field"
                                    placeholder="State"
                                    value={state}
                                    onChange={this.onChangeState}
                                  />
                                  <label
                                    className="input-label"
                                    htmlFor="number"
                                  >
                                    Phone Number
                                  </label>
                                  <input
                                    type="text"
                                    id="number"
                                    className="username-input-field"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={this.onChangePhoneNumber}
                                  />
                                  <button
                                    type="submit"
                                    className="checkout-btn"
                                  >
                                    Place Order
                                  </button>
                                  {isError && (
                                    <p className="error-message">
                                      {errorMsgText}
                                    </p>
                                  )}
                                </form>
                              )}
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
