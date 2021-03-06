"use strict";
var servants = [];//定义数组
var id = 0;

function initialData() {
    //除非刷新页面，或者重新打开页面，完整的从者数据只会创建一次，提高执行效率
    let servantsStorage=window.localStorage.getItem("servants");
    if (servantsStorage) {
        servantsStorage = JSON.parse(servantsStorage);
        if(servantsStorage instanceof Array&&servantsStorage.length>0){
            servants=servantsStorage;
            return;
        }
    }
    
    initSaber();
    initArcher();
    initLancer();
    initRider();
    initCaster();
    initAssassin();
    initBerserker();
    initExtra();
    //加载各等级atk和hp
    loadLvs();  

    //设置缓存
    window.localStorage.setItem("servants", JSON.stringify(servants));
}

//加载各等级atk和hp
function loadLvs(){
    servants.forEach(function(s){
        let lvArr=[];
        lvs.forEach(function(l){
            if(l.n==s.servantNo){
                lvArr.push(l);
            }
        })
        s.lvs=lvArr;
    })
}

/**
* 初始化从者数据
* @param {String} star 星级
* @param {String} Class 职介
* @param {String} name 从者名
* @param {Number} servantNo 从者编号(茹西教王的理想鄉和wiki从者编号都一样的)
* @param {String} attribute 阵营
* @param {Number} atk ATK
* @param {Number} hp HP
* @param {Number} maxAtk 100级ATK
* @param {Number} maxHp  100级HP
* @param {Number} target 宝具目标数
* @param {Number} hit 宝具hit数
* @param {Number} np 宝具np获取率
* @param {String} NpType 宝具倍率
* @param {Number} oc1 100 OC
* @param {Number} oc5 500 OC
* @param {String} type OC类型，目前有以下8种
*    NpSpecialAttack：宝具特攻
*    NpSpecialAttackPlut：宝具特攻+重蓄力
*    SpecialAttackBuff：特攻威力Buff，比如杰克女性特攻
*    ""：无
*    NpRemainHpDamage：双子宝具倍率提升
*    OcNpDamage：自爆弓宝具倍率提升
*    OcCardBuff：R金时OC绿魔放
*    OcAttackBuff：B兰OC加攻
*    DefDecrease：教授降防
*    CardDecrease：狂那降色卡耐性
*    OcNpStrength：宫本半藏OC宝具威力提升
*    CombinedDecrease：灾星简降防降色卡耐性
*    ChargeNp：重蓄力
* @param {Number} cardColor 卡牌倍率(B卡：1.5，A卡：1，Q卡：0.8)
* @param {Object} skill1
* @param {Object} skill2
* @param {Object} skill3
*    attackBuff：加攻
*    randomAttackBuff：概率加攻
*    accAttackBuff：累加加攻
*    defDecreaseSingle：单体降防
*    accDefDecrease：累加单体降防
*    defDecreaseAll：全体降防
*    cardBuff：魔放
*    randomCardBuff：概率魔放
*    accCardBuff：累加魔放
*    cardDecreaseSingle：单体降低卡牌耐性
*    cardDecreaseAll：全体降低卡牌耐性
*    npStrength：宝威
*    randomNpStrength：概率宝威
*    specialAttack：特攻buff
*    damagePlus：固伤
*    npGainBuff：黄金律
*    randomNpGainBuff：概率黄金律
*    chargeNp：缓充
*    randomChargeNp：场地回复魔力（固定值）
*    randomEffect：随机效果
* @param {Array} damageDist 伤害分布
* @param {Object} ClassSkill 职介技能(比如狂化EX、神性Debuff) 
*    cardBuff: 10(卡牌Buff), 
*    damagePlus: 0(神性Debuff),
*    chargeNp: 回复魔力
*    npGainBuff: 黄金律
*    npStrength: 宝威
* @param {Object} npEffect 宝具副效果(oc特攻只能显示一种副效果，所以剩余其他的副效果存储到这个对象里)
*    npStrength：宝具威力buff
*    cardBuff：卡牌buff
*    specialAttack：宝具特攻
*    accSpecialAttack：叠加宝具特攻
*    npRemainHpDamage：背水
*    defDecrease：降防
*    npCoefficient：固定宝具倍率
*    resistClass：职阶相性改变
*    ignoreDef：无视防御
*    nullifyDef：防御强化解除
*    specialNullifyDef：特攻防御强化解除
*    chargeNp：重蓄力
*    accAttackBuff：累加攻击buff
*/
function initialServant(star,Class, name,servantNo, attribute, atk, hp, maxAtk, maxHp, target, hit, np, NpType, oc1, oc5, type, cardColor, skill1, skill2, skill3, damageDist, ClassSkill, npEffect, support1, support2, support3) {
    let NP = [];
    switch(NpType) {
	case "Null":
	    NP = [0, 0, 0, 0, 0];
	    break;
	case "BusterAll1":
	    NP = [300, 400, 450, 475, 500];
	    break;
	case "BusterAll2":
	    NP = [400, 500, 550, 575, 600];
	    break;
	case "BusterAll3":
	    NP = [450, 550, 600, 625, 650];
	    break;
	case "BusterAll4":
	    NP = [300, 450, 525, 562.5, 600];
	    break;
	case "BusterAll5":
	    NP = [400, 550, 625, 662.5, 700];
	    break;
	case "BusterSingle1":
	    NP = [600, 800, 900, 950, 1000];
	    break;
	case "BusterSingle2":
	    NP = [800, 1000, 1100, 1150, 1200];
	    break;
	case "BusterSingle3":
	    NP = [700, 900, 1000, 1050, 1100];
	    break;
	case "QuickAll3":
	    NP = [900, 1100, 1200, 1250, 1300];
	    break;
	case "QuickSingle1":
	    NP = [1200, 1600, 1800, 1900, 2000];
	    break;
	case "QuickSingle2":
	    NP = [1600, 2000, 2200, 2300, 2400];
	    break;
	case "QuickSingle3":
	    NP = [1400, 1800, 2000, 2100, 2200];
	    break;
	case "ArtsAll1":
	    NP = [450, 600, 675, 712.5, 750];
	    break;
	case "ArtsAll2":
	    NP = [600, 750, 825, 862.5, 900];
	    break;
	case "ArtsSingle1":
	    NP = [900, 1200, 1350, 1425, 1500];
	    break;
	case "ArtsSingle2":
	    NP = [1200, 1500, 1650, 1725, 1800];
	    break;
	case "NpSpecialAttack":
	    NP = [150, 200, 225, 237.5, 250];
    }

    let oc = {};
    oc["1"] = oc1;
    oc["2"] = (oc1 * 3 + oc5) / 4;
    oc["3"] = (oc1 + oc5) / 2;
    oc["4"] = (oc1 + oc5 * 3) / 4;
    oc["5"] = oc5;
    oc.type = type;

/*
    let damageDist = [];
    switch(hit){
	case 2:
	    damageDist = [25];
	    break;
	case 3:
	    damageDist = [16,33];
	    break;
	case 4:
	    damageDist = [10,20,30];
	    break;
	case 5:
	    damageDist = [6,13,20,26];
	    break;
	case 6:
	    damageDist = [4,9,14,19,23];
	    break;
	case 7:
	    damageDist = [3,7,10,14,17,21];
	    break;
	case 8:
	    damageDist = [2,5,8,11,13,16,19];
	    break;
	case 9:
	    damageDist = [2,4,6,8,11,13,15,17];
	    break;
	case 10:
	    damageDist = [1,3,5,7,9,10,12,14,16];
    }
*/

    let model = {
        id: id,
        star:star,
        Class: Class,
        name: name,
        servantNo: servantNo,
        attribute: attribute,
        atk: atk,
        hp: hp,
        maxAtk: maxAtk,
        maxHp: maxHp,
        target: target,
        hit: hit,
        np: np,
        NP: NP,
        oc: oc,
        cardColor: cardColor,
	skill1: skill1,
	skill2: skill2,
	skill3: skill3,
	support1: support1,
	support2: support2,
	support3: support3,
	damageDist: damageDist,
        ClassSkill: ClassSkill,
        npEffect: npEffect
    }
    servants[id] = model;
    id++;
}

function initSaber(){
    initialServant(5,"Saber", "阿尔托莉雅", 2, "地", 11221, 15150, 12283, 16597, 3,1,0, "BusterAll2", 20, 50, "ChargeNp", 1.5, {attackBuff: [9,18]}, {cardBuff: [30,50], npStrength: [20,30]}, {}, [], {}, {}, {attackBuff: [9,18]});
    initialServant(5,"Saber", "阿尔托莉雅SC", 2, "地", 11221, 15150, 12283, 16597, 3,1,0, "BusterAll2", 20, 50, "ChargeNp", 1.5, {attackBuff: [9,18]}, {cardBuff: [30,50]}, {}, [], {}, {}, {attackBuff: [9,18]});
    initialServant(5,"Saber", "阿蒂拉", 8, "人", 12343, 13907, 13511, 15236, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [10,20]}, {}, {attackBuff: [10,30]}, [], {damagePlus: 175}, {}, {npStrength: [10,20]});
    initialServant(5,"Saber", "阿蒂拉SC", 8, "人", 12343, 13907, 13511, 15236, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [9,18]}, {}, {attackBuff: [10,30]}, [], {damagePlus: 175}, {}, {npStrength: [9,18]});
    initialServant(5,"Saber", "冲田总司", 68, "人", 12068, 13225, 13210, 14489, 1,3,1.09, "QuickSingle1", 0, 0, "", 0.8, {accAttackBuff: [20,20], cardBuff: [30,50]}, {}, {}, [16,33], {cardBuff: 2}, { ignoreDef: true });
    initialServant(5,"Saber", "冲田总司SC", 68, "人", 12068, 13225, 13210, 14489, 1,3,1.09, "QuickSingle1", 0, 0, "", 0.8, {cardBuff: [30,50]}, {}, {}, [16,33], {cardBuff: 2}, { ignoreDef: true });
    initialServant(5,"Saber", "莫德雷德", 76, "地", 11723, 14680, 12833, 16083, 3,1,0, "BusterAll2", 180, 220, "NpSpecialAttackPlus", 1.5, {cardBuff: [30,50]});
    initialServant(5,"Saber", "尼禄〔新娘〕", 90, "人", 11607, 14248, 12706, 15609, 1,2,0.7, "ArtsSingle2", 0, 0, "", 1, {npGainBuff: [35,45]}, {attackBuff: [30,40]}, {}, 25, {}, {}, {npGainBuff: [35,45]}, {attackBuff: [30,40]});
    initialServant(5,"Saber", "两仪式", 91, "人", 10721, 15453, 11736, 16929, 3,1,0.84, "ArtsAll2", 0, 0, "", 1, {cardBuff: [25,40]}, {attackBuff: [15,25]}, {}, [], {cardBuff: 6}, { ignoreDef: true, chargeNp: 10 });
    initialServant(5,"Saber", "两仪式SC", 91, "人", 10721, 15453, 11736, 16929, 3,1,0.84, "ArtsAll1", 0, 0, "", 1, {cardBuff: [25,40]}, {attackBuff: [15,25]}, {}, [], {cardBuff: 6}, { ignoreDef: true });
    initialServant(5,"Saber", "宫本武藏", 153, "人", 12037, 13635, 13176, 14938, 1,1,0, "BusterSingle2", 30, 90, "OcNpStrength", 1.5, {}, {cardBuff: [30,50]}, {}, [], {}, { specialAttack: 150 });
    initialServant(5,"Saber", "宫本武藏SC", 153, "人", 12037, 13635, 13176, 14938, 1,1,0, "BusterSingle1", 20, 60, "OcNpStrength", 1.5, {}, {cardBuff: [30,50]});
    initialServant(5,"Saber", "亚瑟〔Prototype〕", 160, "地", 12465, 13975, 13645, 15310, 3,1,0, "BusterAll1", 10, 50, "OcNpStrength", 1.5, {cardBuff: [30,50]}, {}, {specialAttack: [50,100]});
    initialServant(5,"Saber", "齐格鲁德", 213, "地", 12465, 13975, 13645, 15310, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {}, {cardBuff: [30,50]}, {}, [], {damagePlus: 175});
    initialServant(5,"Saber", "齐格鲁德SC", 213, "地", 12465, 13975, 13645, 15310, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {}, {cardBuff: [30,50]}, {}, [], {damagePlus: 175});
    initialServant(5,"Saber", "红阎魔", 234, "地", 11607, 13960, 12706, 15294, 1,5,0.56, "ArtsSingle1", 40, 60, "SpecialAttackBuff", 1, {}, {defDecreaseAll: [10,20]}, {attackBuff: [10,20]}, [6,13,20,26], {cardBuff: 10}, {}, {defDecreaseAll: [10,20]}, {attackBuff: [10,20]});
    initialServant(5,"Saber", "阿斯托尔福", 270, "地", 11694, 14248, 12801, 15609, 1,9,0.52, "QuickSingle1", 20, 40, "OcCardBuff", 0.8, {chargeNp: [10,20]}, {}, {attackBuff: [10,20]}, [2,4,6,8,11,13,15,17], {cardBuff: 10});
    initialServant(5,"Saber", "狄俄斯库里", 278, "天", 11840, 14824, 12961, 16240, 1,8,0.51, "ArtsSingle1", 0, 0, "", 1, {}, {npStrength: [10,15], attackBuff: [10,15]}, {cardBuff: [10,20]}, [2,5,8,11,13,16,19], {chargeNp: 3, damagePlus: 225, npGainBuff: 5}, { ignoreDef: true }, {}, {npStrength: [10,15], attackBuff: [10,15]});
