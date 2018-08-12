window.onload=function () {

    /*设置壁纸 每33秒刷新*/
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
               // var url='url(https://cms-origin-cn.battle.net/cms/template_resource/8YNO3TMV46C01509569825960.png),';
               //  body.style.backgroundImage=url+'url('+o[randomNum]+')';
                body.style.backgroundImage='url('+o[randomNum]+')';
                var timer=setInterval(function () {
                    randomNum=Math.floor(Math.random()*o.length);
                    //body.style.backgroundImage=url+'url('+o[randomNum]+')';
                    body.style.backgroundImage='url('+o[randomNum]+')';
                },t)
            }
        }
    }
    bag(33);

    /*主函数*/
    function chatRobot() {

        /*获取聊天框和输入框和发送按钮*/
        var box=document.querySelector('.box'); //外层box
        var chatBox=document.querySelector('.chat-box');
        var txt=document.querySelector('footer .text');
        var btn=document.querySelector('footer .btn');
        var str=''; //存放输入的内容
        var meLi,robotLi; //存放聊天内容
        var menu=document.querySelector('footer .menu');//切换按钮的容器
        var songList=document.querySelector('#songList'); //歌单
        var f_click=null; //存放发送按钮事件函数
        var musicUrl='musics.json'; //歌曲json数据的url


        //获取输入框内容的初始化函数
        function init() {
            /*创建两个聊天的li*/
            meLi=document.createElement('li');
            robotLi=document.createElement('li');
            /*给两个li放入头像*/
            robotLi.innerHTML='<img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2343034665,134891679&fm=58">';
            meLi.innerHTML='<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532797810567&di=1ac52894ad7242171d9fce4f0ee8b7a0&imgtype=0&src=http%3A%2F%2Fpic.47473.com%2Fupload%2Farticle%2F2015%2F08%2F1309401800.jpg">';

            /*meLi的聊天内容更新并添加到ul容器中*/
            var meP=document.createElement('p');
            meP.innerHTML=str;
            meP.classList.add('me');
            meLi.appendChild(meP);

            chatBox.appendChild(meLi);
            /*让滚动条保持在最底部*/
            box.scrollTop=box.scrollHeight;
            /*清空输入框的内容，恢复placeholder*/
            var dataMenu=menu.querySelector('li.active').getAttribute('data-menu');
            txt.value='';
            switch (dataMenu){
                case '0':
                    txt.placeholder='请输入聊天内容';
                    break;
                case '2':
                    txt.placeholder='请输入城市名查询,如北京';
                    break;
                case '3':
                    txt.placeholder='请输入翻译内容,支持中英文输入';
                    break;
                case '4':
                    txt.placeholder='请输入计算表达式，支持带括号的四则运算';
                    break;
            }

        }

        /*监听清除按钮，点击清空聊天内容*/
        (function () {
            var cl=document.querySelector('#text .clear');
            cl.addEventListener('click',function () {
                chatBox.innerHTML=""; //删除聊天框所有的元素
            },false);
        })();
        //监听当输入框按下enter键执行发送功能
        txt.onkeydown=function (e) {
            if(e.keyCode==13){ //判断是否是enter
                e.preventDefault(); //阻止enter默认的换行
                f_click(); //执行发送按钮的点击事件函数
            }
        };

        //切换功能函数
        function tapSwitch() {
            var menuIndex=1; //存放当前激活按钮的序号,默认为第2个按钮
            //隐藏输入框
            document.getElementById('text').style.display='none';
            songList.style.display='none'; //隐藏歌单
            //调用音乐播放器
            my_Music(musicUrl);

            //为切换按钮绑定点击事件
            var lis=menu.querySelectorAll('li'); //按钮数组
            lis.forEach(function(li){
                li.addEventListener('click',function(){
                    var dataMenu=li.getAttribute("data-menu");
                    if(menuIndex!==dataMenu){
                        //清除已激活样式 清除已绑定事件函数
                        lis[menuIndex].classList.remove('active');
                        if(f_click)//判断有绑定则移除
                            btn.removeEventListener('click',f_click,false);
                        menuIndex=dataMenu; //更新index
                        // 更新f_click和重置输入框
                        txt.value='';
                        switch (menuIndex){
                            case '2':
                                f_click=getWeather;
                                txt.placeholder='请输入城市名查询,如北京';
                                break;
                            case '3':
                                f_click=translation;
                                txt.placeholder='请输入翻译内容,支持中英文输入';
                                break;
                            case '4':
                                f_click=calculator;
                                txt.placeholder='请输入计算表达式，支持带括号的四则运算';
                        }

                        //添加样式 绑定事件处理函数
                        li.classList.add('active');

                        if(menuIndex!=1){
                            //隐藏音乐播放器
                            document.querySelector('footer .audio').style.display='none';
                            document.getElementById('words').style.display='none';
                            if(menuIndex!=0){
                                //显示输入框
                                document.getElementById('text').style.display='block';
                                btn.addEventListener('click',f_click,false);
                                chatBox.style.display='block'; //显示聊天内容
                                songList.style.display='none'; //隐藏歌单
                            }else {
                                songList.style.display='block'; //显示歌单
                                listLis[index].scrollIntoView(false); //当前播放滚动到可见位置
                                //隐藏输入框
                                document.getElementById('text').style.display='none';
                                chatBox.style.display='none'; //隐藏聊天内容
                            }

                        }else{
                            //显示播放器
                            document.querySelector('footer .audio').style.display='block';
                            document.getElementById('words').style.display='block';
                            //隐藏输入框
                            document.getElementById('text').style.display='none';
                            chatBox.style.display='none'; //隐藏聊天内容
                            songList.style.display='none'; //隐藏歌单
                        }

                    }else{
                        return false;
                    }
                },false)

            })
        }
        tapSwitch();

        //音乐播放器
        var listLis=null;  //存放歌单的歌曲
        var index=0;   //当前播放位置
        function my_Music(url) {
            //外层容器
            var outBox=document.querySelector('footer .audio');
            //播放器
            var my_audio=document.getElementById("music");
            //顺序按钮组
            var orderLis=outBox.querySelectorAll('.order li');
            //显示当前歌曲名字的文本
            var nowPlay=document.getElementById('nowPlay');
            //播放暂停按钮
            var playButton=outBox.querySelector('.control .play-btn');
            //总进度条
            var bar=outBox.querySelector('.bar');
            //当前播放进度
            var curBar=bar.querySelector('.pro-bar');
            //进度条控制圆点
            var point=bar.querySelector('.point');
            //当前播放时间 总播放时间文本
            var curTime=outBox.querySelector('.time .current-time');
            var totalTime=outBox.querySelector('.time .total-time');
            //上一首 下一首 控制按钮
            var pre=outBox.querySelector('.time .pre');
            var next=outBox.querySelector('.time .next');


            //获取音乐并存储到本地
            var musics=[]; //存放所有的音乐信息
            var xhr=new XMLHttpRequest();
            xhr.open('get',url);
            xhr.onload=function () {
                musics=JSON.parse(xhr.responseText);

                //成功拿到musics信息才能播放 所以以下代码要放再onload里面执行

                var order=0; //记录播放顺序 顺序0 随机1 循环2 默认0
                var musicList=[]; //存放已随机播放的index
                index=Math.floor(Math.random()*musics.length); //当前播放位置
                my_audio.src=musics[index]['src']; //初始化播放器的src
                my_audio.load();
                showList(); //显示歌单
                //更新下一个要播放的index
                function nextMusic() {
                    if(order==0){
                        if(index<musics.length-1){
                            index++;
                        }else{
                            index=0;
                        }
                    }else if(order==1){
                       	musicList.push(index); //已播放的加入数组
                        //已播放满就清空数组
                        if(musicList.length==musics.length)
                            musicList=[];
                        var length=musics.length;
                        var ranNum=Math.floor(Math.random()*length);
                        while (musicList.includes(ranNum)){
                            ranNum=Math.floor(Math.random()*length);
                        }
                        index=ranNum;
                    }
                }

                //为顺序按钮组绑定点击事件
                orderLis.forEach(function (ele,index,arr) {
                    ele.onclick=function () {
                        var liOrder=this.getAttribute('data-order');
                        if(liOrder!=order){
                            musicList=[];//重置已随机播放数组
                            //重置样式
                            arr[order].classList.remove('active');
                            this.classList.add('active');
                            order=liOrder; //更新播放顺序
                        }else{
                            //相等说明顺序没有切换，直接返回
                            return false;
                        }
                    }
                });

                //为上一首和下一首绑定点击事件处理函数
                pre.onclick=function () {
                    if(order==0){
                        if(index>0){
                            index--
                        }else{
                            index=musics.length-1;
                        }
                    }else if(order==1){
                        if(musicList.length>0){
                            index=musicList[musicList.length-1];
                            musicList.pop();
                        }else{
                            nextMusic();
                        }
                    }
                    showName();
                    updateList();
                    var p=my_audio.paused;
                    my_audio.src=musics[index]['src'];
                    my_audio.load();
                    updateBt(0,mDuration);
                    if(!p) my_audio.play();
                };
                next.onclick=function () {
                    nextMusic();
                    showName();
                    updateList();
                    var p=my_audio.paused;
                    my_audio.src=musics[index]['src'];
                    my_audio.load();
                    updateBt(0,mDuration);
                    if(!p) my_audio.play();
                };

                //播放/暂停功能
                playButton.onclick=function () {
                    if(my_audio.paused){
                        my_audio.play(); //开始播放当前音频
                        this.classList.remove('pause');//移除样式
                        this.classList.add('play');//添加样式
                        this.textContent='暂停';
                    }else{
                        my_audio.pause();
                        this.classList.remove('play');//移除样式
                        this.classList.add('pause');//添加样式
                        this.textContent='播放';
                    }
                };

                //显示歌曲名字方法,index改变时执行
                function showName() {
                    nowPlay.innerHTML='当前曲目: '+musics[index]['name']+'<br/>播放会消耗流量,建议有wifi时播放';
                    document.getElementById('words').textContent=musics[index]['word'];
                }
                showName();

                //显示加载中,可以播放时去掉
                var loadMsg=document.getElementById('loadMsg');
                my_audio.onprogress=function () {
                    if(!my_audio.paused)
                        loadMsg.textContent='加载中 请稍候...'
                };
                my_audio.onerror=function () {
                    loadMsg.textContent='当前网络不稳定...'
                };

                //更新音频时长
                function showTime(o,t) {
                    //显示时间函数
                    var m=parseInt(t/60); //分
                    var s=parseInt(t%60); //秒

                    m=m<10?('0'+m):(m+'');

                    s=s<10?('0'+s):(s+'');

                    o.textContent=m+':'+s;
                }

                var mDuration=my_audio.duration; //存放当前总时长
                showTime(totalTime,mDuration); //先执行一次
                //后续时长数据变化会自动更新
                my_audio.ondurationchange=function () {
                    mDuration=my_audio.duration; //更新时长
                    showTime(totalTime,mDuration); //显示
                };

                //更新进度条与当前播放时间
                my_audio.ontimeupdate=function () {
                    var ct=my_audio.currentTime;
                    updateBt(ct,mDuration);
                    if(my_audio.currentTime>0&&my_audio.networkState==2){
                        loadMsg.innerHTML='下载数据中...'
                    }else if(my_audio.networkState==1){
                        loadMsg.innerHTML='制作by chy<br>感谢使用!'
                    }
                };
                function updateBt (c,d) {
                    curBar.style.width=c/d*100+'%';
                    point.style.left=c/d*100+'%';
                    showTime(curTime,c);
                }

                //自动连续播放功能
                function autoPlay(audio) {
                    nextMusic(); //更新下次播放的index
                    audio.src=musics[index]['src']; //更新src
                    audio.load();  //重新加载
                    audio.play();  //播放
                    showName();  //更新歌名
                    updateList();
                }
                //监听播放结束事件 执行自动播放功能
                my_audio.onended=function () {
                    autoPlay(my_audio);
                };

                // 点击进度条 跳转到指定点播放
                bar.onclick=function (e) {
                    // 只有正在播放或者已经播放过的才可以
                    if(!my_audio.paused||my_audio.currentTime>0){
                        if(e.target!=point){
                            var barWidth=this.offsetWidth;
                            var rate=e.offsetX/barWidth;
                            my_audio.currentTime=mDuration*rate;
                            updateBt(my_audio.currentTime,mDuration);
                        }
                    }
                };

                /*拖动进度点播放功能*/
                //pc端拖动功能
                function pcDrag() {
                    point.onmousedown=function (e) {
                        if(!my_audio.paused||my_audio.currentTime>0){
                            var moveX=e.clientX; //拖动前的X坐标
                            var oLeft=curBar.offsetWidth; //存放拖动前的已播放距离 后续会在这个基础上增加或减少
                            var length=0;
                            //e.preventDefault();
                            document.onmousemove=function (e) {
                                length = e.clientX - moveX; //X坐标改变距离
                                if(length>(bar.offsetWidth-oLeft)){
                                    updateBt(mDuration,mDuration);
                                    document.onmousemove=null;
                                    return false;
                                }else if(-length>oLeft){
                                    length=-oLeft;
                                }
                                var rate = (oLeft + length) / bar.offsetWidth;
                                my_audio.currentTime = mDuration * rate;
                                updateBt(my_audio.currentTime, mDuration);
                            };
                            document.onmouseup=function(){
                                document.onmousemove=null;
                                document.onmouseup=null;
                            }
                        }
                    }
                }
                pcDrag();

                //移动端拖动功能
                function mMove() {
                    //初始化公共变量
                    var startX=0; //存放开始的X坐标
                    var lengthX=0; //存放X轴距离
                    var curWidth=0; //存放已播放距离

                    point.ontouchstart=function (e) {
                        if(!my_audio.paused||my_audio.currentTime>0){
                            curWidth=curBar.offsetWidth; //保存开始滑动时的已播放距离
                            startX=e.touches[0].clientX; //保存开始滑动的X坐标
                            point.ontouchmove=tMove;
                            point.ontouchend=function () {
                                point.ontouchmove=null;
                                point.ontouchend=null;
                            };
                            function tMove(e) {
                                lengthX=e.touches[0].clientX-startX;
                                if(lengthX>(bar.offsetWidth-curWidth)){
                                    updateBt(mDuration,mDuration);
                                    point.ontouchmove=null;
				    return false;
                                }else if(-lengthX>curWidth){
                                    lengthX=-curWidth;
                                }
                                //滑动
                                var rate=(curWidth+lengthX)/bar.offsetWidth;
                                my_audio.currentTime=mDuration*rate;
                                updateBt(my_audio.currentTime,mDuration);
                                return false;
                            }

                        }
                    };

                }
                mMove();

                /*音量设置*/
                function setVolume() {
                    var vBar=document.getElementById('vBar');
                    var vProBar=vBar.querySelector('.vol-bar');
                    var vPoint=vProBar.querySelector('.vol-point');
                    //点击进度条设置音量
                    vBar.onclick=function (e) {
                        if(e.target!=vPoint){
                            var vBarWidth=this.offsetWidth;
                            var rate=e.offsetX/vBarWidth;
                            my_audio.volume=rate;
                            vProBar.style.width=rate*100+'%';
                        }
                    };
                    //滑动功能
                    vPoint.onmousedown=function (e) {
                        var moveX=e.clientX; //拖动前的X坐标
                        var oLeft=vProBar.offsetWidth;
                        var length=0;
                        document.onmousemove=function (e) {
                            length = e.clientX - moveX; //X坐标改变距离
                            if(length>(vBar.offsetWidth-oLeft)){
                                length=vBar.offsetWidth-oLeft;
                            }else if(-length>oLeft){
                                length=-oLeft;
                            }
                            var rate=(oLeft + length) / vBar.offsetWidth;
                            my_audio.volume = rate;
                            vProBar.style.width=rate*100+'%';
                        };
                        document.onmouseup=function(){
                            document.onmousemove=null;
                            document.onmouseup=null;
                        }
                    };
                    vPoint.ontouchstart=function (e) {
                        var curWidth=vProBar.offsetWidth; //保存开始滑动时的音量
                        var startX=e.touches[0].clientX; //保存开始滑动的X坐标
                        var lengthX=0;  //滑动距离
                        vPoint.ontouchmove=function (e) {
                            lengthX=e.touches[0].clientX-startX;
                            if(lengthX>(vBar.offsetWidth-curWidth)){
                                lengthX=vBar.offsetWidth-curWidth;
                            }else if(-lengthX>curWidth){
                                lengthX=-curWidth;
                            }
                            //滑动
                            var rate=(curWidth + lengthX) / vBar.offsetWidth;
                            my_audio.volume = rate;
                            vProBar.style.width=rate*100+'%';
                        };
                        point.ontouchend=function () {
                            point.ontouchmove=null;
                            point.ontouchend=null;
                        };
                    }

                }
                setVolume();

                /*显示歌单*/
                function showList() {
                    for(var i=0,mLength=musics.length;i<mLength;i++){
                        var li=document.createElement('li');
                        li.setAttribute('data-list',i);
                        li.textContent=i+1+'~'+ musics[i]['name'];
                        songList.appendChild(li);
                    }
                    listLis=songList.querySelectorAll('li');
                    listLis[index].classList.add('now-play');
                    songList.onclick=function (e) {
                        if(e.target.tagName=='LI'){
                            var li=e.target;
                            var listNum=li.getAttribute('data-list');
                            listLis[index].classList.remove('now-play');
                            index=listNum;
                            updateBt(0,mDuration);
                            showName();
                            li.classList.add('now-play');
                            my_audio.src=musics[index]['src'];
                            musicList=[];
                            my_audio.load();
                            my_audio.play();
                            playButton.classList.remove('pause');
                            playButton.classList.add('play');
                            playButton.textContent='暂停';
                        }
                    }
                }
                function updateList(){
                    songList.querySelector('li.now-play').classList.remove('now-play');
                    listLis[index].classList.add('now-play');
		            listLis[index].scrollIntoView(false); //当前播放滚动到可见位置
                }
            };
            xhr.send();
        }

        //天气查询
        function getWeather() {
            /*获取输入框的内容*/
            str=txt.value;
            if(str.trim()){
                //初始化
                init();
                /*robotLi的聊天内容获取*/
                jsonp({
                    url:'https://api.asilu.com/weather/',
                    data:{city:str},
                    success:function (data) {
                        var text=data['city']+' '+data['weather'][0]['weather'];
                        text+='<br>'+data['weather'][0]['wind']+' 温度:'+data['weather'][0]['temp'];
                        robotLi.innerHTML+='<p class="robot">'+text+'</p>';
                        chatBox.appendChild(robotLi);
                        /*让滚动条保持在最底部*/
                        box.scrollTop=box.scrollHeight;
                    }
                });
            }else{
                txt.value='';
                txt.placeholder="内容为空，请重新输入"
            }
        }

        //翻译功能
        function translation () {
            /*获取输入框的内容*/
            str=txt.value;
            if(str.trim()){
                //初始化
                init();
                /*robotLi的聊天内容获取*/
                jsonp({
                    url:'https://fanyi.youdao.com/openapi.do?keyfrom=Skykai521&key=977124034&type=data&doctype=jsonp&version=1.1',
                    data:{q:str},
                    success:function (data) {
                        var text=data['translation'][0];
                        var arr=data['basic']['explains'];
                        var dLength=data['basic']['explains'].length;
                        for(var i=0;i<dLength;i++){
                            text+='<br>'+arr[i];
                        }
                        robotLi.innerHTML+='<p class="robot">'+text+'</p>';
                        chatBox.appendChild(robotLi);
                        /*让滚动条保持在最底部*/
                        box.scrollTop=box.scrollHeight;
                    }
                });
            }else{
                txt.value='';
                txt.placeholder="内容为空，请重新输入"
            }
        }

        //计算器
        function calculator() {
            /*获取输入框的内容*/
            str=txt.value;
            if(str.trim()){
                init();
                var content="";    //保存过滤后的表达式内容
                var strNum=""; //保存最新输入的数
                var r1=/[\d\.]$/;  //判断后缀为数字和点
                var r2=/[+÷×/\-\*]$/; //判断后缀为二元运算符
                var r3=/\($/;  //左括号结尾
                var r4=/\)$/;  //右括号结尾
                var text='';

                for(var i=0;i<str.length;i++){
                    sizer(str.charAt(i));
                }

                if(content.search(/\d/)>-1){ //表达式中包含了数字才计算
                    var res=parse(content);  //获得表达式的结果
                    text='计算结果: '+res;
                }else{  //没有数字,提示表达式无效
                    text="无效的表达式,请重新输入!";
                }
                content="";    //清空content
                robotLi.innerHTML+='<p class="robot">'+text+'</p>';
                chatBox.appendChild(robotLi);
                /*让滚动条保持在最底部*/
                box.scrollTop=box.scrollHeight;
            }else{
                txt.value='';
                txt.placeholder="内容为空，请重新输入"
            }

            /*过滤输入的内容,把过滤后得到的表达式保存到content*/
            function sizer(s) {
                if(!content){
                    if(r1.test(s)){
                        if(s=="."){
                            content=0+s;
                        }else{
                            content=s;
                        }
                        strNum=content;
                    }else if(r3.test(s)||s=="-"){
                        content=s;
                    }else{
                        return false;
                    }
                }else{
                    if(r1.test(s)){ //如果输入的是数字和点
                        if(r4.test(content)){//数字和点前面不能有右括号
                            return false;
                        } else if(!strNum){
                            if(s=="."){
                                content+=0+s;
                                strNum=0+s;
                            }else{
                                content+=s;
                                strNum=s;
                            }
                        }else{
                            if(s=="."){
                                if(strNum.indexOf(".")>-1){
                                    return false;
                                }else{
                                    content+=s;
                                    strNum+=s;
                                }
                            }else if(strNum=="0"){
                                if(s=="."){
                                    str+=s;
                                    content+=s;
                                }else {
                                    strNum=s;
                                    content=content.substr(0,content.length-1)+s; //替换最后个字符
                                }
                            }else{
                                strNum+=s;
                                content+=s;
                            }
                        }
                    }
                    else if(r2.test(s)){//输入的是运算符
                        if(s!="-"){
                            if(r3.test(content)) //运算符前面是左括号返回
                                return false;
                            if(r2.test(content)) //非负号前面有运算符号返回
                                return false;
                            if(s=="\*"){
                                content+="×";
                            }else if(s=="/"){
                                content+="÷"
                            }else{
                                content+=s;
                            }
                        }else{ //负号的情况
                            content+=s;
                        }
                        strNum=""; //清空标记
                    }else if(r3.test(s)){//输入的是左括号,左括号前面必须是左括号或者运算符
                        if(r2.test(content)||r3.test(content)){
                            content+=s;
                        }else{
                            return false;
                        }
                    }else if(r4.test(s)){ //输入的是右括号,右括号前面必须是数字或者右括号
                        if(r1.test(content)||r4.test(content)){
                            content+=s;
                        }else {
                            return false;
                        }
                    }else{//如果是其他字符,返回
                        return false;
                    }
                }
            }

            /*计算表达式的函数*/
            function parse(content){
                //先对有括号的表达式进行求值
                //寻找最后一个左括号
                var index = content.lastIndexOf("\(");
                //如果等式中有左括号
                if(index > -1){
                    //寻找右括号,从左括号的位置开始寻找
                    var endIndex = content.indexOf("\)",index);
                    //如果等式中有右括号
                    if(endIndex > -1){
                        //调用自己算出括号中的结果
                        var result = parse(content.substring(index + 1,endIndex));
                        //然后继续调用自己
                        //其实这里完成的工作就是"2+3+(2+3*2)"转化成了"2+3+8",也就是用括号中的结果替换括号所在位置
                        return parse(content.substring(0,index) + ("" + result) + content.substring(endIndex + 1))
                    }else{ //如果没有找到匹配的右括号,把左括号删掉
                        content=content.substring(0,index)+content.substring(index+1);
                        return parse(content);
                    }
                }else{ //如果没有找到左括号,把表达式中的右括号删掉
                    if(content.indexOf("\)")>-1){ //如果有右括号,全部替换成空字符
                        content=content.replace(/\)/g,""); //替换后更新content
                        return parse(content); //执行更新后的content
                    }
                }
                index = content.indexOf("+"); //找最开始的+号
                if(index > -1){ //如果有,拆分成两个表达式,进行递归
                    return parse(content.substring(0,index)) + parse(content.substring(index + 1));
                }
                index = content.lastIndexOf("\-");
                while (r2.test(content.substring(0,index))){//如果"-"号前面有其他运算符,将当成负号
                    //更新index,从当前"-"的前面查找"-",循环到"-"号前面没有其他运算符,或者找不到,跳出循环
                    index=content.substring(0,index).lastIndexOf("\-");
                }
                if(index>-1){
                    //如果找到前面没有其他运算符号的"-",从当前index拆分相减,没找到执行其他符号的运算
                    return parse(content.substring(0,index)) - parse(content.substring(index + 1));
                }
                index = content.indexOf("×");
                if(index > -1){
                    return parse(content.substring(0,index)) * parse(content.substring(index + 1));
                }
                index = content.lastIndexOf("÷"); //除号和减号需要从最后个开始拆分,这样才能使前面的表达式先执行,保证结果正确
                if(index > -1){
                    return parse(content.substring(0,index)) / parse(content.substring(index + 1));
                }
                if("" == content){ //如果内容为空返回0
                    return 0;
                }else{
                    //递归到最后得到的是没有运算符的内容,不为空的话,就是一个数字字符串,字符串减0隐式转换成数字
                    return content-0;
                }
            }

        }

    }
    chatRobot();

    //获取顶部的天气信息
    function getWeather() {
        var city=document.querySelector('.city');
        var date=document.querySelector('.date');
        var week=document.querySelector('.week');
        var dayTemp=document.querySelector('.dtemp');
        var nightTemp=document.querySelector('.ntemp');
        var dayWeather=document.querySelector('.dweather');
        var nightWeather=document.querySelector('.nweather');

        var func=function (data) {
            city.textContent=data["forecasts"][0]["city"];
            date.textContent=data["forecasts"][0]["casts"][0]["date"];
            week.textContent=(data["forecasts"][0]["casts"][0]["week"]!=7)?data["forecasts"][0]["casts"][0]["week"]:'天';
            dayTemp.textContent=data["forecasts"][0]["casts"][0]["daytemp"];
            nightTemp.textContent=data["forecasts"][0]["casts"][0]["nighttemp"];
            dayWeather.textContent=data["forecasts"][0]["casts"][0]["dayweather"];
            nightWeather.textContent=data["forecasts"][0]["casts"][0]["nightweather"];
        };
        jsonp({
            url:"https://api.asilu.com/weather_v2/",
            success:func
        });
    }
    getWeather();

    //jsonp跨域请求函数
    function jsonp(obj) {
        //定义一个处理Jsonp返回数据的回调函数
        window["callback"] = function(str) {
            if(typeof str=='string')
                str=JSON.parse(str);
            obj.success(str);
            document.querySelector('body').removeChild(script);
        };
        var script = document.createElement("script");
        //组合请求URL
        var n=obj.url.charAt(obj.url.length-1);
        if(n!='/'){
            script.src = obj.url + "&callback=callback";
        }else{
            script.src = obj.url + "?callback=callback";
        }

        if(obj.data){
            for(key in obj.data){
                script.src +="&" + key+"="+ obj.data[key];
            }
        }
        //将创建的新节点添加到body
        document.querySelector('body').appendChild(script);
    }
};
