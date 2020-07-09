module.exports = [
    ['link', { rel: 'icon', href: '/vue.png' }],
    ['meta', {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no'
    }],
    ['meta', {
        name: 'keywords',
        content: 'vuepress，uniapp组件，vue组件，移动端'
    }],
    ['meta', {
        name: 'author',
        content: 'borylee'
    }],
    ['script', {},
        `var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?d0ea599d27e0113474f1d92870b5cb85";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();`
    ]
];