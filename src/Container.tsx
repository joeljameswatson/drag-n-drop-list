import React, { useState, useCallback } from "react";
import DraggableCard from "./DraggableCard";
import update from "immutability-helper";

const style = {
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  border: "1px solid #ddd"
};

export interface Item {
  id: number;
}

const Container: React.FC = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "card a"
    },
    {
      id: 2,
      text: "card b"
    },
    {
      id: 3,
      text: "card c"
    }
  ]);
  

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [cards]
  );

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return (
      <DraggableCard key={card.id} index={index} moveCard={moveCard}>
        <div style={style}>{card.text}</div>
      </DraggableCard>
    );
  };

  return <div>{cards.map((card, i) => renderCard(card, i))}</div>;
};
export default Container;
