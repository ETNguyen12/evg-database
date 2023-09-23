import React, { useEffect, useState } from 'react';
import firebaseDb from '../firebase';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

  return (
    <div className='entireView'>
      <div className='card'>
        <div className='head'>
          <p>"{game.gameTitle}" <span className='subTitle'>Basic Info</span></p>
        </div>
        <div className='info'>
          <strong>ID:</strong>
          <span>{id}</span>
          <br/>
          <br/>

          <strong>URL:</strong>
          <span> <a href={game.url}>Link</a> </span>
          <br/>
          <br/>

          <strong>Game Creator:</strong>
          <span> {game.gameCreator}</span>
          <br/>
          <br/>

          <strong>Game Publisher:</strong>
          <span> {game.gamePublisher}</span>
          <br/>
          <br/>

          <strong>Year Published:</strong>
          <span> {game.yearPublished}</span>
        </div>
      </div>
    </div>
  )
}

export default View