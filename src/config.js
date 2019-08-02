module.exports = {
    name: 'Home',// 项目的名字
    host: 'http://localhost:3000', //项目主页
    github: 'https://github.com/link-zhang/lz.react.home',// github项目地址
    favicon: './logo.svg',// 设置网页的favicon,
    debug: true,// 是否开启debug模式
    api: {
        host: 'http://localhost:8080',  // 调用ajax接口的地址, 默认值空, 如果是跨域的, 服务端要支持CORS
        path: '/api/v1',  // ajax请求的路径
        timeout: 5000,  // 请求的超时时间, 单位毫秒
    },
    login: {  // 登录相关配置
        login: '/login',
        logout: '/logout',
        validation: '/validation',
    },
    sidebar: {  // 侧边栏相关配置
        collapsible: true,  // 是否显示折叠侧边栏的按钮
        autoMenuSwitch: true,  // 只展开一个顶级菜单, 其他顶级菜单自动折叠
    },
    isCrossDomain() {
        return !!(this.api.host && this.api.host !== /** @type {boolean} */'');
    },
    getAPIPath() {
        if (this.tmpApiPath) {
            return this.tmpApiPath;
        }
        const paths = [];
        if (this.isCrossDomain()) {
            const tmp = this.api.host;
            let index = tmp.length - 1;
            while (tmp.charAt(index) === '/') {
                index--;
            }
            if (index < 0)
                paths.push('');
            else
                paths.push(tmp.substring(0, index + 1));
        } else {
            paths.push('');
        }
        if (this.api.path) {
            const tmp = this.api.path;
            let begin = 0;
            let end = tmp.length - 1;

            while (tmp.charAt(begin) === '/') {
                begin++;
            }
            while (tmp.charAt(end) === '/') {
                end--;
            }
            if (begin > end)
                paths.push('');
            else
                paths.push(tmp.substring(begin, end + 1));
        } else {
            paths.push('');
        }

        const tmpApiPath = paths.join('/');
        this.tmpApiPath = tmpApiPath;
        return tmpApiPath;
    },
    houseServer: {
        path: 'http://localhost:2140/feign/house/',
        findAPI: '?limit=9000&houseFindVO.houseDistrict=',
        findByCommunityIdAPI: '?limit=200&houseFindVO.houseCommunityId=',
    },
    historyServer: {
        path: 'http://localhost:2141/feign/history/',
        findByHouseIdAPI: '?limit=200&historyFindVO.historyHouseId=',
    },
    communityServer: {
        path: 'http://localhost:2142/feign/vcommunity/',
        findAPI: '?limit=2000&vcommunityFindVO.district=',
    },
    statisticServer: {
        path: 'http://localhost:2143/feign/statistic/',
        findAPI: '?limit=3650&statisticFindVO.statisticHouseDistrict=',
    },
};
