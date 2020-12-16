module.exports = {
    title: '前端笔记📒',
    description: '老白嫖怪了',
    dest: './docs/dist',
    port: '7777',
    head: [
        ['link', {rel: 'icon', href: '/img/favicon.ico'}]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require("./nav.js"),
        sidebar: require("./sidebar.js"),
        sidebarDepth: 2,
        lastUpdated: '最后一次更新',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
}
