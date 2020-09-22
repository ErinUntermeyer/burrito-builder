import React from 'react'
import Orders from './Orders'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Orders Component', () => {
	let mockedOrder
	beforeEach(() => {
		mockedOrder = [
			{
				id: 1,
				name: 'Erin',
				ingredients: ['cheese', 'beans', 'hotsauce']
			}
		]
	})

	it('Should render an order', () => {
		render(<Orders orders={mockedOrder} removeOrder={jest.fn()}/>)
		const order1 = screen.getByRole('heading', { name: /erin/i })
		expect(order1).toBeInTheDocument()
	})

	it('Should have an delete button', () => {
		render(<Orders orders={mockedOrder} removeOrder={jest.fn()} />)
		const deleteButton = screen.getByRole('button', { name: /delete/i })
		expect(deleteButton).toBeInTheDocument()
	})

	it('Should fire the correct method when delete button clicked', () => {
		const removeOrder = jest.fn()
		render(<Orders orders={mockedOrder} removeOrder={removeOrder} />)
		const deleteButton = screen.getByRole('button', { name: /delete/i })
		fireEvent.click(deleteButton)
		expect(removeOrder).toBeCalledTimes(1)
	})

})