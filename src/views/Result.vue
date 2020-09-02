<template>
  <div class="result">
    <p>
      <input v-model="input_name" placeholder="なまえ" />
      <button v-on:click="reload()">もういっかい</button>
    </p>
    <!-- <div  class="loader">Now loading...</div> -->

    <div v-show="loading">
      <div class="loader loader--style1" title="0">
        <svg
          version="1.1"
          id="loader-1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="40px"
          height="40px"
          viewBox="0 0 40 40"
          enable-background="new 0 0 40 40"
          xml:space="preserve"
        >
          <path
            opacity="0.2"
            fill="#000"
            d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
          />
          <path
            fill="#000"
            d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 20 20"
              to="360 20 20"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </div>

    <div v-show="!loading">
      <h2 class="result_name">
        {{ result.second_name.second_name + result.name.name }}
      </h2>
      <p>{{ result.second_name.second_name }}({{ result.second_name.second_name_original }})</p>
      <p>
        {{ result.second_name.caption }}
      </p>
      <p>
        {{ result.name.name }}({{ result.name.name_read }})は日本で{{ result.name.rank }}番目に多い名字です。
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      input_name: "",
      loading: true,
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
  },
  methods: {
    get_name() {
      //getパラメータを受け取る
      var name_id = this.$route.query.name_id;
      var second_id = this.$route.query.second_id;
      var name = "";

      if (this.$route.query.name) {
        name = this.$route.query.name;
      } else if (this.input_name) {
        name = this.input_name;
      }

      // 参考 https://alliance7.blogspot.com/2019/01/google-formaxioscros.html
      // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
      const API_URL = "https://9qjj2mfml5.execute-api.ap-northeast-1.amazonaws.com/2nd_name_API";
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
          console.log("status:", response.status); // 200
          console.log("body:", response.data); // response body.
          this.result = response.data;
          this.loading = false; //API呼び出しが終わったらloadingをfalseに
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    reload() {
      this.loading = true;
      this.get_name();
    }
  }
};
</script>

<style scoped>
body {
  padding: 1em;
  background: #2b3134;
  color: #777;
  text-align: center;
  font-family: "Gill sans", sans-serif;
  width: 80%;
  margin: 0 auto;
}
h1 {
  margin: 1em 0;
  border-bottom: 1px dashed;
  padding-bottom: 1em;
  font-weight: lighter;
}
p {
  font-style: italic;
}
.loader {
  margin: 0 0 2em;
  height: 100px;
  width: 20%;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  display: inline-block;
  vertical-align: top;
}

/*
  Set the color of the icon
*/
svg path,
svg rect {
  fill: #ff6700;
}
</style>
