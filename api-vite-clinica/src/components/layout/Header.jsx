import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import userImage from "../../assets/user.jpg";
import { Link, NavLink } from "react-router-dom";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

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
      <div className="nombreUsu">
        <div className="boxUser" onClick={() => toggleMenu()}>
          <div className="boxUserPic">
            <img src={userImage} className="user-pic"></img>
          </div>
          <h5>{auth.name}</h5>
          <MdKeyboardArrowDown />
        </div>
      </div>
      {show && (
        <div className="sub-menu-wrap">
          <div className="sub-menu">
            <NavLink to={"/panel/users/user-edit/"+auth._id} className="sub-menu-link">
              <AiFillSetting className="sub-menu-icon"></AiFillSetting>
              <p>Settings</p>
            </NavLink>
            <NavLink className="sub-menu-link" to={"/logout"}>
              <BiLogOut className="sub-menu-icon"></BiLogOut>
              <p>Log Out</p>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
