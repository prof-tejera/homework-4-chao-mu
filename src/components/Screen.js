import "./Screen.css";

const Screen = ({ history, total, entry }) => {
  const historySegments = history.reduce((segments, tok) => {
    // If it is a string, append
    if (isNaN(tok)) {
      const lastIdx = segments.length - 1;

      return [...segments.slice(0, lastIdx), [...segments[lastIdx], tok]];
    }

    // If it is a number, start a new line
    return [...segments, [tok]];
  }, []);
  return (
    <div className="Screen">
      <ul>
        {historySegments.map((segment, idx) => (
          <li key={idx}>
            {segment.map((tok, tokIdx) => (
              <span key={tokIdx}>{tok}</span>
            ))}
          </li>
        ))}
        <li>{entry}</li>
      </ul>
    </div>
  );
};

export default Screen;
