import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "./Logo";

function Navbar() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("https://bootcamp-api.codeit.kr/api/sample/user")
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setUserData(data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <a href="../public">
          <Logo className="logo" alt="logo" />
        </a>
        {userData ? (
          <div className="profile">
            <img
              src={userData.profileImageSource}
              alt="profile"
              className="profile-image"
            />
            <span className="email">{userData.email}</span>
          </div>
        ) : (
          <a href="signin">
            <button className="loginBtn">로그인</button>
          </a>
        )}
      </div>
    </header>
  );
}

export default Navbar;
