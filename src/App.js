import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import { Home, Category, Cart } from "./pages/index";
//component
import Navbar from "./componants/Navbar/Navbar";
import Footer from "./componants/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
