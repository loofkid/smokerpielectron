/// <reference types="svelte" />

declare interface Probe {
    displayName: string
    id: string
    temperature: number
    targetTemperature: number
    connected: boolean
}