<script lang="ts">
	import SettingsPanel from './SettingsPanel.svelte';
	import SettingsPull from './SettingsPull.svelte';
    let animateSettingsPanel = false;
    let showSettings = false;

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
    class:translate-y-[calc(100vh)]={!showSettings}
    class:transition-transform={animateSettingsPanel}
    >
    <!-- for tailwind translate-y-[calc(100vh)] h-[calc(100vh+2rem)] -->
    <SettingsPull settingsShown={showSettings} on:click={clickPull}></SettingsPull>
    <SettingsPanel></SettingsPanel>
</div>