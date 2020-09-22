import React, { Component } from 'react'

class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      ingredients: []
    }
  }


  handleSubmit = e => {
		if (this.state.name !== '' && this.state.ingredients.length > 0) {
			this.props.submitOrder(this.state.name, this.state.ingredients)
		}
    this.clearInputs()
	}
	
	handleNameChange = e => {
		this.setState({ name: e.target.value })
	}

	handleIngredientChange = (e, ingredient) => {
		e.preventDefault()
		if (!this.state.ingredients.includes(ingredient)) {
			this.setState({ ingredients: [...this.state.ingredients, ingredient]})
		}
	}

  clearInputs = () => {
    this.setState({name: '', ingredients: []})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e, ingredient)}>
          {ingredient}
        </button>
      )
    })

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm
