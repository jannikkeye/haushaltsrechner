export const Pattern = () => {
  return (
    <svg width="100%" height="100%">
      <pattern
        id="diagonalHatch"
        patternUnits="userSpaceOnUse"
        width="8"
        height="8"
      >
        <path
          d="M-2,2 l4,-4
    M0,8 l8,-8
    M6,10 l4,-4"
          className={`stroke-purple-200 stroke-1`}
        />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#diagonalHatch)" />
    </svg>
  );
};
