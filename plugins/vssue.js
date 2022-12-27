/*
 * @Description: Description
 * @Author: Kerwin
 * @Date: 2022-12-27 17:38:56
 * @LastEditTime: 2022-12-27 17:44:41
 * @LastEditors:  Please set LastEditors
 */
import Vue from "vue";
import Vssue from "vssue";
import GithubV3 from "@vssue/api-github-v3";
import "vssue/dist/vssue.css";

Vue.use(Vssue, {
  api: GithubV3,
  owner: "kerwin",
  repo: "NAME_OF_REPO",
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
});
