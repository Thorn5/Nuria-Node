const express = require('express')
const app = express()
const port = process.env.PORT || 8001

// GET method route
    app.get('/', (req, res) => {
        res.send('GET request to the homepage')
    })
 
// POST method route
  app.post('/', (req, res) => {
    res.send('POST request to the homepage')
  })
  
// PUT method route
  app.put('/', (req, res) => {
    res.send('PUT request to homepage')
})
  
// DELETE method route
  app.delete('/', (req, res) => {
    res.send('DELETE request to homepage')
})

//CRUD METHODS THAT SHARE SAME ROUTE 
// app
// .route('/')
// .get((req, res) => {
//     res.send('GET request to the homepage')
// })
// .post((req, res) => {
//     res.send('POST request to the homepage')
//   })
  
// .put((req, res) => {
//     res.send('PUT request to homepage')
// })
  
// .delete((req, res) => {
//     res.send('DELETE request to homepage')
// })

//LIST OF RECIPES

const recipes = [
    {id: 1, title: "Pizza"},
    {id: 2, title: "Paella"}
];

//CREATE AN ENDPOINT TO RETRIEVE THE LIST OF RECIPES
  app.get('/api/recipes', (req, res) => {
    res.json(recipes);
  })

//CREATE AN ENDPOINT THAT RETRIEVES A SPECIF RECIPE BY ID

  app.get('/api/recipes/:id', (req, res) => {
    const id = req.params.id;
    const recipe = recipes.find(recipe => recipe.id == id)  
    if(!recipe){
        return res.status(404).send('Recipe not found')
    }
    res.json(recipe)
  })

//Create an endpoint that redirects to another url

app.get('/redirect', (req, res) => {
    res.redirect('https://www.wbscodingschool.com/');
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

