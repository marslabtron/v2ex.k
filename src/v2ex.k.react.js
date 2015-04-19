/**
 * Created by JiaHao on 2015/4/14 0014.
 */

var checkUrl = function(){
    var pageUrl = window.location.href;
    var search = pageUrl.indexOf('?');
    if (search != -1) {
        pageUrl = pageUrl.slice(0, search)
    }
    return pageUrl
};

var getList = function (pageUrl) {
    var itemList = [];
    var $itemDom;
    if (pageUrl.indexOf('/go/') != -1) {
        $itemDom = $('#TopicsNode').children('.cell')
    } else {
        $itemDom = $('.cell.item');
    }
    for (var i = 0, len = $itemDom.length; i < len; i++) {
        var tempItem = {};
        var top = $($itemDom[i]).children('div').children('img');
        if (!top.length) {
            //被置顶
            tempItem['top'] = true;
        } else {
            tempItem['top'] = false;
        }
        var info = $($itemDom[i]).children('table').children('tbody').children('tr').children();
        tempItem['userUrl'] = $(info[0]).children('a').attr('href');
        tempItem['avatar'] = $(info[0]).children('a').children('img').attr('src');
        tempItem['title'] = $(info[2]).children('.item_title').text();
        tempItem['postUrl'] = $(info[2]).children('.item_title').children('a').attr('href');
        tempItem['vote'] = $(info[2]).children('.small.fade').children('.votes').text();
        if (tempItem['vote'] == '') {
            tempItem['vote'] = 0
        } else {
            tempItem['vote'] = tempItem['vote'][2]
        }
        tempItem['nodeUrl'] = $(info[2]).children('.small.fade').children('.node').attr('href');
        tempItem['nodeText'] = $(info[2]).children('.small.fade').children('.node').text();
        tempItem['lastReply'] = $($(info[2]).children('.small.fade').children('strong')[1]).children('a').attr('href');
        tempItem['replyNum']= $(info[3]).children('a').text();
        if (tempItem['replyNum'] == '') {
            tempItem['replyNum'] = 0
        }
        itemList.push(tempItem);
    }
    return itemList
};

var getUserInfo = function(){
    var userInfo = {};
    var $Dom = $($('#Rightbar').children('.box')[0]);
    var userDom = $Dom.children('.cell:first').children('table:first').children('tbody').children('tr').children();
    var collectDom = $Dom.children('.cell:first').children('table:last').children('tbody').children('tr').children('');
    var $topDom = $('#Top').find('.top');
    userInfo['notiNum'] = $Dom.children('.inner').children('a').text().slice(0,-6);
    userInfo['userName'] = $(userDom[2]).children('.bigger').children('a').text();
    userInfo['userMotto'] = $(userDom[2]).children('.fade').text();
    userInfo['userAvatar'] = $(userDom[0]).children('a').children('img').attr('src');
    userInfo['collectNode'] = $(collectDom[0]).children('a').children('.bigger').text();
    userInfo['collectTopic'] = $(collectDom[1]).children('a').children('.bigger').text();
    userInfo['following'] = $(collectDom[2]).children('a').children('.bigger').text();
    userInfo['ip'] = $($topDom[6]).attr('href');
    userInfo['logout'] = $($topDom[8]).attr('onclick');
    return userInfo
};

