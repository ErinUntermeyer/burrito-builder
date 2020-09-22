
import React from 'react'
import OrderForm from './OrderForm'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('OrderForm Component', () => {

	it('Should render a form', () => {
		render(<OrderForm submitOrder={jest.fn()}/>)
		const input = screen.getByRole('textbox')
		const button = screen.getByRole('button', { name: /beans/i })
		expect(input).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('Should capture name input', async () => {
		const { findByDisplayValue } = render(<OrderForm submitOrder={jest.fn()}/>)
		const nameInput = screen.getByPlaceholderText(/name/i)
		expect(nameInput).toBeInTheDocument()
		fireEvent.change(nameInput, { target: { value: 'Erin' } })
		expect(await findByDisplayValue(/erin/i)).toBeInTheDocument()
	})

	it('Should capture ingredients as buttons are clicked', async () => {
		const { findByText } = render(<OrderForm submitOrder={jest.fn()}/>)
		const beansButton = screen.getByRole('button', { name: /beans/i })
		const hotSauceButton = screen.getByRole('button', { name: /hot sauce/i })
		const lettuceButton = screen.getByRole('button', { name: /lettuce/i })
		fireEvent.click(beansButton)
		expect(await findByText(/order: beans/i)).toBeInTheDocument
		fireEvent.click(hotSauceButton)
		expect(await findByText(/order: beans, hot sauce/i)).toBeInTheDocument
		fireEvent.click(lettuceButton)
		expect(await findByText(/order: beans, hot sauce, lettuce/i)).toBeInTheDocument

		
	})

	it('Should fire the correct method when submit order clicked', () => {
		const submitOrder = jest.fn()
		render(<OrderForm submitOrder={submitOrder}/>)
		const nameInput = screen.getByPlaceholderText(/name/i)
		fireEvent.change(nameInput, { target: { value: 'Erin' } })
		fireEvent.click(screen.getByRole('button', { name: /beans/i }))
		const submitButton = screen.getByRole('button', { name: /submit order/i })
		fireEvent.click(submitButton)
		expect(submitOrder).toBeCalledTimes(1)
	})

	it('Should not allow an order to be submitted without name and ingredients', () => {

	})

})