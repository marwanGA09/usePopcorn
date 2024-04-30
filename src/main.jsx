import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css';
import HowReactWork from './HowReactWork/HowReactWork.jsx';
import Rating from './RatingComponent/Rating.jsx';
import TextExpand from './textExpanderComponent/Text-expander.jsx';

/* 
function Test() {
  const [moveRate, setMoveRate] = useState(0);

  return (
    <div>
      <Rating maxRating={8} onSetRating={setMoveRate} />{' '}
      <p>the move was rated {moveRate}</p>
    </div>
  );
}
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Rating maxRating={3} size={11} message={['good', 'perfect', 'amazing']} /> */}
    {/* <Rating maxRating={13} size={22} color="red" defaultRating={3} /> */}
    {/* <Test /> */}
    {/* <TextExpand /> */}

    <HowReactWork />
  </React.StrictMode>
);
