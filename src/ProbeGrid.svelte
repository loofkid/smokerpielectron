<script lang="ts">
    export let probeName;
    export let probeTemp;
    export let probeTarget;
</script>

<div class="probe-grid">
    <div class="probe-name">{probeName}</div>
    <div class="probe-temp">{probeTemp}</div>
    <div class="probe-target">{probeTarget}</div>
</div>

<style lang="postcss">
    div.probe-grid {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: #fff;
        height: 100%;
        width: 100%;
        .probe-name {
            font-size: 1.2rem;
        }
        .probe-temp {
            font-size: 3rem;
        }
        .probe-target {
            font-size: 1rem;
        }
    }
</style>