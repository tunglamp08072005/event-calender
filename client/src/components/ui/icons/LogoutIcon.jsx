function LogoutIcon(props) {
  const iconProps = {
    stroke: "currentColor",
    fill: "none",
    strokeWidth: "0",
    viewBox: "0 0 24 24",
    height: "1.3em",
    width: "1.3em",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
  };

  const pathProps = {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
  };

  return (
    <svg {...iconProps}>
      <path {...pathProps} />
    </svg>
  );
}

export default LogoutIcon;
