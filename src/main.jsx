import React from 'react';
// import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ContextApp from './contexts/ContextApp.jsx';
// import HowReactWork from './HowReactWork/HowReactWork.jsx';
// import Rating from './RatingComponent/Rating.jsx';
// import TextExpand from './textExpanderComponent/Text-expander.jsx';

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

// const CountButton = React.memo(function CountButton({ onClick, count }) {
//   console.log('count button with', count);
//   return <button onClick={onClick}>{count}</button>;
// });

function CountButton({ onClick, count }) {
  console.log('count button with', count);
  return <button onClick={onClick}>{count}</button>;
}

function DualCounter() {
  const [count1, setCount1] = React.useState(0);
  const increment1 = React.useCallback(() => setCount1((c) => c + 1), []);

  const [count2, setCount2] = React.useState(0);
  const increment2 = React.useCallback(() => setCount2((c) => c + 1), []);

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      {/* <button onClick={increment2}>Change {count2}</button> */}
      <CountButton count={count2} onClick={increment2} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <DualCounter /> */}
    {/* <Rating maxRating={3} size={11} message={['good', 'perfect', 'amazing']} /> */}
    {/* <Rating maxRating={13} size={22} color="red" defaultRating={3} /> */}
    {/* <Test /> */}
    {/* <TextExpand /> */}
    {/* <HowReactWork /> */}
    <ContextApp />
  </React.StrictMode>
);
