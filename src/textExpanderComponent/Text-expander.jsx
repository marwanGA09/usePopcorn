import { useState } from 'react';
import './textEx.css';

export default function TextExpand() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. the stuff of dreams and science fiction, but
        believe it or not, space travel is a real thing. Humans and robots are
        constantly venturing out into the cosmos to uncover its secrets and push
        the boundaries of whats possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while its not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what wll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  className,
  children,
  collapsedNumWords = 0,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  buttonColor = 'blue',
  expanded = false,
}) {
  const [expand, setExpand] = useState(expanded);

  function handleClick() {
    setExpand(!expand);
  }
  const expandChar = 100;
  return (
    <div className={className}>
      {expand
        ? children
        : collapsedNumWords
        ? `${children.slice(0, children.length - collapsedNumWords * 5)}...`
        : `${children.slice(0, expandChar)}...`}
      <span
        style={{ color: buttonColor, cursor: 'pointer', padding: '2px 4px' }}
        onClick={handleClick}
      >
        {expand ? collapseButtonText : expandButtonText}
      </span>
    </div>
  );
}
