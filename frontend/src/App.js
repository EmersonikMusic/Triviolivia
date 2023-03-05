import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState([]);
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [eras, setEras] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('api/questions/')

      setQuestion(response.data);
      console.log(response.data);
    

    axios.get('api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('api/difficulties/')
      .then(response => {
        setDifficulties(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('api/eras/')
      .then(response => {
        setEras(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    
    }
    fetchData();
  }, []);
  
    const handleEraChange = (event) => {
      const selectedEras = Array.from(event.target.selectedOptions, option => option.value);
      // Do something with the selected eras
    };

    const handleCategoryChange = (event) => {
      const categoryId = event.target.value;
      setSelectedCategory(categoryId);
    };
  
    const handleDifficultyChange = (event) => {
      const difficultyId = event.target.value;
      setSelectedDifficulty(difficultyId);
    };

    const handleNewQuestion = async () => {
      const response = await axios.get('api/questions/', {
        params: {
          category: selectedCategory,
          difficulty: selectedDifficulty,
        },
      });
      setQuestion(response.data)};

  return (
    <div>
      {question.map((question) => (
        <div key={question.id}>
          <h2>{question.text}</h2>
          <p>{question.answer}</p>
          <p>Category: {question.category_name}</p>
          <p>Difficulty: {question.difficulty_name}</p>
          <p>Eras: {question.eras}</p>
        </div>
      ))}
      <div>
        <label htmlFor="category">Select a category:</label>
        <select name="category" id="category" onChange={handleCategoryChange}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br></br>
        <label htmlFor="difficulty">Select a difficulty:</label>
      <select name="difficulty" id="difficulty" onChange={handleDifficultyChange}>
        {difficulties.map(difficulty => (
          <option key={difficulty.id} value={difficulty.id}>
            {difficulty.name}
          </option>
        ))}
      </select>
      <br></br>
      <label htmlFor="eras">Select eras:</label>
      <select name="eras" id="eras" multiple onChange={handleEraChange}>
        {eras.map(era => (
          <option key={era.id} value={era.id}>
            {era.name}
          </option>
        ))}
      </select>
      <br></br>
      <button onClick={handleNewQuestion}>Get a new question</button>
      </div>
    </div>
  );
}

export default App;