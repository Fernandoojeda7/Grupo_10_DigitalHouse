function recordMiddleware(req, res, next) {
    next();
    if (req.cookies.recordame != undefined &&
        req.session.userLogin == undefined) {
            let usersJson = fs.readFileSync(usersFilePath, 'utf-8');
            let users;
            if(users == "") {
                users =[];
            } else {
                users = JSON.parse(usersJson)
            }
                let userALogin;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.cookies.recordame) {
                            userALogin = users[i];
                        break;
                    }
                }
                req.session.userLogin = userALogin;
            } 
        }


module.exports = recordMiddleware;