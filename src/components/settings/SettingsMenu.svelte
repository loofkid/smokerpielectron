<script lang="ts">
	import SettingsPanel from './SettingsPanel.svelte';
	import SettingsPull from './SettingsPull.svelte';
    let animateSettingsPanel = false;
    let showSettings = false;
    let pullY: number;

    const clickPull = () => {
        animateSettingsPanel = true;
        showSettings = !showSettings;
        setTimeout(() => animateSettingsPanel = false, 5000);
    }

    const touchStart = (event: TouchEvent) => {
        console.log("touch recorded");
    }
</script>


<div id="settingsMenu" class="fixed w-full transform-gpu z-40 duration-200 ease-in"
    class:h-[calc(100vh+2rem)]={!showSettings}
    class:h-full={showSettings}
    class:translate-y-[calc(100vh-var(--y-translate))]={!showSettings}
    class:transition-transform={animateSettingsPanel}
    style="--y-translate={pullY}px"
    >
    <!-- for tailwind translate-y-[calc(100vh-var(--y-translate))] h-[calc(100vh+2rem)] -->
    <SettingsPull bind:settingsShown={showSettings} bind:y={pullY} on:click={clickPull}></SettingsPull>
    <SettingsPanel></SettingsPanel>
</div>