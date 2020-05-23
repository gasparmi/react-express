/* Must have these two line for @emotion/code to work*/
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Global } from '@emotion/core';

import Customers from './components/Customers';


const pageStyles = css`
  body {
    margin: 15px 0 0 0;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    font-size: 18px;
    text-align: center;
    min-height: 100%;
  }
`;

export default function App() {
  return (
    <div>
      <Global styles={pageStyles} />
      <Customers />
    </div>
  );
}
