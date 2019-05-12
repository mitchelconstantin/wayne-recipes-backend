import React from 'react';

function MultiLineField(props) {
  return (
        <div>
          {props.title ? props.title : null}
            {props.lines.split("\n").map((i,key) => {
                return <p  key={key}>{i}</p>
            })}
        </div>
      );
}

export default MultiLineField;
