import superAgent from 'superagent';
import globalConfig from '../config';

class Ajax {
    requestWrapper(method, url, {params, data, headers} = {}) {
        return new Promise((resolve, reject) => {
            const tmp = superAgent(method, url);
            if (globalConfig.isCrossDomain()) {
                tmp.withCredentials();
            }
            if (globalConfig.api.timeout && !isNaN(globalConfig.api.timeout)) {
                tmp.timeout(globalConfig.api.timeout);
            }
            tmp.set('Content-Type', 'application/json').set('Accept', 'application/json');
            if (headers) {
                tmp.set(headers);
            }
            if (params) {
                tmp.query(params);
            }
            if (data) {
                tmp.send(data);
            }
            tmp.end((err, res) => {
                if (res && res.body) {
                    resolve(res.body);
                } else {
                    reject(err || res);
                }
            });
        });
    }

    get(url, opts = {}) {
        return this.requestWrapper('GET', url, {...opts});
    }

    post(url, data, opts = {}) {
        return this.requestWrapper('POST', url, {...opts, data});
    }

    login(username, password) {
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        return this.post(`${globalConfig.getAPIPath()}${globalConfig.login.login}`, {username, password}, {headers});
    }

    logout(username) {
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        return this.post(`${globalConfig.getAPIPath()}${globalConfig.login.logout}`, {username}, {headers});
    }

    validation(token) {
        const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
        return this.post(`${globalConfig.getAPIPath()}${globalConfig.login.validation}`, {token}, {headers});
    }

    statistic(district) {
        return this.get(`${globalConfig.statisticServer.path}${globalConfig.statisticServer.findAPI}${encodeURI(district)}`);
    }

    community(district) {
        return this.get(`${globalConfig.communityServer.path}${globalConfig.communityServer.findAPI}${encodeURI(district)}`);
    }

    house(district) {
        return this.get(`${globalConfig.houseServer.path}${globalConfig.houseServer.findAPI}${encodeURI(district)}`);
    }

    houseByCommunityId(communityId) {
        return this.get(`${globalConfig.houseServer.path}${globalConfig.houseServer.findByCommunityIdAPI}${communityId}`);
    }

    historyByHouseId(houseId) {
        return this.get(`${globalConfig.historyServer.path}${globalConfig.historyServer.findByHouseIdAPI}${houseId}`);
    }
}

export default Ajax;

