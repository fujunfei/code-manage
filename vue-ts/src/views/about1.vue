<template>
  <div>
    {{ book.name }} 版本：{{ book.version }}

    <span v-if="!!releaseVersion">- {{ flowerName }} {{ releaseVersion }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    book: {
      type: Object,
    },
    releaseVersion: {
      type: Number,
      default: 0,
    },
    flowerName: {
      type: String,
      default: "",
    },
  },
});
</script>
