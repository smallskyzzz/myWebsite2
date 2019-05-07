require('./index.css')
// canvas鼠标滑过效果
require('./canvas.js')

// 监听url改变
window.addEventListener('hashchange', e => {
    e.preventDefault()
    document.querySelector('.content').innerHTML = location.hash
})

var page = {
    init: function () {
        this.navClick()
    },
    // 导航点击事件
    navClick: function () {
        $('.nav-item').click(function () {
            $(this).siblings().removeClass('active')
            $(this).addClass('active')
        })
    }
}

page.init()