<script setup lang="ts">
import { useMouse, usePreferredDark, useLocalStorage, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 524,
  desktop: 3080,
})

const laptop = breakpoints.between('laptop', 'desktop')
console.log(laptop.value);

debugger

const { x, y } = useMouse()
</script>

<template>
  <div>pos: {{x}}, {{y}}</div>
</template>