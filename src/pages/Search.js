import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import firebaseDb from "../firebase";
import "./Search.css";

const Search = () => {
    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get("gameTitle");

    console.log("search", search);

    useEffect(() => {
        searchData();
    }, [search]);

    const searchData = () => {
        firebaseDb.child("evgs").orderByChild("gameTitle").equalTo(search).on("value", (snapshot => {
            if(snapshot.val()) {
                const data = snapshot.val();
                setData(data);
            }
        }))
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

    return (
        <div className="entireSearch">
            <Fragment className="entireHome">
                {Object.keys(data).length === 0 ? (
                    <h2>No Game Title Found for "{query.get("gameTitle")}"</h2>
                ) : (
                    <table className="table">
                <thead>
                    <tr>
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
                )}
            </Fragment>
        </div>
    )
}

export default Search