<script lang="ts">
    export let color: string
    export let name: string
    export let del: Function
    export let edit: Function

    let lastClick: number = 0
    
    function handleClick() {
        const now: number = Date.now()

        if (now - lastClick <= 200) edit()

        lastClick = now
    }
</script>

<div class="item" style={`background-color: ${color};`}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <h2 on:click={handleClick}>{name}</h2>
    <button on:click={() => del()}>❌</button>
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
</style>