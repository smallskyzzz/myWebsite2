require('./index.css')
// canvas鼠标滑过效果
require('./canvas.js')
// 引入工具类
var util = require('../util.js')

// 监听url改变
window.addEventListener('hashchange', e => {
    e.preventDefault()
    // $('.content').html(location.hash)
    // 因为当更改url时不会触发load事件，所以这里要手动判断当前url是否存在
    if(location.hash.substring(2) !== 'main' && location.hash.substring(2) !== 'note'
       && location.hash.substring(2) !== 'plan'&& location.hash.substring(2) !== 'info'
        && location.hash.substring(2) !== 'life'&& location.hash.substring(2) !== 'more'){
        location.href = '#/main'
        page.navClick($('.nav-item')[0])
    }else {
        for(var i=0;i<$('.nav-item').length;i++){
            if($('.nav-item a')[i].href.indexOf(location.hash) !== -1){
                page.navClick($('.nav-item')[i])
            }
        }
    }
})

// 判断url是否包含#，不包含的话则加上
// 并将地址设置为首页
window.addEventListener('load', function () {
    var url = window.location.href
    if(url.indexOf('#') === -1){
        location.href = '#/main'
    }else{
        // document.querySelector('.content').innerHTML = location.hash
        // console.log(location.hash)
        if(location.hash.substring(2) === 'main' || location.hash.substring(2) === 'note'
           || location.hash.substring(2) === 'plan'|| location.hash.substring(2) === 'info'
            || location.hash.substring(2) === 'life'|| location.hash.substring(2) === 'more'){
            for(var i=0;i<$('.nav-item').length;i++){
                if($('.nav-item a')[i].href.indexOf(location.hash) !== -1){
                    page.navClick($('.nav-item')[i])
                }
            }
        }else {
            location.href = '#/main'
        }
    }
})

var page = {
    init: function () {
        this.bindEvent()
    },
    // 绑定事件
    bindEvent: function() {
        var _this = this
        $('.nav-item').click(function () {
            $(this).siblings().removeClass('active')
            $(this).addClass('active')
            // _this.choose(location.hash.substring(2))
        })
    },
    // 导航点击事件
    navClick: function (that) {
        $(that).siblings().removeClass('active')
        $(that).addClass('active')
        $('.content').html(location.hash)
        this.choose(location.hash.substring(2))
    },
    // 根据active判断加载项
    choose: function (data) {
        console.log(data)
        // note页
        if(data === 'note'){
            $('.content').html()
            $('.content').removeClass().addClass('content note')
            util.request({
                url: '/api/getContent',
                success: function (res) {
                    if(res.state){
                        for(var i=0;i<res.results.length;i++) {
                            var navItem = $('<div class="note-item">')
                            var title = $('<h3 class="nav-item-title">')
                            var content = $('<p class="nav-item-content">')
                            title.html(res.results[i].title)
                            content.html(res.results[i].content)
                            navItem.append(title).append(content)
                            $('.content').append($('<a>').append(navItem))
                        }
                    }
                }
            })
        }
    }
}

page.init()