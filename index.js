const express = require('express')
const axios = require('axios')
const { getImages } = require('./services/images-service')

const app = express()
app.use(express.urlencoded({ extended: true}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html')
})


app.post('/skanuj', async (req, res) => {
    const { url } = req.body;
    const images = await getImages(url)
    let html = "<p>Lista zdjęć na stronie:</p>"

    await images.forEach(img => {
        html+= `<img src="${img}" alt="" style='max-width: 100px'><br>`
    })

    await res.type('html')
    await res.send(html)
    
})


app.listen(1024, () => {
    console.log("server listening on 1024");
})

