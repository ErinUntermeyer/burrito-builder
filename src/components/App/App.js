import React, { Component } from 'react'
import './App.css'
import { getOrders, postOrder, deleteOrder } from '../../apiCalls'
import Orders from '../../components/Orders/Orders'
import OrderForm from '../../components/OrderForm/OrderForm'

class App extends Component {
  constructor() {
		super()
		this.state = {
			orders: []
		}
  }

  componentDidMount() {
		getOrders()
			.then(data => {
				this.setState({ orders: data.orders })
			})
      .catch(err => console.error('Error fetching:', err))
	}
	
	submitOrder = (name, ingredients) => {
		postOrder(name, ingredients)
			.then(order => {
				console.log(order)
				this.setState({ orders: [...this.state.orders, order] })
			})
			.catch(err => console.error('Error fetching:', err))
	}

	removeOrder = id => {
		deleteOrder(id)
			.then(
				this.setState({ orders: this.state.orders.filter(order => order.id !== id)})
			)
	}

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm submitOrder={this.submitOrder}/>
        </header>
        <Orders orders={this.state.orders} removeOrder={this.removeOrder}/>
      </main>
    )
  }
}


export default App
