import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import '../Board/Board.css'


const Side = props => {
    const { boards, addboardHandler, changeActiveBoard, removeBoardHandler } = props;

    function handleAddBoard(e) {
        e.preventDefault();
        if (addboardHandler)
            addboardHandler(e.target.boardName.value);
    }

    function handleChangeActiveBoard(id) {
        if (changeActiveBoard)
            changeActiveBoard(id);
    }

    function handleRemoveBoard(id) {
        if (removeBoardHandler)
            removeBoardHandler(id);
    }
    return (
        <>
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/"
            >
                <div className="sidebar-sticky"></div>
                {
                    boards.map(board => (
                        <Nav.Item >
                            <button onClick={() => {handleChangeActiveBoard(board.id)}}>{board.title}</button>
                            <button onClick={() => {handleRemoveBoard(board.id)}}>xoa</button>
                        </Nav.Item>
                    ))
                }
            </Nav>
            <Nav.Item>
                 <form onSubmit={handleAddBoard}>
                    <input type="text" placeholder="nhap ten board" name="boardName"></input>
                    <input type="submit" value="add"></input>
                </form>
            </Nav.Item>
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar