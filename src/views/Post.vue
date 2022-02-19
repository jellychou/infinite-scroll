<script setup>
import { ref, nextTick } from "vue";
const props = defineProps({
  itemData: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="card fadeIn">
    <span>{{ itemData.name }}</span>
    <span>{{ itemData.description }}</span>
    <a :href="itemData.url">{{ itemData.url }}</a>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: calc(390px / 6);
  display: grid;
  text-align: left;
  padding: 16px 16px;
  box-shadow: 4px 5px 10px #bbbbbb;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 2px 16px 2px;
  span:nth-child(1) {
    font-weight: bold;
  }

  &.fadeIn {
    // -webkit-animation-name: fadeIn;
    animation: fadeIn 1.5s;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
