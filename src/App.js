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
          <Route path="/">
            <Route index element={<Main_page/>} />
            <Route path="*" exact={true} element={ <Error404/> } />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
