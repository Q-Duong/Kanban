import React from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import {
    Clipboard,
    Delete,
    Trash,
    Trash2
  } from "react-feather";
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
                            <div className="Board_display">
                                <div className="Board_info">
                                    <Clipboard size='18px' className="board_i"/>
                                    <p className="Board_title" onClick={() => {handleChangeActiveBoard(board.id)}}>{board.title}</p>
                                </div>
                                <div className="Btn_Del">
                                    <Trash2 className="board_i" size='18px'  onClick={() => {handleRemoveBoard(board.id)}} />
                                </div>
                            </div>
                        </Nav.Item>
                    ))
                }
                <Nav.Item>
                <div className="input_vl">
                     <form onSubmit={handleAddBoard} >
                        <input type="text" placeholder="Add board" name="boardName" className="input_Name" required></input>
                        <input type="submit" value="Add" className="add_button"></input>
                    </form>
                </div>
                </Nav.Item>
            </Nav>
            
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar