<script setup>
const props = defineProps({
  itemData: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-for="item in itemData" :key="item" class="card">
    <span>{{ item.name }}</span>
    <span>{{ item.description }}</span>
    <a :href="item.url">{{ item.url }}</a>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 100px;
  display: grid;
  text-align: left;
  padding: 18px 15px;
  box-shadow: 0 2px 5px #bbbbbb;
  border-radius: 5px;
  background-color: #fff;
  margin: 0 2px 17px 2px;
  span:nth-child(1) {
    font-weight: bold;
  }
}
</style>
