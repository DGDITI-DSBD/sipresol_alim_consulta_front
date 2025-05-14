import React from 'react';

// type DividerProps = {
//   width?: string;
// };
// export const Divider = ({ width = 'w-64' }: DividerProps) => {
export const Divider = ({ width = 'w-64' }) => {
  return (
    <div className={`w-full mb-4`}>
      <div
        className={`h-1 mx-auto bg-[#8a2036] ${width} opacity-25 my-0 py-0 rounded-t mb-10`}
      ></div>
    </div>
  );
};

export default Divider;
