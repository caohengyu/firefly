<?php
header('content-type:application/json;charset=utf-8');

$arr=array(

    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532372485155&di=a428b0b188fbab9f44b996f871b4c964&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081229%2F0034034829945374_b.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532372485155&di=1f5968724133f3adf711a5c5d28c3c6e&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081105%2F0034034891195212_b.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532372697646&di=43807060b469deaedb0abc5f9c66bb5d&imgtype=0&src=http%3A%2F%2Fpic12.nipic.com%2F20110103%2F2355838_205207073194_2.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532372697646&di=43807060b469deaedb0abc5f9c66bb5d&imgtype=0&src=http%3A%2F%2Fpic12.nipic.com%2F20110103%2F2355838_205207073194_2.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=8f6cdc801e56e98c587793117c90ac17&src=http://img1.3lian.com/2015/w7/98/d/21.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=4b92d71ec2208ffd8eca6d714a6b22a2&src=http://img05.tooopen.com/images/20140814/sy_68938417462.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=ac0c0db434222587c9899190c047f36c&src=http://img.taopic.com/uploads/allimg/140326/235113-1403260QR467.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=afe2035d6599ced8d94d8aca13a94e74&src=http://pic41.nipic.com/20140519/18505720_091902163180_2.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=6e9d9772d15339a09d7b7a52eff569be&src=http://pic.58pic.com/58pic/14/22/59/09b58PICzAk_1024.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=0274e68b7e4eb1be00905b9d96293a56&src=http://img1.3lian.com/2015/w2/10/d/63.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=582d37fb2caafbffbbd8396f59a1dcac&src=http://img.taopic.com/uploads/allimg/140418/235107-14041PRF875.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=688159ae064a3ea805ac41351b69eb6e&src=http://pic11.nipic.com/20101205/5997702_162043077225_2.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=f335ec378ba6c408cfe53264e6e4fd3b&src=http://img1.3lian.com/2015/w7/98/d/23.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1532362616&di=cf94927a167e17bb0336a57c36a160f2&src=http://pic21.nipic.com/20120512/6655896_140028325127_2.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532372485155&di=8a68da95c0cb1f00d15742b958c17685&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20150608%2Ftooopen_sy_129103188937.jpg'
    ,'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532372485154&di=23ac80e3e55f424aaafa7395133d56ec&imgtype=0&src=http%3A%2F%2Fpic30.photophoto.cn%2F20140114%2F0034034810150817_b.jpg'


);
$images=json_encode($arr);
echo $images;
