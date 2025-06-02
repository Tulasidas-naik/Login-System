const express = require('express')
const pg = require('pg')
const cookieparser = require('cookie-parser')
const bcrypt =  require('bcryptjs')
const { getToken, verifyToken } = require('./JWT');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: 'http://localhost:5173', credentials: true
}))

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
}
const client = new pg.Client(config)

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if(err) throw err;
        client.query(`insert into users(username, password) values('${username}', '${hash}')`)
        .then((response) =>{
            console.log("user registered ", response)
            res.send(response)
        })
        .catch((err) => {
            res.json({error: err});
        })
    })
    
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    client.query(`SELECT * from users where username = '${username}'`)
    .then((response) => {
        if(!response){
            res.send('user not found')
        }
       
        bcrypt.compare(password, response.rows[0].password, (err, resp) => {
            if(!resp) {
                res.send('wrong username/password combination')
            }
            const genToken = getToken(response.rows[0]);
            res.cookie("accessToken", genToken, {
                maxAge: 60*60*24*1000
            })
            console.log("///////////", genToken)
            res.send('User Logged In')
        })
        
    })
 
})

app.get('/profile', verifyToken, (req, res) => {
    console.log(req)
    res.send('profile')
})

client.connect().then(() => {
    console.log("postgres conneted successfully")
    app.listen(3000, () => {
        console.log("Listening on port: 3000")
    })
})
