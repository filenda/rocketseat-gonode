const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

const requiredFieldsCheckingMiddleware = (req, res, next) => {
  if (req.query.age) return next()
  return res.redirect('/')
}

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true // watch equals true makes the nunjucks behave as nodemon, watching changes and updating views
})

//  tells express that we'll be using info provided from a html form
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('new')
})

app.post('/check', (req, res) => {
  let age = req.body.age
  if (age > 18) return res.redirect(`/major?age=${age}`)
  else return res.redirect(`/minor?age=${age}`)
})

app.get('/major', requiredFieldsCheckingMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', requiredFieldsCheckingMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen(3001)
