import React from 'react';
import spinner from './spinner.gif';

// export default () => {
//     <Fragment>
//         <img
//          src={spinner}
//          style={{ width: '200px' , margin: 'auto' , display:'block'}}
//          alt='Loading...'
//        />
//     </Fragment>
// };
const Spinner = () => {
    return (
        <img
          src={spinner}
          style={{ width: "200px", margin: "auto", display: "block" }}
          alt='Loading..'
        />
    );
  };
   
  export default Spinner;