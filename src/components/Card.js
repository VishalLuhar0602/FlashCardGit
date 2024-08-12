import { useState } from "react";
import { GoTrash } from "react-icons/go";
import { GrEdit } from "react-icons/gr";
import EditCard from "./EditCard";
import "./Card.css";

export default function Card({
  currentCard,
  cardNumber,
  deleteCard,
  updateCard,
  setCardSide,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="card-section">
      {!isEditing ? (
        <div className="small-card">
          <div className="small-card-buttons">
            <GrEdit
              className="edit-button"
              onClick={toggleEditMode}
              aria-label="Edit card"
            />
            <GoTrash
              className="delete-button"
              onClick={() => {
                setCardSide("front");
                deleteCard(currentCard);
              }}
              aria-label="Delete card"
            />

          </div>
          <p>{currentCard?.front || "No content"}</p>
        </div>
      ) : (
        <EditCard
          currentCard={currentCard}
          setEditCard={setIsEditing}
          updateCard={updateCard}
          cardNumber={cardNumber}
        />
      )}
    </div>
  );
}
