import { useState, useEffect } from 'react';

/* Must have these two line for @emotion/code to work*/
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
export default function Customers() {

    const [customers, setCustomers] = useState([]);
    const [userInput, setInput] = useState("");
    const [customerSubmitted, setSubmitted] = useState(false);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        const fetchData = async () => {
            await fetch('api/customers')
                .then(res => res.json())
                .then(customers => setCustomers(customers), () =>
                    console.log('Customers fetched...', customers));
        }
        fetchData();

        setSubmitted(false);
    }, [customerSubmitted]);

    const onChange = (e) => setInput(
        e.target.value
    );

    const handleSubmit = async () => {
        console.log("Clicked handleSubmit");

        await fetch('api/addNewCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: customers.length + 1,
                firstName: userInput,
                lastName: "Unknown Last Name :)"
            })
        })
            .then(res => res.json())
            .then(data => { console.log(data) })
            .catch(err => { console.log(err) });

        setSubmitted(true);
    }

    return (
        <div>
            <h2>Customers</h2>
            <ul css={ulStyle}>
                {customers.map(customer =>
                    <li css={liStyle} key={customer.id}> {customer.firstName} {customer.lastName}</li>
                    // <li css={liStyle} key={customer.id}> {customer.name} </li> Use this with https API
                )}
            </ul>

            <div>
                <input type="text" placeholder="Enter name"
                    onChange={onChange}
                />
                <button onClick={handleSubmit}> Submit new customer </button>
            </div>

        </div>
    );
}
