const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true // watch equals true makes the nunjucks behave as nodemon, watching changes and updating views
})

//  tells express that we'll be using info provided from a html form
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const users = ['Diego', 'Vini', 'Robson']

// const logMiddleware = (req, res, next) => {
//     console.log(
//         `HOST: ${req.headers.host} | URL: ${req.headers.url} | METHOD: ${req.method}`
//     );

//     //  you can even add info to be later accessed by other middlewares that implement this one
//     req.appName = 'GoNode';

//     //  garantees that this middleware, whenever used, won't block further middleweres to execution
//     return next();
// }

// //  this is how you the the whole express application to use the middleware
// app.use(logMiddleware);

//  'logMiddleware' is the middleware to be called before this middleware itself
// app.get('/', logMiddleware, (req, res) => {

app.get('/', (req, res) => {
  return res.render('list', { users })
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', (req, res) => {
  users.push(req.body.user)
  return res.redirect('/')
})

// app.get('/nome/:nome', (req, res) => {
//     //  use req.params to grab rest params values and req.query to grab querystring parameters
//     //  use 'send' method to return raw text and 'json' method to return (duh) json
//     return res.send(`Olá ${req.params.nome}!`);
// })

app.listen(3000)
