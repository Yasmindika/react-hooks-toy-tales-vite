import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((prev) => !prev);
  }

  // GET all toys
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  // POST toy
  function addToy(newToy) {
    setToys([...toys, newToy]);
  }

  // DELETE toy
  function handleDelete(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys(toys.filter((toy) => toy.id !== id));
    });
  }

  // PATCH like toy
  function handleLike(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((t) =>
          t.id === updatedToy.id ? updatedToy : t
        );
        setToys(updatedToys);
      });
  }

  return (
    <>
      <Header />

      {showForm ? (
        <ToyForm setToys={setToys} toys={toys} />
      ) : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        handleDelete={handleDelete}
        handleLike={handleLike}
      />
    </>
  );
}

export default App;