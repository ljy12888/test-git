const express = require('express')
const path = require('path')
const logger = require('morgan')
const fs = require('fs')
const app = express()
const PORT = 3000
const _path = path.join(__dirname, './dist')

console.log(_path)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(_path))
app.use(logger('tiny'))

app.get('/test/:id=77&name=홍길동', (req, res) => {
  let str = `<body>아이디:77<br>이름:홍길동</body>`

  res.send(str)
})

app.post('/test', (req, res) => {
  const name = req.query.name
  const age = req.query.age
  const content = req.query.content

  fs.writeFile(_path + name + '.txt', age, content, (e) => {
    if (e) console.log(e)
    console.log('파일 작성이 완료되었습니다.')
    res.send(
      `<script>alert('${name}파일로 저장합니다.');history.go(-1)</script>`
    )
  })
})

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 가동중...`)
})