/******************************************4星********************************************************************/
    initialServant(4,"Saber", "阿尔托莉雅〔Alter〕", 3, "人", 10248, 11589, 12408, 14051, 3,1,0, "BusterAll3", 10, 30, "ChargeNp", 1.5, {cardBuff: [30,50]}, {}, {attackBuff: [6,12]}, [], {}, {}, {}, {}, {attackBuff: [6,12]});
    initialServant(4,"Saber", "阿尔托莉雅〔Lily〕", 4, "地", 7726, 10623, 9355, 12880, 3,1,0, "BusterAll5", 0, 0, "", 1.5, {}, {cardBuff: [30,50]}, {npGainBuff: [10,20]}, [], {}, {}, {}, {}, {npGainBuff: [10,20]});
    initialServant(4,"Saber", "尼禄", 5, "人", 9449, 11753, 11441, 14250, 3,1,0.84, "ArtsAll2", 0, 0, "", 1, {randomCardBuff: [10,20]}, {randomAttackBuff: [22,44]}, {}, [], {}, { ignoreDef: true });
    initialServant(4,"Saber", "尼禄TC", 5, "人", 9449, 11753, 11441, 14250, 3,1,0.84, "ArtsAll2", 0, 0, "", 1, {}, {randomAttackBuff: [22,44]}, {}, [], {}, { ignoreDef: true });
    initialServant(4,"Saber", "齐格飞", 6, "地", 8181, 14165, 9905, 17175, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {npGainBuff: [15,37.5]}, {}, {specialAttack: [50,80], cardBuff: [30,50]});
    initialServant(4,"Saber", "罗摩", 101, "天", 9854, 11993, 11931, 14541, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {}, {attackBuff: [9,18]}, {}, [], {damagePlus: 200}, {}, {}, {attackBuff: [9,18]});
    initialServant(4,"Saber", "兰斯洛特", 121, "地", 9949, 11589, 12046, 14051, 1,1,0.83, "ArtsSingle1", 0, 0, "", 1, {}, {}, {}, [], {}, { cardBuff: 30 });
    initialServant(4,"Saber", "高文", 123, "地", 10173, 11419, 12317, 13845, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [20,20], cardBuff: [20,30]}, {attackBuff: [10,20]}, {}, [], {}, {}, {}, {attackBuff: [10,20]});
    initialServant(4,"Saber", "高文SC", 123, "地", 10173, 11419, 12317, 13845, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [20,20], randomCardBuff: [20,30]}, {attackBuff: [6,12]}, {}, [], {}, {}, {}, {attackBuff: [6,12]});
    initialServant(4,"Saber", "巴托里〔勇者〕", 138, "地", 9899, 11248, 11986, 13638, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {npGainBuff: [30,50]}, {cardBuff: [20,40]}, {randomEffect: {noEffect: [], cardBuff: [30,50], attackBuff: [30,50]}}, [], {}, { ignoreDef: true }, {}, {}, {randomAttackBuff: [30,50]});
    initialServant(4,"Saber", "铃鹿御前", 165, "天", 9544, 11753, 11556, 14250, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {cardBuff: [20,40]}, {}, {chargeNp: [5,10], npStrength: [20,20]}, [], {damagePlus: 200});
    initialServant(4,"Saber", "铃鹿御前SC", 165, "天", 9544, 11753, 11556, 14250, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [20,40]}, {}, {chargeNp: [5,10], npStrength: [20,20]}, [], {damagePlus: 200});
    initialServant(4,"Saber", "弗兰肯斯坦", 176, "地", 9353, 11993, 11325, 14541, 1,5,0.7, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [40,80]}, {}, {attackBuff: [10,20], npStrength: [10,20]}, [6,13,20,26], {cardBuff: 12});
    initialServant(4,"Saber", "柳生但马守宗矩", 187, "人", 9999, 11135, 12107, 13501, 1,4,0.81, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [30,50]}, {attackBuff: [10,20]}, {npGainBuff: [30,50]}, [10,20,30]);
    initialServant(4,"Saber", "女王梅芙", 221, "地", 8017, 13609, 9707, 16501, 1,6,0.72, "ArtsSingle1", 0, 0, "", 1, {chargeNp: [10,20]}, {cardDecreaseAll: [10,20]}, {attackBuff: [10,20]}, [4,9,14,19,23], {}, {}, {}, {cardDecreaseAll: [10,20,1]}, {attackBuff: [10,20]});	
    initialServant(4,"Saber", "迪尔姆德", 223, "地", 10048, 11362, 12166, 13776, 1,10,0.73, "QuickSingle1", 0, 0, "", 0.8, {cardBuff: [10,20], attackBuff: [10,20]}, {}, {npGainBuff: [20,30]}, [1,3,5,7,9,10,12,14,16], {cardBuff: 8});
    initialServant(4,"Saber", "兰陵王", 227, "人", 9112, 12625, 11033, 15308, 0,0,0, "Null", 0, 0, "", 0, {attackBuff: [10,20]}, {}, {}, [], {}, {}, {attackBuff: [10,20]}, {}, {cardBuff: [10,20,1]});
    initialServant(4,"Saber", "拉克西米", 245, "人", 9949, 11362, 12046, 13776, 3,4,1.01, "BusterSingle1", 0, 0, "", 0.8, {attackBuff: [10,20]}, {}, {}, [10,20,30], {cardBuff: 8, damagePlus: 200}, {}, {attackBuff: [10,20]});
    initialServant(4,"Saber", "葛饰北斋", 264, "人", 9389, 11873, 11368, 14396, 1,8,0.46, "ArtsSingle1", 30, 70, "OcNpStrength", 1, {}, {}, {cardBuff: [20,30]}, [2,5,8,11,13,16,19], {damagePlus: 100});
    initialServant(4,"Saber", "巴御前", 290, "地", 9544, 12233, 11556, 14832, 3,3,0.55, "ArtsAll1", 0, 0, "", 1, {}, {cardBuff: [20,30]}, {}, [16,33], {}, { cardBuff: 20 });
    initialServant(4,"Saber", "斋藤一", 293, "人", 9425, 11873, 11412, 14396, 1,7,0.76, "ArtsSingle1", 20, 40, "CardDecrease", 1, {cardBuff: [10,20]}, {}, {attackBuff: [20,30]}, [3,7,10,14,17,21]);
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Saber", "恺撒", 7, "人", 7497, 9595, 10146, 13009, 1,10,1.1, "QuickSingle2", 0, 0, "", 0.8, {npStrength: [9,18]}, {attackBuff: [8,16]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 8, damagePlus: 150}, { accAttackBuff: 10 }, {npStrength: [9,18]}, {attackBuff: [8,16]});
    initialServant(3,"Saber", "恺撒SC", 7, "人", 7497, 9595, 10146, 13009, 1,10,1.1, "QuickSingle1", 0, 0, "", 0.8, {npStrength: [9,18]}, {attackBuff: [8,16]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 8, damagePlus: 150});
    initialServant(3,"Saber", "吉尔·德·雷", 9, "人", 6615, 10498, 8952, 14234, 0,0,0, "Null", 0, 0, "", 0, {}, {npGainBuff: [18, 45]}, {}, [], {}, {}, {npStrength: [8,16]});
    initialServant(3,"Saber", "弗格斯", 72, "地", 7460, 9786, 10096, 13268, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,30]});
    initialServant(3,"Saber", "贝德维尔", 126, "星", 7627, 9595, 10322, 13009, 1,1,0, "BusterSingle2", 30, 90, "OcCardBuff", 1.5, {npStrength: [8,16]}, {}, {}, [], {}, {}, {npStrength: [8,16]});
    initialServant(1,"Saber", "伊阿宋", 254, "地", 5457, 7575, 8479, 11677, 3,5,0.37, "ArtsAll1", 20, 40, "OcCardBuff", 1, {}, {}, {attackBuff: [10,20]}, [6,13,20,26], {}, {}, {}, {}, {attackBuff: [10,20]});
}

