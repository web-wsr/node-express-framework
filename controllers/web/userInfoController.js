const userInfoController = {
    index: async function (req, res, next) {
        try {
            if (res.locals.isLogin) {
                const userId = res.locals.userInfo.id;
                const userName=res.locals.userInfo.name;
                const userInfoData = { id: userId, name: userName};
                res.json(userInfoData);
              }
        } catch (error) {
            res.json({ error_code: 1, error_message: e.message })
        }
    }
}

module.exports = userInfoController;