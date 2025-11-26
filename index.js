const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const APP_COLOR = process.env.APP_COLOR || 'unknown'

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    color: APP_COLOR,
    message: `Versión 2 - Despliegue Green Exitoso`,
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})