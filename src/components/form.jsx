import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Form({ setData }) {
	const [num, setNum] = useState('Random')
	const [type, setType] = useState('math')
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(false)
	const [isValidate, setIsValidate] = useState(true)
	const navigate = useNavigate()

	const getFact = async event => {
		const url = 'http://numbersapi.com'
		event.preventDefault()

		setIsLoading(true)

		if (num == 'random') setNum(Math.floor(Math.random() * 100))

		try {
			const response = await fetch(`${url}/${num}/${type}/`)
			console.log(response)
			if (!response.ok)
				throw new Error(`Could not fetch ${url}, status: ${response.status}`)

			const data = await response.text()

			setData({ num, type, data })
		} catch (error) {
			setError(error.message)
		} finally {
			setIsLoading(false)
		}
		navigate('/result')
	}

	const handleSelectChange = event => {
		setType(event.target.value)
	}

	const handleInputChange = event => {
		const value = event.target.value

		if (/^\d*$/.test(value)) {
			if (/^\d{0,4}$/.test(value)) {
				setNum(value)
				setIsValidate(true)
				setError(null)
			} else {
				setError('Enter a number of no more than 4 digits!')
				setIsValidate(false)
			}
		} else {
			setIsValidate(false)
			setError('Enter a number of no more than 4 digits!')
		}

		if (value.length == 0) setNum('Random')
	}

	return (
		<>
			<div className='bg-slate-900  size-2/5 rounded-md relative'>
				{error && (
					<div className='absolute top-0 text-red-600 font-bold w-full  text-center'>
						{error}
					</div>
				)}
				<form className='size-full flex justify-center items-center flex-col gap-5 px-5'>
					<div className='flex w-full gap-8'>
						<input
							type='text'
							className='bg-slate-300 text-slate-950 p-1 w-full h-6'
							onChange={handleInputChange}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									event.preventDefault()
								}
							}}
						/>
						<select
							value={type}
							onChange={handleSelectChange}
							className='bg-slate-200 text-slate-950 min-w-fit text-right'
						>
							<option value='math'>{`${num}/Math`}</option>
							<option value='year'>{`${num}/Year`}</option>
							<option value='trivia'>{`${num}/Trivia`}</option>
							<option value='date'>{`${num}/Date`}</option>
						</select>
					</div>
					{isValidate && (
						<button
							onClick={getFact}
							className='bg-slate-300 text-slate-900 px-4 py-1 rounded-lg'
						>
							Get Fact
						</button>
					)}
				</form>
				{isLoading && (
					<div className='bg-slate-950 opacity-90 absolute inset-0 flex justify-center items-center'>
						<h1>Loading...</h1>
					</div>
				)}
			</div>
		</>
	)
}

Form.propTypes = {
	setData: PropTypes.func.isRequired,
}

export default Form
