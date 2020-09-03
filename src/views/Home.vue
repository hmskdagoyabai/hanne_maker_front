<template>
  <div class="home">
    <!-- <h1>†ちょっと尖ったハンネメーカー†</h1> -->
    <h2 class="index2">
      <span>このページについて</span>
    </h2>

    <div id="about">
      <p id="names">
        「デーモン小暮」「ジミー大西」「ギャル曽根」「ヘルシェイク矢野」...
      </p>
      <p>
        <span id="underline-r">カタカナ語</span>＋<span id="underline-b"
          >名字</span
        >の芸名やハンドルネームって尖ってて憧れますよね。
      </p>
      <p>
        <span id="underline-o">「ちょっと尖ったハンネメーカー」</span
        >は、そんな<span id="underline-g">ちょっと尖ったハンドルネーム</span
        >を自動で生成します。
      </p>
      <p>
        現在5930件の名字と635件のカタカナ語が登録されています。
      </p>
    </div>
    <h2 class="index2">
      <span>†ちょっと尖ったハンネ†を生成する</span>
    </h2>
    <div id="about">
      <p>
        「<span id="underline-r">ランダムに生成する</span
        >」を押すとカタカナ語も名字もランダムにハンドルネームを生成します。
      </p>
      <p>
        名字部分を自由に入力して「<span id="underline-b"
          >名字を指定して生成する</span
        >」から生成することもできます。
      </p>
      <p>
        名字ではなく肩書・役職などを入力してみるのもいいかもね。(例.
        先生、部長、破戒僧 etc...)
      </p>

      <div id="gen_button">
        <div>
          <router-link :to="{ path: '/result' }">
            <b-button variant="outline-secondary">ランダムに生成する</b-button>
          </router-link>
        </div>

        <div id="mataha">または</div>
        <div>
          <input
            class="name"
            type="text"
            v-model="input_name"
            placeholder="名字(10文字まで)"
          />
          <router-link :to="{ path: '/result', query: { n: input_name } }">
            <b-button variant="outline-danger" v-bind:disabled="!input_name"
              >名字を指定して生成する</b-button
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      input_name: ""
    };
  },
  watch: {
    input_name(input_name) {
      this.input_name = this.charaLimit(input_name);
    }
  },
  methods: {
    charaLimit(input_name) {
      return input_name.length > 10 ? input_name.slice(0, -1) : input_name;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
#about {
  margin: 5%;
}
#gen_button {
  padding: 3%;
  margin-top: 8%;
  margin-bottom: 5%;
  margin-right: 10%;
  margin-left: 10%;
}

#gen_button {
  border: 4px double; /* 線の太さと可視化 */
  border-radius: 8px;
  border-color: rgb(37, 37, 37);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

#mataha {
  margin: 2%;
}
.name {
  margin-right: 15px;
  margin-left: 15px;
  width: 30%;
}

@media screen and (max-width: 540px) {
  .name {
    margin: 10px;
    width: 70%;
  }
}

.names {
  font-size: 1.5em;
}

.index2 {
  border-bottom: 3px solid #000000;
}
.index2 span {
  color: #ffffff;
  font-size: 16px;
  line-height: 20px;
  position: relative;
  background: #000000;
  display: inline-block;
  padding: 10px;
}
.index2 span:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 100%;
  width: 0;
  height: 0;
  border-width: 0 10px 40px 0;
  border-style: solid;
  border-color: transparent;
  border-bottom-color: #000000;
}
</style>
