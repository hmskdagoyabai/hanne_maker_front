<template>
  <div class="result">
    <!-- <div  class="loader">Now loading...</div> -->

    <div class="result_space">
      <div v-show="loading"><Loading /></div>

      <div v-show="!loading">
        <div class="result_name">
          今日からあなたは
          <h1>
            <vue-typer
              :repeat="0"
              initial-action="typing"
              :pre-type-delay="300"
              :type-delay="120"
              :pre-erase-delay="2000"
              caret-animation="blink"
              :text="result.second_name.second_name + result.name.name"
              @completed="onTypeComplete"
            ></vue-typer>
          </h1>
          です。
        </div>

        <transition name="fade">
          <div class="result_about" v-if="!typing">
            <h2 class="index2">
              <span
                >{{ result.second_name.second_name }}({{
                  result.second_name.second_name_original
                }})の意味</span
              >
            </h2>

            <div id="caption">
              {{ result.second_name.caption }}
            </div>

            <div v-if="result.name.id != 99999">
              <h2 class="index2">
                <span>{{ result.name.name }}({{ result.name.name_read }})</span>
              </h2>
              <div id="rank">
                <span id="underline-o"
                  >{{ result.name.name }}({{ result.name.name_read }})</span
                >は日本で{{ result.name.rank }}番目に世帯数の多い名字です。
                <p id="myoji_caption">
                  ※読み違いの同じ名字は合算して世帯数を計上しています。(例.
                  佐藤→「さとう」さんも「さふじ」さんも合算し世帯数1位)
                  <br />※同じ読みで漢字の違う名字は別の名字として計上しています。(例.
                  はまもと→「濱本」さんは世帯数3542位、「浜本」さんは世帯数663位、「浜元」さんは世帯数3677位、「濱元」さんはランク外)
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="button_space" v-if="this.$route.query.si">
      <div class="button">
        あなたもハンネを生成してみましょう！
      </div>
      <div class="button">
        <router-link :to="{ path: '/' }">
          <b-button variant="outline-primary">自分も生成してみる</b-button>
        </router-link>
      </div>
    </div>

    <div class="button_space" v-else>
      <div v-if="this.$route.query.n">
        <span class="button">
          <b-button
            variant="outline-success"
            v-on:click="retry()"
            v-bind:disabled="loading"
          >
            {{ result.name.name }}でもう一度生成
          </b-button>
        </span>
        <span class="button">
          <b-button
            variant="outline-secondary"
            v-on:click="retry_random()"
            v-bind:disabled="loading"
          >
            ランダムな名前で生成
          </b-button>
        </span>
      </div>
      <div v-else class="button">
        <b-button
          variant="outline-secondary"
          v-on:click="retry()"
          v-bind:disabled="loading"
        >
          もう一度ランダムに生成
        </b-button>
      </div>

      <div class="button">
        <b-button variant="primary" v-on:click="share_tweet()" v-if="!typing">
          {{
            result.second_name.second_name + result.name.name
          }}をTwitterで共有する
        </b-button>
      </div>

      <div class="button" id="toTop">
        <router-link :to="{ path: '/' }">
          <b-button variant="outline-dark">Topに戻る</b-button>
        </router-link>
      </div>
    </div>
    <div id="atogaki">
      <p>
        データを使用させていただきました<br />
        <a href="https://kakkoii-yougosyuu.com/archives/1035333396.html">
          「創作に使えるかもしれない用語集」</a
        >
        様および
        <br />
        <a href="http://www2s.biglobe.ne.jp/~suzakihp/index40.html">
          「須﨑のホームページ」</a
        >
        様<br />
        この場を借りてお礼申し上げます。
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "../components/Loading";
import { VueTyper } from "vue-typer";

export default {
  components: {
    Loading,
    VueTyper
  },
  data() {
    return {
      input_name: "",
      loading: true,
      typing: true,
      result: {
        name: {
          name_read: "",
          id: null,
          name: "",
          rank: ""
        },
        second_name: {
          second_name_original: "",
          second_name: "",
          id: null,
          caption: ""
        }
      }
    };
  },
  mounted() {
    this.get_name();
    window.scrollTo(0, 0);
  },
  methods: {
    get_name() {
      window.scrollTo(0, 0);

      //getパラメータを受け取る
      var name_id = this.$route.query.ni;
      var second_id = this.$route.query.si;
      var name = "";

      if (this.$route.query.n) {
        name = this.$route.query.n;
      } else if (this.input_name) {
        name = this.input_name;
      }
      const API_URL =
        "https://9qjj2mfml5.execute-api.ap-northeast-1.amazonaws.com/2nd_name_API";
      const API_PARAM = {
        name_id: name_id,
        second_id: second_id,
        name: name
      };

      axios
        .get(API_URL, {
          params: API_PARAM
        })
        // thenで成功した場合の処理をかける
        .then(response => {
          this.result = response.data;
          this.loading = false; //API呼び出しが終わったらloadingをfalseに
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    retry() {
      this.loading = true;
      this.typing = true;
      this.get_name();
    },
    retry_random() {
      this.input_name = "";
      this.$route.query.n = "";
      this.typing = true;
      this.loading = true;
      this.get_name();
    },
    share_tweet() {
      var base_url = location.protocol + "//" + location.hostname + "/result";
      var result_url = "";
      if (this.result.name.id == 99999) {
        result_url =
          base_url +
          "?n=" +
          encodeURI(this.result.name.name) +
          "&si=" +
          String(this.result.second_name.id);
      } else {
        result_url =
          base_url +
          "?si=" +
          String(this.result.second_name.id) +
          "&ni=" +
          this.result.name.id;
      }

      var encoded_url = encodeURIComponent(result_url);
      var share_text =
        "†ちょっと尖ったハンネメーカー†で新しい名前を生成しました。\n" +
        "今日から私は「" +
        this.result.second_name.second_name +
        this.result.name.name +
        "」です！\n\n" +
        this.result.second_name.second_name +
        "ってどんな意味？→\n";
      var hashtags = "ちょっと尖ったハンネメーカー";

      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        encodeURI(share_text) +
        "&url=" +
        encoded_url +
        "&hashtags=" +
        hashtags;

      window.open(shareURL, "_blank");
    },
    onTypeComplete() {
      this.typing = false;
    }
  }
};
</script>

<style scoped>
#caption,
#rank {
  margin: 5%;
}

#myoji_caption {
  margin: 3%;
  font-size: 0.8em;
  color: #696969;
}

.result_name {
  margin-top: 10%;
  margin-bottom: 20%;
}

.button {
  margin: 15px;
}

#toTop {
  margin-top: 15px;
}

#atogaki {
  margin-top: 5%;
  font-size: 0.9em;
}

h1 {
  margin: 1em 0;
  /* border-bottom: 1px dashed;
  padding-bottom: 1em; */
  font-weight: lighter;
}

.result_space {
  height: 70%;
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

.fade-enter-active,
.fade-leave-active {
  will-change: opacity;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.result_name {
  padding: 3%;
  margin-top: 5%;
  margin-bottom: 8%;
  margin-right: 10%;
  margin-left: 10%;

  border: 4px double; /* 線の太さと可視化 */
  border-radius: 8px;
  border-color: rgb(37, 37, 37);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}
</style>
