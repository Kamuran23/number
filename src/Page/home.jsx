import PropTypes from 'prop-types'
import Form from '../components/form'

function HomePage({ setData }) {
	return (
		<>
			<Form setData={setData} />
		</>
	)
}

HomePage.propTypes = {
	setData: PropTypes.func.isRequired,
}

export default HomePage
