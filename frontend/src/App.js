import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/questions/?category=4&difficulty=2');
      setQuestion(response.data);
      console.log(response.data);
    }
    fetchData();
  }, []);

  const handleNewQuestion = async () => {
    const response = await axios.get('api/questions/');
    setQuestion(response.data);
  };

  return (
    <div>
      {question.map((question) => (
        <div key={question.id}>
          <h2>{question.text}</h2>
          <p>{question.answer}</p>
          <p>Category: {question.category}</p>
          <p>Difficulty: {question.difficulty}</p>
          <p>Eras: {question.eras}</p>

          <button onClick={handleNewQuestion}>Get a new question</button>
        </div>
      ))}
    </div>
  );
}

export default App;
