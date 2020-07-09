module.exports = {
    '@vuepress/medium-zoom': {
        selector: 'img.effect'
    },
    '@vuepress/active-header-links': true,
    '@vuepress/back-to-top': true,
    '@vuepress/last-updated': {
        transformer: (timestamp, lang) => {
            const moment = require('moment');
            moment.locale('zh-cn');
            return moment().format('LLL');
        }
    },
}