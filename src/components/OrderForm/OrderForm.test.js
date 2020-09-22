
import React from 'react'
import OrderForm from './OrderForm'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('OrderForm Component', () => {

	it('Should render a form', () => {
		render(<OrderForm />)
		const input = screen.getByRole('textbox')
		const button = screen.getByRole('button', { name: /beans/i })
		expect(input).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('Should capture name input', async () => {
		const { findByDisplayValue } = render(<OrderForm />)
		const nameInput = screen.getByPlaceholderText(/name/i)
		expect(nameInput).toBeInTheDocument()
		fireEvent.change(nameInput, { target: { value: 'Erin' } })
		expect(await findByDisplayValue(/erin/i)).toBeInTheDocument()
	})

	it('Should capture ingredients as buttons are clicked', () => {

	})

	it('Should fire the correct method when submit order clicked', () => {

	})

	it('Should not allow an order to be submitted without name and ingredients', () => {

	})

})