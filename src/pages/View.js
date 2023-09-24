import React, { useEffect, useState } from 'react';
import firebaseDb from '../firebase';
import { useParams, Link } from 'react-router-dom';
import "./View.css";

const View = () => {
  const [game, setGame] = useState({});

  const {id} = useParams();

  useEffect(() => {
    firebaseDb.child(`evgs/${id}`).get().then((snapshot) => {
      if(snapshot.exists()) {
        setGame(snapshot.val());
      }
      else {
        setGame({});
      }
    })
  }, [id])

  const validEVG = (valid) => {
    return valid === "Yes" ? "validEVG" : valid === "No" ? "invalidEVG" : "";
  };

  return (
    <div className='entireView'>
      <div className='gameTitle'>
        <h1>{game.gameTitle}</h1>
      </div>
      <div className='cards-container'>
        <div className={`card ${validEVG(game.valid)} lft`}>
          <div className='head'>
            <p><span className='subTitle'>General Video Game Info</span></p>
          </div>
          <div className='info'>
            <strong>ID:</strong>
            <span> {id}</span>
            <br/>
            <br/>

            <strong>URL:</strong>
            <span> <a href={game.url}>{game.url}</a> </span>
            <br/>
            <br/>

            <strong>Creator/Developer(s):</strong>
            <span> {game.gameCreator}</span>
            <br/>
            <br/>

            <strong>Publisher(s):</strong>
            <span> {game.gamePublisher}</span>
            <br/>
            <br/>

            <strong>Year Published:</strong>
            <span> {game.yearPublished}</span>
            <br/>
            <br/>

            <strong>Downloadable:</strong>
            <span> {game.downloadable}</span>
            <br/>
            <br/>

            <strong>Supported/maintained:</strong>
            <span> {game.support}</span>
            <br/>
            <br/>

            <strong>Cost:</strong>
            <span> {game.cost}</span>
            <br/>
            <br/>

            <strong>Genre(s):</strong>
            <span> {game.genre}</span>
            <br/>
            <br/>

            <strong>Tag(s):</strong>
            <span> {game.tags}</span>
            <br/>
            <br/>

            <strong>Dimensional Depth:</strong>
            <span> {game.dimension}</span>
            <br/>
            <br/>

            <strong>Sound:</strong>
            <span> {game.sound}</span>
            <br/>
            <br/>

            <strong>Platform(s):</strong>
            <span> {game.platforms}</span>
            <br/>
            <br/>

            <strong>Spanish:</strong>
            <span> {game.spanish}</span>
            <br/>
            <br/>

            <strong>Other language(s) supported:</strong>
            <span> {game.languages}</span>
          </div>
        </div>

        <div className={`card ${validEVG(game.valid)} rgt`}>
          <div className='head'>
            <p><span className='subTitle'>Education & Research Info</span></p>
          </div>
          <div className='info'>
            <strong>Higher Education Video Game:</strong>
            <span> {game.valid}</span>
            <br/>
            <br/>

            <strong>Education Level:</strong>
            <span> {game.level}</span>
            <br/>
            <br/>

            <strong>Subject #1:</strong>
            <span> {game.subject1}</span>
            <br/>
            <br/>

            <strong>Subject #2:</strong>
            <span> {game.subject2}</span>
            <br/>
            <br/>

            <strong>Supplementary Subjects:</strong>
            <span> {game.subjectRemainder}</span>
            <br/>
            <br/>

            <strong>Used in Education:</strong>
            <span> {game.beingUsed}</span>
            <br/>
            <br/>

            <strong>Colleges Using:</strong>
            <span> {game.collegesUsing}</span>
            <br/>
            <br/>

            <strong>Researcher:</strong>
            <span> {game.researcher}</span>
            <br/>
            <br/>

            <strong>Source:</strong>
            <span> {game.source}</span>
            <br/>
            <br/>

            <strong>Keywords:</strong>
            <span> {game.keywords}</span>
            <br/>
            <br/>

            <strong>Exclusion Notes:</strong>
            <span> {game.exclusionNotes}</span>
            <br/>
            <br/>

            <strong>Additional Notes:</strong>
            <span> {game.additionalNotes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View