import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">Sobre Nós</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dikqqzqov/image/upload/v1656960412/avatars/Lojinha._y5pv5a.png"
              alt="Founder"
            />
            <Typography>Lojinha.</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visite as nossas redes
            </Button>
            <span>
              Este ecommerce é um trabalho para a disciplina de Tópicos
              Avançados em Computação da UTFPR-MD.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Nossas Redes</Typography>
            <a href="https://www.youtube.com" target="blank">
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
