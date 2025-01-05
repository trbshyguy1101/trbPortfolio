import React, { useState } from "react";
import './about.css'
import a from '../../assets/unnamed.webp';
import b from '../../assets/yes.jpg';
import c from '../../assets/cute-anime-girl-pfp-3.png';
import d from '../../assets/b962c9a5f90e3592d5f35fb157dcbcb48f650a2e_high7.png';


const About = () => {
  const [randomizedImage] = useState(() => {
    const images = [
      a, b, c, d
    ];
    return images[Math.floor(Math.random() * images.length)];
  });

  return (
    <section id="about">
      <div className="box-shadowing">
      <div className="the-about-section-itself">
        <div className="about-header">
            <div className="image-container-3"></div>
            <div className="image-container-2"></div>
            <div className="image-container-1"></div>
            <div 
              className="image-container"
              style={{background: `url(${randomizedImage}) no-repeat center center/cover`}}
            ></div>
            <h1>About Me</h1>
        </div>
        <div className="vertical-bar"></div>
        <div className="about-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, error doloremque vitae minima consectetur expedita iste incidunt laboriosam accusantium est voluptate laudantium nulla sequi earum nobis, saepe provident. Consequatur, sapiente!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, error doloremque vitae minima consectetur expedita iste incidunt laboriosam accusantium est voluptate laudantium nulla sequi earum nobis, saepe provident. Consequatur, sapiente!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, error doloremque vitae minima consectetur expedita iste incidunt laboriosam accusantium est voluptate laudantium nulla sequi earum nobis, saepe provident. Consequatur, sapiente!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, error doloremque vitae minima consectetur expedita iste incidunt laboriosam accusantium est voluptate laudantium nulla sequi earum nobis, saepe provident. Consequatur, sapiente!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, error doloremque vitae minima consectetur expedita iste incidunt laboriosam accusantium est voluptate laudantium nulla sequi earum nobis, saepe provident. Consequatur, sapiente!
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}

export default About;