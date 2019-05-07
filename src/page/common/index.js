require('./index.css')

// 判断url是否包含#，不包含的话则加上
// 并将地址设置为首页
window.addEventListener('load', function () {
    var url = window.location.href
    if(url.indexOf('#') === -1){
        location.href = '#/main'
    }else{
        // document.querySelector('.content').innerHTML = location.hash
    }
})