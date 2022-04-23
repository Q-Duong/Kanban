import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./List.css";

function List(props) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="list">
      <div className="list_header">
        <p className="list_header_title">
          {props.list?.title}
          <span>{props.list?.cards?.length || 0}</span>
        </p>
        <div
          className="list_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="list_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeList()}>Delete List</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="list_cards custom-scroll">
        {props.list?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            listId={props.list.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add a card"
          placeholder="Enter Card Title"
          displayClass="list_add-card"
          editClass="list_add-card_edit"
          onSubmit={(value) => props.addCard(props.list?.id, value)}
        />
      </div>
    </div>
  );
}

export default List;