function initArcher(){
   
    //----------------------------------Archer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Archer", "吉尔伽美什", 12, "天", 12280, 13097, 13442, 14348, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [10.5,21]}, {npGainBuff: [20,50]}, {}, [], {damagePlus: 175}, { npStrength: 30 }, {attackBuff: [10.5,21]});
    initialServant(5,"Archer", "俄里翁", 60, "天", 11107, 14553, 12158, 15943, 1,5,1, "ArtsSingle2", 0, 0, "", 1, {attackBuff: [20,20]}, {specialAttack: [50,100]}, {}, [6,13,20,26]);
    initialServant(5,"Archer", "特斯拉", 77, "星", 11781, 13825, 12896, 15146, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {npGainBuff: [30,50]}, {attackBuff: [10,20], randomNpStrength: [20,30]}, {}, [], {}, {}, {npGainBuff: [20,30]});
    initialServant(5,"Archer", "阿周那", 84, "天", 12342, 13230, 13510, 14494, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {chargeNp: [10,10]}, {cardBuff: [20,30], npStrength: [10,20]}, [], {damagePlus: 175});
    initialServant(5,"Archer", "阿周那SC", 84, "天", 12342, 13230, 13510, 14494, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {cardBuff: [20,30], npStrength: [10,20]}, [], {damagePlus: 175});
    initialServant(5,"Archer", "阿尔托莉雅", 129, "地", 11276, 14553, 12343, 15943, 1,10,0.59, "ArtsSingle1", 20, 40, "ChargeNp", 1, {cardBuff: [20,30]}, {}, {attackBuff: [8,18]}, [2,5,8,5,8,11,13,8,11], {cardBuff: 10}, {}, {}, {}, {attackBuff: [8,18]});
    initialServant(5,"Archer", "伊什塔尔", 142, "天", 12252, 13965, 13412, 15299, 3,1,0, "BusterAll2", 20, 60, "OcCardBuff", 1.5, {attackBuff: [10,20]}, {}, {attackBuff: [30,50]}, [], {damagePlus: 225}, {}, {attackBuff: [10,20]});
    initialServant(5,"Archer", "伊什塔尔SC", 142, "天", 12252, 13965, 13412, 15299, 3,1,0, "BusterAll1", 20, 60, "OcCardBuff", 1.5, {attackBuff: [10,20]}, {}, {attackBuff: [30,50]}, [], {damagePlus: 225});
    initialServant(5,"Archer", "莫里亚蒂", 156, "人", 11781, 13685, 12896, 14992, 1,1,0, "BusterSingle1", 20, 40, "DefDecrease", 1.5, {}, {npStrength: [20,20]}, {attackBuff: [10,20]}, [], {}, {}, {}, {}, {attackBuff: [20,40]});
    initialServant(5,"Archer", "莫里亚蒂TC", 156, "人", 11781, 13685, 12896, 14992, 1,1,0, "Null", 20, 40, "DefDecrease", 1.5, {}, {npStrength: [20,20]}, {attackBuff: [10,20]}, [], {}, {}, {}, {}, {attackBuff: [10,20], randomAttackBuff: [10,20]});
    initialServant(5,"Archer", "拿破仑", 212, "星", 12033, 13097, 13172, 14348, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [30,40]}, {npStrength: [10,20]}, {}, [], {}, { ignoreDef: true }, {attackBuff: [10,20]}, {npStrength: [10,20]});
    initialServant(5,"Archer", "拿破仑SC", 212, "星", 12033, 13097, 13172, 14348, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [30,40]}, {npStrength: [10,20]}, {}, [], {}, { ignoreDef: true });
    initialServant(5,"Archer", "贞德", 216, "人", 10525, 15743, 11521, 17247, 3,4,0.68, "ArtsAll1", 0, 0, "", 1, {cardBuff: [20,30]}, {npStrength: [10,20], randomChargeNp: 3}, {attackBuff: [10,20]}, [10,20,30], {}, {}, {}, {}, {attackBuff: [10,20], randomAttackBuff: [10,20]});
    initialServant(5,"Archer", "超人俄里翁", 272, "地", 12557, 13494, 13746, 14783, 0,0,0, "Null", 0, 0, "", 0, {specialAttack: [30,50]}, {attackBuff: [10,20]}, {}, [], {damagePlus: 175});
    initialServant(5,"Archer", "清少纳言", 276, "人", 12218, 12965, 13374, 14204, 3,4,0.57, "BusterSingle1", 50, 100, "SpecialAttackBuff", 0.8, {attackBuff: [10,20], chargeNp: [10,10]}, {}, {cardBuff: [20,30]}, [10,20,30], {}, {}, {attackBuff: [10,20], chargeNp: [10,10]});
    /******************************************4星********************************************************************/
    initialServant(4,"Archer", "卫宫", 11, "人", 9398, 11521, 11379, 13969, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {cardBuff: [30,50]}, [], {}, { ignoreDef: true });
    initialServant(4,"Archer", "卫宫〔Arts〕", 11, "人", 9398, 11521, 11379, 13969, 3,10,0.51, "ArtsAll2", 0, 0, "", 1, {}, {}, {cardBuff: [30,50]}, [3,3,5,7,8,10,12,14,16], {}, { ignoreDef: true });
    initialServant(4,"Archer", "卫宫SC", 11, "人", 9398, 11521, 11379, 13969, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {cardBuff: [25,40]}, [], {}, { ignoreDef: true });
    initialServant(4,"Archer", "阿塔兰忒", 14, "地", 8633, 12476, 10453, 15127, 3,10,0.5, "BusterSingle2", 0, 0, "", 0.8, {cardBuff: [30,50]}, {}, {npGainBuff: [30,50]}, [3,5,3,7,8,10,12,14,16], {}, {}, {cardBuff: [30,50,0.8]});
    initialServant(4,"Archer", "织田信长", 69, "人", 9494, 11637, 11495, 14110, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {npGainBuff: [20,30]}, {specialAttack: [50,100]}, {}, [], {}, {}, {npGainBuff: [20,30]});
    initialServant(4,"Archer", "崔斯坦", 122, "地", 9735, 11637, 11787, 14110, 1,7,0.58, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [5,11,16,5,11,16], {}, { ignoreDef: true });
    initialServant(4,"Archer", "安妮 & 玛莉", 131, "人", 9446, 11521, 11437, 13969, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9.5,19.5]}, {}, {attackBuff: [8.5,25.5]}, [], {}, { npRemainHpDamage: 600 }, {attackBuff: [9.5,19.5]});
    initialServant(4,"Archer", "克洛伊", 137, "天", 9845, 10914, 11920, 13233, 1,6,0.38, "ArtsSingle1", 0, 0, "", 1, {}, {cardBuff: [20,35]}, {}, [4,9,14,19,23]);
    initialServant(4,"Archer", "卫宫〔Alter〕", 157, "人", 8996, 12250, 10892, 14853, 1,10,0.43, "ArtsSingle2", 0, 0, "", 1, {}, {cardBuff: [15,30]}, {attackBuff: [20,40]}, [1,3,5,7,9,10,12,14,16], {}, { ignoreDef: true });
    initialServant(4,"Archer", "海伦娜", 180, "人", 9446, 11404, 11437, 13827, 3,4,0.38, "ArtsAll1", 0, 0, "", 1, {}, {damagePlus: [1000,2000]}, {cardBuff: [20,40]}, [10,20,30]);
    initialServant(4,"Archer", "巴御前", 184, "地", 9946, 10804, 12043, 13100, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {attackBuff: [9,19], npStrength: [18,28]}, {}, {}, [], {cardBuff: 2}, {}, {attackBuff: [9,19]});
    initialServant(4,"Archer", "巴御前SC", 184, "地", 9946, 10804, 12043, 13100, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9,19], npStrength: [18,28]}, {}, {}, [], {cardBuff: 2});
    initialServant(4,"Archer", "阿蒂拉·the·San〔ta〕", 197, "星", 9759, 11637, 11816, 14110, 1,10,0.59, "QuickSingle1", 0, 0, "", 0.8, {}, {npStrength: [20,30]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 12, damagePlus: 175}, {}, {}, {npStrength: [20,30]});
    initialServant(4,"Archer", "浅上藤乃", 200, "人", 10299, 11025, 12470, 13368, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {cardBuff: [20,35], npGainBuff: [20,30]});
    initialServant(4,"Archer", "喀戎", 207, "天", 9294, 12250, 11253, 14853, 1,4,0.68, "ArtsSingle1", 0, 0, "", 1, {}, {}, {cardBuff: [20,30]}, [10,20,30], {damagePlus: 150}, { nullifyDef: true }, {}, {}, {cardBuff: [20,30,0.8,1,1.5]});
    initialServant(4,"Archer", "马嘶", 248, "天", 10249, 11245, 12409, 13634, 1,1,0, "BusterSingle1", 600, 1000, "NpRemainHpDamage", 1.5, {}, {cardBuff: [20,30], accDefDecrease: [10,20]}, {}, [], {cardBuff: 5, damagePlus: 210});
    initialServant(4,"Archer", "刑部姬", 262, "地", 8895, 12476, 10770, 15127, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {attackBuff: [10,20]}, {cardBuff: [20,30]}, [], {damagePlus: 145}, {}, {}, {attackBuff: [10,20]});
    initialServant(4,"Archer", "灾星简", 269, "人", 8996, 12495, 10892, 15150, 1,5,0.71, "QuickSingle1", 10, 30, "CombinedDecrease", 0.8, {}, {attackBuff: [10,20]}, {}, [6,13,20,26], {cardBuff: 10}, {}, {}, {attackBuff: [10,20]});
    initialServant(4,"Archer", "南丁格尔〔圣诞〕", 271, "人", 9859, 11080, 11936, 13434, 3,6,0.6, "BusterSingle1", 0, 0, "", 0.8, {}, {npStrength: [20,30]}, {attackBuff: [10,20]}, [4,9,14,19,23], {}, {}, {}, {npStrength: [20,30]}, {attackBuff: [10,20]});
    initialServant(4,"Archer", "伊莉雅丝菲尔", 286, "人", 10098, 10914, 12226, 13233, 3,5,0.63, "BusterSingle1", 10, 50, "OcCardBuff", 0.8, {cardBuff: [10,20]}, {npGainBuff: [20,30], attackBuff: [10,20]}, {}, [6,13,20,26], {chargeNp: 3}, {}, {}, {attackBuff: [10,20]});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Archer", "罗宾汉", 13, "人", 6715, 10187, 9088, 13812, 1,1,0.87, "ArtsSingle1", 200, 250, "NpSpecialAttack", 1, {}, {npGainBuff: [12,30]});
    initialServant(3,"Archer", "尤瑞艾莉", 15, "天", 7032, 9506, 9517, 12889, 1,1,0.9, "NpSpecialAttack", 0, 0, "", 1, {}, {}, {cardBuff: [20,30]}, [], {damagePlus: 300}, { npCoefficient: 1200 });
    initialServant(3,"Archer", "大卫", 63, "天", 7736, 8643, 10470, 11719, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {}, {}, {attackBuff: [9,18]}, [], {}, { specialAttack: 200 }, {}, {}, {attackBuff: [9,18]});
    initialServant(3,"Archer", "大卫SC", 63, "天", 7736, 8643, 10470, 11719, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {}, {attackBuff: [9,18]}, [], {}, {}, {}, {}, {attackBuff: [9,18]});
    initialServant(3,"Archer", "幼吉尔", 95, "天", 7696, 8731, 10415, 11838, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10.5,21]}, {}, {npGainBuff: [20,50]}, [], {damagePlus: 175}, {}, {attackBuff: [10.5,21]});
    initialServant(3,"Archer", "比利小子", 105, "人", 6890, 9506, 9325, 12889, 1,3,0.56, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [16,33], {cardBuff: 7});
    initialServant(3,"Archer", "俵藤太", 125, "人", 7032, 9800, 9517, 13287, 3,1,0, "BusterAll2", 50, 100, "SpecialAttackBuff", 1.5, {cardBuff: [20,30]});
    initialServant(3,"Archer", "威廉·退尔", 246, "人", 7384, 9310, 9993, 12623, 1,3,0.66, "ArtsSingle1", 200, 250, "NpSpecialAttack", 1, {}, {cardBuff: [20,30]}, {}, [16,33]);
    initialServant(2,"Archer", "帕里斯", 255, "地", 6523, 7834, 9452, 11306, 1,5,0.43, "QuickSingle1", 150, 200, "NpSpecialAttack", 0.8, {}, {attackBuff: [20,40]}, {}, [6,13,20,26]);
    initialServant(1,"Archer", "阿拉什", 16, "地", 5816, 7122, 9037, 10979, 3,1,0, "BusterSingle2", 0, 800, "OcNpDamage", 1.5);
    initialServant(1,"Archer", "织田信胜", 294, "人", 5116, 7563, 7242, 10636, 0,0,0, "NULL", 0, 0, "", 0, {}, {}, {}, [], {}, {}, {cardDecreaseSingle: [20,30,1.5]});
}

function initLancer(){
    //----------------------------------Lancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Lancer", "斯卡哈", 70, "星", 11375, 14825, 12452, 16241, 1,1,0.71, "QuickSingle2", 0, 0, "", 0.8, {}, {cardBuff: [30,50]}, {specialAttack: [50,100]}, [], {}, {}, {}, {cardBuff: [30,50,0.8]});
    initialServant(5,"Lancer", "迦尔纳", 85, "天", 11976, 13632, 13110, 14934, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {}, {cardBuff: [20,30], npStrength: [10,20]}, {}, [], {damagePlus: 200});
    initialServant(5,"Lancer", "布伦希尔德", 88, "天", 11432, 14825, 12514, 16241, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {cardBuff: [15,25], npStrength: [8,15]}, {}, {}, [], {damagePlus: 100});
    initialServant(5,"Lancer", "阿尔托莉雅", 119, "天", 10995, 15606, 12036, 17097, 3,1,0, "BusterAll1", 20, 60, "ChargeNp", 1.5, {cardBuff: [30,50]}, {attackBuff: [9,18]}, {}, [], {}, {}, {}, {attackBuff: [9,18]});
    initialServant(5,"Lancer", "玉藻前", 128, "天", 10726, 15147, 11741, 16594, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [10,20]}, {defDecreaseSingle: [20,30]}, {npGainBuff: [30,50]}, [], {damagePlus: 230}, {}, {attackBuff: [10,20]}, {defDecreaseSingle: [20,30]});
    initialServant(5,"Lancer", "恩奇都", 143, "天", 10780, 15300, 11800, 16762, 1,1,0, "BusterSingle2", 30, 50, "DefDecrease", 1.5, {cardBuff: [30,50]}, {}, {}, [], {}, { specialAttack: 200 });
    initialServant(5,"Lancer", "恩奇都SC", 143, "天", 10780, 15300, 11800, 16762, 1,1,0, "BusterSingle1", 20, 40, "DefDecrease", 1.5, {cardBuff: [30,50]});
    initialServant(5,"Lancer", "埃列什基伽勒", 196, "地", 10343, 16065, 11322, 17600, 3,1,0, "BusterAll1", 10, 50, "OcCardBuff", 1.5, {}, {cardBuff: [30,50]}, {npGainBuff: [20,30]}, [], {damagePlus: 225}, {}, {}, {}, {npGainBuff: [20,30]});
    initialServant(5,"Lancer", "布拉达曼特", 232, "地", 10833, 15682, 11858, 17180, 3,5,0.7, "BusterSingle1", 20, 60, "OcNpStrength", 0.8, {cardBuff: [20,30]}, {}, {}, [6,13,20,26]);
    initialServant(5,"Lancer", "罗穆路斯", 280, "天", 12273, 13632, 13435, 14934, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [10,20]}, {}, {cardBuff: [20,30]}, [], {cardBuff: 9, damagePlus: 235}, { specialAttack: 120, accSpecialAttack: 20 }, {attackBuff: [10,20]});
    /******************************************4星********************************************************************/
    initialServant(4,"Lancer", "巴托里", 18, "人", 9122, 11870, 11045, 14392, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,20]}, {defDecreaseSingle: [10,20]}, {}, [], {}, { ignoreDef: true }, {attackBuff: [10,20], randomAttackBuff: [10,20]}, {defDecreaseSingle: [10,20]});
    initialServant(4,"Lancer", "阿尔托莉雅〔Alter〕", 78, "天", 9968, 11761, 12069, 14260, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {cardBuff: [35,55]}, {}, {attackBuff: [6,12]}, [], {}, { ignoreDef: true }, {}, {}, {attackBuff: [6,12]});
    initialServant(4,"Lancer", "芬恩", 87, "天", 8930, 12750, 10812, 15459, 3,3,0.55, "ArtsAll2", 0, 0, "", 1, {npGainBuff: [10,30]}, {}, {cardBuff: [24,40]}, [16,33], {damagePlus: 125}, {}, {npGainBuff: [10,30]});
    initialServant(4,"Lancer", "李书文", 102, "人", 9653, 11360, 11688, 13774, 1,3,0.52, "ArtsSingle2", 0, 0, "", 1, {}, {}, {cardBuff: [30,50]}, [12,25], {}, { ignoreDef: true });
    initialServant(4,"Lancer", "李书文TC", 102, "人", 9653, 11360, 11688, 13774, 1,3,0.52, "ArtsSingle1", 0, 0, "", 1, {}, {}, {cardBuff: [30,50]}, [12,25], {}, { ignoreDef: true });
    initialServant(4,"Lancer", "清姬", 134, "地", 8936, 11870, 10820, 14392, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,30]}, {defDecreaseSingle: [20,30]}, [], {cardBuff: 12}, {}, {}, {}, {defDecreaseSingle: [20,30]});
    initialServant(4,"Lancer", "弗拉德三世〔Extra〕", 140, "人", 8775, 13005, 10625, 15769, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [10,20]}, {npStrength: [9,18]}, {}, [], {}, {}, {}, {npStrength: [9,18]});
    initialServant(4,"Lancer", "贞德·Alter·Santa·Lily", 141, "人", 9261, 11870, 11213, 14392, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {}, {cardBuff: [35,55]});
    initialServant(4,"Lancer", "美杜莎", 146, "地", 8253, 13119, 9993, 15907, 1,8,0.44, "QuickSingle2", 0, 0, "", 0.8, {cardDecreaseSingle: [10,20]}, {attackBuff: [10,30]}, {}, [2,5,8,11,13,16,19], {damagePlus: 250}, {}, {cardDecreaseSingle: [10,20,0.8]});
    initialServant(4,"Lancer", "美杜莎SC", 146, "地", 8253, 13119, 9993, 15907, 1,8,0.44, "QuickSingle2", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {}, [2,5,8,11,13,16,19], {damagePlus: 250});
    initialServant(4,"Lancer", "源赖光", 181, "天", 9168, 12112, 11100, 14686, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,40]}, {attackBuff: [10,20]}, [], {cardBuff: 6, damagePlus: 150}, { ignoreDef: true }, {}, {cardBuff: [20,40,1.5]}, {attackBuff: [10,20]});
    initialServant(4,"Lancer", "帕尔瓦蒂", 183, "天", 8127, 13253, 9840, 16069, 3,4,1.08, "BusterSingle1", 10, 30, "ChargeNp", 0.8, {cardBuff: [20,30], npGainBuff: [20,30]}, {attackBuff: [30,50]}, {}, [10,20,30], {damagePlus: 225});
    initialServant(4,"Lancer", "哪吒", 193, "天", 9284, 12112, 11241, 14686, 3,1,0, "BusterAll2", 20, 60, "OcNpStrength", 1.5, {cardBuff: [10,20]});
    initialServant(4,"Lancer", "哪吒SC", 193, "天", 9284, 12112, 11241, 14686, 3,1,0, "BusterAll1", 20, 60, "OcNpStrength", 1.5, {cardBuff: [10,20]});
    initialServant(4,"Lancer", "瓦尔基里", 214, "天", 8037, 14025, 9731, 17005, 3,7,0.86, "BusterSingle1", 0, 0, "", 0.8, {cardBuff: [20,30], npStrength: [10,20]}, {}, {chargeNp: [5,10]}, [3,7,10,14,17,21], {damagePlus: 200});
    initialServant(4,"Lancer", "茨木童子", 217, "地", 9133, 12354, 11058, 14979, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10,20], npStrength: [20,30], npGainBuff: [20,30]}, {}, {}, [], {cardBuff: 4}, { ignoreDef: true }, {attackBuff: [10,20]});
    initialServant(4,"Lancer", "长尾景虎", 252, "人", 9617, 11360, 11644, 13774, 1,8,0.45, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [20,30]}, {npGainBuff: [20,30]}, {attackBuff: [10,20]}, [2,5,8,11,13,16,19], {damagePlus: 150}, {}, {}, {}, {attackBuff: [10,20]});
    initialServant(4,"Lancer", "谜之Alterego·Λ", 266, "地", 9261, 11749, 11213, 14246, 3,3,0.76, "ArtsAll1", 0, 0, "", 1, {cardBuff: [10,20]}, {}, {attackBuff: [30,50]}, [16,33], {damagePlus: 200}, { ignoreDef: true });
    initialServant(4,"Lancer", "凯妮斯", 279, "地", 9896, 11532, 11982, 13982, 3,1,0, "BusterAll1", 10, 30, "OcNpStrength", 1.5, {attackBuff: [20,40]}, {}, {}, [], {cardBuff: 12, damagePlus: 225});
    initialServant(4,"Lancer", "宇津见艾莉瑟", 283, "人", 9122, 9578, 11045, 11597, 3,3,0.63, "ArtsAll1", 0, 0, "", 1, {cardBuff: [20,30]}, {}, {specialAttack: [20,30]}, [16,33], {damagePlus: 100});
    initialServant(4,"Lancer", "虞美人", 288, "地", 9896, 11245, 11982, 13634, 1,5,1.1, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [20,20], randomNpGainBuff: [10,20]}, {}, {cardBuff: [10,20]}, [6,13,20,26,35], {}, { specialAttack: 150 });
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Lancer", "库·丘林", 17, "天", 7239, 9593, 9797, 13007, 1,1,1.07, "QuickSingle2", 0, 0, "", 0.8, {attackBuff: [20,20], randomAttackBuff: [30,30]}, {}, {}, [], {damagePlus: 175});
    initialServant(3,"Lancer", "库·丘林SC", 17, "天", 7239, 9593, 9797, 13007, 1,1,1.07, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [], {damagePlus: 175});
    initialServant(3,"Lancer", "库·丘林〔Prototype〕", 20, "天", 7082, 10098, 9584, 13691, 1,1,1.08, "QuickSingle1", 0, 0, "", 0.8, {}, {}, {specialAttack: [50,100]}, [], {damagePlus: 175});
    initialServant(3,"Lancer", "罗穆路斯", 22, "星", 7239, 9883, 9797, 13400, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {randomAttackBuff: [22,44]}, {cardBuff: [10,30]}, [], {}, {}, {}, {}, {cardBuff: [10,30,1.5]});
    initialServant(3,"Lancer", "赫克托耳", 64, "人", 6928, 10200, 9376, 13829, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [10,20]}, {}, {}, [], {}, { ignoreDef: true }, {npStrength: [10,20]});
    initialServant(3,"Lancer", "赫克托耳SC", 64, "人", 6928, 10200, 9376, 13829, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [8.5,17]}, {}, {}, [], {}, { ignoreDef: true }, {npStrength: [8.5,17]});
    initialServant(3,"Lancer", "迪尔姆德", 71, "地", 6877, 10098, 9307, 13691, 1,2,0.79, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, 60);
    initialServant(3,"Lancer", "豹人", 148, "地", 7022, 9593, 9503, 13007, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {cardBuff: [10,30]}, {attackBuff: [10,30]}, {}, [], {cardBuff: 2, damagePlus: 200});
    initialServant(3,"Lancer", "宝藏院胤舜", 186, "人", 6791, 9996, 9191, 13553, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {defDecreaseSingle: [10,20]}, [], {}, {}, {}, {}, {defDecreaseSingle: [10,20]});
    initialServant(2,"Lancer", "列奥尼达一世", 21, "人", 6583, 7959, 9539, 11486, 0,0,0, "Null", 0, 0, "", 0, {npGainBuff: [50, 100]}, {}, {}, [], {}, {}, {}, {}, {cardBuff: [15,25,1.5]});
    initialServant(2,"Lancer", "加雷斯", 256, "地", 5413, 9537, 7844, 13764, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {accAttackBuff: [10,20]}, {npGainBuff: [10,20]});
}

