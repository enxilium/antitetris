import React from "react";

import Preview from "./Preview";

const Previews = ({ tetrominoes }) => {
  // We'll now show the next 3 pieces instead of just the next one
  const previewTetrominoes = tetrominoes.slice(0, 3);

  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);
