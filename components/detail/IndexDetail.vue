<template>
  <div class="index-wrapper-master">
    <div class="masonry">
      <div
        v-for="(articleData, index) in articleList.data"
        :key="index"
        class="index-part"
      >
        <article-part :articleData="articleData"></article-part>
      </div>
    </div>

    <div @click="getArticleList()" class="more-btn">
      <button
        v-if="articleList.data.length != articleList.count"
        class="ui primary button"
        :class="{ loading: loading }"
      >
        点击加载更多
      </button>
      {{ articleList.data.length == articleList.count ? "没有更多文章了" : "" }}
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import ArticlePart from "../custom/ArticlePart";

export default {
  components: { ArticlePart },
  props: {
    articleList: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      page: 1,
      limit: 10,
      loading: false,
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    getTagColor() {
      var tag_options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * tag_options.length);
      return tag_options[index];
    },
    async getArticleList(type) {
      this.loading = true;
      if (this.articleList.data.length == this.articleList.count) {
        this.$notify({
          type: "warning",
          title: "注意",
          message: "没有更多文章了",
          duration: 5000,
          offset: 65,
        });
        return;
      }

      if (type == "new") {
        this.page = 1; // 重新选择分类
        this.articleList = [];
      } else {
        this.page += 1; // 页码增加
      }
      var params = {};
      if (this.isSelect_article_id) {
        params = {
          id: this.isSelect_article_id,
          limit: this.limit,
          page: this.page,
        };
        this.articleList.data = this.articleList.concat(
          (
            await this.$axios.get("/api/article-sort", {
              params,
            })
          ).data.expand.data
        );
      } else {
        params = { limit: this.limit, page: this.page };
        this.articleList.data = this.articleList.data.concat(
          (
            await this.$axios.get("/api/article", {
              params,
            })
          ).data.data
        );
      }
      this.loading = false;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.index-wrapper-master {
  width: 100%;
}

.more-btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 10px 0px;
  box-sizing: border-box;
}

.masonry {
  width: 100%;
  .index-part {
    width: 100%;
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .index-banner {
    height: 130px;
    margin-bottom: 14px;
    .banner-bg {
      height: 130px;
      h1 {
        font-size: 24px;
      }
    }
  }
  .masonry {
    .index-part {
      margin-bottom: 14px;
    }
  }
}
</style>
