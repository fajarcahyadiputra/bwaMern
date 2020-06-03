import React from "react";
//react router dom untuk link navigasi
import { Link } from "react-router-dom";
//react propstype untuk check
import propTypes from "prop-types";

export default function Button(props) {
  //membuat variable array class name
  const className = [props.className];

  //validasi untuk mengechek jika ada maka push ke dalam array classname
  if (props.isSmall) className.push("btn-sm");
  if (props.isLarge) className.push("btn-lg");
  if (props.isBlock) className.push("btn-block");
  if (props.hasShadow) className.push("btn-shadow");
  if (props.isPrimary) className.push("btn-sm");

  //untuk validasi jika ada onclik lakukan onclick
  const onClick = () => {
    if (props.onClick) props.onClick();
  };
  //untuk eksekusi apakah ada loading
  if (props.isDisabled || props.isLoading) {
    if (props.isDisabled) className.push("disabled");
    return (
      <span className={className.join(" ")} style={props.style}>
        {props.isLoading ? (
          //penyingkat react.fragment dengan <></>
          <>
            <span className="spinner-border spinner-border-sm mx-5"></span>
            <span className="sr-only">Loading..</span>
          </>
        ) : (
          props.children
        )}
      </span>
    );
  }

  //UNTUK MENGECEK APAKAH PROPS TYPE ADALAH LINK
  if (props.type === "link") {
    //untuk mengecek apakah link dari ecternal atau dari internal
    if (props.isExternal) {
      //jika link external return ini
      return (
        <a
          href={props.href}
          className={className.join(" ")}
          style={props.style}
          target={props.target === "_blank" ? "_blank" : undefined}
          //noopener norefererr untuk sio
          rel={props.target === "_blank" ? "noopener norefererr" : undefined}
        >
          {props.children}
        </a>
      );
    } else {
      //jika link internal return ini
      return (
        <Link
          to={props.href}
          className={className.join(" ")}
          style={props.style}
          onClick={onClick}
        >
          {props.children}
        </Link>
      );
    }
  }

  //return button
  return (
    <button
      className={className.join(" ")}
      style={props.style}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}

//untuk mengecek propstypes
Button.propTypes = {
  type: propTypes.oneOf(["button", "link"]),
  href: propTypes.string,
  isPrimary: propTypes.bool,
  onClick: propTypes.func,
  target: propTypes.string,
  isSmall: propTypes.bool,
  isLoading: propTypes.bool,
  isDisabled: propTypes.bool,
  isLarge: propTypes.bool,
  isExternal: propTypes.bool,
  isBlock: propTypes.bool,
  hasShadow: propTypes.bool,
};
