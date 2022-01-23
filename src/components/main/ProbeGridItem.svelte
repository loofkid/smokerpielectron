<script lang="ts">
    export let name: string;
    export let currentValue: number;
    export let targetValue: number;
</script>

<div class="probe-grid flex flex-col justify-center items-center cursor-pointer text-white h-full w-full select-none">
    <div class="probe-name text-xl">{name}</div>
    <div class="probe-temp text-5xl">{currentValue?.toFixed(1)}&deg;</div>
    <div class="probe-target text-base">{targetValue == 0 ? "Not set" : `${targetValue?.toFixed(1)}\u00B0`}</div>
</div>

<style lang="postcss">
</style>