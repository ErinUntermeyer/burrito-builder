import React from 'react'
import App from './App'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOrders, postOrder, deleteOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App Component', () => {
	let mockedOrders, mockedPost
	
	beforeEach(() => {
		mockedOrders = {
			orders: [
				{
					id: 1,
					name: 'Erin',
					ingredients: ['cheese', 'beans', 'hotsauce']
				},
				{
					id: 2,
					name: 'Howard',
					ingredients: ['lettuce', 'tomatoes', 'chicken']
				},
				{
					id: 3,
					name: 'Finn',
					ingredients: ['pico de gallo', 'jalapenos', 'steak']
				}
			]
		}
		mockedPost = {
			id: 4,
			name: 'Elliot',
			ingredients: ['beans']
		}
	})

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

	it('Should display error if get request fails', async () => {
		getOrders.mockRejectedValueOnce([404])
		const { findByRole } = render(<App />)
		const errorMessage = await findByRole('heading', { name: /oh no, something went wrong!/i })
		expect(errorMessage).toBeInTheDocument()
	})

	it('Should allow a user to post a new order', async () => {
		getOrders.mockResolvedValue({orders: []})
		postOrder.mockResolvedValue(mockedPost)
		const { findAllByText, findByRole } = render(<App />)
		const nameInput = screen.getByPlaceholderText(/name/i)
		fireEvent.change(nameInput, { target: { value: 'Elliot' } })
		const beansButton = screen.getByRole('button', { name: /beans/i })
		fireEvent.click(beansButton)
		const submitButton = screen.getByRole('button', { name: /submit order/i })
		fireEvent.click(submitButton)
		const newOrderTitle = await findByRole('heading', { name: /elliot/i })
		const newOrderIngredient = await findAllByText(/beans/i)
		expect(newOrderTitle).toBeInTheDocument()
		expect(newOrderIngredient[0]).toBeInTheDocument()
		expect(newOrderIngredient[1]).toBeInTheDocument()
	})

	it('Should allow a user to delete an order', async () => {
		getOrders.mockResolvedValue({ orders: [] })
		postOrder.mockResolvedValue(mockedPost)
		deleteOrder.mockResolvedValueOnce(202)
		const { findByRole } = render(<App />)
		const nameInput = screen.getByPlaceholderText(/name/i)
		fireEvent.change(nameInput, { target: { value: 'Elliot' } })
		const beansButton = screen.getByRole('button', { name: /beans/i })
		fireEvent.click(beansButton)
		const submitButton = screen.getByRole('button', { name: /submit order/i })
		fireEvent.click(submitButton)
		const newOrderTitle = await findByRole('heading', { name: /elliot/i })
		expect(newOrderTitle).toBeInTheDocument()
		const deleteButton = screen.getByRole('button', { name: /delete/i })
		fireEvent.click(deleteButton)
		expect(screen.queryByRole('heading', { name: /elliot/i })).not.toBeInTheDocument()
	})

})