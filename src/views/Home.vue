<script setup>
import axios from "axios";
import { onMounted, onUnmounted, ref } from "vue";
import Post from "./Post.vue";

const githubList = ref([]);
const scrollItem = ref(null);

const getList = () => {
  axios.get("https://api.github.com/users/vuejs/repos").then((res) => {
    githubList.value = res.data;
  });
};

getList();

const loadMore = () => {
  githubList.value.forEach((e) => {
    githubList.value.push(e);
  });
};

const handleScroll = (e) => {
  const element = scrollItem.value;
  if (element.getBoundingClientRect().bottom < window.innerHeight) {
    loadMore();
  }
};
</script>
<template>
  <div class="home">
    <div class="title">vuejs repo list：</div>
    <div class="scrollItem" @scroll="handleScroll">
      <div ref="scrollItem">
        <Post :item-data="githubList" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  overflow: scroll;
  padding: 14px 20px;
  background-color: #e9e5e552;
  .title {
    font-size: 30px;
    font-weight: 500;
    text-align: left;
    padding-bottom: 15px;
  }
  .scrollItem {
    height: 916px;
    overflow-y: scroll;
  }
}
</style>
