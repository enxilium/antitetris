import React from "react";

import Preview from "/src/components/Preview";

const Previews = ({ tetrominoes }) => {
  // We want everything except the first one
  const previewTetrominoes = tetrominoes.slice(1);

  return (
    <div className="Previews">
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </div>
  );
};

export default React.memo(Previews);
