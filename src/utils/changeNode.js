export function getAddedNode(componentData,curId,component) {
    componentData.forEach(item => {
        if(item.children.length>0){
            getAddedNode(item.children,curId,component)
        }
        if(item.id===curId){
            item.children.push(component)
        }
    });
    return componentData
}

export function getDeletedNode(componentData,curId) {

    const result = componentData.filter(item=>{
        if(item.children.length>0){
            item.children = getDeletedNode(item.children,curId)
        }
        return item.id!==curId
    })
    return result
}