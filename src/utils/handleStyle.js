export function compRealStyle(style) {
    const result = Object.assign({},style);
    [ "fontSize", "fontWeight","borderWidth","lineHeight"].forEach((attr)=>{
            result[attr] = result[attr] + 'px'
    });
    ["width", "height"].forEach((attr)=>{
        if(result[attr] !='auto'){
            result[attr] = result[attr] + '%'
        }
    })
    return result;
}
export function compRealStyleOfpx(style) {
    const result = Object.assign({},style);
    [ "width", "height","fontSize", "fontWeight","borderWidth","lineHeight"].forEach((attr)=>{
            result[attr] = result[attr] + 'px'
    });
    return result;
}

export function getBackgroundStyle(){
    const results =[
        'backgroundImage',
        'backgroundColor',

        // 'backgroundPosition',
        // 'backgroundSize'
    ]
    return results
}

export function getNormalStyle(){
    const results =[
        'height',
        'borderWidth',
        'opacity',
        'borderColor',
    ]
    return results
    
}
export function getTextlStyle(){
    const results =[
        'fontSize',
        'fontWeight',
        'lineHeight',
        'textAlign',
        'color',

    ]
    return results
    
}
export function getFlexStyle(){
    const results =[
        'flexDirection',
        'flexWrap',
        'justifyContent',
        'alignItems',
    ]
    return results
}