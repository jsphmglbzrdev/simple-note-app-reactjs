import {	useState, useEffect } from 'react'
import Header from './components/Header'
import TodoTable from './components/TodoTable'
const App = () => {

	const [theme, setTheme] = useState(() => {
		const getTheme = localStorage.getItem('theme')
		return getTheme ? JSON.parse(getTheme) : false
	})

	const handleTheme = () => {
		setTheme(prev => !prev)
	}
	
	useEffect(() => {
		localStorage.setItem('theme', JSON.stringify(theme))
	}, [theme])

	return (
		<div className={`${theme ?"bg-gray-900/80" : "bg-gray-100/50"} font-[poppins] transition-all duration-500 w-full min-h-screen`}>
			<Header theme={theme} changeTheme={handleTheme}/>
			<TodoTable theme={theme}/>
		</div>
	)
}

export default App