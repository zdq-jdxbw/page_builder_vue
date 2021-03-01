
export function htmlTostring(dom){ 
    const div = document.createElement("div")
    div.appendChild(dom)
    const result = div.innerHTML
    div.removeChild(dom)
    return result
}