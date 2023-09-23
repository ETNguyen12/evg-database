import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import firebaseDb from "../firebase";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState({});

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

  return (
    <div className="entireHome">
      <table className="table">
        <thead>
          <tr>
            <th className="table-head th-actions">Actions</th>
            <th className="table-head th-number">#</th>
            <th className="table-head th-valid">Valid EVG</th>
            <th className="table-head">Game Title</th>
            <th className="table-head">Source</th>
            <th className="table-head">Keyword(s)</th>
            <th className="table-head">Researcher</th>
            <th className="table-head">Exclusion Notes</th>
            <th className="table-head">URL</th>
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
              <tr key={id}>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="button editButton">Edit</button>
                  </Link>
                  <Link to={`/view/${id}`}>
                    <button className="button viewButton">View</button>
                  </Link>
                  <button className="button deleteButton" onClick={() => handleDelete(id)}>Delete</button>
                </td>
                <th scope="row">{index + 1}</th>
                <td>{data[id].valid}</td>
                <td>{data[id].gameTitle.substring(0,20)}</td>
                <td>{data[id].source}</td>
                <td>{data[id].keywords}</td>
                <td>{data[id].researcher}</td>
                <td>{data[id].exclusionNotes}</td>
                <td>{data[id].url}</td>
                <td>{data[id].yearPublished}</td>
                <td>{data[id].gameCreator}</td>
                <td>{data[id].gamePublisher}</td>
                <td>{data[id].beingUsed}</td>
                <td>{data[id].downloadable}</td>
                <td>{data[id].support}</td>
                <td>{data[id].subject1}</td>
                <td>{data[id].subject2}</td>
                <td>{data[id].subjectRemainder}</td>
                <td>{data[id].level}</td>
                <td>{data[id].collegesUsing}</td>
                <td>{data[id].cost}</td>
                <td>{data[id].genre}</td>
                <td>{data[id].tags}</td>
                <td>{data[id].dimension}</td>
                <td>{data[id].sound}</td>
                <td>{data[id].platforms}</td>
                <td>{data[id].spanish}</td>
                <td>{data[id].languages}</td>
                <td>{data[id].additionalNotes}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home