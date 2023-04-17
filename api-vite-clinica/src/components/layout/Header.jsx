import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import userImage from "../../assets/user.jpg";
import { Link } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";

function Header() {
  const { auth } = useAuth();

  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow((isVisible) => !isVisible);
  };

  return (
    <header className="header">
      <div className="banner">
        <h2>Buenos días !!</h2>
      </div>
      <div className="nombreUsu" onClick={() => toggleMenu()}>
        <div className="boxUserPic">
          <img src={userImage} className="user-pic"></img>
        </div>
        <h5>{auth.name}</h5>
      </div>
      {show && (
        <div className="sub-menu-wrap">
          <div className="sub-menu">
            <Link className="sub-menu-link">
              <AiFillSetting className="sub-menu-icon"></AiFillSetting>
              <p>Settings</p>
            </Link>
            <Link className="sub-menu-link">
              <BiLogOut className="sub-menu-icon"></BiLogOut>
              <p>Log Out</p>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
