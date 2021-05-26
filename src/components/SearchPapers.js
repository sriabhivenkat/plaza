import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import './Search.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import profilebackground from '../assets/profilebackground.png'
import { Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';

const SearchPapers = () => {
    const [queryval, setQueryVal] = useState("")
    const [data, setData] = useState(["1"]);

    useEffect(() => {
        if (queryval.length > 1) {
            firebase
                .firestore()
                .collection("Papers")
                .where("title", ">=", queryval)
                .where("title", "<=", queryval + "\uf8ff")
                .get()
                .then((res) => {
                    const results = res.docs.map((x) => ({id: x.id, ...x.data()}));
                    console.log(results)
                    setData(results);
                    console.log("Data is:",data)
                })
                .catch((err) => alert(err));
        } else {
            setData(['1']);
        }
    }, [queryval])
    return (
        <>
            <div className="searchcontainer1">
                <h2>Find Papers</h2>
                <form>
                    <div className="inputfield">
                        <label>
                            <input
                                name="keywordsearch"
                                type="keywordsearch"
                                placeholder="Enter keywords to find papers"
                                size="100"
                                onChange={queryText => setQueryVal(queryText.target.value)}
                                value={queryval}
                                style={{
                                    borderRadius: 10,
                                    padding: 10
                                }}
                            />
                        </label>
                    </div>
                </form>
            </div>
            <div className="searchcontainer2">
                {data[0]!="1" &&
                <div>
                    {data.map((item) => {
                        return(
                            <CardDeck>
                                {/* <Link
                                    to={{
                                        pathname: `/${item.id}`
                                    }}
                                > */}
                                    <Card 
                                        style={{height: 300, width: 400, backgroundColor: "#171e24", borderRadius: 25}} 
                                        onClick={() => {
                                            window.location.href = `/${item.id}`
                                        }}
                                        id="cardStyling"
                                    >
                                        <Card.Body>
                                            <Card.Title style={{color: "#ECDFCF"}}>{item.title}</Card.Title>
                                            <Card.Subtitle style={{color: "#ECDFCF"}}>{item.author+", "+item.institution}</Card.Subtitle>
                                            {item.easydesc!="" &&
                                                <Card.Text style={{color: "#ECDFCF"}}>{item.easydesc}</Card.Text>
                                            }
                                            <div className="chips">
                                                {item.tags.map((x) => (
                                                    <Chip 
                                                        size="large"
                                                        label={x}
                                                        style={{
                                                            marginRight: 5, 
                                                            backgroundColor: "#ECDFCF", 
                                                            marginBottom: 5,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            {/* {item.easydesc==="" &&
                                                <Card.Text>suck my dick</Card.Text>
                                            } */}
                                        </Card.Body>
                                    </Card>
                                {/* </Link> */}
                            </CardDeck>
                        )
                    })}
                </div>
                }
            </div>
        </>
    )
}

export default SearchPapers;