import React from 'react';
import './ExitButton.css';

function ExitButton({ onClick }) {
  return (
    <button className="exit-button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19v-3q0-.425.288-.712T4 15q.425 0 .713.288T5 16v3h14V5H5v3q0 .425-.288.713T4 9q-.425 0-.712-.288T3 8V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm6.65-8H4q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h7.65L9.8 9.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L14.8 11.3q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-3.575 3.575q-.3.3-.712.288T9.8 16.25q-.275-.3-.288-.7t.288-.7z" /></svg>
      Leave Room
    </button>
  );
};

export default ExitButton;
