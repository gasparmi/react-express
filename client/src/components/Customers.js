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

    const [ customers, setCustomers ] = useState([]);

    useEffect( () => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        fetch('api/customers')
            .then(res => res.json())
            .then(customers => setCustomers( customers ), () =>
            console.log('Customers fetched...', customers));
    });

    return (
        <div>
            <h2>Customers</h2>
            <ul css={ulStyle}>
                {customers.map(customer => 
                    <li css={liStyle} key={customer.id}> {customer.firstName} {customer.lastName}</li>
                    // <li css={liStyle} key={customer.id}> {customer.name} </li> Use this with https API
                )}
            </ul>
        </div>
    );
}
