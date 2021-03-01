// 公共样式
// const commonStyle = { 
    
// }

// 编辑器左侧组件列表
const list = [
    {
        label: '普通盒子',
        type:'normalBox',
        link:'',
        style: {
            'width': 200,
            'height': 33,
            'fontSize': 14,
            'fontWeight': 500,
            'borderWidth': 1,
            'lineHeight':14,
            'textAlign':'center',
            'borderColor':'#ddd',
            'color':'#333333',
            'opacity': 1,
            'borderStyle':'solid',
            'display':'flex',
            'flexDirection':'row',
            'flexWrap':'wrap',
            'justifyContent':'flex-start',
            'alignItems':'flex-start',
            'position':'relative',
            'backgroundImage':'',
            'backgroundPosition':'0px 0px',
            'backgroundSize':'100% 100%',
            'backgroundColor':'#f5f5f5',
            'backgroundRepeat':'no-repeat',
        },
        children:[]
    },
    {
        label: '文本盒子',
        propValue: '内容',
        type:'textBox',
        link:'',
        style: {
            'width': 200,
            'height': 33,
            'fontSize': 14,
            'fontWeight': 500,
            'borderWidth': 1,
            'lineHeight':14,
            'textAlign':'center',
            'borderColor':'#ddd',
            'color':'#333333',
            'opacity': 1,
            'borderStyle':'solid',
            'position':'relative',
            'backgroundImage':'',
            'backgroundPosition':'0px 0px',
            'backgroundSize':'100% 100%',
            'backgroundColor':'#f5f5f5',
            'backgroundRepeat':'no-repeat',
        },
        children:[]
    },
   
]

// list.forEach(item => {
//     item.style = { ...item.style, ...commonStyle }
// })

export default list