const genRandomKey = (length) => {
    var chars = '!@#$%0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    var charLength = chars.length;
    var result = '';
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

module.exports = genRandomKey