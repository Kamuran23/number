import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
function ResultPage({ data }) {
	return (
		<div className='bg-slate-900 relative size-2/5 rounded-md flex flex-col gap-2 justify-center items-center'>
			<h2>Number: {data.num}</h2>
			<h2>Type: {data.type}</h2>
			<h2>Fact: {data.data}</h2>
			<Link
				className='absolute top-2 left-2 text-white text-sm underline'
				to={'/'}
			>
				Back
			</Link>
		</div>
	)
}

ResultPage.propTypes = {
	data: PropTypes.object,
}

export default ResultPage
