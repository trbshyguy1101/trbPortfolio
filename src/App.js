import React from 'react';
import Main_page from './pages/container_of_all';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/footer';  
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Error404 from './pages/error_pages/Error404';
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main_page/>}>
            <Route index element={<Main_page/>} />
          </Route>
          <Route path="*" element={ <Error404/> } />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
