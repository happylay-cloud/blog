module.exports = {
  // 设置网站标题
  title: "随笔 📒",
  // 描述
  description: "我们男孩子想要的，就必须搞到手",
  // 设置输出目录
  dest: "./dist",
  // 端口
  port: "2020",
  head: [["link", { rel: "icon", href: "/img/favicon.ico" }]],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页 ！",
    lastUpdated: "最后一次更新",
    serviceWorker: {
      updatePopup: true,
      updatePopup: {
        message: "新内容可用。",
        buttonText: "刷新",
      },
    },
    search: true,
    searchMaxSuggestions: 10,
    // 添加导航栏
    nav: [
      { text: "主页 🏡", link: "/" },
      {
        text: "摸鱼小工具 🐟",
        items: [
          {
            text: "摸鱼博客",
            items: [
              { text: "后端技术月刊", link: "https://hellogithub.com/" },
              {
                text: "前端技术月刊",
                link: "https://xiaoluoboding.github.io/monthly/",
              },
            ],
          },
          {
            text: "后端懒人工具",
            items: [
              {
                text: "在线json解析",
                link: "https://www.json.cn/",
              },
              {
                text: "yml格式转换",
                link: "https://www.toyaml.com/index.html",
              },
              {
                text: "websocket测试",
                link: "http://www.websocket-test.com/",
              },
              {
                text: "时间戳转换",
                link: "http://tool.chinaz.com/Tools/unixtime.aspx",
              },
              {
                text: "cron表达式",
                link: "https://cron.qqe2.com/",
              },
              {
                text: "linux程序包",
                link: "https://pkgs.org/",
              },
              {
                text: "大小写转换",
                link: "https://tool.lanrentuku.com/daxiaoxie/",
              },
            ],
          },
          {
            text: "前端懒人工具",
            items: [
              { text: "蓝湖", link: "https://lanhuapp.com/" },
              { text: "favicon图标", link: "https://tool.lu/favicon/" },
              { text: "ico图标", link: "http://www.ico51.cn/" },
            ],
          },
          {
            text: "开发环境",
            items: [
              {
                text: "windows包管理器-baulk",
                link: "https://github.com/baulk/baulk",
              },
              {
                text: "windows包管理器-scoop",
                link: "https://github.com/lukesampson/scoop",
              },
              {
                text: "windows原版镜像",
                link:
                  "https://www.microsoft.com/zh-cn/software-download/windows10ISO",
              },
              {
                text: "nexus3",
                link: "https://www.sonatype.com/nexus/repository-oss/download",
              },
            ],
          },
        ],
      },
      {
        text: "高级摸鱼 🔥",
        items: [
          {
            text: "微服务",
            items: [
              {
                text: "版本兼容",
                link:
                  "https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明",
              },
            ],
          },
          {
            text: "在线文档",
            items: [
              { text: "k8s在线配置", link: "https://k8syaml.com" },
              {
                text: "k8s接口文档",
                link: "https://k8s.mybatis.io/v1.18/",
              },
            ],
          },
          {
            text: "图标集合",
            items: [
              { text: "IconPark图标库", link: "http://iconpark.bytedance.com" },
              {
                text: "iconfont阿里矢量图库",
                link: "https://www.iconfont.cn",
              },
            ],
          },
        ],
      },
      { text: "划水摸鱼 🌧", link: "/fish/" },
      { text: "打怪升级 👾", link: "/book/" },
      { text: "代码片段 🎈", link: "/css-card/" },
      {
        text: "缓缓打出一个❓，嗯",
        items: [
          { text: "gitea", link: "https://github.com/go-gitea/gitea.git" },
          { text: "colorui", link: "https://github.com/weilanwl/ColorUI.git" },
        ],
      },
    ],
    // 添加侧边栏
    sidebar: {
      // 快速开始
      "/fish/": [
        {
          title: "摸鱼技巧一",
          collapsable: true,
          children: [{ title: "打怪", path: "one/one" }],
        },
        {
          title: "摸鱼技巧二",
          collapsable: true,
          children: [{ title: "升级", path: "two/two" }],
        },
      ],
      "/book/": [
        {
          title: "开始懵逼",
          collapsable: true,
          children: [{ title: "打怪", path: "vue/zero/one" }],
        },
        {
          title: "完全懵逼",
          collapsable: true,
          children: [{ title: "打怪", path: "vue/high/one" }],
        },
      ],
      "/css-card/": [
        {
          title: "前端小抄",
          collapsable: true,
          children: [
            "flexbox",
            "git",
            "grid",
            "head",
            "http",
            "markdown",
            "preview",
            "sass",
            "regex",
            "boxmodel",
            "console",
          ],
        },
      ],
    },
  },
};
