import './App.css';
import NavBar from './containers/navbar/Navbar';
import ProductScreen from './containers/products/ProductScreen';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import CartScreen from './components/cart/CartScreen';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='/products' element={<ProductScreen />}/>
        <Route path='/cart' element={<CartScreen />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
