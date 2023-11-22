import { useState, useEffect } from "react";
import "./Navbar.css";
import Logo from "../../assets/icons/Logo";
import API from "../../utils/api";

const Navbar = ({ isFolderPage }: { isFolderPage: boolean }) => {
  const [userData, setUserData] = useState<{
    id: number;
    created_at: string;
    name: string;
    image_source: string;
    email: string;
    auth_id: string;
  } | null>(null);
  const userId = 1;

  useEffect(() => {
    fetch(API.USER.DATA(userId))
      .then((response) => response.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setUserData(data.data[0]);
        }
      });
  }, []);

  return (
    <header className={`header ${isFolderPage ? "folder-page" : "share-page"}`}>
      <div className="header-content">
        <a href="/">
          <Logo className="logo" alt="logo" />
        </a>
        {userData ? (
          <div className="profile">
            <img
              src={userData.image_source}
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
};

export default Navbar;