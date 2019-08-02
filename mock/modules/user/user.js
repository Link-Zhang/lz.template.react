const jwt = require('jsonwebtoken');
const userList = require('./users.json');
const secret = 'home';
const loggedUser = new Set();

module.exports = function (server) {
    server.post('/api/v1/login', function (req, res) {
        if (-1 === JSON.stringify(userList).indexOf(JSON.stringify(req.body))) {
            // 登录失败
            req.body = {};
            res.send({
                username: null,
                token: null,
                success: false
            });
        } else {
            // 登录成功
            const username = req.body.username;
            const content = {username: username};
            const token = jwt.sign(content, secret, {
                expiresIn: 60 * 30
            });
            loggedUser.add(username);
            console.log("---------------------------------");
            console.log("用户登录成功:");
            console.log(username);
            console.log(token);
            console.log("---------------------------------");
            console.log(loggedUser);
            req.body = {};
            res.send({
                username: username,
                token: token,
                success: true
            });
        }
    });

    server.post('/api/v1/logout', function (req, res) {
        if (loggedUser.has(req.body.username)) {
            // 注销成功
            loggedUser.delete(req.body.username);
            // 客户端需要手动删去token
        }
        console.log("---------------------------------");
        console.log("用户注销成功:");
        console.log(req.body.username);
        console.log("---------------------------------");
        console.log(loggedUser);
        req.body = {};
        res.send({
            username: null,
            token: null,
            success: true
        });
    });

    server.post('/api/v1/validation', function (req, res) {
        jwt.verify(req.body.token, secret, function (err, decode) {
            if (err || !loggedUser.has(decode.username)) {
                console.log("---------------------------------");
                console.log("用户验证失败:");
                console.log(req.body.token);
                console.log("---------------------------------");
                console.log(loggedUser);
                res.send({
                    username: null,
                    token: null,
                    success: false
                });
            } else {
                console.log("---------------------------------");
                console.log("用户验证成功:");
                console.log(decode);
                console.log("---------------------------------");
                console.log(loggedUser);
                res.send({
                    username: decode.username,
                    token: req.body.token,
                    success: true
                });
            }
        });
    });
};

