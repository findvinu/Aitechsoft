import React from "react";
import Button from "@mui/material/Button";
import styles from "./Button.module.css";

const ButtonComponent = ({ variant, onClick, children, ...props }) => {
  const buttonClass = (variant) => {
    switch (variant) {
      case "contained":
        return styles.contained;
      case "outlined":
        return styles.outlined;
      case "text":
        return styles.text;
      default:
        return "";
    }
  };
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`${styles.button} ${buttonClass(variant)}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonComponent;
