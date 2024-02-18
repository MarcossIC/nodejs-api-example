/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Student } from './student'
import express from 'express'

const app = express()

const PORT = process.env.port || 8080

app.use(express.json())

app.get('/ping', (req, res) => {
  res.send('Pong!')
})

const students: Student[] = [
  { id: 1, name: 'Jorsh', age: 20, enroll: true },
  { id: 2, name: 'Elton', age: 21, enroll: false },
  { id: 3, name: 'Louise', age: 22, enroll: true },
  { id: 4, name: 'Mariana', age: 25, enroll: true }
]

app.get('/api/v1/students', (_, res) => {
  res.send(students)
})

app.get('/api/v1/students/:id', (req, res) => {
  const id = req.params.id
  const student = students.find(s => s.id == parseInt(id))
  if (student) {
    res.status(200).send(student)
  } else {
    res.status(404).send('Student is not found')
  }
})

app.post('/api/v1/students', (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    age: parseInt(req.body.age),
    enroll: req.body.enroll === 'true'
  }
  students.push(student)
  res.status(201).send(student)
})

app.put('/api/v1/students/:id', (req, res) => {
  const id = req.params.id
  const student = students.find(s => s.id == parseInt(id))
  if (student) {
    student.name = req.body.name
    student.age = parseInt(req.body.age)
    student.enroll = req.body.enroll
    res.status(202).send('Student updated')
  } else {
    res.status(404).send('Student is not found')
  }
})

app.delete('/api/v1/students/:id', (req, res) => {
  const id = req.params.id
  const student = students.find(s => s.id == parseInt(id))
  if (student) {
    const index = students.indexOf(student)
    students.splice(index, 1)
    res.status(204).send('Student deleted')
  } else {
    res.status(404).send('Student is not found')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
