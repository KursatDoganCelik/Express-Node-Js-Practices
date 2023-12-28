// import a file system part
const fileSystem = require('node:fileSystem')

// basic create file and write data
fileSystem.writeFile('message.txt', 'Heyyo', (err) => {
  if (err) throw err
  console.log('Success!')
})

// basic read and change data from file
fileSystem.readFile('./message.txt', 'utf-8', (err, data) => {
  if (err) throw err
  console.log(`${data} Word`)
})
