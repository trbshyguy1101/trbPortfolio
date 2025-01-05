//import React, { useEffect, useState } from 'react';
import './projects.css';
import WowRename from '../../assets/wowrenameico.ico';
import WowPlayer from '../../assets/wowplayerico.jpg';
import CirnoSim from '../../assets/cirnosim.jpg';

const goto_rename = () => {
  window.open("https://github.com/trbshyguy1010/wowrename");
};

const goto_wowp = () => {
  window.open("https://github.com/trbshyguy1010/varispeed-sample-master");
};

const goto_cirnosim = () => {
  window.open("https://github.com/trbshyguy1010/cirno_simulator");
};

const goto_github = () => {
  window.open("https://github.com/trbshyguy1010");
};

const Projects = () => {
  return (
    <section id="projects">
        <div className="projects-text">
            <h2 className="projects-title">Here are some of the projects I've worked on in the past: </h2>
        </div>
        <div className='project-container'>
        <div className='project-item'>
            <img src={WowRename} alt="" className='project-img'/>
            <h1 id="project-title">WowRename</h1>
            <p>
            WowRename is a batch renamer for multiple files in a directory, written in C and using the GTK Graphical User Interface.
            </p>
            <button className='btn' onClick={goto_rename}>View Project</button>
        </div>

        <div className='project-item'>
            <img src={WowPlayer} alt="" className='project-img'/>
            <h1>WowPlayer</h1>
            <p>
              A music player that reads mp3s and plays them, it includes speed playback change and a playlist system utilizing the JSON format.
            </p>
            <button className='btn' onClick={goto_wowp}>View Project</button>
        </div>

        <div className='project-item'>
            <img src={CirnoSim} alt="" className='project-img'/>
            <h1>Cirno Simulator</h1>
            <p>A Game engine written in C++ and utilizing the GLFW library</p>
            <button className='btn' onClick={goto_cirnosim}>View Project</button>
        </div>  
        <div className='see-more'>
          <button className='btn2' onClick={goto_github}>See More</button>
        </div>    
        </div>

          
    </section>
  );
};

/* {projects.map(project => (
  <div key={project.id} className="project-container">
          
  </div>
))}
// <h3>{project.name}</h3>
//<p>{project.description}</p>
//<a href={project.html_url} className="url_bringer">View on GitHub {'>'}</a>    
//{/* Add more project details as needed }*/

export default Projects;
