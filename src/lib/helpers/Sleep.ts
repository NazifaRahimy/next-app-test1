export function Sleep(ms: number){
    return new Promise((resoLve)=> setTimeout(resoLve, ms))
}

export default Sleep