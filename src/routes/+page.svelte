<script lang="ts">
	import type { Socket } from "socket.io-client"

    import { io } from 'socket.io-client'
	import AddSection from "./AddSection.svelte"
	import Section from "./Section.svelte"
	import Base from "./Base.svelte"
    const socket: Socket = io()

    type Section = {
        name: String,
        items: string[]
    }
    let sections: Section[] = []
    socket.on('update', _sections => {
        sections = _sections
    })

    socket.on('addsec', _sections => {
        sections = _sections
    })
</script>

<div class="wrapper">
    <div class="controlls">
        <AddSection {socket} {sections} />
        <Base {socket} />
    </div>
    <div>
        {#each sections as section, i}
            <Section {section} {sections} {socket} colorNum={i%4} />
        {/each}
    </div>
</div>

<style>
    :root {
        font-family: Arial, Helvetica, sans-serif;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .controlls {
        display: flex;
        width: 100%;
        height: 3em;
    }
</style>

<svelte:head>
    <title>MarketNet</title>

    <style>
        html, body {
            margin: 0;
            height: 100%;
        }

        p, span, h1, h2, h3, h4, h5, h6 {
            direction: rtl;
        }
    </style>
</svelte:head>