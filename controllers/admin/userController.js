const User=require('../../model/user')
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const Cookies = require('js-cookie');

const schema = require('async-validator').default;
const rolePermission = require('../../model/role_permission.js')
const PermissionGroup = require('../../model/permission_group.js')
const Permission = require('../../model/permission.js')
// const jsCookie = require('js-cookie');
const rand=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
}
validataPhoneCode=[]
let sendCodeP=(phone)=>{
    for(let item of validataPhoneCode){
        if(phone == item.phone){
            return true;
        }
    }
    return false;
}

let findCodeAndPhone=(phone,code)=>{
    for(let item of validataPhoneCode){
        if(phone == item.phone && code == item.code){
            return 'success';
        }
    }
    return 'error'
}
const userController = {
    // 模拟验证码发送接口
    sendCode: function(req,res,next){
        let phone=req.body.phone;
        if(sendCodeP(phone)){
            res.json({
                code:400,
                msg:'验证码已发送，请勿重复发送'
            })
        }
        let code=rand(1000,9999);
        validataPhoneCode.push({
            phone,
            code
        })
        console.log(validataPhoneCode);
        res.json({
            code:200,
            msg:'验证码发送成功',
        })
        console.log(code);
    },
    // 登录接口
    login: async function(req,res,next){
        let phone=req.body.phone;
        let code=req.body.code;
        try{
            if(sendCodeP(phone)){
            let state=findCodeAndPhone(phone,code)
            // 搜索匹配的用户
            const users = await User.select({ phone });
            //是否该用户存在
            const user = users[0];
            console.log(user);
            
            if(state==='success'&& user){
                let token =JWT.sign({user_id:user.id,user_name:user.name},JWT_SECRET,{expiresIn:'30d'})
                console.log(token);
                
                // // 加密放置在cookie中
                // res.cookie('web_token', token, { maxAge: 30 * 24 * 60 * 60 * 1000 },{ httpOnly: true ,secure: false,SameSite: 'None' });
                // const cookieOptions = {
                //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30天有效期
                //     httpOnly: true,
                //     secure: true, // 如果使用 HTTPS，则设置为 true
                //     sameSite: 'None',// 必须设置为 None 才能跨站点使用
                //     path: '/', // 设置路径为根路径
                //     domain: '.127.0.0.1' // 设置域
                // };

                // res.cookie('web_token', token, cookieOptions);
                res.json({
                    code:200,
                    msg:'登录成功',
                    data:{token:token}
                })
            }else{
                res.json({ code: 0, data: { msg: '登录失败，没有此用户' } });
            }
        }
        }catch(e){
        console.log(e);
        res.json({ code: 0, data: e })
        }
    },
    // 退出登录接口
    logout: function(req,res,next){
        res.json({
            code:200,
            msg:'退出成功'
        })
    },
    // 获取权限信息接口
    getPermissions: async function(req, res, next) {
        try {
          if(res.locals.isLogin){
          const id= res.locals.userInfo.id
          const permissionGroup = await PermissionGroup.all()
          const permissionsAll = await Permission.all()
          const permissionGroupDiv = {}
          permissionGroup.forEach(data => {
            data.children = []
            permissionGroupDiv[data.id] = data
          })
          permissionsAll.forEach( data => {
            permissionGroupDiv[data.group_id].children.push(data)
          })
          const permissionsTransformAll = Object.values(permissionGroupDiv)
          console.log(permissionsTransformAll);
          

          // 获取角色关联的权限
          const permissions = await rolePermission.where({ role_id: id });
          console.log('1111111',permissions);
          const permissionsTransform = permissions.map(data => data.permission_id)
          console.log(permissionsTransform);
        //   const slugs = permissionsTransform.map(id=>{
        //     const item=permissionsAll.find(item => item.id===id)
        //     return item ? item.slug: ''
        //   }).filter(slug => slug !== '')
          const slugs = permissionsTransform.map(id=>{
            const item=permissionsAll.find(item => item.id===id)
            return item.slug
          })
          console.log(slugs);
          
          res.json({error_code: 0, data: { permissions: slugs } })
          }
        } catch (e) {
          res.json({error_code: 1, message: e.message})
        }
      },
};

module.exports=userController;