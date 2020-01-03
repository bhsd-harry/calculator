"use strict";//只有在严格模式下才能使用es6的一些语法
//localStorage只能存储字符串，如果需要存储对象，首先要转化为字符串。利用JSON.stringify()；
var storage = window.localStorage;
if (!storage) {
    alert("请使用支持html5的浏览器!");
}
//IOS safari浏览器无痕模式下localStorage不起作用，我们需要做判断，存在问题则提示
if (typeof storage === 'object') {
    try {
        storage.removeItem('localStorage');
        storage.setItem('localStorage', 1);
        storage.removeItem('localStorage');
    } catch (e) {
        alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
    }
}

//显示查询结果
function showResult() {
    showDiv("divResult");
}
//隐藏查询结果
function hidResult() {
    hideDiv("divResult");
}

//设置本地存储信息
function setStorage() {
    if (storage) {
        //另外，在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误，这时一般在setItem之前，先removeItem()就ok了。
        storage.removeItem("ddlServant");
        storage.setItem("ddlServant", $("ddlServant").value);

        //清除缓存
        storage.removeItem("servants");
    }
}
//加载本地存储信息
//360浏览器不支持es6中的函数参数默认值
function loadStorage(isTreasure) {
    $("ckIsMaxGrail").checked=false;
    if (storage) {
        let id = storage.getItem("ddlServant");
        if (id!=null&&id != "" && id != -1) {
            $("ddlServant").value = id;
            if (isTreasure) {
                setOc();
            }
            bindServantData(id);
        }
    }
}

//加载搜索提示(类似自动完成)
function bindSearchTips(){
    $("dlCraftEssenceTips").innerHTML=`
        <option value="786">20级宝石翁</option>
        <option value="1089">40级宝石翁</option>
	<option value="1392">60级宝石翁</option>
	<option value="1695">80级宝石翁</option>
        <option value="2000">100级宝石翁</option>
        <option value="943">20级黑杯</option>
	<option value="1307">40级黑杯</option>
	<option value="1671">60级黑杯</option>
        <option value="2034">80级黑杯</option>
        <option value="2400">100级黑杯</option>
	<option value="355">15级魔性菩薩</option>
        <option value="393">20级魔性菩薩</option>
        `;
}
(function(){
    let nums=document.querySelectorAll("#txtAttackBuff,#txtEnemyDefence1,#txtEnemyDefence2,#txtEnemyDefence3,#txtCardBuff,#txtCardResist1,#txtCardResist2,#txtCardResist3,#txtNpStrength,#txtSpecialAttack,#txtDamagePlus,#txtNpGainBuff");
    nums.forEach(function(n){
        n.onblur=function(){
            //失去焦点后，计算值
            let result = eval2(this.value) * 10;
	    this.value = result.toFixed(0) / 10;
        }
    })
})();
