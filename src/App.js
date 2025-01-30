import React from 'react';
import MainPage from './pages/container_of_all';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';  
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Billboard } from './pages/billboard_page/Billboard';
function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
        
          <Routes>
            <Route path="/">
              <Route path="/" index element={<MainPage/>} />
              <Route path="/billboard" element={ <Billboard/> } />
            </Route>
          </Routes>
        
      {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
