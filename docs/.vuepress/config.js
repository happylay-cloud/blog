module.exports = {
  title: "前端笔记📒", // 设置网站标题
  description: "老白嫖怪了", // 描述
  dest: "./dist", // 设置输出目录
  port: "2020", // 端口
  head: [["link", { rel: "icon", href: "/img/favicon.ico" }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // 添加导航栏
    nav: [
      { text: "打怪升级", link: "/guide/" },
      {
        text: "缓缓打出一个？",
        items: [
          { text: "开始懵逼", link: "/guide/baodian/zero/" },
          { text: "完全懵逼", link: "/guide/baodian/high/" },
        ],
      },
      {
        text: "白嫖小助手",
        items: [
          {
            text: "Iconfont",
            items: [{ text: "矢量图标库", link: "https://www.iconfont.cn/" }],
          },
          {
            text: "博客指南",
            items: [
              { text: "掘金", link: "https://juejin.im/" },
              { text: "CSDN", link: "https://blog.csdn.net/" },
            ],
          },
        ],
      },
    ],
    // 添加侧边栏
    sidebar: {
      // 快速开始
      "/guide/": [
        {
          title: "青铜",
          collapsable: true,
          children: [{ title: "一", path: "/guide/notes/ones" }],
        },
        {
          title: "白银",
          collapsable: true,
          children: [{ title: "二", path: "/guide/notes/two" }],
        },
      ],
      "/baodian/zero": [
        {
          title: "开始懵逼",
          collapsable: true,
          children: ["/baodian/zero/notes/one"],
        },
      ],
      "/baodian/high": [
        {
          title: "完全懵逼",
          collapsable: true,
          children: ["/baodian/high/notes/one"],
        },
      ],
    },
    sidebarDepth: 2,
    lastUpdated: "最后一次更新",
    searchMaxSuggestoins: 10,
    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: "更新",
      },
    },
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页 ！",
  },
};
