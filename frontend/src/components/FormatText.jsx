export function FormatText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong>{part.slice(2, -2)}</strong>;
        } else if (part.startsWith('*') && part.endsWith('*')) {
          return <em>{part.slice(1, -1)}</em>;
        } else {
          return part;
        }
      })}
    </>
  );
}