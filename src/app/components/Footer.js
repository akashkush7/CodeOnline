import React from "react";

const Footer = () => {
  return (
    <div className="text-white text-center my-5">
      <h6>{`Copyright@${new Date().getFullYear()}`}</h6>
      <h6>Developed by Akash Kushwaha</h6>
    </div>
  );
};

export default Footer;
