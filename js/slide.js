let oSlide = {
    $slider: $('.img-box').css('left'),
    nowIndex: 0,
    width: null,
    len: 4,
    flag: true,
    timer: undefined,
    init: function () {
        this.width = parseInt($('.img-box>li').css('width'));
        this.bindEvent();
        this.sliderAuto();
    },
    //绑定事件 绑定鼠标点击事件
    bindEvent: function () {
        var self = this;
        $('.left-btn').add($('.right-btn')).add($('.slide-order ul li')).on('click', function () {
            if (self.flag) {
                self.flag = false;
                if ($(this).attr('class') == 'left-btn') {
                    self.move('left-btn');

                } else if ($(this).attr('class') == 'right-btn') {
                    self.move('right-btn');
                } else {
                    self.move($(this).index());
                }
            }
        });
        //鼠标移入  移除事件  移除自动播放  同时显示左右切换按钮 
        $('.banner-slide').on('mouseenter', function () {
            clearTimeout(self.timer);
            $('.slide-btn').show();
        }).on('mouseleave', function () {
            $('.slide-btn').hide();
            self.sliderAuto('left-btn');
        });
    },
    move: function (dir) {
        if (dir == 'left-btn' || dir == 'right-btn') {
            if (dir == 'left-btn') {
                if (this.nowIndex == this.len - 1) {
                    $('.img-box').animate({ 'left': -(this.len * this.width) }, function () {
                        $(this).css('left', '0');
                    })
                    this.nowIndex = 0;
                } else {
                    this.nowIndex++;
                }
            } else {
                if (this.nowIndex == 0) {
                    $('.img-box').css('left', -(this.len * this.width));
                    this.nowIndex = this.len - 1;
                } else {
                    this.nowIndex--;
                }
            }
        } else {
            this.nowIndex = dir;
        }
        this.slider();
    },
    slider: function () {
        var self = this;
        $('.img-box').animate({ 'left': -this.nowIndex * this.width }, function () {
            self.flag = true;
        });
        $('.active').attr('class', '');
        $('.slide-order ul li').eq(this.nowIndex).addClass('active');

    },
    //自动播放
    sliderAuto: function () {
        var self = this;
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
            self.move('left-btn');
            self.sliderAuto();
        }, 2000);
    }
}
oSlide.init();
//解决页面视口改变时轮播图出现的bug 但是任然存在
window.onresize = function () {
    oSlide.init();
}
//页面顶部移动端 搜索框的弹出和隐藏效果
$(".btn-toggle").on('click', function () {
    if(this.innerHTML == "取消"){
       $(".mob-divc-search").addClass("search-close");
       setTimeout(() => {
        $(".search-show").show();
       }, 300);
    }
})
$(".mob-divc-search-inpu>input").on("input" , function(e){
    let event = e || window.event;
    if(event.target.value != ""){
        $(".btn-toggle")[0].innerHTML="搜索";
    }else{
        $(".btn-toggle")[0].innerHTML = "取消";
    }
})
$(".search-show").on("click", function(){
    $(".mob-divc-search").removeClass("search-close");
    $(".search-show").hide();
});
