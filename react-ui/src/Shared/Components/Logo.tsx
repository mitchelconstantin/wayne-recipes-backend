import React from 'react';
import logo from './logo.svg';

const goHome = () => (window.location.href = '/all');

interface Props {
  className: any;
}
export const Logo = ({ className }: Props) => {
  return <img className={className} onClick={goHome} src={logo} alt={'Logo'} />;
};
