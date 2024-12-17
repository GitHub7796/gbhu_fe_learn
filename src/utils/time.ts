export const getTime=()=>{
    let message=''
    // 根据内置构造函数Date
    let hours=new Date().getHours()
    if(hours>=6&&hours<12){
        message='早上'
    }else if(hours>=12&&hours<18){
        message='下午'
    }else if(hours>=18&&hours<24){
        message='晚上'
    }else{
        message='凌晨'
    }
    return message
}