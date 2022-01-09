<script lang="ts">
    export let mouseDownHandler = (data?: any) => {};
    export let mouseUpHandler = (data?: any) => {};
</script>

<div class="modal-backdrop" on:mousedown="{mouseDownHandler}" on:mouseup="{mouseUpHandler}" {...$$restProps}></div>

<style lang="postcss">
    .modal-backdrop {
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 500;
        backdrop-filter: blur(2px) brightness(50%);
        left: 0px;
        top: 0px;
    }
</style>