<template>
  <div class="about">
    <h1>花的颜色：{{ output }}</h1>
    <about-1 :book="book" :releaseVersion="releaseVersion"></about-1>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import About1 from "./about1.vue";

export default defineComponent({
  data() {
    return {
      msg: "这是一段对话！",
      name: "zhangsan",
    };
  },
  components: {
    About1,
  },
  setup() {
    // book响应式申明
    interface Book {
      name: string;
      version: number;
    }
    // 对象申明
    const book = reactive<Book>({
      name: "wayback",
      version: 1.1,
    });

    // 响应式数据申明
    interface DataProps {
      // 数组申明
      flowerColor: Array<string>;
      releaseVersion: Flower;
    }

    // 枚举类型
    enum Flower {
      rose = 1,
      Lavender,
    }

    const state: DataProps = reactive({
      flowerColor: ["red", "yellow"],
      releaseVersion: Flower["Lavender"],
    });
    const output = computed((): string => {
      return state.flowerColor.join("、");
    });

    onMounted(() => {
      console.log(Flower.rose);
    });

    return {
      book,
      output,
      ...toRefs(state),
    };
  },
});
</script>
