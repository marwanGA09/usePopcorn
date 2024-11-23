import { useRef } from 'react';

function ScrollInto() {
  const myRef = useRef(null);

  const handleScroll = () => {
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div>
      <button onClick={handleScroll}>Scroll to Element</button>
      <div style={{ height: '100vh' }}>Scroll down</div>
      <div ref={myRef} style={{ background: 'yellow' }}>
        Target Element
      </div>
    </div>
  );
}

export default ScrollInto;
