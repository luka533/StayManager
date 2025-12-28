function Spinner() {
  return (
    <div
      style={{
        margin: "4.8rem auto",
        width: "6.4rem",
        aspectRatio: "1",
        borderRadius: "50%",
        background: `radial-gradient(farthest-side, #3b82f6 94%, transparent) top/10px 10px no-repeat, conic-gradient(transparent 30%, #3b82f6)`,
        WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)`,
        animation: "spin 1.5s linear infinite",
      }}
    />
  );
}

export default Spinner;