function initRider(){
    //----------------------------------Rider---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Rider", "德雷克", 65, "星", 11326, 12830, 12398, 14056, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [8.5,17], attackBuff: [8.5,17]}, {npGainBuff: [18,45]}, {}, [], {}, {}, {npStrength: [8.5,17], attackBuff: [8.5,17]});
    initialServant(5,"Rider", "女王梅芙", 99, "地", 10296, 13968, 11270, 15303, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {chargeNp: [10,10]}, {attackBuff: [10,20]}, {defDecreaseSingle: [20,30]}, [], {}, {}, {}, {attackBuff: [10,20], randomAttackBuff: [10,20]}, {defDecreaseSingle: [20,30]});
    initialServant(5,"Rider", "女王梅芙EN", 99, "地", 10296, 13968, 11270, 15303, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {}, {attackBuff: [10,20]}, {}, [], {}, {}, {}, {attackBuff: [10,20], randomAttackBuff: [10,20]});
    initialServant(5,"Rider", "伊斯坎达尔", 108, "人", 11560, 13219, 12654, 14482, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,20]}, {npStrength: [10,20]}, {cardBuff: [30,50]}, [], {damagePlus: 150}, {}, {attackBuff: [10,20]}, {npStrength: [10,20]});
    initialServant(5,"Rider", "伊斯坎达尔SC", 108, "人", 11560, 13219, 12654, 14482, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,20]}, {npStrength: [9,18]}, {cardBuff: [30,50]}, [], {damagePlus: 150}, {}, {attackBuff: [10,20]}, {npStrength: [9,18]});
    initialServant(5,"Rider", "奥斯曼狄斯", 118, "天", 11971, 12830, 13104, 14056, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9,18]}, {attackBuff: [20,40]}, {}, [], {damagePlus: 175}, {}, {attackBuff: [9,18]});
    initialServant(5,"Rider", "魁札尔科亚特尔", 144, "天", 12001, 12960, 13137, 14198, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10.5,21]}, {cardBuff: [20,30]}, {}, [], {damagePlus: 300}, {}, {attackBuff: [10.5,21]}, {cardBuff: [20,30,1.5]});
    initialServant(5,"Rider", "阿尔托莉雅〔Alter〕", 179, "人", 10776, 14256, 11796, 15618, 1,6,0.59, "QuickSingle1", 0, 0, "", 0.8, {attackBuff: [20,30], cardBuff: [10,20]}, {}, {cardBuff: [20,30], accCardBuff: [20,30]}, [4,9,14,19,23], {cardBuff: 8}, { chargeNp: 10 }, {cardBuff: [10,20,0.8]});
    initialServant(5,"Rider", "伊凡雷帝", 205, "人", 11619, 13284, 12719, 14553, 3,1,0, "BusterAll2", 30, 70, "OcNpStrength", 1.5, {npGainBuff: [30,50]}, {cardBuff: [20,40]});
    initialServant(5,"Rider", "伊凡雷帝SC", 205, "人", 11619, 13284, 12719, 14553, 3,1,0, "BusterAll1", 30, 70, "OcNpStrength", 1.5, {npGainBuff: [30,50]}, {cardBuff: [20,40]});
    initialServant(5,"Rider", "阿喀琉斯", 206, "地", 11883, 13219, 13008, 14482, 3,5,0.57, "BusterSingle1", 20, 60, "OcCardBuff", 0.8, {cardBuff: [20,30]}, {}, {npGainBuff: [20,30]}, [6,13,20,26], {cardBuff: 11, damagePlus: 150});
    initialServant(5,"Rider", "司马懿〔莱妮丝〕", 241, "人", 11427, 13543, 12509, 14837, 0,0,0, "Null", 0, 0, "", 0, {}, {attackBuff: [-20,20], randomAttackBuff: [20,40]}, {}, [], {}, {}, {}, {attackBuff: [20,40]});
    initialServant(5,"Rider", "达·芬奇", 253, "人", 10883, 14112, 11913, 15460, 3,3,0.49, "ArtsAll1", 20, 40, "OcCardBuff", 1, {chargeNp: [10,20]}, {}, {npStrength: [20,30]}, [16,33], {cardBuff: 6, damagePlus: 230}, { chargeNp: 20 }, {}, {}, {npStrength: [20,30]});
    initialServant(5,"Rider", "欧罗巴", 274, "天", 11737, 12571, 12848, 13772, 3,1,0, "BusterAll1", 20, 40, "OcCardBuff", 1.5, {}, {cardBuff: [20,30]}, {defDecreaseAll: [10,20]}, [], {damagePlus: 150}, {}, {}, {}, {defDecreaseAll: [10,20]});
    initialServant(5,"Rider", "奥德修斯", 277, "地", 11795, 13284, 12911, 14553, 3,3,0.58, "ArtsAll1", 30, 70, "OcNpStrength", 1, {cardBuff: [10,20]}, {}, {}, [16,33], {cardBuff: 10}, { nullifyDef: true }, {cardBuff: [10,20,0.8,1]});
    initialServant(5,"Rider", "尼莫", 296, "天", 11427, 13680, 12509, 14987, 1,3,0.59, "ArtsSingle1", 10, 30, "OcNpStrength", 1, {npStrength: [6,12], attackBuff: [6,12], randomAttackBuff: [10,20]}, {}, {cardBuff: [10,20], randomCardBuff: [10,20]}, [16,33], {damagePlus: 200}, {specialAttack: 150}, {npStrength: [6,12], attackBuff: [6,12], randomAttackBuff: [10,20]}, {}, {cardBuff: [10,20,1], randomCardBuff: [10,20,1]});
    /******************************************4星********************************************************************/
    initialServant(4,"Rider", "玛丽·安托瓦内特", 29, "人", 8293, 12348, 10041, 14972, 3,5,1, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [10,20]}, {}, {}, [6,13,20,26], {cardBuff: 11}, {}, {attackBuff: [10,20]});
    initialServant(4,"Rider", "玛丽·安托瓦内特SC", 29, "人", 8293, 12348, 10041, 14972, 3,5,1, "BusterSingle2", 0, 0, "", 0.8, {}, {}, {}, [6,13,20,26], {cardBuff: 11});
    initialServant(4,"Rider", "玛尔达", 30, "人", 8014, 13068, 9703, 15845, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {defDecreaseSingle: [10,30]}, [], {damagePlus: 150}, { cardBuff : 20 }, {}, {}, {defDecreaseSingle: [10,30]});
    initialServant(4,"Rider", "安妮 & 玛莉", 66, "人", 9029, 11286, 10932, 13684, 1,6,0.84, "QuickSingle2", 1200, 2000, "NpRemainHpDamage", 0.8, {}, {}, {attackBuff: [20,30]}, [5,11,17,11,23]);
    initialServant(4,"Rider", "阿尔托莉雅〔圣诞Alter〕", 73, "人", 9258, 11286, 11209, 13684, 3,1,0, "BusterAll3", 10, 30, "ChargeNp", 1.5, {}, {}, {cardBuff: [25,45]});
    initialServant(4,"Rider", "阿斯托尔福", 94, "地", 8937, 11172, 10821, 13546, 3,1,0.66, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [8,28]}, {}, {}, [], {cardBuff: 11}, { ignoreDef: true });
    initialServant(4,"Rider", "坂田金时", 115, "地", 9819, 10800, 11889, 13095, 1,4,1.15, "QuickSingle1", 10, 90, "OcCardBuff", 0.8, {cardBuff: [20,30]}, {}, {}, [35,21,14], {damagePlus: 150});
    initialServant(4,"Rider", "莫德雷德", 132, "地", 9212, 11400, 11154, 13822, 3,5,0.71, "ArtsAll1", 0, 0, "", 1, {cardBuff: [20,30]}, {}, {}, [6,13,20,26], {cardBuff: 5});
    initialServant(4,"Rider", "伊什塔尔", 182, "天", 9603, 10692, 11627, 12964, 3,4,0.68, "BusterSingle1", 20, 60, "OcCardBuff", 0.8, {cardBuff: [10,20], npGainBuff: [10,20]}, {}, {npGainBuff: [30,50]}, [10,20,30], {cardBuff: 12, damagePlus: 225}, {}, {cardBuff: [10,20,0.8,1.5], npGainBuff: [10,20]});
    initialServant(4,"Rider", "坂本龙马", 211, "人", 8555, 11880, 10358, 14404, 1,4,0.56, "ArtsSingle1", 0, 0, "", 1, {attackBuff: [8.5,17]}, {}, {cardBuff: [10,20]}, [10,20,30], {damagePlus: 170}, {}, {attackBuff: [8.5,17]}, {}, {cardBuff: [10,20,1]});
    initialServant(4,"Rider", "卡米拉", 263, "地", 9651, 10476, 11685, 12702, 3,4,0.52, "BusterSingle1", 0, 0, "", 0.8, {}, {chargeNp: [15,25]}, {defDecreaseAll: [20,30]}, [10,20,30], {}, {}, {}, {chargeNp: [15,25]}, {defDecreaseAll: [20,30]});
    initialServant(4,"Rider", "紫式部", 291, "人", 8730, 11880, 10570, 14404, 1,3,0.53, "ArtsSingle1", 0, 0, "", 1, {defDecreaseSingle: [20,30]}, {cardDecreaseSingle: [20,30]}, {chargeNp: [10,20]}, [16,33], {}, {}, {defDecreaseSingle: [20,30]}, {cardDecreaseSingle: [20,30,1]});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Rider", "美杜莎", 23, "地", 7200, 8937, 9744, 12117, 3,1,0.58, "BusterSingle2", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {npGainBuff: [20,30]}, [], {cardBuff: 11, damagePlus: 95});
    initialServant(3,"Rider", "布狄卡", 26, "人", 6289, 10130, 8511, 13735, 0,0,0, "Null", 0, 0, "", 0, {specialAttack: [40,60]}, {}, {}, [], {}, {}, {specialAttack: [40,60]}, {}, {cardBuff: [10,20,1]});
    initialServant(3,"Rider", "布狄卡SC", 26, "人", 6289, 10130, 8511, 13735, 0,0,0, "Null", 0, 0, "", 0, {specialAttack: [40,60]}, {}, {}, [], {}, {}, {}, {}, {cardBuff: [10,20,1]});
    initialServant(3,"Rider", "牛若丸", 27, "人", 7076, 9028, 9576, 12240, 1,1,0.87, "QuickSingle2", 0, 0, "", 0.8, {npGainBuff: [10,20], cardBuff: [10,20]}, {attackBuff: [8.5,17]}, {}, [], {cardBuff: 11}, {}, {npGainBuff: [10,20]}, {attackBuff: [8.5,17]});
    initialServant(3,"Rider", "亚历山大", 28, "人", 7356, 8640, 9955, 11714, 3,1,0.86, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [8,16]}, {}, {cardBuff: [10,20]}, [], {cardBuff: 11, damagePlus: 100}, {}, {attackBuff: [8,16]}, {}, {cardBuff: [10,20,0.8]});
    initialServant(3,"Rider", "哥伦布", 172, "人", 6552, 9600, 8867, 13016, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [7,14], attackBuff: [7,14]}, {}, {cardBuff: [10,20]}, [], {}, {}, {npStrength: [7,14], attackBuff: [7,14]});
    initialServant(3,"Rider", "赤兔马", 231, "地", 6434, 10483, 8708, 14214, 3,4,0.57, "BusterSingle1", 0, 0, "", 0.8, {cardBuff: [20,30]}, {}, {attackBuff: [10,20]}, [10,20,30], {cardBuff: 12}, { ignoreDef: true });
    initialServant(3,"Rider", "曼迪卡尔多", 273, "人", 6756, 9600, 9143, 13016, 1,4,0.86, "ArtsSingle1", 20, 40, "OcCardBuff", 1, {attackBuff: [10,20]}, {randomAttackBuff: [30,50]}, {cardBuff: [10,20]}, [10,20,30], {}, {}, {attackBuff: [10,20]});
    initialServant(2,"Rider", "乔尔乔斯", 24, "人", 5236, 9200, 7587, 13278, 1,4,0.85, "ArtsSingle1", 0, 0, "", 1, {}, {}, {}, [10,20,30]);
    initialServant(2,"Rider", "蒂奇", 25, "人", 6188, 7907, 8967, 11411, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [8,16], attackBuff: [8,16]}, {attackBuff: [9,27]}, {}, [], {}, {}, {npStrength: [8,16], attackBuff: [8,16]});
    initialServant(1,"Rider", "巴沙洛缪·罗伯茨", 257, "人", 5461, 6720, 8485, 10359, 3,6,0.65, "BusterSingle1", 150, 200, "NpSpecialAttack", 0.8, {npStrength: [8.5,17], attackBuff: [8.5,17]}, {}, {cardBuff: [10,20]}, [4,9,14,19,23], {cardBuff: 4}, {}, {npStrength: [8.5,17], attackBuff: [8.5,17]});
}

