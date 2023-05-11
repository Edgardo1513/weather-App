import { useState } from "react";

const Navbar = ({valueOut}) => {

  // Estado que guarda el valor del input
  const [value, setValue] = useState("")

  // fucntion que setea el estado value cada vez que se presiona la tecla enter
  function handleKeyEnter(e) {
    if(e.key === "Enter") valueOut(value)
  }
  // fucntion que cambia a modo dark
  function handleClickDark(){
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className="header">
      <nav className="nav container">
        <a href="/" className="nav__logo">
          WEATHERS APP
        </a>
        <div className="nav__menu">
          <input type="text" onKeyDown={handleKeyEnter} onChange={ (e) => setValue(e.target.value) } placeholder="Search Country or city" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
          >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
          </svg>
        </div>
        <div className="nav__buttons">
          <button type="button" onClick={handleClickDark} className="nav__btn btn--dark">
            <i id="i--dark" className="bx bxs-sun bx-spin"></i>
            
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
