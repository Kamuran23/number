import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Page/home'
import ResultPage from '../Page/result'

function App() {
	const [data, setData] = useState({})
	return (
		<div className='container bg-slate-950 mx-auto flex justify-center items-center h-[100vh]'>
			<Routes>
				<Route path='/' element={<HomePage setData={setData} />} />
				<Route path='/result' element={<ResultPage data={data} />} />
			</Routes>
		</div>
	)
}

export default App
