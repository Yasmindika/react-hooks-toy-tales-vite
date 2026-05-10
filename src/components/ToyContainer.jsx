import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDelete, handleLike }) {
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
        <ToyCard
          key={toy.id}
          toy={toy}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      ))}
    </div>
  );
}

export default ToyContainer;