import { defineStore } from 'pinia'

export const useChartStore = defineStore('counter', {
  state: () => ({ 
    count: 0, 
    covid: undefined,
    planets: undefined
  })
})