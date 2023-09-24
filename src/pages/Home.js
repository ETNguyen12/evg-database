import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebaseDb from "../firebase";
import Modal from "react-modal"; 
import "./Home.css";
import arrow from "../assets/arrow.png";

Modal.setAppElement("#root"); 

const Home = () => {
  const [data, setData] = useState({});
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    firebaseDb.child("evgs").on("value", (snapshot)=> {
      if (snapshot.val() != null) {
        setData(snapshot.val());
      }
      else{
        setData({});
      }
    })

    return () => {
      setData({});
    };
  }, []);

  const handleDelete = (id) => {
    if(window.confirm("Confirm Deletion")){
      firebaseDb.child(`evgs/${id}`).remove((err) => {
        if(err){
          toast.error(err);
        }
        else {
          toast.success("Game Deleted Successfully!")
        }
      })
    }
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const getValidEVG = (valid) => {
    return valid === "Yes" ? "validEVG" : valid === "No" ? "invalidEVG" : "";
  };

  const toggleModal = (id) => {
    if (selectedRowId === id) {
      setSelectedRowId(null);
    } else {
      setSelectedRowId(id);
    }
  
    if (!modalIsOpen) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  
    setModalIsOpen(!modalIsOpen);
  };

  const closeAndToggleModal = (id) => {
    toggleModal(id); 
  };

  return (
    <div className="entireHome">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head">Actions</th>
            <th className="table-head">#</th>
            <th className="table-head">Valid EVG</th>
            <th className="table-head">Game Title</th>
            <th className="table-head">Source</th>
            <th className="table-head">Keyword(s)</th>
            <th className="table-head">Researcher</th>
            <th className="table-head">Exclusion Notes</th>
            <th className="table-head">Date Published</th>
            <th className="table-head">Creator/Developer(s)</th>
            <th className="table-head">Publisher(s)</th>
            <th className="table-head">Used in classrooms?</th>
            <th className="table-head">Downloadable</th>
            <th className="table-head">Ongoing Support?</th>
            <th className="table-head">Subject #1</th>
            <th className="table-head">Subject #2</th>
            <th className="table-head">Other Subjects</th>
            <th className="table-head">Education Level</th>
            <th className="table-head">Colleges using the game</th>
            <th className="table-head">Cost</th>
            <th className="table-head">Genre</th>
            <th className="table-head">Tag(s)</th>
            <th className="table-head">2D or 3D?</th>
            <th className="table-head">Sound?</th>
            <th className="table-head">Platform(s)</th>
            <th className="table-head">Available in Spanish?</th>
            <th className="table-head">Available in other languages?</th>
            <th className="table-head">Additional Notes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id} className={getValidEVG(data[id].valid)}>
                <td>
                  <button
                    className="button toggleButton"
                    onClick={() => toggleModal(id)}
                  >
                    <img src={arrow} alt="Toggle Buttons" />
                  </button>
                </td>
                <th scope="row">{index + 1}</th>
                <td>{data[id].valid}</td>
                <td><a href={data[id].url}>{truncateText(data[id].gameTitle, 50)}</a></td>
                <td>{truncateText(data[id].source, 30)}</td>
                <td>{truncateText(data[id].keywords, 30)}</td>
                <td>{data[id].researcher}</td>
                <td>{truncateText(data[id].exclusionNotes, 40)}</td>
                <td>{data[id].yearPublished}</td>
                <td>{truncateText(data[id].gameCreator, 30)}</td>
                <td>{truncateText(data[id].gamePublisher, 30)}</td>
                <td>{data[id].beingUsed}</td>
                <td>{data[id].downloadable}</td>
                <td>{data[id].support}</td>
                <td>{truncateText(data[id].subject1, 30)}</td>
                <td>{truncateText(data[id].subject2, 30)}</td>
                <td>{truncateText(data[id].subjectRemainder, 30)}</td>
                <td>{data[id].level}</td>
                <td>{truncateText(data[id].collegesUsing, 30)}</td>
                <td>{truncateText(data[id].cost, 30)}</td>
                <td>{truncateText(data[id].genre, 25)}</td>
                <td>{truncateText(data[id].tags, 30)}</td>
                <td>{data[id].dimension}</td>
                <td>{data[id].sound}</td>
                <td>{truncateText(data[id].platforms, 30)}</td>
                <td>{data[id].spanish}</td>
                <td>{truncateText(data[id].languages, 30)}</td>
                <td>{truncateText(data[id].additionalNotes, 40)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {modalIsOpen && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="button-group">
              <Link to={`/update/${selectedRowId}`}>
                <button 
                  className="button editButton"
                  onClick={() => closeAndToggleModal(selectedRowId)}
                >Edit</button>
              </Link>
              <Link to={`/view/${selectedRowId}`}>
                <button 
                  className="button viewButton"
                  onClick={() => closeAndToggleModal(selectedRowId)}
                >View</button>
              </Link>
              <button
                className="button deleteButton"
                onClick={() => {
                  handleDelete(selectedRowId);
                  closeAndToggleModal(selectedRowId);
                }}
              >
                Delete
              </button>
              <button className="close-modal" onClick={toggleModal}>
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home