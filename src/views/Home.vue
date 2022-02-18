<script setup>
import axios from "axios";
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import Post from "./Post.vue";
import { app } from "vue";

const githubList = ref([]);
const itemData = ref([]);
const itemGroup = ref(null);
const firstLoad = ref(false);
const reposUser = ref("");

const getList = () => {
  axios.get("https://api.github.com/users/vuejs/repos").then((res) => {
    githubList.value = res.data;
    for (let i = 0; i < 6; i++) {
      itemData.value.push(githubList.value[i]);
    }
    reposUser.value = res.data[0].full_name.split("/")[0];
    firstLoad.value = true;
    observer.observe(itemGroup.value);
  });
};

getList();

const loadMore = () => {
  itemData.value.push(githubList.value[0]);
  githubList.value.shift();
};

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  if (entry && entry.isIntersecting) {
    if (githubList.value.length === 6) return;
    setTimeout(() => {
      loadMore();
    }, 300);
  }
});
</script>
<template>
  <div class="home">
    <h1 class="title">
      <span>{{ reposUser }}</span>
      repo list：
    </h1>
    <div class="scroll-bg">
      <div class="loader" v-if="!firstLoad">
        <div class="card-load" v-for="item in 6" :key="item"></div>
      </div>
      <div v-else v-for="item in itemData" :key="item">
        <Post :item-data="item" />
      </div>
      <div ref="itemGroup">
        <div
          v-if="githubList.length > 0 && githubList.length !== 6"
          class="snippet"
          data-title=".dot-flashing"
        >
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
      </div>
      <div class="end" v-if="githubList.length === 6">- No More -</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 800px;
  margin: auto;

  h1 {
    background: -webkit-linear-gradient(#fff, #d7b87c);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    text-align: center;
    font-size: 2.3rem;
    color: #fff;
    font-weight: 900;
    text-align: left;
    padding: 15px;
  }
  .scroll-bg {
    padding: 16px;
    border-radius: 15px;
    box-shadow: 10px 1px 10px #936e56;
    background-color: #e9e3e3;
    height: 664px;
    width: 800px;
    overflow-y: scroll;
    .loader {
      .card-load {
        height: 100px;
      }
    }
  }
  .end {
    color: #bb9073;
    font-size: 12px;
  }

  .snippet {
    position: relative;
    padding: 2rem 5%;
  }

  .examples .snippet:before {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 5px;
    content: attr(data-title);
    font-size: 0.75rem;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
      "Courier New", monospace;
    color: white;
    background-color: rgb(255, 25, 100);
    border-radius: 0.25rem 0 0.25rem 0;
  }

  .stage {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .dot-flashing {
    position: relative;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #936e56;
    color: #936e56;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }

  .dot-flashing::before,
  .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  .dot-flashing::before {
    left: -15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #936e56;
    color: #936e56;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  .dot-flashing::after {
    left: 15px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #936e56;
    color: #936e56;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #936e56;
    }
    50%,
    100% {
      background-color: #ebe6ff;
    }
  }
}
</style>
