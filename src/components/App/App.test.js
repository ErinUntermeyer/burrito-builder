import React from 'react'
import App from './App'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App Component', () => {
	let mockedOrders = {
		orders: [
			{
				id: 1,
				name: 'Erin',
				ingredients: [ 'cheese', 'beans', 'hotsauce' ]
			},
			{
				id: 2,
				name: 'Howard',
				ingredients: [ 'lettuce', 'tomatoes', 'chicken' ]
			},
			{
				id: 3,
				name: 'Finn',
				ingredients: [ 'pico de gallo', 'jalapenos', 'steak' ]
			}
		]
	}

	it('Should render orders upon load', async () => {
		getOrders.mockResolvedValueOnce(mockedOrders)
		const { findByRole } = render(<App />)
		const order1title = await findByRole('heading', { name: /erin/i })
		const order2title = await findByRole('heading', { name: /howard/i })
		const order3title = await findByRole('heading', { name: /finn/i })
		expect(order1title).toBeInTheDocument()
		expect(order2title).toBeInTheDocument()
		expect(order3title).toBeInTheDocument()

	})

})