var Slide = React.createClass({
    render: function () {
        var DomStyle = {
            height: $(window).height()
        };
        var aClassName = 'top k_color_hover';
        return(
            <div >
                <div id="k_navbar" style={DomStyle} classNameName="bars k_color_dark">
                    <a id="avatar" href={'/member/'+this.props.info.userName} className={aClassName}>
                        <img src={this.props.info.userAvatar}/>
                    </a>
                    <a href="http://www.v2ex.com/notifications" className={aClassName}>
                        <i className="fa fa-bell fa-2x" title="提醒"></i>{this.props.info.notiNum}
                    </a>
                    <a href="/" className={aClassName} title="首页">
                        <i className="fa fa-home fa-2x"></i>
                    </a>
                    <a href="http://www.v2ex.com/new" className={aClassName} title="新主题">
                        <i className="fa fa-pencil-square-o fa-2x"></i>
                    </a>
                    <a href="https://workspace.v2ex.com/" target="_blank" className={aClassName} title="工作空间">
                        <i className="fa fa-laptop fa-2x"></i>
                    </a>
                    <a href="/notes" className={aClassName}>
                        <i className="fa fa-book fa-2x" title="笔记"></i>
                    </a>
                    <a href="/t" className={aClassName}>
                        <i className="fa fa-list-alt fa-2x" title="时间轴"></i>
                    </a>
                    <a href="/events" className={aClassName} title="事件">
                        <i className="fa fa-eye fa-2x"></i>
                    </a>
                    <a href={'/place/'+this.props.info.ip} className={aClassName} title="附近">
                        <i className="fa fa-map-marker fa-2x"></i>
                    </a>
                    <a href="/settings" className={aClassName} title="设置">
                        <i className="fa fa-cog fa-2x"></i>
                    </a>
                    <a href="#;" onclick="if (confirm('确定要从 V2EX 登出？')) { location.href= '/signout'; }" className={aClassName}>
                        <i className="fa fa-sign-out fa-2x" title="退出"></i>
                    </a>
                </div>

                <div id="k_tabbar" className="bars k_color_light">
                    <a href="/?tab=tech" className="tab k_color_hover">技术</a>
                    <a href="/?tab=creative" className="tab k_color_hover">创意</a>
                    <a href="/?tab=play" className="tab k_color_hover">好玩</a>
                    <a href="/?tab=apple" className="tab k_color_hover">Apple</a>
                    <a href="/?tab=jobs" className="tab k_color_hover">酷工作</a>
                    <a href="/?tab=deals" className="tab k_color_hover">交易</a>
                    <a href="/?tab=city" className="tab k_color_hover">城市</a>
                    <a href="/?tab=qna" className="tab k_color_hover">问与答</a>
                    <a href="/?tab=hot" className="tab k_color_hover">最热</a>
                    <a href="/?tab=all" className="tab_current k_color_hover">全部</a>
                    <a href="/?tab=r2" className="tab k_color_hover">R2</a>
                    <a href="/?tab=nodes" className="tab k_color_hover">节点</a>
                    <a href="/?tab=members" className="tab k_color_hover">关注</a>
                </div>
            </div>
            );
    }
});

var ListItem = React.createClass({
    voteClassName: function (voteNum) {
        var className;
        if (voteNum < 0) {
            className = 'black'
        } else if (voteNum < 5) {
            className = 'blue'
        } else if (voteNum < 10) {
            className = 'green'
        } else if (voteNum < 20) {
            className = 'yellow'
        } else {
            className = 'red'
        }
        return className
    },
    nodeDom: function (pageUrl) {
        var pageUrl = window.location.href;
        var search = pageUrl.indexOf('?');
        if (search != -1) {
            pageUrl = pageUrl.slice(0, search)
        }
        if (pageUrl.indexOf('/go/') == -1) {
            return <span className='k_itemList_node'>{this.props.item.nodeText}</span>;
        }else{
            return ""
        }
    },
    getWidth: function () {
        var width = $(window).width() - 140 -270-20-80-48-20-10;
        return {
            width: width
        };
    },
    render: function () {
        return(
            <li>
                <div className='k_itemList_node_vote'>
                    <span className={'k_itemList_vote ' + this.voteClassName(this.props.item.vote)}><i className="fa fa-chevron-up"></i>{this.props.item.vote}</span>
                    <span className='k_itemList_reply'><i className="fa fa-reply"></i>{this.props.item.replyNum}</span>
                    {this.nodeDom(this.props.pageUrl)}
                </div>
                <a className='k_itemList_avatar' href= {this.props.item.userUrl}>
                    <img src={this.props.item.avatar}/>
                </a>
                <a className='k_itemList_title' style = {this.getWidth()} href={this.props.item.postUrl}>

                    <span>{this.props.item.title}</span>
                </a>
                <a className='k_itemList_QR'></a>
            </li>
            )
    }
});
var List = React.createClass({
    render: function () {
        var Dom = [];
        var url = this.props.pageUrl;
        this.props.list.forEach(function (item) {
            Dom.push(<ListItem item = {item} pageUrl={url}/>);
        });
        return (
            <ul id= 'k_itemList_ul'>
                    {Dom}
            </ul>
            )
    }
});

