﻿function $(id) {
    return document.getElementById(id);
}
function $$(tagname) {
    return document.getElementsByTagName(tagname);
}

//根据id返回对应控件的value值，并转换为float值
function getFloat(id) {
    return parseFloat($(id).value);
}

//获取下拉列表选中项文本值
function getDdlText(id) {
    var index = $(id).selectedIndex;
    var text = $(id).options[index].text;
    return text;
}
function getDdlAttrText(id,name) {
    var index = $(id).selectedIndex;
    var text = $(id).options[index].getAttribute(name);
    return text;
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};
//从大到小排序
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}

//使父窗口iContent自适应内容高度
function resizeParentWindow() {
    var height = $("content").offsetHeight;//获取body的高度
    var iContent = window.parent.frames["iContent"];
    if (iContent) {
        iContent.style.height = (height + 60) + "px";
    }
}

function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
}
function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}