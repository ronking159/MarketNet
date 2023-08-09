<script lang="ts">
	import type { Socket } from "socket.io-client";

    export let socket: Socket

    function handleClick() {
        socket.emit('addbase')
    }
</script>

<button on:click={handleClick}>🔄️</button>

<style>
    button {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>