function initCaster(){
    //----------------------------------Caster---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Caster", "诸葛孔明〔埃尔梅罗II世〕", 37, "人", 10598, 14259, 11601, 15621, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {attackBuff: [20,30], damagePlus: [200,500]}, [], {}, {}, {}, {}, {attackBuff: [20,30], damagePlus: [200,500]});
    initialServant(5,"Caster", "玉藻前", 62, "天", 10546, 14259, 11544, 15621, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {}, [], {}, {}, {npStrength: [20,30]}, {}, {cardBuff: [30,50,1]});
    initialServant(5,"Caster", "玉藻前TC", 62, "天", 10546, 14259, 11544, 15621, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {}, [], {}, {}, {}, {}, {cardBuff: [30,50,1]});
    initialServant(5,"Caster", "玄奘三藏", 113, "人", 11658, 12965, 12761, 14204, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {npStrength: [10,20]}, {}, {npGainBuff: [10,30]}, [], {damagePlus: 125}, { ignoreDef: true }, {}, {}, {npGainBuff: [10,30]});
    initialServant(5,"Caster", "达·芬奇", 127, "星", 10598, 14259, 11601, 15621, 3,1,0.54, "ArtsAll2", 30, 70, "OcNpStrength", 1, {randomNpStrength: [20,30]}, {chargeNp: [10,10]}, {}, [], {cardBuff: 10}, { ignoreDef: true });
    initialServant(5,"Caster", "伊莉雅丝菲尔", 136, "人", 10857, 13825, 11885, 15146, 1,1,0, "BusterSingle2", 20, 100, "OcCardBuff", 1.5, {cardBuff: [30,50]});
    initialServant(5,"Caster", "梅林", 150, "地", 10546, 14259, 11544, 15621, 0,0,0, "Null", 0, 0, "", 0, {attackBuff: [10,20]}, {}, {}, [], {}, {}, {attackBuff: [10,20]}, {}, {cardBuff: [30,50,1.5]});
    initialServant(5,"Caster", "山鲁佐德", 169, "人", 9212, 15846, 10084, 17360, 3,5,0.51, "ArtsAll2", 200, 300, "NpSpecialAttack", 1, {cardBuff: [10,30]}, {}, {}, [6,13,20,26], {cardBuff: 11.5}, { npStrength: 20 });
    initialServant(5,"Caster", "尼禄", 175, "人", 10857, 13685, 11885, 14992, 3,1,0, "BusterAll1", 20, 60, "OcNpStrength", 1.5, {randomNpGainBuff: [30,50]}, {attackBuff: [20,30]}, {attackBuff: [30,50]}, [], {}, {}, {}, {}, {attackBuff: [30,50]});
    initialServant(5,"Caster", "阿纳斯塔西娅", 201, "人", 10546, 14259, 11544, 15621, 3,4,0.51, "ArtsAll1", 0, 0, "", 1, {cardBuff: [30,50]}, {attackBuff: [10,20]}, {}, [10,20,30], {cardBuff: 12}, {}, {}, {attackBuff: [10,20]});
    initialServant(5,"Caster", "斯卡哈·斯卡蒂", 215, "天", 10753, 14406, 11771, 15782, 0,0,0, "Null", 0, 0, "", 0, {}, {defDecreaseAll: [20,30]}, {}, [], {}, {}, {cardBuff: [30,50,0.8]}, {defDecreaseAll: [20,30]});
    initialServant(5,"Caster", "紫式部", 237, "人", 11374, 12833, 12451, 14059, 3,6,0.45, "ArtsAll1", 150, 200, "NpSpecialAttack", 1, {defDecreaseAll: [20,30], specialAttack: [20,30]}, {npStrength: [10,20]}, {}, [4,9,14,19,23], {cardBuff: 7}, {}, {defDecreaseAll: [20,30], specialAttack: [20,30]});
    initialServant(5,"Caster", "阿尔托莉雅·Caster", 284, "星", 10546, 14406, 11544, 15782, 0,0,0, "Null", 0, 0, "", 0, {attackBuff: [10,20]}, {npGainBuff: [20,30]}, {specialAttackBuff: [30,50]}, [], {}, {}, {attackBuff: [10,20]}, {npGainBuff: [20,30]}, {specialAttackBuff: [30,50], cardBuff: [30,50,1]});
    /******************************************4星********************************************************************/
    initialServant(4,"Caster", "巴托里〔万圣节〕", 61, "人", 8616, 11404, 10432, 13827, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {cardBuff: [25,45]}, {}, [], {}, { ignoreDef: true });
    initialServant(4,"Caster", "童谣", 74, "人", 8629, 11882, 10448, 14407, 3,3,0.54, "ArtsAll2", 0, 0, "", 1, {}, {}, {}, [16,33], {cardBuff: 10});
    initialServant(4,"Caster", "海伦娜", 100, "人", 8629, 11882, 10448, 14407, 3,3,0.45, "ArtsAll2", 0, 0, "", 1, {}, {randomNpStrength: [50,50]}, {cardBuff: [15,20]}, [16,33], {cardBuff: 10}, { ignoreDef: true }, {}, {}, {cardBuff: [15,20,0.8,1,1.5]});
    initialServant(4,"Caster", "爱迪生", 103, "人", 7952, 11882, 9628, 14407, 3,1,0.51, "ArtsAll2", 0, 0, "", 1, {}, {chargeNp: [5,10]}, {}, [], {cardBuff: 4});
    initialServant(4,"Caster", "爱丽丝菲尔", 111, "人", 8237, 12476, 9973, 15127, 0,0,0, "Null", 0, 0, "", 0, {}, {npGainBuff: [20,30]}, {}, [], {damagePlus: 200});
    initialServant(4,"Caster", "尼托克丽丝", 120, "地", 9060, 11288, 10970, 13686, 3,3,0.54, "ArtsAll2", 0, 0, "", 1, {}, {}, {}, [16,33], {cardBuff: 10, damagePlus: 175});
    initialServant(4,"Caster", "玛丽·安托瓦内特", 130, "人", 9060, 11404, 10970, 13827, 3,3,0.32, "ArtsAll1", 0, 0, "", 1, {attackBuff: [9.5,19.5]}, {}, {}, [16,33], {cardBuff: 10}, {}, {attackBuff: [9.5,19.5]});
    initialServant(4,"Caster", "吉尔伽美什", 145, "人", 8460, 12005, 10243, 14556, 3,10,0.16, "ArtsAll2", 0, 0, "", 1, {}, {attackBuff: [10.5,21]}, {cardBuff: [20,30]}, [1,3,5,7,9,10,12,14,16], {cardBuff: 10, damagePlus: 175}, {}, {}, {attackBuff: [10.5,21]}, {cardBuff: [20,30,1]});
    initialServant(4,"Caster", "吉尔伽美什SC", 145, "人", 8460, 12005, 10243, 14556, 3,10,0.16, "ArtsAll1", 0, 0, "", 1, {}, {attackBuff: [10.5,21]}, {cardBuff: [20,30]}, [1,3,5,7,9,10,12,14,16], {cardBuff: 10, damagePlus: 175}, {}, {}, {attackBuff: [10.5,21]}, {cardBuff: [20,30,1]});
    initialServant(4,"Caster", "喀耳刻", 192, "天", 8671, 12250, 10499, 14853, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {defDecreaseAll: [10,20]}, {}, [], {}, {}, {}, {defDecreaseAll: [10,20]});
    initialServant(4,"Caster", "示巴女王", 194, "人", 8629, 12127, 10448, 14704, 1,5,0.81, "ArtsSingle1", 0, 0, "", 1, {attackBuff: [8.9,17.8]}, {}, {cardBuff: [10,20]}, [6,13,20,26], {cardBuff: 6}, {}, {attackBuff: [8.9,17.8]}, {}, {cardBuff: [10,20,1,1.5]});
    initialServant(4,"Caster", "齐格", 208, "人", 8394, 11288, 10163, 13686, 3,3,0.78, "ArtsAll1", 20, 40, "DefDecrease", 1, {npGainBuff: [20,30]}, {cardBuff: [22,36]}, {specialAttack: [50,100]}, [16,33], {cardBuff: 6.5});
    initialServant(4,"Caster", "酒吞童子", 225, "地", 9538, 11025, 11549, 13368, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,30]}, {attackBuff: [10,20], specialAttack: [30,50]}, [], {damagePlus: 150}, {}, {}, {}, {attackBuff: [10,20]});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Caster", "美狄亚", 31, "地", 7418, 8643, 10039, 11719, 1,1,1.64, "ArtsAll2", 20, 100, "ChargeNp", 1, {}, {}, {npGainBuff: [30,50]}, [], {cardBuff: 10}, {}, {}, {}, {npGainBuff: [30,50]});
    initialServant(3,"Caster", "吉尔·德·雷", 32, "人", 6514, 9506, 8816, 12889, 3,1,0, "BusterAll1", 0, 0, "", 1.5);
    initialServant(3,"Caster", "梅菲斯托费勒斯", 35, "地", 6839, 9216, 9255, 12495, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {}, [], {}, { ignoreDef: true });
    initialServant(3,"Caster", "库·丘林", 38, "天", 6580, 9604, 8905, 13022, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {}, [], {damagePlus: 175}, { cardBuff: 20 });
    initialServant(3,"Caster", "帕拉塞尔苏斯", 79, "人", 6711, 9506, 9082, 12889, 3,3,0.55, "BusterAll2", 0, 0, "", 1, {}, {cardBuff: [10,20]}, {npGainBuff: [30,50]}, [16,33], {cardBuff: 10}, {}, {}, {cardBuff: [10,20,1]}, {npGainBuff: [30,50]});
    initialServant(3,"Caster", "巴贝奇", 80, "人", 5996, 10887, 8115, 14761, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npGainBuff: [20,30]}, {attackBuff: [20,40]}, {npStrength: [15,25]});
    initialServant(3,"Caster", "杰罗尼莫", 104, "人", 6857, 9123, 9280, 12369, 3,1,0.9, "ArtsAll2", 0, 0, "", 1, {}, {cardBuff: [30,50]}, {}, [], {cardBuff: 8});
    initialServant(3,"Caster", "阿维斯布隆", 203, "人", 6376, 9981, 8629, 13533, 3,1,0, "BusterAll2", 20, 40, "OcNpStrength", 1.5, {cardBuff: [20,30]});
    initialServant(3,"Caster", "阿维斯布隆SC", 203, "人", 6376, 9981, 8629, 13533, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [20,30]});
    initialServant(3,"Caster", "阿斯克勒庇俄斯", 249, "地", 6376, 10084, 8629, 13672, 0,0,0, "Null", 0, 0, "", 0, {}, {npGainBuff: [20,30]}, {}, [], {}, {}, {}, {npGainBuff: [20,30]});
    initialServant(2,"Caster", "安徒生", 33, "人", 5758, 8484, 8344, 12244, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {chargeNp: [5,10]}, [], {}, {}, {}, {}, {chargeNp: [5,10]});
    initialServant(2,"Caster", "莎士比亚", 34, "人", 5798, 8080, 8402, 11661, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {cardBuff: [20,40]}, {}, {}, [], {}, {}, {cardBuff: [20,40,1.5]});
    initialServant(2,"Caster", "陈宫", 258, "人", 6119, 7755, 8867, 11192, 3,4,0.4, "ArtsSingle1", 0, 900, "OcNpDamage", 1, {}, {}, {}, [10,20,30], {cardBuff: 6}, {}, {}, {}, {cardBuff: [30,50,1.5]});
    initialServant(1,"Caster", "莫扎特", 36, "人", 5195, 7129, 8072, 10990, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {}, [], {}, {}, {cardBuff: [22,44,1]});
}


