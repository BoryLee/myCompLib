const headConf = require('./config/headConf');
const navConf = require('./config/navConf');
const sidebarConf = require('./config/sidebarConf');
const pluginsConf = require('./config/pluginsConf')
module.exports = {
    base: '/myCompLib/',
    title: '南城雨落前端之家',
    description: '前端之家',
    head: headConf,
    host: 'localhost',
    port: 9999,
    plugins: pluginsConf,
    themeConfig: {
        displayAllHeaders: true ,
        nav: navConf,
        sidebar: sidebarConf,
        smoothScroll: true,
        lastUpdated: '更新时间',
    }
}