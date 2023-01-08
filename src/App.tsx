import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import DetalhesTrivia from './modules/Trivias/DetalhesTrivia';
import ListaTrivias from './modules/Trivias/ListaTrivias';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/admin/trivia/' element={<ListaTrivias />} />
				<Route path="/admin/trivia/criar" element={<DetalhesTrivia />} />
				<Route path="/admin/trivia/:id" element={<DetalhesTrivia />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