function initAssassin(){
    //----------------------------------Assassin---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Assassin", "开膛手杰克", 75, "地", 11557, 12696, 12651, 13909, 1,4,1.07, "QuickSingle3", 50, 100, "SpecialAttackBuff", 0.8, {cardBuff: [30,50]}, {}, {}, [10,20,30], {}, { ignoreDef: true });
    initialServant(5,"Assassin", "谜之女主角X", 86, "星", 11761, 12696, 12874, 13909, 1,12,0.81, "QuickSingle2", 150, 200, "NpSpecialAttack", 0.8, {defDecreaseAll: [10,20]}, {}, {specialAttack: [30,50], attackBuff: [10,20]}, [5,7,5,7,5,7,5,7,5,7,5], {cardBuff: 12}, {}, {defDecreaseAll: [10,20]});
    initialServant(5,"Assassin", "谜之女主角X SC", 86, "星", 11761, 12696, 12874, 13909, 1,12,0.81, "QuickSingle2", 150, 200, "NpSpecialAttack", 0.8, {}, {}, {specialAttack: [30,50]}, [5,7,5,7,5,7,5,7,5,7,5], {cardBuff: 12});
    initialServant(5,"Assassin", "酒吞童子", 112, "地", 11993, 12825, 13128, 14050, 3,1,0.55, "ArtsAll2", 0, 0, "", 1, {defDecreaseAll: [10,20]}, {attackBuff: [10,20], npStrength: [20,30]}, {}, [], {damagePlus: 150}, {}, {defDecreaseAll: [10,20]}, {attackBuff: [10,20]});
    initialServant(5,"Assassin", "克娄巴特拉", 139, "人", 11088, 13402, 12138, 14682, 3,1,0, "BusterAll2", 30, 70, "OcCardBuff", 1.5, {randomAttackBuff: [20,40]}, {npGainBuff: [20,40], chargeNp: [10,10]}, {}, [], {damagePlus: 125});
    initialServant(5,"Assassin", "克娄巴特拉EN", 139, "人", 11088, 13402, 12138, 14682, 3,1,0, "BusterAll1", 30, 70, "OcCardBuff", 1.5, {randomAttackBuff: [20,40]}, {npGainBuff: [20,40], chargeNp: [10,10]}, {}, [], {damagePlus: 125});
    initialServant(5,"Assassin", "“山中老人”", 154, "人", 11848, 13338, 12969, 14612, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {cardBuff: [20,30], randomCardBuff: [30,20]}, {attackBuff: [10,20]}, {cardBuff: [30,50]});
    initialServant(5,"Assassin", "“山中老人”SC", 154, "人", 11848, 13338, 12969, 14612, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {attackBuff: [10,20]}, {cardBuff: [30,50]});
    initialServant(5,"Assassin", "刑部姬", 189, "地", 10824, 13822, 11849, 15143, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {defDecreaseSingle: [20,40]}, [], {}, {}, {}, {}, {defDecreaseSingle: [20,40]});
    initialServant(5,"Assassin", "塞弥拉弥斯", 199, "地", 11309, 13266, 12379, 14533, 3,1,0, "BusterAll2", 10, 50, "OcNpStrength", 1.5, {}, {npGainBuff: [20,40]}, {cardDecreaseAll: [30,50]}, [], {damagePlus: 150}, { resistClass: ["Caster",1] }, {}, {}, {cardDecreaseAll: [30,50,1.5]});
    initialServant(5,"Assassin", "塞弥拉弥斯TC", 199, "地", 11309, 13266, 12379, 14533, 3,1,0, "BusterAll1", 10, 50, "OcNpStrength", 1.5, {}, {npGainBuff: [20,40]}, {cardDecreaseAll: [30,50]}, [], {damagePlus: 150}, { resistClass: ["Caster",1] });
    initialServant(5,"Assassin", "李书文", 235, "人", 11470, 12568, 12556, 13769, 1,1,0.99, "ArtsSingle1", 20, 40, "DefDecrease", 1, {}, {}, {attackBuff: [30,50]}, [], {cardBuff: 8});
    initialServant(5,"Assassin", "伽摩", 239, "天", 11528, 12889, 12619, 14120, 1,10,0.74, "QuickSingle1", 20, 40, "OcCardBuff", 0.8, {}, {attackBuff: [20,30]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 10, damagePlus: 225}, { resistClass: ["Alterego",2] });
    /******************************************4星********************************************************************/
    initialServant(4,"Assassin", "斯忒诺", 41, "天", 8985, 11518, 10879, 13965, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {attackBuff: [20,40]}, [], {}, {}, {}, {}, {attackBuff: [10,20], randomAttackBuff: [10,20]});
    initialServant(4,"Assassin", "卡米拉", 46, "地", 9408, 10473, 11391, 12698, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {}, {defDecreaseSingle: [10,20]}, {}, [], {}, {}, {}, {defDecreaseSingle: [10,20]});
    initialServant(4,"Assassin", "两仪式", 92, "人", 8867, 11055, 10736, 13404, 1,3,0.8, "ArtsSingle2", 0, 0, "", 1, {cardBuff: [30,50]}, {}, {}, [16,33], {}, { ignoreDef: true });
    initialServant(4,"Assassin", "两仪式SC", 92, "人", 8867, 11055, 10736, 13404, 1,3,0.8, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [30,50]}, {}, {}, [16,33], {}, { ignoreDef: true });
    initialServant(4,"Assassin", "卫宫〔Assassin〕", 109, "人", 8958, 11168, 10846, 13541, 1,15,0.28, "ArtsSingle2", 0, 0, "", 1, {cardBuff: [24,40]}, {}, {}, [6,4,8,6,8,4,6,4,2,6,2,8,2,6], {}, { ignoreDef: true });
    initialServant(4,"Assassin", "斯卡哈", 133, "星", 9049, 11168, 10956, 13541, 3,5,0.71, "BusterSingle1", 0, 0, "", 0.8, {}, {}, {cardBuff: [30,50]}, [6,13,20,26]);
    initialServant(4,"Assassin", "燕青", 159, "人", 8661, 11637, 10487, 14110, 1,11,0.71, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [20,30]}, {cardBuff: [20,30]}, {}, [1,3,4,6,7,9,10,12,13,15], {cardBuff: 5});
    initialServant(4,"Assassin", "燕青EN", 159, "人", 8661, 11637, 10487, 14110, 1,11,0.71, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [20,30]}, {}, {}, [1,3,4,6,7,9,10,12,13,15], {cardBuff: 5});
    initialServant(4,"Assassin", "武则天", 170, "人", 8981, 10942, 10874, 13267, 1,4,0.87, "QuickSingle2", 0, 0, "", 0.8, {defDecreaseSingle: [20,30]}, {randomAttackBuff: [18,38]}, {attackBuff: [10,20]}, [10,20,30], {}, {}, {defDecreaseSingle: [10,20]}, {}, {attackBuff: [10,20], cardBuff: [10,20,0.8]});
    initialServant(4,"Assassin", "武则天TC", 170, "人", 8981, 10942, 10874, 13267, 1,4,0.87, "QuickSingle1", 0, 0, "", 0.8, {defDecreaseSingle: [10,20]}, {randomAttackBuff: [18,38]}, {attackBuff: [10,20]}, [10,20,30]);
    initialServant(4,"Assassin", "尼托克丽丝", 177, "天", 8812, 11518, 10670, 13965, 3,3,0.78, "ArtsAll1", 0, 0, "", 1, {}, {}, {attackBuff: [20,30], npStrength: [10,20], npGainBuff: [20,30]}, [16,33], {damagePlus: 185});
    initialServant(4,"Assassin", "望月千代女", 185, "地", 8510, 11637, 10304, 14110, 1,5,0.8, "ArtsSingle1", 0, 0, "", 1, {}, {cardBuff: [10,30]}, {}, [6,13,20,26]);
    initialServant(4,"Assassin", "加藤段藏", 188, "地", 8935, 11055, 10818, 13404, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {cardBuff: [20,30]});
    initialServant(4,"Assassin", "牛若丸", 218, "人", 9456, 10580, 11449, 12828, 3,5,0.54, "BusterSingle1", 0, 0, "", 0.8, {}, {cardBuff: [20,30]}, {}, [6,13,20,26], {cardBuff: 11});
    initialServant(4,"Assassin", "虞美人", 230, "地", 7970, 13389, 9650, 16234, 3,1,0, "BusterAll1", 50, 100, "OcCardBuff", 1.5, {chargeNp: [5,10]}, {attackBuff: [20,30]}, {}, [], {}, { ignoreDef: true });
    initialServant(4,"Assassin", "虞美人SC", 230, "地", 7970, 13389, 9650, 16234, 3,1,0, "BusterAll1", 50, 100, "OcCardBuff", 1.5, {chargeNp: [5,10]}, {}, {}, [], {}, { ignoreDef: true });
    initialServant(4,"Assassin", "格蕾", 243, "人", 9456, 10580, 11449, 12828, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [20,30], specialAttack: [50,100]}, {cardBuff: [20,40]}, {}, [], {npGainBuff: 10});
    initialServant(4,"Assassin", "冲田·J·总司", 267, "人", 9337, 10366, 11305, 12569, 3,3,0.92, "BusterSingle1", 0, 0, "", 0.8, {}, {npStrength: [10,20]}, {cardBuff: [30,50]}, [16,33]);
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Assassin", "荆轲", 42, "人", 7207, 8293, 9754, 11244, 1,1,1.05, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {cardBuff: [20,30]});
    initialServant(3,"Assassin", "杰基尔", 81, "地", 6320, 9675, 8553, 13118, 0,0,0, "Null", 0, 0, "", 0, {attackBuff: [5,15], randomAttackBuff: [25,35]}, {}, {});
    initialServant(3,"Assassin", "百貌哈桑", 110, "人", 6686, 9310, 9049, 12623, 1,13,0.38, "ArtsSingle2", 0, 0, "", 1, {npGainBuff: [10,20]}, {randomCardBuff: [30,30]}, {}, [16,5,11,8,11,5,8,5,2,8,2,11]);
    initialServant(3,"Assassin", "风魔小太郎", 117, "人", 7091, 8844, 9597, 11991, 3,5,0.54, "BusterSingle2", 0, 0, "", 0.8, {}, {}, {defDecreaseAll: [10,20]}, [6,13,20,26], {}, {}, {}, {}, {defDecreaseAll: [10,20]});
    initialServant(3,"Assassin", "风魔小太郎SC", 117, "人", 7091, 8844, 9597, 11991, 3,5,0.54, "BusterSingle2", 0, 0, "", 0.8, {}, {}, {}, [6,13,20,26]);
    initialServant(3,"Assassin", "静谧哈桑", 124, "人", 6636, 9310, 8981, 12623, 1,1,0.53, "ArtsSingle2", 0, 0, "", 1);
    initialServant(3,"Assassin", "冈田以藏", 210, "人", 6879, 8844, 9310, 11991, 1,4,0.79, "ArtsSingle1", 0, 0, "", 1, {specialAttack: [50,100]}, {}, {}, [10,20,30]);
    initialServant(2,"Assassin", "咒腕哈桑", 40, "人", 6280, 7594, 9100, 10960, 1,1,1.07, "QuickSingle1", 0, 0, "", 0.8);
    initialServant(2,"Assassin", "夏尔·亨利·桑松", 43, "人", 5456, 8309, 7906, 11991, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {specialAttack: [40,60]});
    initialServant(2,"Assassin", "剧院魅影", 44, "地", 5654, 8393, 8193, 12112, 3,1,0.71, "ArtsAll2", 0, 0, "", 1, {}, {}, {}, [], {}, { ignoreDef: true });
    initialServant(1,"Assassin", "佐佐木小次郎", 39, "人", 5735, 6220, 8912, 9588, 1,3,1.05, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [16,33], {}, { cardBuff: 20 });
    initialServant(1,"Assassin", "玛塔·哈丽", 45, "人", 5377, 6565, 8355, 10120, 0,0,0, "Null", 0, 0, "", 0, {}, {defDecreaseAll: [10,20]}, {defDecreaseSingle: [10,20]}, [], {}, {}, {}, {defDecreaseAll: [10,20]}, {defDecreaseSingle: [10,20]});
    initialServant(1,"Assassin", "夏绿蒂·科黛", 259, "人", 5488, 6220, 8528, 9588, 1,1,0.52, "ArtsSingle1", 0, 0, "", 1, {}, {attackBuff: [20,30]}, {randomEffect: {noEffect: [], cardBuff: [20,30], npStrength: [30,50]}}, [], {}, { ignoreDef: true });
}


