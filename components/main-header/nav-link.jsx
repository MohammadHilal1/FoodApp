"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

const NavLink = ({ href, children, abr }) => {
  console.log(children);
  const [linkText, setLinkText] = useState(children);
  const path = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLinkText(abr);
      } else {
        setLinkText(children);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <li>
      <Link href={href} className={path.startsWith(href) ? classes.active : ""}>
        {linkText}
      </Link>
    </li>
  );
};

export default NavLink;
