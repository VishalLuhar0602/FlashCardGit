import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import SideBar from "../src/containers/SLideBar";
import { initialDecks } from './InitialData/initialDecks';
import "./App.css";

function App() {
  const [userDecks, setUserDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState({});
  const [addQuestionsView, setAddQuestionsView] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [cardSide, setCardSide] = useState("front");
  const [knowItCards, setKnowItCards] = useState([]);
  const [dontKnowItCards, setDontKnowItCards] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("deck-list");
    if (data) {
      setUserDecks(JSON.parse(data));
    } else {
      setUserDecks(initialDecks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("deck-list", JSON.stringify(userDecks));
  });

  const createNewDeck = () => {
    const newDeck = {
      id: userDecks.length,
      data: { name: "Click title area to name your new deck" },
      content: [],
    };
    setUserDecks([...userDecks, newDeck]);
  };

  const addCard = () => {
    const newCard = { front: "Front Side", back: "Back Side" };
    const newCardList = [...selectedDeck.content, newCard];
    const index = selectedDeck.id;

    const updatedDeckData = {
      id: index,
      data: selectedDeck.data,
      content: newCardList,
    };

    setSelectedDeck(updatedDeckData);

    const newDecks = [...userDecks];

    newDecks
      .filter((deck) => deck.id !== selectedDeck.id)
      .splice(index, 1, updatedDeckData);

    setUserDecks(newDecks);
  };

  const deleteCard = (currentCard) => {
    const filteredCardList = selectedDeck.content.filter(
      (card) => card.front !== currentCard.front
    );
    userDecks.filter((deck) => deck.id !== selectedDeck.id);

    const newSelectedDeck = {
      id: selectedDeck.id,
      data: selectedDeck.data,
      content: filteredCardList,
    };
    setSelectedDeck(newSelectedDeck);

    const newDecks = [...userDecks];
    newDecks.splice(selectedDeck.id, 1, newSelectedDeck);

    setUserDecks(newDecks);
  };

  const updateCard = (index, front, back) => {
    const newCardData = { front: front, back: back };

    const cardList = [...selectedDeck.content];
    cardList.splice(index, 1, newCardData);

    const newSelectedDeckData = {
      id: selectedDeck.id,
      data: selectedDeck.data,
      content: cardList,
    };
    setSelectedDeck(newSelectedDeckData);

    const newDecks = [...userDecks];

    newDecks.splice(selectedDeck.id, 1, newSelectedDeckData);

    setUserDecks(newDecks);
  };

  const removeDeck = (deck) => {
    const updatedDeckList = [...userDecks];
    updatedDeckList.splice(deck.id, 1);
    setUserDecks(updatedDeckList);
  };

  return (
    <div className="App">
      <SideBar
        userDecks={userDecks}
        setUserDecks={setUserDecks}
        removeDeck={removeDeck}
        createNewDeck={createNewDeck}
        addQuestionsView={addQuestionsView}
        setAddQuestionsView={setAddQuestionsView}
        selectedDeck={selectedDeck}
        setSelectedDeck={setSelectedDeck}
        addCard={addCard}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        cardSide={cardSide}
        setCardSide={setCardSide}
        deleteCard={deleteCard}
        updateCard={updateCard}
      />
      <HomePage
        userDecks={userDecks}
        setUserDecks={setUserDecks}
        quizMode={quizMode}
        setQuizMode={setQuizMode}
        selectedDeck={selectedDeck}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
        cardSide={cardSide}
        setCardSide={setCardSide}
        deleteCard={deleteCard}
        knowItCards={knowItCards}
        setKnowItCards={setKnowItCards}
        dontKnowItCards={dontKnowItCards}
        setDontKnowItCards={setDontKnowItCards}
      />
    </div>
  );
}

export default App;