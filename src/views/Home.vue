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
const page = ref(1);
const perPage = ref(6);
const total = ref(0);

const getLength = () => {
  axios.get("https://api.github.com/users/vuejs").then((res) => {
    total.value = res.data?.public_repos;
  });
};

const getList = () => {
  axios
    .get(
      `https://api.github.com/users/vuejs/repos?per_page=${perPage.value}&page=${page.value}`
    )
    .then((res) => {
      githubList.value = res.data;
      firstLoad.value = true;
      UpdateArr();
      observer.observe(itemGroup.value);
    });
};

const UpdateArr = () => {
  for (let i = 0; i < githubList.value.length; i++) {
    itemData.value.push(githubList.value[i]);
  }
};

const observer = new IntersectionObserver((entries) => {
  const entry = entries[0];
  console.log(entries);
  if (entry && entry.isIntersecting) {
    if (total.value === itemData.value.length) return;
    page.value += 1;
    getList();
  }
});

const getElement = (e) => {
  if (e.target.scrollTop === 112) {
    page.value = 2;
    getList();
  }
};

onMounted(() => {
  getList();
  getLength();
});
</script>
<template>
  <div class="home">
    <h1 class="title">vuejs repo list：</h1>
    <div class="scroll-bg shadow" @scroll="getElement">
      <div class="loader" v-if="!firstLoad">
        <div class="card-skeleton" v-for="item in 6" :key="item"></div>
      </div>
      <div v-else v-for="item in itemData" :key="item" id="card">
        <Post :item-data="item" />
      </div>
      <div ref="itemGroup">
        <div v-if="total !== itemData.length" class="loading"></div>
      </div>
      <div class="end" v-if="total === itemData.length">- No More -</div>
    </div>
  </div>
  <div class="des">
    vuejs github repo 網址出處：
    <a href="https://api.github.com/users/vuejs/repos">
      https://api.github.com/users/vuejs/repos
    </a>
  </div>
</template>
<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 800px;
  margin: auto;

  h1 {
    font-size: 2.3rem;
    font-weight: 900;
    text-align: left;
    padding: 15px 0;
    color: #444444;
    padding-bottom: 40px;
    text-shadow: 1px 0px 1px #ccc, 0px 1px 1px #eee, 2px 1px 1px #ccc,
      1px 2px 1px #eee, 3px 2px 1px #ccc, 2px 3px 1px #eee, 4px 3px 1px #ccc,
      3px 4px 1px #eee, 5px 4px 1px #ccc, 4px 5px 1px #eee, 6px 5px 1px #ccc,
      5px 6px 1px #eee, 7px 6px 1px #ccc;

    @media (max-width: 800px) {
      width: 100%;
      text-align: center;
      padding-top: 40px;
    }
  }
  .scroll-bg {
    padding: 16px;
    box-shadow: 10px 10px 10px #a59891;
    background-color: #e9e3e3;
    height: 657px;
    overflow-y: scroll;
    @media (max-width: 800px) {
      width: 96%;
      margin: auto;
      padding: 8px;
    }
    &.shadow {
      display: inline-block;
      position: relative;
      box-shadow: rgba(0, 0, 0, 0.1) 0 6px 10px inset;
    }
    .loader {
      .card-skeleton {
        height: 100px;
        width: 760px;
        background-color: #dfdad6;
        border-radius: 15px;
        margin-bottom: 8px;
        @media (max-width: 800px) {
          width: 100%;
        }
      }
    }
    &::-webkit-scrollbar-track {
      background-color: #e9e3e3;
    }
    &::-webkit-scrollbar {
      width: 8px;
      margin-right: 5px;
      border-radius: 10px;
      background-color: black;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #9d9b9b;
      border-radius: 21px;
    }
  }
  .end {
    color: #bb9073;
    font-size: 12px;
    text-align: center;
  }

  .loading {
    padding: 20px;
    margin: auto;
    height: 1em;
    width: 1em;
  }

  .loading:not(:required) {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  .loading:not(:required):after {
    content: "";
    display: block;
    font-size: 8px;
    width: 0.6em;
    height: 0.6em;
    margin-top: -0.5em;
    -webkit-animation: spinner 700ms infinite linear;
    -moz-animation: spinner 700ms infinite linear;
    -ms-animation: spinner 700ms infinite linear;
    -o-animation: spinner 700ms infinite linear;
    animation: spinner 700ms infinite linear;
    border-radius: 0.5em;
    -webkit-box-shadow: rgba(149, 144, 14, 0.75) 1.5em 0 0 0,
      rgba(149, 144, 144, 0.75) 1.1em 1.1em 0 0,
      rgba(149, 144, 144, 0.75) 0 1.5em 0 0,
      rgba(149, 144, 144, 0.75) -1.1em 1.1em 0 0,
      rgba(149, 144, 144, 0.75) -1.5em 0 0 0,
      rgba(149, 144, 144, 0.75) -1.1em -1.1em 0 0,
      rgba(149, 144, 144, 0.75) 0 -1.5em 0 0,
      rgba(149, 144, 144, 0.75) 1.1em -1.1em 0 0;
    box-shadow: rgba(149, 144, 144, 0.75) 1.5em 0 0 0,
      rgba(149, 144, 144, 0.75) 1.1em 1.1em 0 0,
      rgba(149, 144, 144, 0.75) 0 1.5em 0 0,
      rgba(149, 144, 144, 0.75) -1.1em 1.1em 0 0,
      rgba(149, 144, 144, 0.75) -1.5em 0 0 0,
      rgba(149, 144, 144, 0.75) -1.1em -1.1em 0 0,
      rgba(149, 144, 144, 0.75) 0 -1.5em 0 0,
      rgba(149, 144, 144, 0.75) 1.1em -1.1em 0 0;
  }

  /* Animation */

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-o-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
.des {
  padding: 10px;
  color: #745845;
  a {
    color: #745845;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
