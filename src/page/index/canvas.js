var myCanvas = document.querySelector('canvas')
var ctx = myCanvas.getContext('2d')
// 设置canvas宽高，此时设置高度会有滚动条出现
myCanvas.width = $(window).width()
myCanvas.height = $(window).height()

// 小球类
function Ball(x, y){
	// 圆心坐标
	this.x = x 
	this.y = y
	// 半径
	this.r = 30
	// 颜色
	this.color = 'rgba(' + parseInt(Math.random() * 256) + ',' 
					+ parseInt(Math.random() * 256) + ','
					+ parseInt(Math.random() * 256) + ', 0.8)'
	// 变化值
	this.dx = parseInt(Math.random() * 18) - 9
	this.dy = parseInt(Math.random() * 18) - 9
	ballsArr.push(this)
}
// 更新方法
Ball.prototype.update = function(){
	this.x += this.dx
	this.y += this.dy
	this.r --
	// 当小球半径小于0时从数组中删除
	if(this.r < 0){
		this.godie()
	}
}
// 渲染方法
Ball.prototype.render = function(){
	ctx.beginPath()
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
	ctx.closePath()
	ctx.fillStyle = this.color
	ctx.fill()
}
Ball.prototype.godie = function(){
	for(var i=0;i<ballsArr.length;i++){
		if(ballsArr[i] === this){
			ballsArr.splice(i, 1)
		}
	}
}

var ballsArr = []

myCanvas.onmousemove = function(event){
	// console.log(event.clientX)
	new Ball(event.clientX, event.clientY)
}

setInterval(function(){
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
	for(var i=0;i<ballsArr.length;i++){
		ballsArr[i].update()
		ballsArr[i] && ballsArr[i].render()
	}
}, 20)