var SubNav = React.createClass({
    render: function () {
        var Dom = [];
        for (var i = 0; i < this.props.node.length; i++) {
            var temp = this.props.node[i];
            var tempUrl = $(temp).attr('href');
            var tempText = $(temp).text();
            Dom.push(<a href={tempUrl}>{tempText}</a>)
        }
        return <div id='k_subNav'>{Dom}</div>
    }
});

var NodeList = React.createClass({
    render: function () {
        var Dom = []
    }
});

var MainPage = React.createClass({
    checkIframe :function(){
        if(self!=top){}
    },
    render: function () {
        return(
            <div id='k_itemList'>
                <SubNav node={this.props.NodeData} />
                <List list={this.props.ListData} pageUrl={this.props.pageUrl}/>
            </div>
            )
    }
});

var TopList = React.createClass({
    render:function(){
        var Dom = [];
        for (var i = 0; i < this.props.topList.length; i++) {
            var temp = this.props.topList[i];
            var tempUrl = $(temp).attr('href');
            var tempText = $(temp).text();
            Dom.push(<a href={tempUrl}>{tempText}</a>)
        }
        return(
            <div id='k_topList'>
                {Dom}
            </div>
            )
    }
});

var FastReader = React.createClass({
    render:function(){
        var domStyle = {
            'height':this.props.height+15,
            'width':this.props.width
        };
        return(
            <iframe frameBorder='0' seamless allowTransparency="true" width="100%" scrolling="auto" style={domStyle} src={this.props.src}></iframe>)
    }
});

var ReplyArea = React.createClass({
    render:function(){
        return(
            <form method="post" action={this.props.url}>
                <textarea name="content" maxlength="10000" class="mll" id="reply_content" style="overflow: hidden; word-wrap: break-word; resize: horizontal; height: 112px;"></textarea>
                <input type="submit" value="回复" class="super normal button" />
            </form>
                )
    }
});

$(function () {
    if(self != top){
        $('#Top,#Rightbar').css('display','none');
        $('#Wrapper').css('margin-left','0');
        $('#Main').css('width','680px')
    }

    var userInfo = getUserInfo();
    React.render(
        <Slide info={userInfo}/>,
        document.getElementById('Top')
    );

    var pageUrl = checkUrl();
    if (pageUrl == 'http://www.v2ex.com/' || pageUrl == 'https://www.v2ex.com/' || pageUrl.indexOf('/go/') != -1) {
        var listData = getList(pageUrl);
        var nodeData = $($($('#Main').children('.box')[0]).children('.cell')[0]).children('a');
        React.render(<MainPage ListData={listData} NodeData={nodeData} pageUrl={pageUrl}/>, document.getElementById('Main'));
    }
    var time;
    $('.k_itemList_title').mouseenter(function(){
        console.info();
        var url = $(this).attr('href');
        clearTimeout(time);
        time = setTimeout(function () {
            React.render(<FastReader width={'680px'} height={$(window).height()} src={url}/>,document.getElementById('Rightbar'));
            $('#Rightbar').width('680px');
            $('.k_itemList_title').css('width',$(window).width() - 140 -680-20-80-48-20-10);
        }, 1500);
    }).mouseleave(function(){
        clearTimeout(time);
    });


});