<template>
  <div class="header">
    <div>
      <b-navbar toggleable="lg" type="light">
        <div id="brand_title">
          †ちょっと尖ったハンネメーカー†
        </div>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickSmoothScroll(x) {
      event.preventDefault();
      this.$SmoothScroll(document.querySelector(x), 800, null, null, "y");
    },
    to_hamabe() {
      window.open("https://hamabe.info", "_blank");
    }
  }
};
</script>

<style>
.header {
  /* font-family: "M PLUS 1p", sans-serif; */
  /* background-color:#ebbbbb; */
  background: linear-gradient(90deg, #ffffff, #faf9eb);
  /* background: linear-gradient(0deg, #f7f0ef, #f7f0ef); */
  /* background: transparent; */
  /* background-color: #f7f0ef; */

  /* position: fixed; */
  top: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

#brand_title {
  font-size: 1.2em;
  color: rgb(73, 68, 60);
  margin-right: 5px;
  text-decoration: none;
}
#brand_subtitle {
  font-size: 0.9em;
  color: rgb(85, 85, 85);
  margin-right: 30px;
}

#nav-collapse {
  margin-left: auto;
  margin-right: auto;
}

.nav-link {
  font-size: 1.1em;
  color: antiquewhite;
}

#icon {
  margin-right: 10px;
}

.head-button-dropdown {
  outline: none;
}

a {
  text-decoration: none;
}
.router-link-exact-active {
  text-decoration: none;
}
</style>
