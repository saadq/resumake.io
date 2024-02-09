const TOKEN = 'USER_TOKEN'  
    
export const deleteToken = ()=>{
    localStorage.removeItem(TOKEN)
}
    

export const getToken = () => {
    //console.log('okkkkkk', localStorage.getItem(TOKEN))
    if (typeof localStorage !== 'undefined') {
        return localStorage?.getItem(TOKEN)
    }
    return '';
  };
  
export const saveToken= (token:string)=>{
    return localStorage.setItem(TOKEN,token)
}
