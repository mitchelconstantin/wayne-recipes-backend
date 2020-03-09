import React, { useRef, useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
export const OverflowTip = ({ title, classes }) => {
  // Create Ref
  const textElementRef = useRef();

  useEffect(() => compareSize());

  // Define state and function to update the value
  const [hoverStatus, setHover] = useState(false);

  const compareSize = () => {
    const compare =
      textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  };

  return (
    <Tooltip
      title={title}
      interactive
      disableHoverListener={!hoverStatus}
      className={classes}
    > 
      <div ref={textElementRef} className={classes}>
        {title}
      </div>
    </Tooltip>
  );
};
