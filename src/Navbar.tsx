import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
interface NavbarProps {
  BackgroundclassName: string;
}
const  Navbar: React.FC<NavbarProps>=({BackgroundclassName})=> {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (): void => {
    console.log("pressed")
    setMenuOpen((prevState) => !prevState);
  };
    

  const closeMenu=():void=>{
    console.log("closing")
      setMenuOpen(false);
    }

  return (
    <>
      {/* header section strats */}
      <header className={BackgroundclassName} >
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <NavLink to="/" className="navbar-brand">
            Name
              </NavLink>
            <div className="" id="">
              <div className={menuOpen ? "custom_menu-btn menu_btn-style" : "custom_menu-btn"}>
              <button onClick={toggleMenu} >
                <span className="s-1"> </span>
                <span className="s-2"> </span>
                <span className="s-3"> </span>
              </button>
              <div id="myNav" className={menuOpen ? "overlay menu_width" : "overlay"}>
                <div className="overlay-content">
                  <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                  <NavLink to="/products" onClick={closeMenu}>Shop</NavLink>
                  <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
                </div>
              </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* end header section */}
    </>
  );
}

export default Navbar
