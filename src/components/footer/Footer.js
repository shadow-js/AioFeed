import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

import Icon from "react-icons-kit";
import { github } from "react-icons-kit/icomoon/github";
import { home } from "react-icons-kit/icomoon/home";
import { feed } from "react-icons-kit/icomoon/feed";
import { ic_account_circle } from "react-icons-kit/md/ic_account_circle";
import { email } from "react-icons-kit/entypo/email";

import style from "./Footer.module.scss";

const Footer = () => {
  return (
    <div id={style.footer}>
      <div>
        <ul>
          <li>
            <Nav.Link as={NavLink} to='/'>
              <Icon icon={home} size={20} style={{ paddingRight: "0.75rem" }}></Icon>
              Home
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to='/feed'>
              <Icon icon={feed} size={20} style={{ paddingRight: "0.75rem" }}></Icon>
              Feed
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to='/account'>
              <Icon icon={ic_account_circle} size={20} style={{ paddingRight: "0.75rem" }}></Icon>
              Account
            </Nav.Link>
          </li>
          <li>
            <Nav.Link as={NavLink} to='/account/create'>
              <Icon
                icon={ic_account_circle}
                size={20}
                style={{ paddingRight: "0.75rem", color: "grey" }}></Icon>
              Create account
            </Nav.Link>
          </li>
        </ul>
      </div>
      <div id={style.centerText}>
        <p>Test text</p>
        <p>Test text</p>
        <p className={style.centerBottomText}>
          <Nav.Link as={NavLink} to='/legality#Conditions'>
              Conditions of Use
          </Nav.Link>
          <Nav.Link as={NavLink} to='/legality#Privacy'>
            Privacy Notice
          </Nav.Link>
          © 2020 Skåne Sweden, Robin Persson. No rights reserved.
        </p>
      </div>
      <div>
        <ul>
          <li>
            <a href='https://github.com/mambans/Notifies'>
              {" "}
              <Icon icon={github} size={20} style={{ paddingRight: "0.75rem" }}></Icon>
              Github-Notifies
            </a>
          </li>
          <li>
            <button
              className={style.buttonLinks}
              onClick={() => {
                window.open("mailto:perssons1996@gmail.com?subject=subject&body=body");
              }}>
              <Icon icon={email} size={20} style={{ paddingRight: "0.75rem" }}></Icon>
              Email
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;