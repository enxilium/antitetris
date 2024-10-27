import React from "react";

import Preview from "/src/components/Preview";

const Previews = ({ tetrominoes }) => {
  // We want everything except the first one
  const previewTetrominoes = tetrominoes[1];

  return (
    <div className="Previews">
        <Preview tetromino={previewTetrominoes}/>
    </div>
  );
};

export default React.memo(Previews);
