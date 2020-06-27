import { useState, useEffect } from 'react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const ulStyle = css`
    list-style: none;
    padding: 0;
    width: 30%;
    margin: auto;
`;

const liStyle = css`
    font-size: 1.3rem;
    line-height: 2rem;
    border-bottom: 1px dotted #777;
`;
export default function People() {

    const [people, setPeople] = useState([]);
    const [userInput, setInput] = useState("");
    const [personSubmitted, setSubmitted] = useState(false);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        const fetchData = async () => {
            await fetch('api/people')
                .then(res => res.json())
                .then(people => setPeople(people), () =>
                    console.log('People fetched...', people));
        }
        fetchData();

        setSubmitted(false);
    }, [personSubmitted]);

    const onChange = (e) => setInput(
        e.target.value
    );

    const addPerson = async () => {
        await fetch('api/addNewPerson', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                personId: people.length + 1,
                fName: userInput,
                lName: "Gaspar"
            })
        })
            .then(res => res.json())
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) });
    }

    const handleSubmit = async () => {
        console.log("Clicked handleSubmit");

        if (userInput) {
            await addPerson();
            setInput("");
            setSubmitted(true);
        }
        else
            alert("Must enter first name");
    }

    return (
        <div>
            <h2>People</h2>
            <ul css={ulStyle}>
                {people.map( person =>
                    <li css={liStyle} key={person.id}> {person.firstName} {person.lastName}</li>
                    // <li css={liStyle} key={person.id}> {person.name} </li> Use this with https API
                )}
            </ul>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter first name"
                    value={userInput}
                    onChange={onChange}
                />
                <button onClick={handleSubmit}> Submit new person </button>
            </div>

        </div>
    );
}