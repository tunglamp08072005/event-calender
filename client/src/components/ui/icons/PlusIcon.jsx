function PlusIcon(props) {
  const svgAttributes = {
    stroke: "currentColor",
    fill: "currentColor",
    strokeWidth: 0,
    viewBox: "0 0 20 20",
    height: "1.3em",
    width: "1.3em",
    ...props,
  };

  const pathAttributes = {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
  };

  return (
    <svg {...svgAttributes}>
      <path {...pathAttributes} />
    </svg>
  );
}

export default PlusIcon;
