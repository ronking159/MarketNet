<script lang="ts">
	import type { Socket } from "socket.io-client"
    import Item from './Item.svelte'

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

    let lastClick: number = 0

    function handleClick() {
        const now = Date.now()

        if (now - lastClick <= 200) {
            let inp
            let valid = false
            let first = true
            while (!valid) {
                if (first)
                    inp = prompt('שם הסעיף')
                else
                    inp = prompt('שם הסעיף תפוס')
                if (inp == null) return

                let cont = false
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i].name == inp) cont = true
                }
                if (!cont) valid = true

                first = false
            }

            // @ts-ignore
            sections = sections.map(sec => {
                if (sec.name == section.name) {
                    sec.name = inp!
                }

                return sec
            })

            socket.emit('update', sections)
        }

        lastClick = now
    }

    function deleteItem(item: string) {
        section.items = section.items.filter(_item => {
            return _item != item
        })

        socket.emit('update', sections)
    }

    function editItem(item: string) {
            let inp
            let valid = false
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
            section.items = section.items.map((it: string) => {
                if (item == it) {
                    it = inp!
                }

                return it
            })

            socket.emit('update', sections)
        }
</script>

<div class="section">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="controlls" style={`background-color: ${secColor};`} on:click={handleClick}>
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
        <Item del={() => deleteItem(item)} edit={() => editItem(item)} color={itemColor} name={item} />
    {/each}
</div>

<style>
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