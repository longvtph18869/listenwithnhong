import React from "react"
import Search from "./SearchBox"
import NavArrows from "./NavArrows"
import NavLinks from "./NavLinks"
import "./style.css"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center bg-[color:var(--color-navbar-bg)] h-16 px-[10vw] inset-0 fixed z-50 backdrop-blur-[20px] backdrop-saturate-[180%]">
      {/* Navigation Buttons Arrow */}
      <Link to="/"><div className="zmp3-logo"></div></Link>
      {/* End Navigation Buttons Arrow */}

      {/* Navigation Links */}
      <div className="flex">
        <NavLinks toLink="/" titleLink="Khám phá" />
        <NavLinks toLink="/zingchart" titleLink="ZingChart" />
        <NavLinks toLink="/top100" titleLink="Top100" />
        <NavLinks toLink="/mv" titleLink="MV" />
      </div>
      {/* End Navigation Links */}

      {/* Search Box */}
      <Search />
      {/* End Search Box */}
    </nav>
  )
}

export default Navbar
