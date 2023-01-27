<script lang="ts">
	import type { Socket } from "socket.io-client"


    type Section = {
        name: String,
        items: string[]
    }
    export let section: Section
    export let sections: Section[]

    export let socket: Socket

    export let colorNum
    let secColor: string
    let itemColor: string
    switch (colorNum) {
        case 0:
            console.log(colorNum)
            secColor = '#a44'
            itemColor = '#d77'
            break
        case 1:
            secColor = '#4a4'
            itemColor = '#7d7'
            break
        case 2:
            secColor = '#44a'
            itemColor = '#77d'
            break
        case 3:
            secColor = '#bb5'
            itemColor = '#dd7'
            break
    }
</script>

<div class="section">
    <div class="controlls" style={`background-color: ${secColor};`}>
        <h1>{section.name}</h1>
        <button on:click={() => {
            let inp
            let valid = false
            if (section.items.length == 0) {
                valid = true
                inp = prompt('שם המוצר')
                if (inp == null) return
            }
            let first = true
            while (!valid) {
                if (first)
                    inp = prompt('שם המוצר')
                else
                    inp = prompt('שם המוצר תפוס')
                if (inp == null) return

                let cont = false
                for (let i = 0; i < section.items.length; i++) {
                    if (section.items[i] == inp) cont = true
                }
                if (!cont) valid = true

                first = false
            }
            
            // @ts-ignore
            section.items.push(inp)

            socket.emit('update', sections)
        }}>➕</button>
        <button on:click={() => {
            sections = sections.filter(_section => {
                return _section != section
            })

            socket.emit('update', sections)
        }}>❌</button>
    </div>
    {#each section.items as item}
        <div class="item" style={`background-color: ${itemColor};`}>
            <h2>{item}</h2>
            <button on:click={() => {
                section.items = section.items.filter(_item => {
                    return _item != item
                })

                socket.emit('update', sections)
            }}>❌</button>
        </div>
    {/each}
</div>

<style>
    .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }

    .item > h2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(100% - 2em);
    }

    button {
        padding: 1rem;
    }

    .controlls {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    h1 {
        margin: auto
    }

    /* .controlls > button:last-child {
        position: absolute;
        right: 0;
    } */
</style>