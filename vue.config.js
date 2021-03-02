module.exports = {
    devServer:{
        proxy:{
            '/api':{   // 路径中有 /api 的请求都会走这个代理 , 可以自己定义一个,下面移除即可
                target:'http://120.25.199.176:7001',
                // target:'http://127.0.0.1:7001',
                changeOrigin:true,  // 开启代理，在本地创建一个虚拟服务端
                pathRewrite:{   // 去掉 路径中的  /api  的这一截
                    '^/api':''
                }
            },
        
        },
    },

    publicPath: './'
}