function initBerserker(){
    //----------------------------------Berserker---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Berserker", "坂田金时", 51, "人", 12712, 12150, 13915, 13311, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [30,50]}, {}, {}, [], {cardBuff: 2, damagePlus: 125}, { ignoreDef: true });
    initialServant(5,"Berserker", "弗拉德三世", 52, "地", 11499, 13770, 12587, 15086, 1,10,0.5, "ArtsSingle1", 0, 0, "", 1, {}, {attackBuff: [20,30]}, {npGainBuff: [20,30]}, [1,3,5,7,9,10,12,14,16]);
    initialServant(5,"Berserker", "弗拉德三世SC", 52, "地", 11499, 13770, 12587, 15086, 1,10,0.5, "ArtsSingle1", 0, 0, "", 1, {}, {attackBuff: [20,30]}, {}, [1,3,5,7,9,10,12,14,16]);
    initialServant(5,"Berserker", "南丁格尔", 97, "人", 10184, 15221, 11148, 16675, 0,0,0, "Null", 0, 0, "", 0, {}, {specialAttack: [30,50]}, {}, [], {}, {}, {}, {}, {cardBuff: [30,50,1.5]});
    initialServant(5,"Berserker", "库·丘林〔Alter〕", 98, "地", 12805, 12210, 14017, 13377, 1,1,0, "BusterSingle1", 30, 70, "OcAttackBuff", 1.5, {}, {}, {}, [], {cardBuff: 6, damagePlus: 150});
    initialServant(5,"Berserker", "源赖光", 114, "天", 11556, 13500, 12650, 14790, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {cardBuff: [20,30]}, {specialAttack: [30,50]}, [], {cardBuff: 12, damagePlus: 150});
    initialServant(5,"Berserker", "源赖光SC", 114, "天", 11556, 13500, 12650, 14790, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {cardBuff: [20,30]}, {specialAttack: [30,50]}, [], {cardBuff: 12, damagePlus: 150});
    initialServant(5,"Berserker", "谜之女主角X〔Alter〕", 155, "星", 11113, 14175, 12165, 15529, 1,9,1.07, "QuickSingle1", 150, 200, "NpSpecialAttack", 0.8, {}, {cardBuff: [20,30]}, {attackBuff: [10,20]}, [2,4,6,8,11,13,15,17], {}, {}, {}, {}, {attackBuff: [10,20]});
    initialServant(5,"Berserker", "土方岁三", 161, "人", 12089, 12028, 13233, 13177, 1,1,0, "BusterSingle2", 800, 1200, "NpRemainHpDamage", 1.5, {cardBuff: [10,20]}, {}, {}, [], {cardBuff: 5}, {}, {cardBuff: [10,20,1.5]});
    initialServant(5,"Berserker", "土方岁三TC", 161, "人", 12089, 12028, 13233, 13177, 1,1,0, "BusterSingle1", 600, 1000, "NpRemainHpDamage", 1.5, {cardBuff: [10,20]}, {}, {}, [], {cardBuff: 5});
    initialServant(5,"Berserker", "项羽", 226, "人", 11613, 13770, 12712, 15086, 3,5,0.51, "BusterSingle1", 20, 60, "OcNpStrength", 0.8, {}, {cardBuff: [20,30]}, {}, [6,13,20,26]);
    initialServant(5,"Berserker", "阿周那〔Alter〕", 247, "天", 11669, 13837, 12773, 15159, 3,1,0, "BusterAll1", 20, 60, "CardDecrease", 1.5, {attackBuff: [20,30], specialAttack: [30,50]}, {}, {}, [], {cardBuff: 12, damagePlus: 250});
    initialServant(5,"Berserker", "宮本武藏", 261, "人", 12712, 12150, 13915, 13311, 3,4,0.51, "ArtsAll1", 0, 0, "", 1, {npGainBuff: [30,50]}, {}, {attackBuff: [20,30], defDecreaseAll: [10,30]}, [10,20,30], {damagePlus: 125}, {}, {}, {}, {defDecreaseAll: [10,30]});
    /******************************************4星********************************************************************/
    initialServant(4,"Berserker", "赫拉克勒斯", 47, "天", 10655, 10327, 12901, 12521, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10.5,31]}, {}, {randomCardBuff: [20,20]}, [], {cardBuff: 8, damagePlus: 200});
    initialServant(4,"Berserker", "赫拉克勒斯SC", 47, "天", 10655, 10327, 12901, 12521, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10.5,31]}, {}, {}, [], {cardBuff: 8, damagePlus: 200});
    initialServant(4,"Berserker", "兰斯洛特", 48, "地", 10477, 10327, 12685, 12521, 3,10,0.5, "BusterSingle1", 10, 30, "OcAttackBuff", 0.8, {}, {}, {npGainBuff: [50,100]}, [3,5,3,7,8,10,12,14,16]);
    initialServant(4,"Berserker", "玉藻猫", 58, "地", 9026, 11458, 10929, 13893, 3,5,0.71, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [10,30]}, {}, {}, [6,13,20,26]);
    initialServant(4,"Berserker", "弗兰肯斯坦", 82, "地", 9441, 10687, 11431, 12958, 3,6,0.83, "QuickAll3", 0, 0, "", 0.8, {npGainBuff: [25,45]}, {defDecreaseSingle: [20,30]}, {npStrength: [20,30]}, [4,9,14,19,23], {}, {}, {}, {defDecreaseSingle: [20,30]});
    initialServant(4,"Berserker", "贝奥武夫", 89, "地", 10247, 10327, 12407, 12521, 1,1,0, "BusterSingle3", 0, 0, "", 1.5, {attackBuff: [20,30], npStrength: [10,20]}, {}, {}, [], {cardBuff: 1});
    initialServant(4,"Berserker", "茨木童子", 116, "地", 9636, 10954, 11667, 13282, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10,20], npStrength: [20,30]}, {}, {}, [], {cardBuff: 8}, {}, {attackBuff: [10,20]});
    initialServant(4,"Berserker", "茶茶", 162, "人", 8945, 11025, 10831, 13368, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {chargeNp: [5,10]}, {}, {defDecreaseSingle: [10,10], accDefDecrease: [5,10]}, [], {cardBuff: 3}, {}, {}, {}, {defDecreaseSingle: [10,10]});
    initialServant(4,"Berserker", "彭忒西勒亚", 171, "地", 10502, 10175, 12716, 12337, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9,18]}, {chargeNp: [10,20]}, {cardBuff: [10,20], specialAttack: [50,100]}, [], {cardBuff: 12, damagePlus: 175}, {}, {attackBuff: [9,18]}, {}, {cardBuff: [10,20,1.5]});
    initialServant(4,"Berserker", "织田信长", 178, "人", 10146, 10023, 12285, 12153,1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {cardBuff: [10,20]}, {chargeNp: [3,3]}, {randomAttackBuff: [10,20]}, [], {cardBuff: 6});
    initialServant(4,"Berserker", "织田信长SC", 178, "人", 10146, 10023, 12285, 12153,1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {cardBuff: [10,20]}, {chargeNp: [3,3]}, {randomAttackBuff: [10,20]}, [], {cardBuff: 6});
    initialServant(4,"Berserker", "阿塔兰忒〔Alter〕", 202, "地", 9806, 10634, 11873, 12894, 1,5,1.05, "QuickSingle1", 0, 0, "", 0.8, {}, {cardBuff: [30,50]}, {}, [6,13,20,26], {}, {}, {}, {cardBuff: [30,50,0.8]});
    initialServant(4,"Berserker", "贞德〔Alter〕", 219, "人", 10298, 9922, 12469, 12030, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {npGainBuff: [20,30]}, {attackBuff: [10,20]}, {cardBuff: [10,20]}, [], {cardBuff: 12});
    initialServant(4,"Berserker", "鬼女红叶", 282, "地", 9177, 11250, 11111, 13640, 1,1,0, "BusterSingle1", 20, 40, "OcAttackBuff", 1.5, {}, {cardBuff: [20,30]}, {}, [], {cardBuff: 10});
    initialServant(4,"Berserker", "布伦希尔德", 287, "天", 10197, 10023, 12346, 12153, 3,1,0, "BusterAll1", 20, 60, "OcCardBuff", 1.5, {}, {chargeNp: [10,20]}, {cardBuff: [20,30]}, [], {cardBuff: 3.5, damagePlus: 100}, {}, {}, {}, {cardBuff: [20,30,1,1.5]});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Berserker", "吕布奉先", 49, "人", 8119, 8302, 10988, 11256, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9,27]}, {}, {npStrength: [20,30]}, [], {cardBuff: 10}, { ignoreDef: true });
    initialServant(3,"Berserker", "大流士三世", 55, "人", 7608, 8763, 10297, 11881, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npGainBuff: [18,45]}, {}, {cardDecreaseAll: [20,20]}, [], {cardBuff: 8}, {}, {}, {}, {cardDecreaseAll: [20,20,1.5]});
    initialServant(3,"Berserker", "大流士三世SC", 55, "人", 7608, 8763, 10297, 11881, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npGainBuff: [18,45]}, {}, {}, [], {cardBuff: 8});
    initialServant(3,"Berserker", "清姬", 56, "地", 6644, 9166, 8992, 12428, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {defDecreaseSingle: [12,24]}, {cardBuff: [20,30]}, [], {cardBuff: 12}, {}, {}, {defDecreaseSingle: [12,24]});
    initialServant(3,"Berserker", "森长可", 251, "人", 7732, 8019, 10464, 10872, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {accAttackBuff: [10,15]}, {}, [], {cardBuff: 4}, { ignoreDef: true });
    initialServant(2,"Berserker", "卡利古拉", 54, "人", 6831, 7303, 9899, 10540, 0,0,0, "Null", 0, 0, "", 0, {attackBuff: [10,30]}, {randomAttackBuff: [20,40]});
    initialServant(2,"Berserker", "血斧埃里克", 57, "人", 6290, 7688, 9115, 11095, 3,1,0, "BusterAll1", 30, 50, "OcAttackBuff", 1.5, {defDecreaseSingle: [10,30]}, {}, {}, [], {cardBuff: 8}, {}, {defDecreaseSingle: [10,30]});
    initialServant(2,"Berserker", "莎乐美", 260, "地", 6884, 6885, 9975, 9936, 1,3,0.51, "ArtsSingle1", 0, 0, "", 1, {specialAttack: [30,50], attackBuff: [10,20]}, {}, {}, [16,33]);
    initialServant(1,"Berserker", "斯巴达克斯", 50, "人", 5073, 7722, 7883, 11904, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {cardBuff: [20,40]}, [], {cardBuff: 12}, { ignoreDef: true });
    initialServant(1,"Berserker", "阿斯忒里俄斯", 53, "地", 6037, 6604, 9381, 10181, 0,0,0, "Null", 0, 0, "", 0, {attackBuff: [10,30]});
    initialServant(1,"Berserker", "保罗·班扬", 174, "地", 6044, 6196, 9391, 9551, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [10,20]}, {}, {defDecreaseAll: [10,20]}, [], {cardBuff: 4}, {}, {cardBuff: [10,20,1.5]}, {}, {defDecreaseAll: [10,20]});
}

