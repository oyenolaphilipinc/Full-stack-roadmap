import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState({ text: 'Loading...', author: 'Author' });

  useEffect(() => {
    getRandomQuote();
  }, []); // Empty dependency array ensures that this effect runs once when the component mounts

  const getRandomQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        setQuote(randomQuote);
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  };

  return (
    <div className="App">
      <div id="quote-container">
        <p id="quote-text">{quote.text}</p>
        <p id="author">{quote.author || 'Unknown'}</p>
        <button id="new-quote-btn" onClick={getRandomQuote}>New Quote</button>
      </div>
    </div>
  );
}

export default App;
