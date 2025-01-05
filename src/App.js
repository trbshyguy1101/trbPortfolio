import Navbar from './components/navbar/Navbar';
import Intro from './components/intro/intro';
import Projects from './components/projects/projects';
import Footer from './components/footer/footer';  
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Intro/>
      <Projects/>
      <Footer/>
    </div>
  );
}

export default App;
