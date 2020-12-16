import Player from "zw-player";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // 注册组件
  Vue.component("Player", Player);
};
