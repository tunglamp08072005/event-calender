function UserIcon(props) {
  const commonProps = {
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
    d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  };

  return (
    <svg {...commonProps}>
      <path {...pathProps} />
    </svg>
  );
}

export default UserIcon;
