import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const authLinks = [
  { name: "provider", to: "/auth/provider", text: "Sign in with O-Auth" },
  { name: "login", to: "/auth/login", text: "Sign in with email and password" },
  { name: "signup", to: "/auth/signup", text: "Create a new account" },
  { name: "forgot", to: "/auth/forgotpassword", text: "Forgot Password?" },
];

export default function FormFooterLinks({ classes, mode }) {
  const linksShown = authLinks.filter((link) => link.name !== mode);
  return (
    <Typography className={classes.root}>
      {linksShown.map((link) => (
        <Link key={link.name} to={link.to} className={classes.link}>
          {link.text}
        </Link>
      ))}
    </Typography>
  );
}