function initExtra(){
//----------------------------------Shielder---------------------------------------------------------------------//
    /******************************************4星********************************************************************/
    initialServant(5,"Shielder", "玛修", 1, "地", 7815, 11516, 10575, 15619, 0,0,0, "Null", 0, 0, "", 0, {}, {}, {npGainBuff: [200,400]});

    //----------------------------------Ruler---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Ruler", "天草四郎", 93, "人", 10972, 14107, 12011, 15455, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npGainBuff: [20,30]}, {chargeNp: [10,20]}, {cardBuff: [20,30]}, [], {}, { nullifyDef: true }, {npGainBuff: [20,30]});
    initialServant(5,"Ruler", "天草四郎SC", 93, "人", 10972, 14107, 12011, 15455, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {chargeNp: [10,20]}, {cardBuff: [20,30]}, [], {}, { nullifyDef: true });
    initialServant(5,"Ruler", "福尔摩斯", 173, "星", 11495, 13365, 12583, 14642, 0,0,0, "NULL", 0, 0, "", 0, {}, {}, {}, [], {}, {}, {cardDecreaseAll: [10,20,1]});
    initialServant(5,"Ruler", "始皇帝", 229, "人", 9977, 15828, 10921, 17340, 0,0,0, "Null", 0, 0, "", 0, {defDecreaseAll: [10,20]}, {attackBuff: [20,30]}, {}, [], {}, {}, {defDecreaseAll: [10,20]});
    initialServant(5,"Ruler", "阿尔托莉雅", 265, "天", 9593, 16912, 10501, 18528, 3,1,0, "BusterAll1", 20, 40, "OcCardBuff", 1.5, {attackBuff: [20,30]}, {npGainBuff: [20,30]}, {attackBuff: [20,40]}, [], {}, { ignoreDef: true, chargeNp: 20 }, {}, {npGainBuff: [20,30]});
    initialServant(5,"Ruler", "阿尔托莉雅SC", 265, "天", 9593, 16912, 10501, 18528, 3,1,0, "BusterAll1", 20, 40, "OcCardBuff", 1.5, {attackBuff: [20,30]}, {}, {attackBuff: [20,40]}, [], {}, { ignoreDef: true, chargeNp: 20 });
    initialServant(5,"Ruler", "卑弥呼", 292, "地", 10659, 15000, 11668, 16433, 0,0,0, "NULL", 0, 0, "", 0, {}, {}, {}, [], {}, {}, {attackBuff: [10,20]}); 
    /******************************************4星********************************************************************/
    initialServant(4,"Ruler", "玛尔达", 135, "人", 9546, 11250, 11558, 13640, 1,1,0, "BusterSingle2", 20, 60, "DefDecrease", 1.5, {randomAttackBuff: [10,20]}, {}, {specialAttack: [50,100]});
    initialServant(4,"Ruler", "玛尔达SC", 135, "人", 9546, 11250, 11558, 13640, 1,1,0, "BusterSingle1", 10, 50, "DefDecrease", 1.5, {randomAttackBuff: [10,20]}, {}, {specialAttack: [50,100]});
    initialServant(4,"Ruler", "魁札尔科亚特尔〔圣诞〕", 233, "天", 9687, 11306, 11729, 13708, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [10,20]}, {}, {cardBuff: [20,30]}, [], {damagePlus: 250}, {}, {attackBuff: [10,20]});
    initialServant(4,"Ruler", "阿斯特赖亚", 242, "天", 9734, 11531, 11786, 13981, 1,8,0.43, "ArtsSingle1", 150, 200, "NpSpecialAttack", 1, {attackBuff: [10,20], npGainBuff: [10,20]}, {cardBuff: [20,30]}, {}, [2,5,8,11,13,16,19], {cardBuff: 10, damagePlus: 225}, {}, {attackBuff: [10,20], npGainBuff: [10,20]});
    //----------------------------------Avenger---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Avenger", "岩窟王", 96, "人", 12641, 12177, 13838, 13340, 3,8,0.62, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [30,50]}, {npGainBuff: [20,50]}, {}, [3,6,10,13,16,13,10], {chargeNp: 3});
    initialServant(5,"Avenger", "贞德〔Alter〕", 106, "人", 13244, 11761, 14498, 12885, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {attackBuff: [10,20]}, {cardBuff: [30,50]}, [], {chargeNp: 4}, {}, {}, {attackBuff: [10,20], randomAttackBuff: [10,20]});
    initialServant(5,"Avenger", "织田信长", 250, "地", 12641, 11761, 13838, 12885, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [20,30], accAttackBuff: [10,20]}, {specialAttack: [30,50]}, {chargeNp: [10,20]}, [], {chargeNp: 3.3}, { specialNullifyDef: true });
    initialServant(5,"Avenger", "织田信长SC", 250, "地", 12641, 11761, 13838, 12885, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [20,30], accAttackBuff: [10,20]}, {}, {chargeNp: [10,20]}, [], {chargeNp: 3.3}, { specialNullifyDef: true });
    initialServant(5,"Avenger", "宇宙伊什塔尔〔Arts〕", 268, "星", 12612, 13041, 13806, 14287, 3,3,0.69, "ArtsAll1", 20, 60, "OcNpStrength", 1, {attackBuff: [10,20]}, {npStrength: [10,20]}, {randomCardBuff: [20,20]}, [16,33], {damagePlus: 270, chargeNp: 3.5}, {}, {attackBuff: [20,30]});
    initialServant(5,"Avenger", "宇宙伊什塔尔〔Buster〕", 268, "星", 12612, 13041, 13806, 14287, 3,1,0, "BusterAll1", 20, 60, "OcNpStrength", 1.5, {attackBuff: [10,20]}, {npStrength: [10,20]}, {randomCardBuff: [20,20]}, [], {damagePlus: 270, chargeNp: 3.5});
    initialServant(5,"Avenger", "宇宙伊什塔尔〔Quick〕", 268, "星", 12612, 13041, 13806, 14287, 3,3,0.69, "BusterSingle1", 20, 60, "OcNpStrength", 0.8, {attackBuff: [10,20]}, {npStrength: [10,20]}, {randomCardBuff: [20,20]}, [16,33], {damagePlus: 270, chargeNp: 3.5});
    /******************************************4星********************************************************************/
    initialServant(4,"Avenger", "戈耳工", 147, "地", 10706, 10197, 12963, 12364, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [30,50]}, {}, {}, [], {chargeNp: 3.8}, { chargeNp: 15 });
    initialServant(4,"Avenger", "黑森·罗伯", 158, "地", 10628, 9949, 12868, 12063, 1,8,0.79, "QuickSingle2", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {}, [2,5,8,11,13,16,19], {chargeNp: 3.5});
    initialServant(4,"Avenger", "黑森·罗伯TC", 158, "地", 10628, 9949, 12868, 12063, 1,8,0.79, "QuickSingle1", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {}, [2,5,8,11,13,16,19], {chargeNp: 3.5});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Avenger", "萨列里", 204, "地", 8125, 7840, 10996, 10630, 3,3,0.7, "ArtsAll1", 0, 0, "", 1, {}, {cardBuff: [20,30]}, {defDecreaseSingle: [20,30]}, [16,33], {chargeNp: 3.3}, {}, {}, {}, {defDecreaseSingle: [20,30]});
    //----------------------------------MoonCancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"MoonCancer", "BB", 220, "地", 11182, 14812, 12240, 16227, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {cardBuff: [10,20], npStrength: [30,50]}, {}, [], {damagePlus: 250});
    initialServant(5,"MoonCancer", "石像神", 244, "天", 9166, 17844, 10034, 19549, 3,3,0.35, "ArtsAll1", 0, 0, "", 1, {attackBuff: [10,20]}, {attackBuff: [20,30]}, {npGainBuff: [20,30]}, [16,33], {damagePlus: 175}, { defDecrease: 30 }, {attackBuff: [10,20]}, {}, {npGainBuff: [20,30]});
    initialServant(5,"MoonCancer", "杀生院祈荒", 285, "地", 11128, 15336, 12181, 16801, 3,3,0.6, "ArtsAll1", 0, 0, "", 1, {npStrength: [20,20]}, {}, {defDecreaseAll: [10,20], cardDecreaseAll: [20,20]}, [16,33], {cardBuff: 12, npStrength: 12}, { accSpecialAttack: 20 }, {}, {}, {defDecreaseAll: [10,20], cardDecreaseAll: [20,20,1]});
    /******************************************4星********************************************************************/
    initialServant(4,"MoonCancer", "BB", 166, "人", 8197, 13643, 9925, 16542, 1,5,0.61, "ArtsSingle1", 0, 0, "", 1, {}, {}, {}, [6,13,20,26], {cardBuff: 10}, { chargeNp: 20 });
    //----------------------------------Alterego---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Alterego", "Meltryllis", 163, "地", 11692, 13402, 12799, 14682, 1,8,0.92, "QuickSingle1", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {npStrength: [20,30]}, [2,5,8,11,13,16,19], {cardBuff: 8, damagePlus: 225});
    initialServant(5,"Alterego", "杀生院祈荒", 167, "兽", 11668, 14606, 12772, 16001, 3,3,0.55, "ArtsAll2", 0, 0, "", 1, {cardDecreaseSingle: [20,30]}, {defDecreaseAll: [10,30]}, {npGainBuff: [30,50]}, [16,33], {}, { resistClass: ["Ruler",1.5], ignoreDef: true }, {cardDecreaseSingle: [20,30,1]}, {defDecreaseAll: [10,30]});
    initialServant(5,"Alterego", "杀生院祈荒SC", 167, "兽", 11668, 14606, 12772, 16001, 3,3,0.55, "ArtsAll1", 0, 0, "", 1, {cardDecreaseSingle: [20,30]}, {defDecreaseAll: [10,30]}, {npGainBuff: [30,50]}, [16,33], {}, { resistClass: ["Ruler",1.5], ignoreDef: true }, {cardDecreaseSingle: [20,30,1]}, {defDecreaseAll: [10,30]});
    initialServant(5, "Alterego", "冲田总司〔Alter〕", 209, "人", 12465, 12696, 13645, 13909, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [20,30]}, {attackBuff: [10,20]}, {npStrength: [20,30]});
    initialServant(5, "Alterego", "冲田总司〔Alter〕SC", 209, "人", 12465, 12696, 13645, 13909, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [20,30]}, {}, {npStrength: [20,30]});
    initialServant(5,"Alterego", "志度内", 224, "天", 11668, 13965, 12772, 15299, 1,6,0.83, "ArtsSingle1", 0, 0, "", 1, {}, {cardBuff: [20,30]}, {randomAttackBuff: [20,20]}, [4,9,14,19,23], {cardBuff: 10, damagePlus: 225});
    initialServant(5,"Alterego", "Kingprotea", 238, "地", 12835, 13338, 14050, 14612, 3,1,0, "BusterAll1", 20, 60, "OcCardBuff", 1.5, {randomCardBuff: [20,20]}, {}, {attackBuff: [20,40]}, [], {cardBuff: 11, damagePlus: 250});
    /******************************************4星********************************************************************/
    initialServant(4,"Alterego", "Passionlip", 164, "地", 10299, 10901, 12470, 13217, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {randomAttackBuff: [10,30]}, {attackBuff: [10,30]}, [], {damagePlus: 200});
    initialServant(4,"Alterego", "Passionlip TC", 164, "地", 10299, 10901, 12470, 13217, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {randomAttackBuff: [10,30]}, {attackBuff: [10,30]}, [], {damagePlus: 200});
    initialServant(4,"Alterego", "机械伊丽亲", 190, "人", 9997, 10901, 12104, 13217, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {}, {npStrength: [40,60]});
    //----------------------------------Foreigner---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Foreigner", "阿比盖尔·威廉姆斯", 195, "地", 12100, 13770, 13245, 15086, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {chargeNp: [10,10], npStrength: [20,30]}, {defDecreaseAll: [10,20]}, {}, [], {cardBuff: 8, damagePlus: 175}, { nullifyDef: true }, {chargeNp: [10,10], npStrength: [20,30]}, {defDecreaseAll: [10,20]});
    initialServant(5,"Foreigner", "葛饰北斋", 198, "人", 12100, 13230, 13245, 14494, 3,5,0.33, "ArtsAll1", 150, 200, "NpSpecialAttack", 1, {}, {cardBuff: [20,30]}, {accDefDecrease: [10,20]}, [6,13,20,26], {cardBuff: 4, damagePlus: 175});
    initialServant(5,"Foreigner", "杨贵妃", 275, "人", 12342, 13365, 13510, 14642, 1,4,0.51, "ArtsSingle1", 150, 200, "NpSpecialAttack", 1, {chargeNp: [10,10]}, {defDecreaseAll: [10,20]}, {accDefDecrease: [10,10]}, [10,20,30], {damagePlus: 175}, {}, {}, {defDecreaseAll: [10,20]});
    initialServant(5,"Foreigner", "旅行者", 281, "星", 10450, 15592, 11439, 17082, 3,5,0.56, "BusterSingle1", 20, 40, "OcNpStrength", 0.8, {}, {cardBuff: [10,20], cardDecreaseSingle: [10,20]}, {}, [6,13,20,26,35], {}, { specialAttack: 150, chargeNp: 20 }, {}, {cardDecreaseSingle: [10,20,0.8]});
    initialServant(5,"Foreigner", "阿比盖尔·威廉姆斯〔夏〕", 289, "地", 11781, 14250, 12896, 15611, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {defDecreaseSingle: [30,50]}, {defDecreaseAll: [10,20]}, {cardDecreaseSingle: [20,30]}, [], {cardBuff: 9, damagePlus: 185}, { nullifyDef: true }, {defDecreaseSingle: [30,50]}, {defDecreaseAll: [10,20]}, {cardDecreaseSingle: [20,30,1.5]});
    initialServant(5,"Foreigner", "梵高", 295, "地", 11220, 15000, 12282, 16433, 0,0,0, "NULL", 0, 0, "", 0, {}, {}, {}, [], {damagePlus: 185}, {}, {}, {defDecreaseAll: [10,20], cardDecreaseAll: [20,20,0.8]}, {attackBuff: [20,30]});
    /******************************************4星********************************************************************/
    initialServant(4,"Foreigner", "谜之女主角XX", 222, "星", 9751, 11250, 11806, 13640, 1,4,0.64, "ArtsSingle1", 20, 60, "OcAttackBuff", 1, {attackBuff: [30,50]}, {}, {specialAttack: [30,50]}, [10,20,30]);
}
