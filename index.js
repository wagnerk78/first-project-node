const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')


const port = 3000



const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ message: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {

// const { name , age } = request.body

   // const name = request.query.name 
   // const age = request.query.age
    //console.log(name , age)


    //return response.send("Hello Node! <i>Itália</i> <br> <h1>Isso é um teste</h1>  <br>  My name is Wagner. <br> <b>J'habite au Brésil</b>")

    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body

    //console.log(uuid.v4())
   const user = {id: uuid.v4(), name, age}
  
   users.push(user)
        return response.status(201).json(user)
    })

app.put('/users/:id', checkUserId, (request, response) => {
   
    const { name, age }   = request.body

    const index = request.userIndex

    const id = request.userId

    const updateUser = { id, name, age}  
    
    users[index] = updateUser
    
    return response.json(updateUser)
    })

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index,1)

            return response.status(204).json()
        })



app.listen(port, () => {
    console.log(`🚀 Server start on port ${port}`)
})