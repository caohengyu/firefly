window.onload=function () {
    /*设置壁纸 每8秒刷新*/
    function bag(t) { //t接收背景切换的秒数
        var body=document.querySelector('body');
        var images;
        var xhr=new XMLHttpRequest();
        xhr.open('get','images.json');
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&xhr.status==200){
                images=JSON.parse(xhr.responseText);
                setBag(images,t);
            }
        };
        xhr.send();
        function setBag(o,t) {
            if(o.length){
                t=t&&t>5?t*1000:5000;
                var randomNum=Math.floor(Math.random()*o.length);
                var url='url(https://cms-origin-cn.battle.net/cms/template_resource/Q78CCH1ADTQ51509569826966.png),';
                body.style.backgroundImage=url+'url('+o[randomNum]+')';
                var timer=setInterval(function () {
                    randomNum=Math.floor(Math.random()*o.length);
                    body.style.backgroundImage=url+'url('+o[randomNum]+')';
                },t)
            }
        }
    }
    bag(8);

    /*动态设置聊天容器的高度*/
    // function setBoxHeight(p) { //参数p为高宽比
    //     var box=document.querySelector('.box');
    //     var width=box.offsetWidth;
    //     box.style.height=width*p+'px';
    //     //窗口大小改变时,调用自身并传入参数
    //     window.onresize=function () {
    //         setBoxHeight(p)
    //     }
    // }
    // setBoxHeight(0.68);

    /*聊天区功能*/
    function chat() {

        /*获取聊天框和输入框和发送按钮*/
        var box=document.querySelector('.box'); //外层box
        var chatBox=document.querySelector('.chat-box');
        var txt=document.querySelector('footer .text');
        var btn=document.querySelector('footer .btn');
        var str=''; //存放输入的内容
        var meLi,robotLi; //存放聊天内容
        var menu=document.querySelector('footer .menu');//切换按钮的容器
        var f_click=robot; //发送按钮默认点击事件函数


        function tapSwitch() {
            /*绑定发送按钮点击事件*/
            btn.addEventListener('click',f_click,false);
            var index=0; //当前激活按钮的序号,默认为第一个按钮

            //为切换按钮容器绑定点击事件
            menu.addEventListener('click',function (e) {
                var lis=menu.querySelectorAll('li'); //按钮数组
                var ele=e.target; //触发点击的按钮
                var data=ele.getAttribute("data-menu");
                //判断点击的按钮是否改变,不改变就返回
                if(index!==data){
                    //清除已激活样式 清除已绑定事件函数
                    lis[index].classList.remove('active');
                    btn.removeEventListener('click',f_click,false);
                    index=data; //更新index
                    // 更新f_click
                    switch (index){
                        case 0:
                            f_click=robot;
                            break;
                        case 1:
                            f_click=robot;
                            break;
                        case 2:
                            f_click=robot;
                            break;
                        case 3:
                            f_click=robot;
                            break;
                        case 4:
                            f_click=robot;
                    }
                    //添加样式 绑定事件处理函数
                    lis[index].classList.add('active');
                    btn.addEventListener('click',f_click,false);
                }else{
                    return false;
                }
            },false);

        }
        tapSwitch();


        /*点击清除按钮，清空聊天内容*/
        (function clear() {
            var cl=document.querySelector('footer>.clear');
            cl.addEventListener('click',function () {
                chatBox.innerHTML=""; //删除聊天框所有的元素
            },false);
       })();

        //获取输入框内容，初始化函数
        function init() {
            /*创建两个聊天的li*/
            meLi=document.createElement('li');
            robotLi=document.createElement('li');
            /*给两个li放入头像*/
            robotLi.innerHTML='<img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2343034665,134891679&fm=58">';
            meLi.innerHTML='<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532797810567&di=1ac52894ad7242171d9fce4f0ee8b7a0&imgtype=0&src=http%3A%2F%2Fpic.47473.com%2Fupload%2Farticle%2F2015%2F08%2F1309401800.jpg">';

            /*meLi的聊天内容更新并添加到ul容器中*/
            var meP=document.createElement('p');
            meP.innerText=str;
            meP.classList.add('me');
            meLi.appendChild(meP);

            chatBox.appendChild(meLi);
            /*让滚动条保持在最底部*/
            box.scrollTop=box.scrollHeight;
            /*清空输入框的内容，恢复placeholder*/
            txt.value='';
            txt.placeholder='请输入聊天内容';
        }

        //聊天功能
        function robot () {
            /*获取输入框的内容*/
            str=txt.value;
            if(str.trim()){
                //初始化
                init();
                /*robotLi的聊天内容获取*/
                var xhr=new XMLHttpRequest();
                xhr.open('post','//www.tuling123.com/openapi/api');
                xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
                xhr.onreadystatechange=function () {
                    if(xhr.readyState===4){
                        if(xhr.status===200){
                            var text=JSON.parse(xhr.responseText)["text"];
                            text=text?text:'https请求http资源不成功,如果可以,请使用http网址访问';
                        }else{
                            text='https请求http资源不成功,如果可以,请使用http网址访问';
                        }
                        robotLi.innerHTML+='<p class="robot">'+text+'</p>';
                        chatBox.appendChild(robotLi);
                        /*让滚动条保持在最底部*/
                        box.scrollTop=box.scrollHeight;
                    }
                };
                xhr.send('key=7322a993b5584ee4b9c8855179c40af6&info='+meLi.innerText);

            }else{
                txt.value='';
                txt.placeholder="内容为空，请重新输入"
            }
        }

    }
    chat();


    //获取顶部的天气信息
    function getWeather() {
        var city=document.querySelector('.city');
        var date=document.querySelector('.date');
        var week=document.querySelector('.week');
        var dayTemp=document.querySelector('.dtemp');
        var nightTemp=document.querySelector('.ntemp');
        var dayWeather=document.querySelector('.dweather');
        var nightWeather=document.querySelector('.nweather');

        var func=function(data) {
            city.textContent=data["forecasts"][0]["city"];
            date.textContent=data["forecasts"][0]["casts"][0]["date"];
            week.textContent=data["forecasts"][0]["casts"][0]["week"];
            dayTemp.textContent=data["forecasts"][0]["casts"][0]["daytemp"];
            nightTemp.textContent=data["forecasts"][0]["casts"][0]["nighttemp"];
            dayWeather.textContent=data["forecasts"][0]["casts"][0]["dayweather"];
            nightWeather.textContent=data["forecasts"][0]["casts"][0]["nightweather"];
        };
        $.ajax({
            url:"https://api.asilu.com/weather_v2/",
            dataType: "jsonp", //指定服务器返回的数据类型
            success: func
        })
    }

    getWeather();
};
