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
    console.log(res);
  });
};

const getList = () => {
  axios
    .get(
      `https://api.github.com/users/vuejs/repos?per_page=${perPage.value}&page=${page.value}`
    )
    .then((res) => {
      githubList.value = res.data;
      console.log(githubList.value);
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
  if (entry && entry.isIntersecting) {
    console.log(total.value, itemData.value.length);
    if (total.value === itemData.value.length) return;
    page.value += 1;
    getList();
  }
});

onMounted(() => {
  getList();
  getLength();
});
</script>
<template>
  <div class="home">
    <h1 class="title">vuejs repo list：</h1>
    <div class="scroll-bg shadow">
      <div class="loader" v-if="!firstLoad">
        <div class="card-skeleton" v-for="item in 6" :key="item"></div>
      </div>
      <div v-else v-for="item in itemData" :key="item">
        <Post :item-data="item" />
      </div>
      <div ref="itemGroup">
        <div
          v-if="total !== itemData.length"
          class="snippet"
          data-title=".dot-flashing"
        >
          <div class="stage">
            <div class="dot-flashing"></div>
          </div>
        </div>
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
    }
  }
  .scroll-bg {
    padding: 16px;
    box-shadow: 10px 10px 10px #a59891;
    background-color: #e9e3e3;
    height: 657px;
    overflow-y: scroll;
    @media (max-width: 800px) {
      width: 90%;
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
