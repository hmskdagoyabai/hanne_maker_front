<template>
  <div id="app">
    <router-link to="/">
      <img class="bannar" src="./static/hanne.png" />
    </router-link>
    <router-view class="main_content" />

    <div id="hamabe">
      <p>
        <a href="https://hamabe.info"> これを作ったひとのページ</a>
      </p>
    </div>

    <Footer id="footer"></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kosugi+Maru&family=M+PLUS+Rounded+1c&family=Recursive:wght@400&display=swap");

.main_content {
  margin: 3%;
  height: 1800px;
}

@media screen and (max-width: 800px) {
  .main_content {
    margin: 3%;
    height: 1200px;
  }
}

#hamabe a {
  font-size: 0.9em;

  color: rgb(49, 49, 49);
  /* text-decoration: none; */
}

.bannar {
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

p {
  margin-bottom: 15px;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Recursive", "Kosugi Maru", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgb(243, 243, 243);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* 浮かせたいもの */
#head-button {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}

#head-button:hover {
  -webkit-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  transform: translateY(-3px);
}

#underline-o {
  font-size: 1.1em;
  background-image: linear-gradient(
    transparent 80%,
    rgba(234, 169, 96, 0.7) 30%
  );
}

#underline-b {
  font-size: 1.1em;
  background-image: linear-gradient(
    transparent 80%,
    rgba(104, 182, 200, 0.7) 30%
  );
}

#underline-g {
  font-size: 1.1em;
  background-image: linear-gradient(
    transparent 80%,
    rgba(177, 215, 209, 0.7) 30%
  );
}

#underline-r {
  font-size: 1.1em;
  background-image: linear-gradient(
    transparent 80%,
    rgba(235, 152, 152, 0.7) 30%
  );
}
</style>
