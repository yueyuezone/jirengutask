var agentInfo = navigator.userAgent;
function isAndroid(){
    return agentInfo.indexOf('Android')!==-1
}
function isIphone(){
    return agentInfo.indexOf('iPhone')!==-1 
}
function isIpad(){
    return agentInfo.indexOf('iPad')!==-1 
    
}
function isIOS(){
    return agentInfo.indexOf('Mac OS X')!==-1
}
isAndroid()
isIphone()
isIpad()
isIOS()
