import React from "react";
import LogoImage from "@/assets/logo.png";
import Link from "next/link";
import classes from "./main-header.module.css";
import Image from "next/image";
import NavLink from "./nav-link";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image src={LogoImage} priority alt="logo image" />
        Foodies Food
      </Link>
      <nav className={classes.nav}>
        <ul>
          <NavLink href="/meals" abr={"Browse"}>
            Browse Meals
          </NavLink>
          <NavLink href="/community" abr={"Community"}>
            Foodies Community
          </NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
