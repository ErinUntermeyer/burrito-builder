import React from 'react'
import './Orders.css'

const Orders = ({ orders, removeOrder }) => {
  const orderEls = orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={Math.random() * 5}>{ingredient}</li>
          })}
        </ul>
				<button onClick={(e) => removeOrder(order.id)}>Delete</button>
      </div>
    )
  })

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders