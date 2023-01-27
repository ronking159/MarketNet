// @ts-nocheck
import { writeFile, readFileSync } from 'fs'
import { Server } from 'socket.io'

function configureServer(server) {
    const io = new Server(server.httpServer)
    let sections = JSON.parse(readFileSync('db.json'))

    io.on('connection', socket => {
        socket.emit('update', sections)

        socket.on('addsec', section => {
            sections = [...sections, {name: section, items: []}]
            writeFile('db.json', JSON.stringify(sections), err => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(sections)
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
                    console.log(sections)
                }
            })
            io.emit('update', _sections)
        })
    })
}

export default configureServer