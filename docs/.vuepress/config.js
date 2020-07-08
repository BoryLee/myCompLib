const headConf = require('./config/headConf');
const navConf = require('./config/navConf');
const sidebarConf = require('./config/sidebarConf');
const pluginsConf = require('./config/pluginsConf')
module.exports = {
    title: '我的组件库',
    description: '我的组件库',
    head: headConf,
    host: 'localhost',
    port: 9999,
    plugins: pluginsConf,
    themeConfig: {
        nav: navConf,
        sidebar: sidebarConf,
        smoothScroll: true,
    }
}