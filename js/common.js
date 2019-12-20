﻿"use strict";//只有在严格模式下才能使用es6的一些语法
//根据id获取dom对象
function $(id) {
    return document.getElementById(id);
}

//根据id返回对应控件的value值，并转换为float值
function getFloat(id) {
    return parseFloat($(id).value);
}
//显示div层
function showDiv(id) {
    $(id).style.display = "block";
}
//隐藏div层
function hideDiv(id) {
    $(id).style.display = "none";
}

//获取下拉列表选中项文本值
function getDdlText(id) {
    let index = $(id).selectedIndex;
    let text = $(id).options[index].text;
    return text;
}

//获取下拉列表选中项的自定义属性值
function getDdlAttrText(id, name) {
    let index = $(id).selectedIndex;
    let text = $(id).options[index].dataset[name];
    return text;
}

//获取文本框的自定属性值，并转换为float数值
function getTxtAttrFloatNum(id, name) {
    let text = $(id).dataset[name];
    return parseFloat(text);
}

//获取文本框的自定属性值，并转换为整型数值
function getTxtAttrIntNum(id, name) {
    let text = $(id).dataset[name];
    return parseInt(text);
}

// 对数组的原型添加remove方法
Array.prototype.remove = function (from, to) {
    let rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
//从大到小排序
function compare(property) {
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        return value2 - value1;
    }
}

//父容器中，使其自适应内容高度
function resizeWindow() {
    //IE中：document.frames['iframe的name'].document.getElementById('元素的ID');
    //非IE中：window.frames["iContent"].contentWindow.document.getElementById('content')
    //iframe的id与name不能一样

    //通用方法：通过contentWindow获取到内容页面的高度
    let height = $('iContent').contentWindow.document.getElementById('content').offsetHeight;
    if (iContent) {
        $("iContent").style.height = (height + 300) + "px";
    }
}

//内容页中，使父窗口iContent自适应内容高度
function resizeParentWindow() {
    let height = $("content").offsetHeight;//获取body的高度

    //获取到父容器iContent的dom对象
    let iContent = window.parent.document.getElementById('iContent');
    if (iContent) {
        iContent.style.height = (height + 300) + "px";
    }
}

//过滤特殊符号（搜索关键词）
function filterStr(str) {
    return str.replace(/\s+/gi, "").replace(/[〔（・&'〕)）]/gi, "");
}

//下载文件
function downloadFile(src) {
    let a = document.createElement('a');
    a.href=src;
    a.download="";
    a.click();
}

//新开标签页打开链接
function openTab(link){
    let a=document.createElement("a");   
    a.target="_blank";
    a.href=link;
    a.click();
}

//动态加载js脚本
function loadScript(src){
    //js/jquery-1.12.4.min.js
    let pos = src.lastIndexOf("/");
    let filename = src.substr(pos +1);//jquery-1.12.4.min.js
    let id=filename.replace(/[.-]/gi,"");//jquery1124minjs
    let script =document.getElementById(id);
    if (!script) {
        script=document.createElement("script");
        script.src=src;
        script.id=id;
        document.body.appendChild(script);
    }
}
//数组复制，不影响原数组
Array.prototype.clone=function(){ return this.slice(0); } 

//eval替代方法
function eval2(str){
    let result;
    try{
        result = new Function('return '+str)();
    }
    catch(e){
        return 0;
    }

    return isNaN(result)?0:result;
}   
