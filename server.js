const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    res.setHeader(                           //Create, Read, Update, Delete
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

const people = [
    { id: 1, firstName: 'Miguel', lastName: 'Gaspar' },
    { id: 2, firstName: 'Peter', lastName: 'Parker' },
    { id: 3, firstName: 'Megan', lastName: 'Fox' }
]

app.get('/api/people', (req, res) => {
    try {
        res.json(people);
    }
    catch (err) {
        res.json(err)
    }
});

app.post('/api/addNewPerson', async (req, res) => {

    const {personId, fName, lName } = req.body
    
    try {
        await people.push({ id: personId, firstName: fName, lastName: lName })
        res.json("Success: New Person Was Added")
    }
    catch (err) {
        res.json(err)
    }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});