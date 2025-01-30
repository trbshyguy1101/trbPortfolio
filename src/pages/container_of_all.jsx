import React from 'react';
import Intro from '../components/intro/intro';
import Projects from '../components/projects/projects';
import Snake from '../components/snake_section/Snake';
import About from '../components/about/about'

const MainPage = () => {
  return (
    <div className="App">
      <Intro/>
      <About/>
      <Projects/>
      <Snake />
    </div>
  );
}

export default MainPage;