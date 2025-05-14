import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function SidebarLinkGroup({
  children,
  activecondition,
  bloqueo=false ,
}) {

  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  }

  const { profile } = useSelector( state => state.auth );

  // if( profile === 1 ) bloqueo = false;

  return (
    <li className={`${bloqueo ? 'hidden' : ''}  px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-colorAuxiliar'}`}>
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;