import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { handler } from '../build/handler.js'

import { writeFile, readFileSync } from 'fs'

const port = 3000
const app = express()
const server = createServer(app)

const io = new Server(server)
let sections = JSON.parse(readFileSync('db.json'))
const base = JSON.parse(readFileSync('base.json'))

io.on('connection', socket => {
    socket.emit('update', sections)

    socket.on('addsec', section => {
        sections = [...sections, {name: section, items: []}]
        writeFile('db.json', JSON.stringify(sections), err => {
            if (err) {
                console.log(err)
            } else {
                // console.log(sections)
            }
        })
        io.emit('addsec', sections)
    })

    socket.on('update', _sections => {
        sections = _sections
        writeFile('db.json', JSON.stringify(sections), err => {
            if (err) {
                console.log(err)
            } else {
                // console.log(sections)
            }
        })
        io.emit('update', _sections)
    })

    socket.on('addbase', () => {
        sections = merge(sections, base)
        writeFile('db.json', JSON.stringify(sections), err => {
            if (err) {
                console.log(err)
            } else {
                // console.log(sections)
            }
        })
        io.emit('update', sections)
    })
})

function merge(a1, a2) {
    let arr = a1
    let nids = new Set()

    for (let i in a1) {
        for (let j in a2) {
            if (arr[i].name == a2[j].name) {
                arr[i].items = [...new Set([...arr[i].items, ...a2[j].items])]
                nids.add(j)
            }
        } 
    }

    for (let i in a2) {
        if (nids.has(i)) continue

        arr.push(a2[i])
    }

    return arr
}

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler)

server.listen(port)
