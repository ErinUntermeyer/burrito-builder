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

})