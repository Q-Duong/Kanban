import React, { useEffect, useState } from "react";

import List from "./Components/List/List";
import Board from "./Components/Board/Board";
import "./App.css";
import Editable from "./Components/Editabled/Editable";



function App() {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addlistHandler = (name) => {
    const tempLists = [...lists];
    tempLists.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setLists(tempLists);
  };

  const addboardHandler = (name) => {
    const tempBoards = [...lists];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      // cards: [],
    });
    setBoards(tempBoards);
  };

  const removeList = (id) => {
    const index = lists.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempLists = [...lists];
    tempLists.splice(index, 1);
    setLists(tempLists);
  };

  const removeboard = (id) => {
    const index = lists.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setLists(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = lists.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempLists = [...lists];
    tempLists[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      members: [],
    });
    setLists(tempLists);
  };

  const removeCard = (bid, cid) => {
    const index = lists.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempLists = [...lists];
    const cards = tempLists[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setLists(tempLists);
  };

  const dragEnded = (bid, cid) => {
    let s_listIndex, s_cardIndex, t_listIndex, t_cardIndex;
    s_listIndex = lists.findIndex((item) => item.id === bid);
    if (s_listIndex < 0) return;

    s_cardIndex = lists[s_listIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_listIndex = lists.findIndex((item) => item.id === targetCard.bid);
    if (t_listIndex < 0) return;

    t_cardIndex = lists[t_listIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempLists = [...lists];
    const sourceCard = tempLists[s_listIndex].cards[s_cardIndex];
    tempLists[s_listIndex].cards.splice(s_cardIndex, 1);
    tempLists[t_listIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setLists(tempLists);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = lists.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempLists = [...lists];
    const cards = tempLists[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempLists[index].cards[cardIndex] = card;

    setLists(tempLists);
  };

  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(lists));
  }, [lists]);

  return (
    <div className="app">
      
      <div className="topnav">
        <a className="active" href="#home">Trello</a>
        <a href="#about">Workspaces</a>
        <a href="#contact">Recent</a>
        <a href="#about">Starred</a>
        <a href="#contact">Templates</a>
        <input type="text" placeholder="Search.." />
      </div>
      <Board></Board>

      <div className="app_lists_container">
        <div className="app_lists">
          {lists.map((item) => (
            <List
              key={item.id}
              list={item}
              addCard={addCardHandler}
              removeList={() => removeList(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_lists_last">
            <Editable
              displayClass="app_lists_add-list"
              editClass="app_lists_add-list_edit"
              placeholder="Enter List Name"
              text="+ Add anorther list"
              buttonText="Add List"
              onSubmit={addlistHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
