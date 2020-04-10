import React, { useState, useEffect } from "react";
import api from './services/api';
//import { useState } from 'react';
//import { useEffect } from 'react';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    //const response = await api.get('repositories');
    //setRepositories(response.data)
    api.get('repositories').then(response => setRepositories(response.data));

  }, []);

  async function handleAddRepository() {
    
    const data = {
      title: `Desafio Novo Repositorio ${Date.now()}`, 
      url: "http://github.com/rildomaster", 
      techs: ["Node.js", "React.js"]
    };

    api.post('repositories', data)
       .then(response => setRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    
    api.delete(`repositories/${id}`)
       .then(() => {

         const repositoriesTemp = [ ...repositories ];
         const repositoryIndex = repositoriesTemp.findIndex(repository => repository.id === id);
         repositoriesTemp.splice(repositoryIndex, 1);
         setRepositories(repositoriesTemp);

       })
       .catch(error => alert(`Error on delete repository:\n${error.response.data.error}`));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => {
          return (
            <li key={id}>
              {title}
              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
