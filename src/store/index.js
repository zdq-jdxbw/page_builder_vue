
import Vue from 'vue'
import Vuex from 'vuex'

import {getAddedNode,getDeletedNode} from '../utils/changeNode'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        componentData: [],
        curId:-1,
        curComponent:null,
        menuShow:false,
        menuTop:0,
        menuLeft:0,
        curUnit:'%',
        curUserInfo:{

        },
        isEditing:false,
        styleVar:{
            '--width':'100%',
            '--height':'100%',
        }
    },
    mutations:{
        addComponent(state, { component, index }) {
            if (index !== undefined) {
                state.componentData.splice(index, 0, component)
            }else if(state.curComponent&&state.curComponent.type=='textBox'){
                return;
            }
            else {
                if(state.curId===-1){
                    component.style.width='auto'
                    state.componentData.push(component)
                }
                else {
                    const newCompData = getAddedNode(state.componentData,state.curId,component)
                    state.componentData = newCompData
                }
            }
        },
        changeCurNode(state,id){
            state.curId = id
        },
        setCurComponent(state,component){

            state.curComponent = component
        },
        setCurCompShape(state,{changeX,changeY}){
            // if(state.curComponent.style.flex){
            //     Vue.delete(state.curComponent.style,'flex')
            // }
            state.curComponent.style.width =changeX
            state.curComponent.style.height =changeY
        },
        setCurBGImage(state,curImgSrc){
            state.curComponent.style.backgroundImage = 'url('+curImgSrc+')'
        },
        modifyCurStyle(state,{styleName,value}){
            state.curComponent.style[styleName] = value
        },
        changeBGPosition(state,value){

            state.curComponent.style.backgroundPosition=value.x+"px"+" "+value.y+"px"

        },
        
        changeBGSize(state,value){
            state.curComponent.style.backgroundSize=value.x+"%"+" "+value.y+"%"
 
        },
        showContextMenu(state,value){
            if(!state.menuShow){
                state.menuShow=true
            }
            state.menuLeft= value.x
            state.menuTop= value.y
        },
        hideContextMenu(state){
            state.menuShow=false
        },
        fullCurComponent(state){
            if(!state.curComponent.style.flex){
                Vue.set(state.curComponent.style,'flex','auto')
                state.curComponent.style['width'] = 0
            }
        },
        curComTextChange(state,value){
            state.curComponent.propValue = value
        },
        deleteComponent(state){
            const newCompData = getDeletedNode(state.componentData,state.curId)
            state.componentData = newCompData
        },
        handleLogin(state,value){
            state.curUserInfo = value

        },
        logout(state){
            state.curUserInfo = {}

        },
        async saveTemplate(state,value){
            const values = {
                tempName:value,
                userId:state.curUserInfo.id,
                content:JSON.stringify(state.componentData)
            }
            await Vue.prototype.$axios.post('/saveTemplate',{
                data:values
            })
        },
        loadTemp(state,array){

            state.componentData = array
        },
        linkChange(state,value){

            state.curComponent.link = value
        },
        chooseModel(state,value){
            if (value==1) {
                state.styleVar['--width'] = '100%'
                state.styleVar['--height'] = '100%'
                state.curUnit="%"
            }
            else if(value==2){
                state.styleVar['--width'] = '1920px'
                state.styleVar['--height'] = '1080px'
                state.curUnit="px"
            }
            state.isEditing = true
        }
    }
})

export default store