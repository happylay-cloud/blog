module.exports = {
  title: "每天忙碌的日子，也不要忘记了好好生活 🏠",
  description: "如歌岁月，似水流年",
  dest: "./dist/docs",
  base: '/blog/',
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  plugins: [
    [
      "@vuepress/medium-zoom",
      {
        selector: ".medium-zoom", // 指定含有medium-zoom的类缩放，类名可自定义，markdown中的img的class类保持一致就可以，没有指明的图片类将不支持缩放
        delay: 1000, // 延迟1秒
        options: {
          margin: 24,
          scrollOffset: 0,
        },
      },
    ],
    ["@vuepress-reco/extract-code"],
    ["cursor-effects"],
    ["ribbon"],
    ["flowchart"],
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又回来了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，离开啦！",
        recoverTime: 2000,
      },
    ],
    ["@vuepress-reco/vuepress-plugin-pagation"],
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["blackCat"],
        clean: true,
        messages: {
          welcome: "欢迎来到小屋。",
          home: "心里的花，我想要带你回家。",
          theme: "好吧，希望你能喜欢我的其他小伙伴。",
          close: "你知道我喜欢吃什么吗？痴痴地望着你。",
        },
        width: 140,
        height: 140,
      },
    ],
    ["vuepress-plugin-auto-sidebar"],
    [
      "vuepress-plugin-nuggets-style-copy",
      {
        copyText: "复制代码",
        tip: {
          content: "复制成功!",
        },
      },
    ],
    // 音乐插件
    [
      "meting",
      {
        meting: {
          auto: "https://music.163.com/#/discover/toplist?id=3778678",
        },
        // 不配置该项的话不会出现全局播放器
        aplayer: {
          // 吸底模式
          fixed: true,
          mini: true,
          // 自动播放
          autoplay: true,
          // 歌曲栏折叠
          listFolded: true,
          // 颜色
          theme: "#de6f62",
          // 播放顺序为随机
          order: "random",
          // 初始音量
          volume: 0.7,
          // 关闭歌词显示
          lrcType: 0,
        },
        mobile: {
          cover: true,
        },
      },
    ],
  ],
  themeConfig: {
    locales: {
      "/": {
        recoLocales: {
          homeBlog: {
            article: "文章", // 默认 文章
            tag: "标签", // 默认 标签
            category: "分类", // 默认 分类
            friendLink: "友链", // 默认 友情链接
          },
          pagation: {
            prev: "上一页",
            next: "下一页",
            go: "前往",
            jump: "跳转至",
          },
        },
      },
    },
    noFoundPageByTencent: false,
    mode: "dark", // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    modePicker: true,
    // 完整的 GitLab 网址
    repo: "happylay-cloud/happylay-cloud.github.io",
    // 如果你的文档不在仓库的根部
    docsDir: "blog",
    // 可选，默认为 master
    docsBranch: "master",
    // 默认为 true，设置为 false 来禁用
    editLinks: true,
    editLinkText: "编辑文档",
    nav: [
      {
        text: "主页",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "时间轴",
        link: "/timeline/",
        icon: "reco-date",
      },
      {
        text: "文档",
        icon: "reco-message",
        items: [
          {
            text: "轨迹",
            icon: "reco-lock",
            link: "/docs/轨迹/",
          },
        ],
      },
      {
        text: "个人空间",
        icon: "reco-message",
        items: [
          {
            text: "哔哩哔哩",
            link: "https://www.bilibili.com",
            icon: "reco-bilibili",
          },
          {
            text: "编辑博客",
            link:
              "https://github.com/MescalChivas/MescalChivas.github.io/tree/master/blog/blogs",
            icon: "reco-github",
          },
        ],
      },
      {
        text: "工具集",
        icon: "reco-coding",
        items: [
          {
            text: "后端工具",
            items: [
              { text: "在线json解析", link: "https://www.json.cn/" },
              { text: "yml格式转换", link: "https://www.toyaml.com/index.html" },
              { text: "websocket测试", link: "http://coolaf.com/tool/chattest" },
              { text: "时间戳转换", link: "http://tool.chinaz.com/Tools/unixtime.aspx" },
              { text: "cron表达式", link: "https://cron.qqe2.com/" },
              { text: "linux程序包", link: "https://pkgs.org/" },
              { text: "大小写转换", link: "https://tool.lanrentuku.com/daxiaoxie/" },
            ],
          },
          {
            text: "前端工具",
            items: [
              { text: "Vant移动端组件库", link: "https://vant-contrib.gitee.io/vant/#/zh-CN/" },
              { text: "Element桌面端组件库", link: "https://element.eleme.cn/#/zh-CN" },
              { text: "uni-app移动端框架", link: "https://uniapp.dcloud.io" },
              { text: "uview移动端框架", link: "https://www.uviewui.com/" },
              { text: "colorui2.0文档", link: "https://www.yuque.com/colorui" },
              { text: "Figma", link: "https://www.figma.com" },
              { text: "Codepen", link: "https://codepen.io" },
              { text: "Dribbble", link: "https://dribbble.com" },
              { text: "Iconfont阿里矢量图库", link: "https://www.iconfont.cn" },
              { text: "IconPark图标库", link: "http://iconpark.bytedance.com" },
              { text: "Icomoon", link: "https://icomoon.io/app/#/select" },
              { text: "Remixicon", link: "https://remixicon.com" },
              { text: "favicon图标制作", link: "http://www.ico51.cn/" },
            ],
          },
          {
            text: "开发环境",
            items: [
              { text: "windows包管理器-baulk", link: "https://github.com/baulk/baulk" },
              { text: "windows包管理器-scoop", link: "https://github.com/lukesampson/scoop" },
              { text: "windows原版镜像", link: "https://www.microsoft.com/zh-cn/software-download/windows10ISO" },
              { text: "nexus3仓库", link: "https://www.sonatype.com/nexus/repository-oss/download" },
            ],
          },
          {
            text: "微服务",
            items: [
              {
                text: "版本兼容关系", link: "https://github.com/alibaba/spring-cloud-alibaba/wiki/版本说明",
              },
              { text: "k8s在线配置", link: "https://k8syaml.com" },
              { text: "k8s接口文档", link: "https://k8s.mybatis.io/v1.18/" },
            ]
          }
        ],
      },
    ],
    subSidebar: "auto",
    type: "blog",
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
    friendLink: [
      {
        title: "前端技术月刊",
        desc:
          "聚焦前端，记录过去一个月探索发现的值得推荐的前端技术栈、文章以及应用，每月28日更新",
        email: "xiaoluoboding@gmail.com",
        link: "https://xiaoluoboding.github.io/monthly/",
      },
      {
        title: "后端技术月刊",
        desc: "分享 GitHub 上有趣、入门级的开源项目，每月28日更新",
        email: "595666367@qq.com",
        link: "https://hellogithub.com",
      },
    ],
    logo: "/logo.jpg",
    search: true,
    searchMaxSuggestions: 20,
    lastUpdated: "最后一次更新",
    author: "happylay 🐑",
    authorAvatar: "/avatar.jpg",
    record: "",
    startYear: "2020",
  },
  markdown: {
    lineNumbers: true,
  },
};
