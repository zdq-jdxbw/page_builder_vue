export function getCookie(name){
    const cookieArr = document.cookie.split(';')
    let cookieValue = ''
    cookieArr.forEach(item => {
        if(item.indexOf(name)>-1){
            cookieValue = item.split("=")[1]
            return
        }
    });
    return cookieValue
}