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
    <span class="description">{{ itemData.description }}</span>
    <a :href="itemData.url">{{ itemData.url }}</a>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: calc(390px / 6);
  width: 96.5%;
  display: grid;
  text-align: left;
  padding: 16px 16px;
  box-shadow: 4px 5px 10px #bbbbbb;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 2px 16px 2px;
  @media (max-width: 800px) {
    word-break: break-word;
    width: 95.5%;
    padding: 8px;
    height: 100%;
  }
  span:nth-child(1) {
    font-weight: bold;
  }
  .description {
    @media (max-width: 800px) {
      padding: 5px 0;
    }
  }

  a:hover {
    text-decoration: underline;
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
