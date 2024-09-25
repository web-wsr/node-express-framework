const cors = {
    allowAll: function (req, res, next) {
      // res.header("Access-Control-Allow-Headers", "*");
      res.header("Access-Control-Allow-Headers", "Authorization, Content-Type, Cache-Control");
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Credentials', true);
      
    
       // 添加调试输出
       console.log('Request headers:', req.headers);


       next();
      
    }
  }
  
  module.exports = cors;