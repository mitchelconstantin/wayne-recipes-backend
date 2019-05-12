import React from 'react';

const MultiLineField = (
  {title, lines}
) => {
  return (
    <div>
      {title ? title : null}
        {lines.split("\n").map((i,key) => {
            return <p  key={key}>{i}</p>
        })}
    </div>
  )
};

export default MultiLineField;
