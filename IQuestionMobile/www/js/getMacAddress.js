var getMacAddress = {
    
callNativeFunction: function (success, fail, resultType) {
    return Cordova.exec( success, fail,
                        "com.tricedesigns.getMacAddress",
                        "nativeFunction",
                        [resultType]);
}
};