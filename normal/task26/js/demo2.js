var Storage = (function () {
  return {
    set: function (key, value, timeout) {
        localStorage.setItem(key,JSON.stringify({
            value: value,
            expires: timeout == 'undefined' ? undefined : Date.now() + 1000 * timeout
          }))
    },
    get:function(key){
        var res = JSON.parse(localStorage.getItem(key));
        if (res.expires-Date.now()<0) {
            localStorage.removeItem(key)
            return undefined
        } else {
            return res.value
        }
    }
  }
})()
// Storage.set('name', '饥人谷') 
Storage.set('username', '大是大非',3) 
setTimeout(()=>{
    console.log(Storage.get('username'));
},2000)


