<script lang="ts">
	import type { Socket } from "socket.io-client"

    type Section = {
        name: String,
        items: string[]
    }
    export let sections: Section[]
    export let socket: Socket

    function handleClick() {
            let inp
            let valid = false
            if (sections.length == 0) {
                valid = true
                inp = prompt('שם המוצר')
            }
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
        socket.emit('addsec', inp)
    }
</script>

<div>
    <button on:click={handleClick}>הוסף סעיף</button>
</div>

<style>
    div {
        width: 100%; height: 100%;
    }

    button {
        width: 100%; height: 100%;
    }
</style>