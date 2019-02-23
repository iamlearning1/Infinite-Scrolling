import React from "react";

export default ({ image }) => (
  <img className="single-photo" src={image.urls.thumb} alt="" />
);
