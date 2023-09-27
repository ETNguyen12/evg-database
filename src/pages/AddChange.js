import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './AddChange.css';
import firebaseDb from '../firebase';
import { toast } from "react-toastify";

const initialState = {
  valid: "No",
  gameTitle: "",
  source: "",
  keywords: "",
  researcher: "",
  exclusionNotes: "",
  url: "",
  yearPublished: "",
  gameCreator: "",
  gamePublisher: "",
  beingUsed: "",
  downloadable: "",
  support: "",
  subject1: "",
  subject2: "",
  subjectRemainder: "",
  level: "",
  collegesUsing: "",
  cost: "",
  genre: "",
  tags: "",
  dimension: "",
  sound: "",
  platforms: "",
  spanish: "",
  languages: "",
  additionalNotes: ""
}

const AddChange = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const {valid, gameTitle, source, keywords, researcher, exclusionNotes, url, yearPublished,
  gameCreator, gamePublisher, beingUsed, downloadable, support, subject1,
  subject2, subjectRemainder, level, collegesUsing, cost, genre, tags, dimension,
  sound, platforms, spanish, languages, additionalNotes} = state;

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setState({ ...state, [name]: checked ? "Yes" : "No" });
  };
  
  const handleIOChange = (e) => {
    const {name, value} = e.target;
    setState({ ...state, [name]: value });
  };

  const navigate = useNavigate();

  const {id} = useParams();

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
  }, [id]);

  useEffect(() => {
    if(id) {
      setState({...data[id]});
    }
    else{
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!gameTitle) {
      toast.error("Game Title Needed!")
    }
    else {
      if(!id) {
        firebaseDb.child("evgs").push(state, (err) => {
          if (err) {
            toast.error(err);
          }
          else{
            toast.success("Game Added Successfully!")
          }
        })
      }
      else {
        firebaseDb.child(`evgs/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          }
          else{
            toast.success("Game Updated Successfully!")
          }
        })
      }

      setTimeout(() => {navigate("/"); }, 500);
    }
  };

  return (
    <div className='entire'>
      <form onSubmit={handleSubmit}>
          <div className='mainEntry'>
            <label htmlFor='valid'>Valid EVG? </label>
            <input 
              type='checkbox' 
              id='valid' 
              name='valid' 
              checked={valid === "Yes"}
              value={valid}
              onChange={handleCheckboxChange}
            />
          </div>

        <div className='entryContainer'>
          <div className='entryField type1'>
            <label htmlFor='gameTitle'>Game Title: </label>
            <input 
              type='text' 
              id='gameTitle' 
              name='gameTitle' 
              value={gameTitle}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField type2'>
            <label htmlFor='source'>Source: </label>
            <input 
              type='text' 
              id='source' 
              name='source' 
              value={source}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='source'>Keyword(s) used: </label>
            <input 
              type='text' 
              id='keywords' 
              name='keywords' 
              value={keywords}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='researcher'>Your Name: </label>
            <input 
              type='text' 
              id='researcher' 
              name='researcher' 
              value={researcher}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='exclusion'>Exclusion Notes: </label>
            <input 
              type='text' 
              id='exclusionNotes' 
              name='exclusionNotes' 
              value={exclusionNotes}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='url'>URL: </label>
            <input 
              type='text' 
              id='url' 
              name='url' 
              value={url}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='yearPublished'>Year/Date Published: </label>
            <input 
              type='text' 
              id='yearPublished' 
              name='yearPublished' 
              placeholder='12/12/2002'
              value={yearPublished}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='gameCreator'>Game Creator/Developer(s): </label>
            <input 
              type='text' 
              id='gameCreator' 
              name='gameCreator' 
              value={gameCreator}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='gamePublisher'>Game Publisher: </label>
            <input 
              type='text' 
              id='gamePublisher' 
              name='gamePublisher' 
              value={gamePublisher}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='beingUsed'>Still being used in classrooms? </label>
            <select 
              id="beingUsed" 
              name="beingUsed"
              value={beingUsed}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='downloadable'>Downloadable? </label>
            <select 
              id="downloadable" 
              name="downloadable"
              value={downloadable}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Possibly">Possibly</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='support'>Ongoing support? </label>
            <select 
              id="support" 
              name="support"
              value={support}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='subject1'>Subject #1: </label>
            <input 
              type='text' 
              id='subject1' 
              name='subject1' 
              value={subject1}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='subject2'>Subject #2: </label>
            <input 
              type='text' 
              id='subject2' 
              name='subject2' 
              value={subject2}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='subjectRemainder'>Subject Remainder: </label>
            <input 
              type='text' 
              id='subjectRemainder' 
              name='subjectRemainder' 
              value={subjectRemainder}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='level'>Education Level: </label>
            <select 
              id="level" 
              name="level"
              value={level}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='collegesUsing'>Colleges that use this game: </label>
            <input 
              type='text' 
              id='collegesUsing' 
              name='collegesUsing' 
              value={collegesUsing}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='cost'>Cost: </label>
            <input 
              type='text' 
              id='cost' 
              name='cost' 
              value={cost}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='genre'>Genre(s): </label>
            <input 
              type='text' 
              id='genre' 
              name='genre' 
              value={genre}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='tags'>Tag(s): </label>
            <input 
              type='text' 
              id='tags' 
              name='tags' 
              value={tags}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='dimension'>2D or 3D? </label>
            <select 
              id="dimension" 
              name="dimension"
              value={dimension}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='sound'>Sound? </label>
            <select 
              id="sound" 
              name="sound"
              value={sound}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='platforms'>Platform(s): </label>
            <input 
              type='text' 
              id='platforms' 
              name='platforms' 
              value={platforms}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='spanish'>Available in Spanish? </label>
            <select 
              id="spanish" 
              name="spanish"
              value={spanish}
              onChange={handleIOChange}
            >
              <option style={{display: "none"}}/>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>

          <div className='entryField'>
            <label htmlFor='languages'>Available in other languages? </label>
            <input 
              type='text' 
              id='languages' 
              name='languages' 
              value={languages}
              onChange={handleIOChange}
            />
          </div>

          <div className='entryField'>
            <label htmlFor='additionalNotes'>Notes: </label>
            <input 
              type='text' 
              id='additionalNotes' 
              name='additionalNotes' 
              value={additionalNotes}
              onChange={handleIOChange}
            />
          </div>
        </div>
        <input type='submit' value={id ? "Update Game" : "Add Game"} />
      </form>
    </div>
  )
}

export default AddChange