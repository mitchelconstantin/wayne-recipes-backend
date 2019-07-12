import React from 'react';

export default (props) => {
  return (
        <div>
          {props.title ? props.title : null}
            {props.lines.split("\n").map((i,key) => {
                return <p  key={key}>{i}</p>
            })}
        </div>
      );
}