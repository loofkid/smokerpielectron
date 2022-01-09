<script lang="ts">
	import ModalBackdrop from './ModalBackdrop.svelte';
    import {Writable} from 'svelte/store';
    import NumberInput from './NumberInput.svelte';
    import Icon from 'svelte-awesome';
    import { fade, fly } from 'svelte/transition';
    import NumberGrid from './components/NumberGrid.svelte';
    import {createEventDispatcher} from 'svelte';
    import ShortcutTemps from './components/ShortcutTemps.svelte';
    export let storeValue: Writable<number>;
    let value = $storeValue;

    export let open = false;
    export let height = null;

    let shortcutTemps = [175, 203, 0];

    const dispatcher = createEventDispatcher();

    let temperatureMenu: HTMLDivElement;
    const bounceMenuIn = () => {
        temperatureMenu.style.transform = "perspective(500px) translate3d(0px, 0px, 10px)";
    }
    const bounceMenuOut = () => {
        temperatureMenu.style.removeProperty("transform");
    }

    const numberPress = (event: CustomEvent) => {
        if (typeof event.detail === "number") {
            value = parseInt(`${value}${event.detail.toString()}`);
        }
        else if (event.detail === "ok") {
            if (value <= 275) {
                $storeValue = value;
            }
            else {
                $storeValue = 275;
            }
            dispatcher("save");
        }
    }

    const shortcut = (event: CustomEvent) => {
        $storeValue = event.detail;
        dispatcher("save");
    }
</script>
<div transition:fade>
    <ModalBackdrop mouseDownHandler={bounceMenuIn} mouseUpHandler={bounceMenuOut}></ModalBackdrop>
</div>
<div transition:fly={{y: height}} class="temperature-menu" bind:offsetHeight={height} class:open={open} bind:this={temperatureMenu}>
    <div class="number-input">
        <NumberInput bind:value={value}></NumberInput>
    </div>
    <div class="h-8 w-full">
        <ShortcutTemps temps={shortcutTemps} on:shortcut={shortcut}></ShortcutTemps>
    </div>
    <div class="h-[calc(100%-4rem)] w-full">
        <NumberGrid on:press={numberPress}></NumberGrid>
    </div>
</div>

<style lang="postcss">
    .temperature-menu {
        width: 60%;
        height: 95%;
        background-color: #363636;
        z-index: 1000;
        position: absolute;
        left: 20vw;
        top: 5vh;
        padding: 10px;
        .number-input {
            width: 100%;
            display: flex;
            button {
                width: 52px;
                height: 52px;
                margin: 0px;
                border-radius: 0px;
                font-size: 1.5rem;
                justify-content: center;
                align-items: center;
                border-left: none;
                border-right: 2px groove #FFF;
                border-top: 2px groove #FFF;
                border-bottom: 2px groove #FFF;
                box-sizing: border-box;
                display: flex;
                background-color: transparent;
                color: #FFF;
                cursor: pointer;
            }
        }
    }
</style>