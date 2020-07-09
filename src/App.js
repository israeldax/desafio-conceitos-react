import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(
      resp => setRepositories(resp.data)
    )
  }, [])


  async function handleAddRepository() {
    try {
      const resp = await api.post("/repositories", {
        title: "Repository " + Date.now(),
        url: "http://gol.com.br",
        techs: ["PHP", "Node", "JS"]
      });

      setRepositories([...repositories, resp.data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveRepository(id) {
    await api.delete("/repositories/" + id)
    setRepositories(repositories.filter(rep => rep.id !== id))
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, i) => (
          <li key={repo.id} >
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
