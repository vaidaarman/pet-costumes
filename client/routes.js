import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  UserHome,
  Products,
  Cart,
  ViewProduct,
  AdminUsers,
  AdminViewUser,
  NewProductForm,
  ReviewForm,
  AdminOrders,
  Orders,
  ViewOrder
} from './components'


import { me, fetchProducts, fetchCategories, fetchCart } from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }


  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/" component={Products} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:productId" component={ViewProduct} />
        <Route exact path="/products/:productId/reviews/new" component={ReviewForm} />
        <Route exact path="/admin/products/new" component={NewProductForm} />
        <Route exact path="/admin/users" component={AdminUsers} />
        <Route exact path="/admin/users/:userId" component={AdminViewUser} />
        <Route exact path="/admin/orders" component={AdminOrders} />
        {
          isLoggedIn &&
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/me/orders" component={Orders} />
            <Route exact path="/me/orders/:orderId" component={ViewOrder} />
            <Route path="/me" component={UserHome} />
            {
              isAdmin &&
              <Switch>
                <Route exact path="/admin/orders-lis" component={AdminOrders} />
              </Switch>
            }
          </Switch>
        }
        {/* Displays our Login component as a fallback */}
        <Route component={Products} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchCategories())
      dispatch(fetchCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
