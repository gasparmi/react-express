const express = require('express');
const app = express();

app.get('/api/customers', (req, res) => {

    const customers = [
        {id: 1, firstName: 'Miguel', lastName: 'Gaspar'},
        {id: 2, firstName: 'Peter', lastName: 'Parker'},
        {id: 3, firstName: 'Will', lastName: 'Smith'}
    ]

    res.json(customers);

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});