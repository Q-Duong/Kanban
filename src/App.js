import React, { useEffect, useState } from "react";

import List from "./Components/List/List";
import Board from "./Components/Board/Board";
import "./App.css";
import Editable from "./Components/Editabled/Editable";

function App() {

  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem('prac-kanban')) ||
    [{ id: 1, title: "Default", list: []}]
  );
   
  const [activeBoard, setActiveBoard] = useState(boards[0])

  const [lists, setLists] = useState(activeBoard.list);

  const [targetCard, setTargetCard] = useState({
    bid: "",
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
    const tempBoards = [...boards];
    if(boards.find(board => board.title === name)){
      window.alert('Trùng tên board');
      return;
    }
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      list: []
    });
    setBoards(tempBoards);
  };

  const changeActiveBoard = (id) => {
    const tempActiveBoard = boards.find(board => board.id === id);
    activeBoard.list = lists;
    localStorage.setItem("prac-kanban", JSON.stringify(boards))
    setActiveBoard(tempActiveBoard);
  }

  const removeList = (id) => {
    const index = lists.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempLists = [...lists];
    tempLists.splice(index, 1);
    setLists(tempLists);
  };

  const removeboard = (id) => {
    const tempBoards = boards.filter((item) => item.id !== id);
    if (tempBoards.length === 0)
      tempBoards.push({
        id: 1, title: "Default", list: []
      });      
  
    if (activeBoard.id === id)
      setActiveBoard(tempBoards[0]);
    setBoards(tempBoards);
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


    const tempLists = [...lists];
    const sourceCard = tempLists[s_listIndex].cards[s_cardIndex];
    tempLists[s_listIndex].cards.splice(s_cardIndex, 1);
    tempLists[t_listIndex].cards.unshift(sourceCard);
    setLists(tempLists);

    setTargetCard({
      bid: ""
    });
  };

  const dragEntered = (bid) => {
    if (targetCard.bid === bid) return;
    setTargetCard({
      bid
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
    activeBoard.list = lists;
    localStorage.setItem("prac-kanban", JSON.stringify(boards))
  }, [boards,lists]);

  
  useEffect(() => {
    setLists(activeBoard.list);
  }, [activeBoard]);

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

      <div className="app_lists_container">
        <Board
        boards={boards}
        addboardHandler={addboardHandler}
        changeActiveBoard={changeActiveBoard}
        removeBoardHandler={removeboard}
      >
      </Board>
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
