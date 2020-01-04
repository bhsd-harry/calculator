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
* @param {Array} alignments 属性
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
*    SpecialAttackBuff：特攻威力Buff，比如杰克女性特攻
*    ""：无
*    NpRemainHpDamage：双子宝具倍率提升
*    OcNpDamage：自爆弓宝具倍率提升
*    OcCardBuff：R金时OC绿魔放
*    OcAttackBuff：B兰OC加攻
*    DefDecrease: 教授降防
*    CardDecrease: 狂那降色卡耐性
*    OcNpStrength：宫本半藏OC宝具威力提升
*    CombinedDecrease：灾星简降防降色卡耐性
* @param {Number} cardColor 卡牌倍率(B卡：1.5，A卡：1，Q卡：0.8)
* @param {Object} skill1
* @param {Object} skill2
* @param {Object} skill3
*    attackBuff
*    defDecreaseSingle
*    defDecreaseAll
*    cardBuff
*    cardDecrease
*    npStrength
*    specialAttack
*    damagePlus
*    npGainBuff
* @param {Array} damageDist 伤害分布
* @param {Object} ClassSkill 职介技能(比如狂化EX、神性Debuff) 
*    cardBuff: 10(卡牌Buff), 
*    damagePlus: 0(神性Debuff), 
* @param {Object} npEffect 宝具副效果(oc特攻只能显示一种副效果，所以剩余其他的副效果存储到这个对象里)
*    npStrength：宝具威力buff
*    cardBuff：卡牌buff
*    specialAttack: 宝具特攻
*    npRemainHpDamage: 背水
*    defDecrease: 降防
*    npCoefficient: 固定宝具倍率
*    resistClass
*/
function initialServant(star,Class, name,servantNo, attribute, alignments, atk, hp, maxAtk, maxHp, target, hit, np, NpType, oc1, oc5, type, cardColor, skill1, skill2, skill3, damageDist, ClassSkill, npEffect) {
    let NP = [];
    switch(NpType) {
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
    oc.oc1 = oc1;
    oc.oc2 = (oc1 * 3 + oc5) / 4;
    oc.oc3 = (oc1 + oc5) / 2;
    oc.oc4 = (oc1 + oc5 * 3) / 4;
    oc.oc5 = oc5;
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
        alignments: alignments,
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
	damageDist: damageDist,
        ClassSkill: ClassSkill,
        npEffect: npEffect
    }
    servants[id] = model;
    id++;
}

function initSaber(){
    initialServant(5,"Saber", "阿尔托莉雅·潘德拉贡", 2, "地", ["秩序", "善"], 11221, 15150, 12283, 16597, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [9,18]}, {cardBuff: [30,50]});
    initialServant(5,"Saber", "阿尔提拉", 8, "人", ["混沌", "善"], 12343, 13907, 13511, 15236, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [10,20]}, {}, {attackBuff: [10,30]}, [], {damagePlus: 175});
    initialServant(5,"Saber", "阿尔提拉EN", 8, "人", ["混沌", "善"], 12343, 13907, 13511, 15236, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [9,18]}, {}, {attackBuff: [10,30]}, [], {damagePlus: 175});
    initialServant(5,"Saber", "沖田総司", 68, "人", ["中立", "中庸"], 12068, 13225, 13210, 14489, 1,3,1.09, "QuickSingle1", 0, 0, "", 0.8, {cardBuff: [30,50]}, {}, {}, [16,33], {cardBuff: 2});
    initialServant(5,"Saber", "莫德雷德", 76, "地", ["混沌", "中庸"], 11723, 14680, 12833, 16083, 3,1,0, "BusterAll2", 180, 220, "NpSpecialAttack", 1.5, {cardBuff: [30,50]});
    initialServant(5,"Saber", "尼禄・克劳狄乌斯〔花嫁〕", 90, "人", ["混沌", "花嫁"], 11607, 14248, 12706, 15609, 1,2,0.7, "ArtsSingle2", 0, 0, "", 1, {npGainBuff: [35,45]}, {attackBuff: [30,40]}, {}, 25);
    initialServant(5,"Saber", "两仪式", 91, "人", ["中立", "中庸"], 10721, 15453, 11736, 16929, 3,1,0.84, "ArtsAll2", 0, 0, "", 1, {cardBuff: [25,40]}, {attackBuff: [15,25]}, {}, [], {cardBuff: 6});
    initialServant(5,"Saber", "两仪式EN", 91, "人", ["中立", "中庸"], 10721, 15453, 11736, 16929, 3,1,0.84, "ArtsAll1", 0, 0, "", 1, {cardBuff: [25,40]}, {attackBuff: [15,25]}, {}, [], {cardBuff: 6});
    initialServant(5,"Saber", "宫本武藏", 153, "人", ["混沌", "善"], 12037, 13635, 13176, 14938, 1,1,0, "BusterSingle1", 20, 60, "OcNpStrength", 1.5, {}, {npStrength: [30,50]});
    initialServant(5,"Saber", "亚瑟・潘德拉贡〔Prototype〕", 160, "地", ["秩序", "善"], 12465, 13975, 13645, 15310, 3,1,0, "BusterAll1", 10, 50, "OcNpStrength", 1.5, {cardBuff: [30,50]}, {}, {specialAttack: [50,100]});
    initialServant(5,"Saber", "齐格鲁德", 213, "地", ["中立", "善"], 12465, 13975, 13645, 15310, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {}, {cardBuff: [30,50]}, {}, [], {damagePlus: 175});
    initialServant(5,"Saber", "剪舌麻雀的红阎魔", 234, "地", ["秩序", "善"], 11607, 13960, 12706, 15294, 1,5,0.56, "ArtsSingle1", 40, 60, "SpecialAttackBuff", 1, {}, {defDecreaseAll: [10,20]}, {attackBuff: [10,20]}, [6,13,20,26], {cardBuff: 10});
    initialServant(5,"Saber", "阿斯托尔福", 270, "地", ["混沌", "善"], 11694, 14248, 12801, 15609, 1,9,0.52, "QuickSingle1", 20, 40, "OcCardBuff", 0.8, {}, {}, {attackBuff: [10,20]}, [2,4,6,8,11,13,15,17], {cardBuff: 10});
/******************************************4星********************************************************************/
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Alter〕", 3, "人", ["秩序", "恶"], 10248, 11589, 12408, 14051, 3,1,0, "BusterAll3", 0, 0, "", 1.5, {cardBuff: [30,50]}, {}, {attackBuff: [6,12]});
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Lily〕", 4, "地", ["秩序", "善"], 7726, 10623, 9355, 12880, 3,1,0, "BusterAll5", 0, 0, "", 1.5, {}, {cardBuff: [30,50]});
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Lily〕EN", 4, "地", ["秩序", "善"], 7726, 10623, 9355, 12880, 3,1,0, "BusterAll4", 0, 0, "", 1.5, {}, {cardBuff: [30,50]});
    initialServant(4,"Saber", "尼禄・克劳狄乌斯", 5, "人", ["混沌", "善"], 9449, 11753, 11441, 14250, 3,1,0.84, "ArtsAll2", 0, 0, "", 1);
    initialServant(4,"Saber", "齐格弗里德", 6, "地", ["混沌", "善"], 8181, 14165, 9905, 17175, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {}, {}, {specialAttack: [50,80], cardBuff: [30,50]});
    initialServant(4,"Saber", "罗摩", 101, "天", ["秩序", "善"], 9854, 11993, 11931, 14541, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {}, {attackBuff: [9,18]}, {}, [], {damagePlus: 200});
    initialServant(4,"Saber", "兰斯洛特", 121, "地", ["秩序", "善"], 9949, 11589, 12046, 14051, 1,1,0.83, "ArtsSingle1", 0, 0, "", 1, {}, {}, {}, [], {}, { cardBuff: 30 });
    initialServant(4,"Saber", "高文", 123, "地", ["秩序", "善"], 10173, 11419, 12317, 13845, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [20,20], cardBuff: [20,30]}, {attackBuff: [10,20]});
    initialServant(4,"Saber", "高文EN", 123, "地", ["秩序", "善"], 10173, 11419, 12317, 13845, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [20,20]}, {attackBuff: [6,12]});
    initialServant(4,"Saber", "伊丽莎白・巴陶里〔勇者〕", 138, "地", ["混沌", "善"], 9899, 11248, 11986, 13638, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,40]});
    initialServant(4,"Saber", "铃鹿御前", 165, "天", ["中立", "恶"], 9544, 11753, 11556, 14250, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [20,40]}, {}, {npStrength: [20,20]}, [], {damagePlus: 200});
    initialServant(4,"Saber", "弗兰肯斯坦", 176, "地", ["中立", "夏"], 9353, 11993, 11325, 14541, 1,5,0.7, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [40,80]}, {}, {attackBuff: [10,20], npStrength: [10,20]}, [6,13,20,26], {cardBuff: 12});
    initialServant(4,"Saber", "柳生但马守宗矩", 187, "人", ["秩序", "中庸"], 9999, 11135, 12107, 13501, 1,4,0.81, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [30,50]}, {attackBuff: [10,20]}, {npGainBuff: [30,50]}, [10,20,30]);
    initialServant(4,"Saber", "女王梅芙", 221, "地", ["混沌", "恶"], 8017, 13609, 9707, 16501, 1,6,0.72, "ArtsSingle1", 0, 0, "", 1, {}, {cardDecrease: [10,20]}, {attackBuff: [10,20]}, [4,9,14,19,23]);	
    initialServant(4,"Saber", "迪尔姆德·奥迪那", 223, "地", ["秩序", "中庸"], 10048, 11362, 12166, 13776, 1,10,0.73, "QuickSingle1", 0, 0, "", 0.8, {cardBuff: [10,20], attackBuff: [10,20]}, {}, {npGainBuff: [20,30]}, [1,3,5,7,9,10,12,14,16], {cardBuff: 8});
    initialServant(4,"Saber", "拉克什米・芭伊", 245, "人", ["秩序", "善"], 9949, 11362, 12046, 13776, 3,4,1.01, "BusterSingle1", 0, 0, "", 0.8, {attackBuff: [10,20]}, {}, {}, [10,20,30], {cardBuff: 8, damagePlus: 200});
    initialServant(4,"Saber", "葛飾北齋", 264, "人", ["混沌", "善"], 9389, 11873, 11368, 14396, 1,8,0.46, "ArtsSingle1", 30, 70, "OcNpStrength", 1, {}, {}, {cardBuff: [20,30]}, [2,5,8,11,13,16,19], {damagePlus: 100});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Saber", "盖乌斯・尤里乌斯・凯撒", 7, "人", ["中立", "中庸"], 7497, 9595, 10146, 13009, 1,10,1.1, "QuickSingle1", 0, 0, "", 0.8, {npStrength: [9,18]}, {attackBuff: [8,16]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 8, damagePlus: 150});
    initialServant(3,"Saber", "弗格斯・马克・罗伊", 72, "地", ["秩序", "中庸"], 7460, 9786, 10096, 13268, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,30]});
    initialServant(3,"Saber", "贝狄威尔", 126, "星", ["秩序", "善"], 7627, 9595, 10322, 13009, 1,1,0, "BusterSingle2", 30, 90, "OcCardBuff", 1.5, {npStrength: [8,16]});
    initialServant(1,"Saber", "伊阿宋", 254, "地", ["秩序", "善"], 5457, 7575, 8479, 11677, 3,5,0.37, "ArtsAll1", 20, 40, "OcCardBuff", 1, {}, {}, {attackBuff: [10,20]}, [6,13,20,26]);
}

function initArcher(){
   
    //----------------------------------Archer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Archer", "吉尔伽美什", 12, "天", ["混沌", "善"], 12280, 13097, 13442, 14348, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [10.5,21]}, {}, {}, [], {damagePlus: 175}, { npStrength: 30 });
    initialServant(5,"Archer", "俄里翁", 60, "天", ["混沌", "中庸"], 11107, 14553, 12158, 15943, 1,5,1, "ArtsSingle2", 0, 0, "", 1, {attackBuff: [20,20]}, {specialAttack: [50,100]}, {}, [6,13,20,26]);
    initialServant(5,"Archer", "尼古拉・特斯拉", 77, "星", ["混沌", "善"], 11781, 13825, 12896, 15146, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {}, {attackBuff: [10,20]});
    initialServant(5,"Archer", "阿周那", 84, "天", ["秩序", "中庸"], 12342, 13230, 13510, 14494, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {cardBuff: [20,30], npStrength: [10,20]}, [], {damagePlus: 175});
    initialServant(5,"Archer", "阿尔托莉雅・潘德拉贡〔Archer〕", 129, "地", ["秩序", "善"], 11276, 14553, 12343, 15943, 1,10,0.59, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [20,30]}, {}, {attackBuff: [8,18]}, [2,5,8,5,8,11,13,8,11], {cardBuff: 10});
    initialServant(5,"Archer", "伊修塔尔", 142, "天", ["秩序", "善"], 12252, 13965, 13412, 15299, 3,1,0, "BusterAll2", 20, 60, "OcCardBuff", 1.5, {attackBuff: [10,20]}, {}, {attackBuff: [30,50]}, [], {damagePlus: 225});
    initialServant(5,"Archer", "伊修塔尔EN", 142, "天", ["秩序", "善"], 12252, 13965, 13412, 15299, 3,1,0, "BusterAll1", 20, 60, "OcCardBuff", 1.5, {attackBuff: [10,20]}, {}, {attackBuff: [30,50]}, [], {damagePlus: 225});
    initialServant(5,"Archer", "詹姆斯·莫里亚蒂", 156, "人", ["混沌", "恶"], 11781, 13685, 12896, 14992, 1,1,0, "BusterSingle1", 20, 40, "DefDecrease", 1.5, {}, {npStrength: [20,20]}, {attackBuff: [10,20]});
    initialServant(5,"Archer", "拿破仑", 212, "星", ["中立", "善"], 12033, 13097, 13172, 14348, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [30,40]}, {npStrength: [10,20]});
    initialServant(5,"Archer", "拿破仑EN", 212, "星", ["中立", "善"], 12033, 13097, 13172, 14348, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [30,40]}, {npStrength: [10,20]});
    initialServant(5,"Archer", "贞德（Archer）", 216, "人", ["秩序", "夏"], 10525, 15743, 11521, 17247, 3,4,0.68, "ArtsAll1", 0, 0, "", 1, {cardBuff: [20,30]}, {npStrength: [10,20]}, {attackBuff: [10,20]}, [10,20,30]);
    /******************************************4星********************************************************************/
    initialServant(4,"Archer", "卫宫", 11, "人", ["中立", "中庸"], 9398, 11521, 11379, 13969, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {cardBuff: [25,40]});
    initialServant(4,"Archer", "阿塔兰忒", 14, "地", ["中立", "恶"], 8633, 12476, 10453, 15127, 3,10,0.5, "BusterSingle2", 0, 0, "", 0.8, {cardBuff: [30,50]}, {}, {npGainBuff: [30,50]}, [3,5,3,7,8,10,12,14,16]);
    initialServant(4,"Archer", "织田信长", 69, "人", ["中立", "中庸"], 9494, 11637, 11495, 14110, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {}, {specialAttack: [50,100]});
    initialServant(4,"Archer", "特里斯坦", 122, "地", ["秩序", "善"], 9735, 11637, 11787, 14110, 1,7,0.58, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [5,11,16,5,11,16]);
    initialServant(4,"Archer", "安妮・伯妮&玛丽・里德", 131, "人", ["混沌", "中庸"], 9446, 11521, 11437, 13969, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9.5,19.5]}, {}, {attackBuff: [8.5,25.5]}, [], {}, { npRemainHpDamage: 600 });
    initialServant(4,"Archer", "克洛伊·冯·爱因兹贝伦", 137, "天", ["混沌", "善"], 9845, 10914, 11920, 13233, 1,6,0.38, "ArtsSingle1", 0, 0, "", 1, {}, {cardBuff: [20,35]}, {}, [4,9,14,19,23]);
    initialServant(4,"Archer", "卫宫〔Alter〕", 157, "人", ["混沌", "恶"], 8996, 12250, 10892, 14853, 1,10,0.43, "ArtsSingle2", 0, 0, "", 1, {}, {cardBuff: [15,30]}, {attackBuff: [20,40]}, [1,3,5,7,9,10,12,14,16]);
    initialServant(4,"Archer", "卫宫〔Alter〕EN", 157, "人", ["混沌", "恶"], 8996, 12250, 10892, 14853, 1,10,0.43, "ArtsSingle1", 0, 0, "", 1, {}, {cardBuff: [15,30]}, {attackBuff: [20,40]}, [1,3,5,7,9,10,12,14,16]);
    initialServant(4,"Archer", "海伦娜・布拉瓦茨基", 180, "人", ["混沌", "善"], 9446, 11404, 11437, 13827, 3,4,0.38, "ArtsAll1", 0, 0, "", 1, {}, {damagePlus: [1000,2000]}, {cardBuff: [20,40]}, [10,20,30]);
    initialServant(4,"Archer", "巴御前", 184, "地", ["中立", "中庸"], 9946, 10804, 12043, 13100, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {attackBuff: [9,19], npStrength: [18,28]}, {}, {}, [], {cardBuff: 2});
    initialServant(4,"Archer", "巴御前EN", 184, "地", ["中立", "中庸"], 9946, 10804, 12043, 13100, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9,19], npStrength: [18,28]}, {}, {}, [], {cardBuff: 2});
    initialServant(4,"Archer", "阿提拉·the·圣〔诞〕", 197, "星", ["混沌", "善"], 9759, 11637, 11816, 14110, 1,10,0.59, "QuickSingle1", 0, 0, "", 0.8, {}, {npStrength: [20,30]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 12, damagePlus: 175});
    initialServant(4,"Archer", "浅上藤乃", 200, "人", ["秩序", "恶"], 10299, 11025, 12470, 13368, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {cardBuff: [20,35]});
    initialServant(4,"Archer", "喀戎", 207, "天", ["秩序", "善"], 9294, 12250, 11253, 14853, 1,4,0.68, "ArtsSingle1", 0, 0, "", 1, {}, {}, {cardBuff: [20,30]}, [10,20,30], {damagePlus: 150});
    initialServant(4,"Archer", "马嘶", 248, "天", ["混沌", "中庸"], 10249, 11245, 12409, 13634, 1,1,0, "BusterSingle1", 600, 1000, "NpRemainHpDamage", 1.5, {}, {cardBuff: [20,30]}, {}, [], {cardBuff: 5, damagePlus: 210});
    initialServant(4,"Archer", "刑部姬", 262, "地", ["中立", "夏"], 8895, 12476, 10770, 15127, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {attackBuff: [10,20]}, {cardBuff: [20,30]}, [], {damagePlus: 145});
    initialServant(4,"Archer", "灾星简", 269, "人", ["混沌", "中庸"], 8996, 12495, 10892, 15150, 1,5,0.71, "QuickSingle1", 10, 30, "CombinedDecrease", 0.8, {}, {attackBuff: [10,20]}, {}, [6,13,20,26], {cardBuff: 10});
    initialServant(4,"Archer", "南丁格尔（圣诞）", 271, "人", ["秩序", "善"], 9859, 11080, 11936, 13434, 3,6,0.6, "BusterSingle1", 0, 0, "", 0.8, {}, {npStrength: [20,30]}, {attackBuff: [10,20]}, [4,9,14,19,23]);
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Archer", "罗宾汉", 13, "人", ["中立", "善"], 6715, 10187, 9088, 13812, 1,1,0.87, "ArtsSingle1", 200, 250, "NpSpecialAttack", 1, {}, {npGainBuff: [12,30]});
    initialServant(3,"Archer", "尤瑞艾莉", 15, "天", ["混沌", "善"], 7032, 9506, 9517, 12889, 1,1,0.9, "NpSpecialAttack", 0, 0, "", 1, {}, {}, {cardBuff: [20,30]}, [], {damagePlus: 300}, { npCoefficient: 1200 });
    initialServant(3,"Archer", "大卫", 63, "天", ["秩序", "中立"], 7736, 8643, 10470, 11719, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {}, {attackBuff: [9,18]});
    initialServant(3,"Archer", "幼吉尔", 95, "天", ["混沌", "善"], 7696, 8731, 10415, 11838, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10.5,21]}, {}, {}, [], {damagePlus: 175});
    initialServant(3,"Archer", "比利小子", 105, "人", ["混沌", "中庸"], 6890, 9506, 9325, 12889, 1,3,0.56, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [16,33], {cardBuff: 7});
    initialServant(3,"Archer", "俵藤太", 125, "人", ["中立", "善"], 7032, 9800, 9517, 13287, 3,1,0, "BusterAll2", 50, 100, "SpecialAttackBuff", 1.5, {cardBuff: [20,30]});
    initialServant(3,"Archer", "威廉泰尔", 246, "人", ["秩序", "善"], 7384, 9310, 9993, 12623, 1,3,0.66, "ArtsSingle1", 200, 250, "NpSpecialAttack", 1, {}, {cardBuff: [20,30]}, {}, [16,33]);
    initialServant(2,"Archer", "帕里斯", 255, "地", ["中立", "中庸"], 6523, 7834, 9452, 11306, 1,5,0.43, "QuickSingle1", 150, 200, "NpSpecialAttack", 0.8, {}, {attackBuff: [20,40]}, {}, [6,13,20,26]);
    initialServant(1,"Archer", "阿拉什", 16, "地", ["混沌", "中庸"], 5816, 7122, 9037, 10979, 3,1,0, "BusterSingle2", 0, 800, "OcNpDamage", 1.5);
}

function initLancer(){
    //----------------------------------Lancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Lancer", "斯卡哈", 70, "星", ["秩序", "善"], 11375, 14825, 12452, 16241, 1,1,0.71, "QuickSingle2", 0, 0, "", 0.8, {}, {cardBuff: [30,50]}, {specialAttack: [50,100]});
    initialServant(5,"Lancer", "迦尔纳", 85, "天", ["秩序", "善"], 11976, 13632, 13110, 14934, 3,1,0, "BusterAll2", 150, 200, "NpSpecialAttack", 1.5, {}, {cardBuff: [20,30], npStrength: [10,20]}, {}, [], {damagePlus: 200});
    initialServant(5,"Lancer", "布伦希尔德", 88, "天", ["中立", "善"], 11432, 14825, 12514, 16241, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {cardBuff: [15,25], npStrength: [8,15]}, {}, {}, [], {damagePlus: 100});
    initialServant(5,"Lancer", "阿尔托莉雅・潘德拉贡〔Lancer〕", 119, "天", ["秩序", "善"], 10995, 15606, 12036, 17097, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [30,50]}, {attackBuff: [9,18]});
    initialServant(5,"Lancer", "玉藻前", 128, "天", ["中立", "夏"], 10726, 15147, 11741, 16594, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [10,20]}, {defDecreaseSingle: [20,30]}, {}, [], {damagePlus: 230});
    initialServant(5,"Lancer", "恩奇都", 143, "天", ["中立", "中庸"], 10780, 15300, 11800, 16762, 1,1,0, "BusterSingle2", 30, 50, "DefDecrease", 1.5, {cardBuff: [30,50]}, {}, {}, [], {}, { specialAttack: 200 });
    initialServant(5,"Lancer", "恩奇都EN", 143, "天", ["中立", "中庸"], 10780, 15300, 11800, 16762, 1,1,0, "BusterSingle1", 20, 40, "DefDecrease", 1.5, {cardBuff: [30,50]});
    initialServant(5,"Lancer", "艾蕾什基伽尔", 196, "地", ["混沌", "恶"], 10343, 16065, 11322, 17600, 3,1,0, "BusterAll1", 10, 50, "OcCardBuff", 1.5, {}, {cardBuff: [30,50]}, {}, [], {damagePlus: 225});
    initialServant(5,"Lancer", "布拉达曼特", 232, "地", ["秩序", "善"], 10833, 15682, 11858, 17180, 3,5,0.7, "BusterSingle1", 20, 60, "OcNpStrength", 0.8, {cardBuff: [20,30]}, {}, {}, [6,13,20,26]);
    /******************************************4星********************************************************************/
    initialServant(4,"Lancer", "伊丽莎白・巴陶里", 18, "人", ["混沌", "恶"], 9122, 11870, 11045, 14392, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,20]}, {defDecreaseSingle: [10,20]});
    initialServant(4,"Lancer", "伊丽莎白・巴陶里EN", 18, "人", ["混沌", "恶"], 9122, 11870, 11045, 14392, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [10,20]}, {defDecreaseSingle: [10,20]});
    initialServant(4,"Lancer", "阿尔托莉雅・潘德拉贡〔Alter〕", 78, "天", ["秩序", "善"], 9968, 11761, 12069, 14260, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {cardBuff: [35,55]}, {}, {attackBuff: [6,12]});
    initialServant(4,"Lancer", "芬恩・麦克库尔", 87, "天", ["中立", "中庸"], 8930, 12750, 10812, 15459, 3,3,0.55, "ArtsAll2", 0, 0, "", 1, {npGainBuff: [10,30]}, {}, {cardBuff: [24,40]}, [16,33], {damagePlus: 125});
    initialServant(4,"Lancer", "神枪 李书文", 102, "人", ["中立", "恶"], 9653, 11360, 11688, 13774, 1,3,0.52, "ArtsSingle2", 0, 0, "", 1, {}, {}, {cardBuff: [30,50]}, [12,25]);
    initialServant(4,"Lancer", "神枪 李书文EN", 102, "人", ["中立", "恶"], 9653, 11360, 11688, 13774, 1,3,0.52, "ArtsSingle1", 0, 0, "", 1, {}, {}, {cardBuff: [30,50]}, [12,25]);
    initialServant(4,"Lancer", "清姬", 134, "地", ["混沌", "恶"], 8936, 11870, 10820, 14392, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,30]}, {defDecreaseSingle: [20,30]}, [], {cardBuff: 12});
    initialServant(4,"Lancer", "弗拉德三世〔Extra〕", 140, "人", ["秩序", "善"], 8775, 13005, 10625, 15769, 1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, {attackBuff: [10,20]}, {npStrength: [9,18]});
    initialServant(4,"Lancer", "贞德・Alter・Santa・Lily", 141, "人", ["混沌", "善"], 9261, 11870, 11213, 14392, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {}, {cardBuff: [35,55]});
    initialServant(4,"Lancer", "美杜莎〔Lancer〕", 146, "地", ["中立", "善"], 8253, 13119, 9993, 15907, 1,8,0.44, "QuickSingle2", 0, 0, "", 0.8, {cardDecrease: [10,20]}, {attackBuff: [10,30]}, {}, [2,5,8,11,13,16,19], {damagePlus: 250});
    initialServant(4,"Lancer", "美杜莎〔Lancer〕EN", 146, "地", ["中立", "善"], 8253, 13119, 9993, 15907, 1,8,0.44, "QuickSingle2", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {}, [2,5,8,11,13,16,19], {damagePlus: 250});
    initialServant(4,"Lancer", "源赖光", 181, "天", ["秩序", "善"], 9168, 12112, 11100, 14686, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,40]}, {attackBuff: [10,20]}, [], {cardBuff: 6, damagePlus: 150});
    initialServant(4,"Lancer", "帕尔瓦蒂", 183, "天", ["秩序", "善"], 8127, 13253, 9840, 16069, 3,4,1.08, "BusterSingle1", 0, 0, "", 0.8, {cardBuff: [20,30], npGainBuff: [20,30]}, {attackBuff: [30,50]}, {}, [10,20,30], {damagePlus: 225});
    initialServant(4,"Lancer", "哪吒", 193, "天", ["中立", "善"], 9284, 12112, 11241, 14686, 3,1,0, "BusterAll1", 20, 60, "OcNpStrength", 1.5, {cardBuff: [10,20]});
    initialServant(4,"Lancer", "瓦尔基里", 214, "天", ["秩序", "善"], 8037, 14025, 9731, 17005, 3,7,0.86, "BusterSingle1", 0, 0, "", 0.8, {cardBuff: [20,30], npStrength: [10,20]}, {}, {}, [3,7,10,14,17,21], {damagePlus: 200});
    initialServant(4,"Lancer", "茨木童子(Lancer)", 217, "地", ["混沌", "恶"], 9133, 12354, 11058, 14979, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10,20], npStrength: [20,30]}, {}, {}, [], {cardBuff: 4});
    initialServant(4,"Lancer", "長尾景虎", 252, "人", ["秩序", "善"], 9617, 11360, 11644, 13774, 1,8,0.45, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [20,30]}, {npGainBuff: [20,30]}, {attackBuff: [10,20]}, [2,5,8,11,13,16,19], {damagePlus: 150});
    initialServant(4,"Lancer", "謎之Alterego・Λ", 266, "地", ["秩序", "善"], 9261, 11749, 11213, 14246, 3,3,0.76, "ArtsAll1", 0, 0, "", 1, {cardBuff: [10,20]}, {}, {attackBuff: [30,50]}, [16,33], {damagePlus: 200});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Lancer", "库・丘林", 17, "天", ["秩序", "中庸"], 7239, 9593, 9797, 13007, 1,1,1.07, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [], {damagePlus: 175});
    initialServant(3,"Lancer", "库・丘林EN", 17, "天", ["秩序", "中庸"], 7239, 9593, 9797, 13007, 1,1,1.07, "QuickSingle1", 0, 0, "", 0.8, {}, {}, {}, [], {damagePlus: 175});
    initialServant(3,"Lancer", "库・丘林〔Prototype〕", 20, "天", ["秩序", "中庸"], 7082, 10098, 9584, 13691, 1,1,1.08, "QuickSingle1", 0, 0, "", 0.8, {}, {}, {specialAttack: [50,100]}, [], {damagePlus: 175});
    initialServant(3,"Lancer", "罗穆路斯", 22, "星", ["混沌", "中立"], 7239, 9883, 9797, 13400, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {}, {cardBuff: [10,30]});
    initialServant(3,"Lancer", "赫克托耳", 64, "人", ["秩序", "中立"], 6928, 10200, 9376, 13829, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [10,20]});
    initialServant(3,"Lancer", "赫克托耳EN", 64, "人", ["秩序", "中立"], 6928, 10200, 9376, 13829, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [8.5,17]});
    initialServant(3,"Lancer", "迪尔姆德・奥迪纳", 71, "地", ["秩序", "中庸"], 6877, 10098, 9307, 13691, 1,2,0.79, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, 60);
    initialServant(3,"Lancer", "豹人", 148, "地", ["混沌", "中庸"], 7022, 9593, 9503, 13007, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {cardBuff: [10,30]}, {attackBuff: [10,30]}, {}, [], {cardBuff: 2, damagePlus: 200});
    initialServant(2,"Lancer", "加雷斯", 256, "地", ["秩序", "善"], 5413, 9537, 7844, 13764, 1,1,0, "BusterSingle1", 0, 0, "", 1.5);
}

function initRider(){
    //----------------------------------Rider---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Rider", "弗朗西斯・德雷克", 65, "星", ["混沌", "恶"], 11326, 12830, 12398, 14056, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [8.5,17], attackBuff: [8.5,17]});
    initialServant(5,"Rider", "女王梅芙", 99, "地", ["混沌", "恶"], 10296, 13968, 11270, 15303, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {}, {attackBuff: [10,20]}, {defDecreaseSingle: [20,30]});
    initialServant(5,"Rider", "女王梅芙EN", 99, "地", ["混沌", "恶"], 10296, 13968, 11270, 15303, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {}, {attackBuff: [10,20]});
    initialServant(5,"Rider", "伊斯坎达尔", 108, "人", ["中立", "善"], 11560, 13219, 12654, 14482, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,20]}, {npStrength: [10,20]}, {cardBuff: [30,50]}, [], {damagePlus: 150});
    initialServant(5,"Rider", "伊斯坎达尔EN", 108, "人", ["中立", "善"], 11560, 13219, 12654, 14482, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {attackBuff: [10,20]}, {npStrength: [9,18]}, {cardBuff: [30,50]}, [], {damagePlus: 150});
    initialServant(5,"Rider", "奥兹曼迪亚斯", 118, "天", ["混沌", "中庸"], 11971, 12830, 13104, 14056, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [9,18]}, {attackBuff: [20,40]}, {}, [], {damagePlus: 175});
    initialServant(5,"Rider", "魁札尔·科亚特尔", 144, "天", ["秩序", "善"], 12001, 12960, 13137, 14198, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {attackBuff: [10.5,21]}, {cardBuff: [20,30]}, {}, [], {damagePlus: 300});
    initialServant(5,"Rider", "阿尔托莉雅・潘德拉贡〔Alter〕", 179, "人", ["秩序", "恶"], 10776, 14256, 11796, 15618, 1,6,0.59, "QuickSingle1", 0, 0, "", 0.8, {attackBuff: [20,30], cardBuff: [10,20]}, {}, {cardBuff: [20,30]}, [4,9,14,19,23], {cardBuff: 8});
    initialServant(5,"Rider", "伊凡雷帝", 205, "人", ["秩序", "恶"], 11619, 13284, 12719, 14553, 3,1,0, "BusterAll2", 30, 70, "OcNpStrength", 1.5, {}, {cardBuff: [20,40]});
    initialServant(5,"Rider", "伊凡雷帝EN", 205, "人", ["秩序", "恶"], 11619, 13284, 12719, 14553, 3,1,0, "BusterAll1", 30, 70, "OcNpStrength", 1.5, {}, {cardBuff: [20,40]});
    initialServant(5,"Rider", "阿喀琉斯", 206, "地", ["秩序", "中庸"], 11883, 13219, 13008, 14482, 3,5,0.57, "BusterSingle1", 20, 60, "OcCardBuff", 0.8, {cardBuff: [20,30]}, {}, {npGainBuff: [20,30]}, [6,13,20,26], {cardBuff: 11, damagePlus: 150});
    initialServant(5,"Rider", "李奧納多・達文西", 253, "人", ["秩序", "善"], 10883, 14112, 11913, 15460, 3,3,0.49, "ArtsAll1", 20, 40, "OcCardBuff", 1, {}, {}, {npStrength: [20,30]}, [16,33], {cardBuff: 6, damagePlus: 230});
    initialServant(5,"Rider", "欧罗巴", 274, "天", ["中立", "善"], 11737, 12571, 12848, 13772, 3,1,0, "BusterAll1", 20, 40, "OcCardBuff", 1.5, {}, {cardBuff: [20,30]}, {defDecreaseAll: [10,20]}, [], {damagePlus: 150});
    /******************************************4星********************************************************************/
    initialServant(4,"Rider", "玛丽・安托瓦内特", 29, "人", ["秩序", "善"], 8293, 12348, 10041, 14972, 3,5,1, "BusterSingle2", 0, 0, "", 0.8, {}, {}, {}, [6,13,20,26], {cardBuff: 11});
    initialServant(4,"Rider", "玛丽・安托瓦内特EN", 29, "人", ["秩序", "善"], 8293, 12348, 10041, 14972, 3,5,1, "BusterSingle1", 0, 0, "", 0.8, {}, {}, {}, [6,13,20,26], {cardBuff: 11});
    initialServant(4,"Rider", "马大", 30, "人", ["秩序", "善"], 8014, 13068, 9703, 15845, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {defDecreaseSingle: [10,30]}, [], {damagePlus: 150}, { cardBuff : 20 });
    initialServant(4,"Rider", "马大EN", 30, "人", ["秩序", "善"], 8014, 13068, 9703, 15845, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {}, {defDecreaseSingle: [10,30]}, [], {damagePlus: 150});
    initialServant(4,"Rider", "安妮・伯妮&玛丽・里德", 66, "人", ["混沌", "恶"], 9029, 11286, 10932, 13684, 1,6,0.84, "QuickSingle2", 1200, 2000, "NpRemainHpDamage", 0.8, {}, {}, {attackBuff: [20,30]}, [5,11,17,11,23]);
    initialServant(4,"Rider", "阿尔托莉雅・潘德拉贡〔Santa Alter〕", 73, "人", ["秩序", "善"], 9258, 11286, 11209, 13684, 3,1,0, "BusterAll3", 0, 0, "", 1.5, {}, {}, {cardBuff: [25,45]});
    initialServant(4,"Rider", "阿斯托尔福", 94, "地", ["混沌", "善"], 8937, 11172, 10821, 13546, 3,1,0.66, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [8,28]}, {}, {}, [], {cardBuff: 11});
    initialServant(4,"Rider", "坂田金时", 115, "地", ["秩序", "善"], 9819, 10800, 11889, 13095, 1,4,1.15, "QuickSingle1", 10, 90, "OcCardBuff", 0.8, {cardBuff: [20,30]}, {}, {}, [35,21,14], {damagePlus: 150});
    initialServant(4,"Rider", "莫德雷德", 132, "地", ["混沌", "善"], 9212, 11400, 11154, 13822, 3,5,0.71, "ArtsAll1", 0, 0, "", 1, {cardBuff: [20,30]}, {}, {}, [6,13,20,26], {cardBuff: 5});
    initialServant(4,"Rider", "伊修塔尔", 182, "天", ["秩序", "善"], 9603, 10692, 11627, 12964, 3,4,0.68, "BusterSingle1", 20, 60, "OcCardBuff", 0.8, {cardBuff: [10,20], npGainBuff: [10,20]}, {}, {npGainBuff: [30,50]}, [10,20,30], {cardBuff: 12, damagePlus: 225});
    initialServant(4,"Rider", "坂本龙马", 211, "人", ["中立", "中庸"], 8555, 11880, 10358, 14404, 1,4,0.56, "ArtsSingle1", 0, 0, "", 1, {attackBuff: [8.5,17]}, {}, {cardBuff: [10,20]}, [10,20,30], {damagePlus: 170});
    initialServant(4,"Rider", "卡米拉", 263, "地", ["中立", "恶"], 9651, 10476, 11685, 12702, 3,4,0.52, "BusterSingle1", 0, 0, "", 0.8, {}, {}, {defDecreaseAll: [20,30]}, [10,20,30]);
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Rider", "美杜莎", 23, "地", ["混沌", "善"], 7200, 8937, 9744, 12117, 3,1,0.58, "BusterSingle2", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {npGainBuff: [20,30]}, [], {cardBuff: 11, damagePlus: 95});
    initialServant(3,"Rider", "美杜莎EN", 23, "地", ["混沌", "善"], 7200, 8937, 9744, 12117, 3,1,0.58, "BusterSingle1", 0, 0, "", 0.8, {}, {attackBuff: [10,30]}, {npGainBuff: [20,30]}, [], {cardBuff: 11, damagePlus: 95});
    initialServant(3,"Rider", "牛若丸", 27, "人", ["混沌", "中庸"], 7076, 9028, 9576, 12240, 1,1,0.87, "QuickSingle2", 0, 0, "", 0.8, {npGainBuff: [10,20], cardBuff: [10,20]}, {attackBuff: [8.5,17]}, {}, [], {cardBuff: 11});
    initialServant(3,"Rider", "牛若丸EN", 27, "人", ["混沌", "中庸"], 7076, 9028, 9576, 12240, 1,1,0.87, "QuickSingle2", 0, 0, "", 0.8, {npGainBuff: [10,20]}, {attackBuff: [8.5,17]}, {}, [], {cardBuff: 11});
    initialServant(3,"Rider", "亚历山大", 28, "人", ["中立", "善"], 7356, 8640, 9955, 11714, 3,1,0.86, "BusterSingle2", 0, 0, "", 0.8, {attackBuff: [8,16]}, {}, {cardBuff: [10,20]}, [], {cardBuff: 11, damagePlus: 100});
    initialServant(3,"Rider", "克里斯托弗·哥伦布", 172, "人", ["中立", "恶"], 6552, 9600, 8867, 13016, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [7,14], attackBuff: [7,14]}, {}, {cardBuff: [10,20]});
    initialServant(3,"Rider", "克里斯托弗·哥伦布EN", 172, "人", ["中立", "恶"], 6552, 9600, 8867, 13016, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {npStrength: [7,14], attackBuff: [7,14]}, {}, {cardBuff: [10,20]});
    initialServant(3,"Rider", "赤兔马", 231, "地", ["中立", "中庸"], 6434, 10483, 8708, 14214, 3,4,0.57, "BusterSingle1", 0, 0, "", 0.8, {cardBuff: [20,30]}, {}, {attackBuff: [10,20]}, [10,20,30], {cardBuff: 12});
    initialServant(3,"Rider", "曼迪卡尔多", 273, "人", ["中立", "中庸"], 6756, 9600, 9143, 13016, 1,4,0.86, "ArtsSingle1", 20, 40, "OcCardBuff", 1, {attackBuff: [10,20]}, {attackBuff: [30,50]}, {cardBuff: [10,20]},[10,20,30]);
    initialServant(2,"Rider", "聖喬治", 24, "人", ["秩序", "善"], 5236, 9200, 7587, 13278, 1,4,0.85, "ArtsSingle1", 0, 0, "", 1, {}, {}, {}, [10,20,30]);
    initialServant(2,"Rider", "爱德华・蒂奇", 25, "人", ["混沌", "恶"], 6188, 7907, 8967, 11411, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {npStrength: [8,16], attackBuff: [8,16]}, {attackBuff: [9,27]});
    initialServant(2,"Rider", "爱德华・蒂奇EN", 25, "人", ["混沌", "恶"], 6188, 7907, 8967, 11411, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {npStrength: [8,16], attackBuff: [8,16]}, {attackBuff: [9,27]});
    initialServant(1,"Rider", "巴沙洛繆・羅伯茨", 257, "人", ["混沌", "恶"], 5461, 6720, 8485, 10359, 3,6,0.65, "BusterSingle1", 150, 200, "NpSpecialAttack", 0.8, {npStrength: [8.5,17], attackBuff: [8.5,17]}, {}, {cardBuff: [10,20]}, [4,9,14,19,23], {cardBuff: 4});
}

function initCaster(){
    //----------------------------------Caster---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Caster", "玄奘三藏", 113, "人", ["秩序", "善"], 11658, 12965, 12761, 14204, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {npStrength: [10,20]}, {}, {}, [], {damagePlus: 125});
    initialServant(5,"Caster", "莱昂纳多・达・芬奇", 127, "星", ["混沌", "善"], 10598, 14259, 11601, 15621, 3,1,0.54, "ArtsAll2", 30, 70, "OcNpStrength", 1, {}, {}, {}, [], {cardBuff: 10});
    initialServant(5,"Caster", "莱昂纳多・达・芬奇EN", 127, "星", ["混沌", "善"], 10598, 14259, 11601, 15621, 3,1,0.54, "ArtsAll1", 30, 70, "OcNpStrength", 1, {}, {}, {}, [], {cardBuff: 10});
    initialServant(5,"Caster", "伊莉雅斯菲尔", 136, "人", ["中立", "善"], 10857, 13825, 11885, 15146, 1,1,0, "BusterSingle2", 20, 100, "OcCardBuff", 1.5, {cardBuff: [30,50]});
    initialServant(5,"Caster", "山鲁佐德", 169, "人", ["秩序", "中庸"], 9212, 15846, 10084, 17360, 3,5,0.51, "ArtsAll2", 200, 300, "NpSpecialAttack", 1, {cardBuff: [10,30]}, {}, {}, [6,13,20,26], {cardBuff: 11.5}, { npStrength: 20 });
    initialServant(5,"Caster", "山鲁佐德EN", 169, "人", ["秩序", "中庸"], 9212, 15846, 10084, 17360, 3,5,0.51, "ArtsAll1", 200, 300, "NpSpecialAttack", 1, {cardBuff: [10,30]}, {}, {}, [6,13,20,26], {cardBuff: 11.5}, { npStrength: 20 });
    initialServant(5,"Caster", "尼禄・克劳狄乌斯", 175, "人", ["混沌", "夏"], 10857, 13685, 11885, 14992, 3,1,0, "BusterAll1", 20, 60, "OcNpStrength", 1.5, {}, {attackBuff: [20,30]}, {attackBuff: [30,50]});
    initialServant(5,"Caster", "阿纳斯塔西娅", 201, "人", ["中立", "中庸"], 10546, 14259, 11544, 15621, 3,4,0.51, "ArtsAll1", 0, 0, "", 1, {cardBuff: [30,50]}, {attackBuff: [10,20]}, {}, [10,20,30], {cardBuff: 12});
    initialServant(5,"Caster", "紫式部", 237, "人", ["中立", "中庸"], 11374, 12833, 12451, 14059, 3,6,0.45, "ArtsAll1", 150, 200, "NpSpecialAttack", 1, {defDecreaseAll: [20,30], specialAttack: [20,30]}, {npStrength: [10,20]}, {}, [4,9,14,19,23], {cardBuff: 7});
    /******************************************4星********************************************************************/
    initialServant(4,"Caster", "伊丽莎白・巴陶里〔万圣节〕", 61, "人", ["混沌", "恶"], 8616, 11404, 10432, 13827, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {cardBuff: [25,45]});
    initialServant(4,"Caster", "童谣", 74, "人", ["中立", "中庸"], 8629, 11882, 10448, 14407, 3,3,0.54, "ArtsAll2", 0, 0, "", 1, {}, {}, {}, [16,33], {cardBuff: 10});
    initialServant(4,"Caster", "海伦娜・布拉瓦茨基", 100, "人", ["混沌", "善"], 8629, 11882, 10448, 14407, 3,3,0.45, "ArtsAll2", 0, 0, "", 1, {}, {}, {cardBuff: [15,20]}, [16,33], {cardBuff: 10});
    initialServant(4,"Caster", "托马斯・爱迪生", 103, "人", ["秩序", "中庸"], 7952, 11882, 9628, 14407, 3,1,0.51, "ArtsAll2", 0, 0, "", 1, {}, {}, {}, [], {cardBuff: 4});
    initialServant(4,"Caster", "尼托克丽丝", 120, "地", ["秩序", "善"], 9060, 11288, 10970, 13686, 3,3,0.54, "ArtsAll2", 0, 0, "", 1, {}, {}, {}, [16,33], {cardBuff: 10, damagePlus: 175});
    initialServant(4,"Caster", "玛丽・安托瓦内特", 130, "人", ["秩序", "善"], 9060, 11404, 10970, 13827, 3,3,0.32, "ArtsAll1", 0, 0, "", 1, {attackBuff: [9.5,19.5]}, {}, {}, [16,33], {cardBuff: 10});
    initialServant(4,"Caster", "吉尔伽美什〔Caster〕", 145, "人", ["秩序", "善"], 8460, 12005, 10243, 14556, 3,10,0.16, "ArtsAll1", 0, 0, "", 1, {}, {attackBuff: [10.5,21]}, {cardBuff: [20,30]}, [1,3,5,7,9,10,12,14,16], {cardBuff: 10, damagePlus: 175});
    initialServant(4,"Caster", "喀耳刻", 192, "天", ["混沌", "中庸"], 8671, 12250, 10499, 14853, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {defDecreaseAll: [10,20]});
    initialServant(4,"Caster", "示巴女王", 194, "人", ["中立", "善"], 8629, 12127, 10448, 14704, 1,5,0.81, "ArtsSingle1", 0, 0, "", 1, {attackBuff: [8.9,17.8]}, {}, {cardBuff: [10,20]}, [6,13,20,26], {cardBuff: 6});
    initialServant(4,"Caster", "齐格", 208, "人", ["中立", "善"], 8394, 11288, 10163, 13686, 3,3,0.78, "ArtsAll1", 20, 40, "DefDecrease", 1, {npGainBuff: [20,30]}, {cardBuff: [22,36]}, {specialAttack: [50,100]}, [16,33], {cardBuff: 6.5});
    initialServant(4,"Caster", "酒吞童子（Caster）", 225, "地", ["混沌", "恶"], 9538, 11025, 11549, 13368, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {cardBuff: [20,30]}, {attackBuff: [10,20], specialAttack: [30,50]}, [], {damagePlus: 150});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Caster", "美狄亚", 31, "地", ["中立", "恶"], 7418, 8643, 10039, 11719, 1,1,1.64, "ArtsAll2", 0, 0, "", 1, {}, {}, {npGainBuff: [30,50]}, [], {cardBuff: 10});
    initialServant(3,"Caster", "吉尔・德・雷", 32, "人", ["混沌", "恶"], 6514, 9506, 8816, 12889, 3,1,0, "BusterAll1", 0, 0, "", 1.5);
    initialServant(3,"Caster", "梅菲斯托费勒斯", 35, "地", ["混沌", "恶"], 6839, 9216, 9255, 12495, 3,1,0, "BusterAll2", 0, 0, "", 1.5);
    initialServant(3,"Caster", "库・丘林", 38, "天", ["秩序", "中庸"], 6580, 9604, 8905, 13022, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {}, {}, [], {damagePlus: 175}, { cardBuff: 20 });
    initialServant(3,"Caster", "库・丘林EN", 38, "天", ["秩序", "中庸"], 6580, 9604, 8905, 13022, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {}, {}, {}, [], {damagePlus: 175});
    initialServant(3,"Caster", "冯・霍恩海姆・帕拉塞尔苏斯", 79, "人", ["混沌", "善"], 6711, 9506, 9082, 12889, 3,3,0.55, "BusterAll2", 0, 0, "", 1, {cardBuff: [10,20]}, {}, {npGainBuff: [30,50]}, [16,33], {cardBuff: 10});
    initialServant(3,"Caster", "冯・霍恩海姆・帕拉塞尔苏斯EN", 79, "人", ["混沌", "善"], 6711, 9506, 9082, 12889, 3,3,0.55, "BusterAll2", 0, 0, "", 1, {cardBuff: [10,20]}, {}, {}, [16,33], {cardBuff: 10});
    initialServant(3,"Caster", "查尔斯・巴贝奇", 80, "人", ["混沌", "中庸"], 5996, 10887, 8115, 14761, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {}, {attackBuff: [20,40]}, {npStrength: [15,25]});
    initialServant(3,"Caster", "杰罗尼莫", 104, "人", ["中立", "善"], 6857, 9123, 9280, 12369, 3,1,0.9, "ArtsAll2", 0, 0, "", 1, {}, {cardBuff: [30,50]}, {}, [], {cardBuff: 8});
    initialServant(3,"Caster", "阿维斯布隆", 203, "人", ["秩序", "中庸"], 6376, 9981, 8629, 13533, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {cardBuff: [20,30]});
    initialServant(2,"Caster", "威廉・莎士比亚", 34, "人", ["中立", "中庸"], 5798, 8080, 8402, 11661, 3,1,0, "BusterAll2", 0, 0, "", 1.5, {cardBuff: [20,40]});
    initialServant(2,"Caster", "陳宮", 258, "人", ["混沌", "善"], 6119, 7755, 8867, 11192, 3,4,0.4, "ArtsSingle1", 0, 900, "OcNpDamage", 1, {}, {}, {}, [10,20,30], {cardBuff: 6});
}


function initAssassin(){
    //----------------------------------Assassin---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Assassin", "开膛手杰克", 75, "地", ["混沌", "恶"], 11557, 12696, 12651, 13909, 1,4,1.07, "QuickSingle3", 50, 100, "SpecialAttackBuff", 0.8, {cardBuff: [30,50]}, {}, {}, [10,20,30]);
    initialServant(5,"Assassin", "谜之女主角X", 86, "星", ["混沌", "善"], 11761, 12696, 12874, 13909, 1,12,0.81, "QuickSingle2", 150, 200, "NpSpecialAttack", 0.8, {defDecreaseAll: [10,20]}, {}, {specialAttack: [30,50], attackBuff: [10,20]}, [5,7,5,7,5,7,5,7,5,7,5], {cardBuff: 12});
    initialServant(5,"Assassin", "谜之女主角X EN", 86, "星", ["混沌", "善"], 11761, 12696, 12874, 13909, 1,12,0.81, "QuickSingle2", 150, 200, "NpSpecialAttack", 0.8, {}, {}, {specialAttack: [30,50]}, [5,7,5,7,5,7,5,7,5,7,5], {cardBuff: 12});
    initialServant(5,"Assassin", "酒吞童子", 112, "地", ["混沌", "恶"], 11993, 12825, 13128, 14050, 3,1,0.55, "ArtsAll2", 0, 0, "", 1, {defDecreaseAll: [10,20]}, {attackBuff: [10,20], npStrength: [20,30]}, {}, [], {damagePlus: 150});
    initialServant(5,"Assassin", "酒吞童子EN", 112, "地", ["混沌", "恶"], 11993, 12825, 13128, 14050, 3,1,0.55, "ArtsAll1", 0, 0, "", 1, {defDecreaseAll: [10,20]}, {attackBuff: [10,20], npStrength: [20,30]}, [], {damagePlus: 150});
    initialServant(5,"Assassin", "克利奥帕特拉", 139, "人", ["秩序", "中庸"], 11088, 13402, 12138, 14682, 3,1,0, "BusterAll2", 30, 70, "OcCardBuff", 1.5, {}, {}, {}, [], {damagePlus: 125});
    initialServant(5,"Assassin", "克利奥帕特拉EN", 139, "人", ["秩序", "中庸"], 11088, 13402, 12138, 14682, 3,1,0, "BusterAll1", 30, 70, "OcCardBuff", 1.5, {}, {}, {}, [], {damagePlus: 125});
    initialServant(5,"Assassin", "“山之翁”", 154, "人", ["秩序", "恶"], 11848, 13338, 12969, 14612, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, {}, {attackBuff: [10,20]}, {cardBuff: [30,50]});
    initialServant(5,"Assassin", "賽米拉米斯", 199, "地", ["秩序", "恶"], 11309, 13266, 12379, 14533, 3,1,0, "BusterAll2", 10, 50, "OcNpStrength", 1.5, {}, {}, {cardDecrease: [30,50]}, [], {damagePlus: 150}, { resistClass: ["Caster",1] });
    initialServant(5,"Assassin", "賽米拉米斯EN", 199, "地", ["秩序", "恶"], 11309, 13266, 12379, 14533, 3,1,0, "BusterAll1", 10, 50, "OcNpStrength", 1.5, {}, {}, {cardDecrease: [30,50]}, [], {damagePlus: 150}, { resistClass: ["Caster",1] });
    initialServant(5,"Assassin", "李书文", 235, "人", ["中立", "恶"], 11470, 12568, 12556, 13769, 1,1,0.99, "ArtsSingle1", 20, 40, "DefDecrease", 1, {}, {}, {attackBuff: [30,50]}, [], {cardBuff: 8});
    initialServant(5,"Assassin", "伽摩", 239, "天", ["混沌", "恶"], 11528, 12889, 12619, 14120, 1,10,0.74, "QuickSingle1", 20, 40, "OcCardBuff", 0.8, {}, {attackBuff: [20,30]}, {}, [1,3,5,7,9,10,12,14,16], {cardBuff: 10, damagePlus: 225}, { resistClass: ["Alterego",2] });
    /******************************************4星********************************************************************/
    initialServant(4,"Assassin", "卡米拉", 46, "地", ["混沌", "恶"], 9408, 10473, 11391, 12698, 1,1,0, "BusterSingle2", 150, 200, "NpSpecialAttack", 1.5, {}, {defDecreaseSingle: [10,20]});
    initialServant(4,"Assassin", "卡米拉EN", 46, "地", ["混沌", "恶"], 9408, 10473, 11391, 12698, 1,1,0, "BusterSingle1", 120, 170, "NpSpecialAttack", 1.5, {}, {defDecreaseSingle: [10,20]});
    initialServant(4,"Assassin", "两仪式〔Assassin〕", 92, "人", ["混沌", "善"], 8867, 11055, 10736, 13404, 1,3,0.8, "ArtsSingle2", 0, 0, "", 1, {cardBuff: [30,50]}, {}, {}, [16,33]);
    initialServant(4,"Assassin", "两仪式EN", 92, "人", ["混沌", "善"], 8867, 11055, 10736, 13404, 1,3,0.8, "ArtsSingle1", 0, 0, "", 1, {cardBuff: [30,50]}, {}, {}, [16,33]);
    initialServant(4,"Assassin", "卫宫〔Assassin〕", 109, "人", ["混沌", "恶"], 8958, 11168, 10846, 13541, 1,15,0.28, "ArtsSingle2", 0, 0, "", 1, {cardBuff: [24,40]}, {}, {}, [6,4,8,6,8,4,6,4,2,6,2,8,2,6]);
    initialServant(4,"Assassin", "斯卡哈", 133, "星", ["中立", "善"], 9049, 11168, 10956, 13541, 3,5,0.71, "BusterSingle1", 0, 0, "", 0.8, {}, {}, {cardBuff: [30,50]}, [6,13,20,26]);
    initialServant(4,"Assassin", "燕青", 159, "人", ["混沌", "恶"], 8661, 11637, 10487, 14110, 1,11,0.71, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [20,30]}, {cardBuff: [20,30]}, {}, [1,3,4,6,7,9,10,12,13,15], {cardBuff: 5});
    initialServant(4,"Assassin", "燕青EN", 159, "人", ["混沌", "恶"], 8661, 11637, 10487, 14110, 1,11,0.71, "QuickSingle1", 0, 0, "", 0.8, {npGainBuff: [20,30]}, {}, {}, [1,3,4,6,7,9,10,12,13,15], {cardBuff: 5});
    initialServant(4,"Assassin", "武则天", 170, "人", ["秩序", "恶"], 8981, 10942, 10874, 13267, 1,4,0.87, "QuickSingle2", 0, 0, "", 0.8, {defDecreaseSingle: [10,20]}, {}, {attackBuff: [10,20]}, [10,20,30]);
    initialServant(4,"Assassin", "武则天EN", 170, "人", ["秩序", "恶"], 8981, 10942, 10874, 13267, 1,4,0.87, "QuickSingle1", 0, 0, "", 0.8, {defDecreaseSingle: [10,20]}, {}, {attackBuff: [10,20]}, [10,20,30]);
    initialServant(4,"Assassin", "尼托克丽丝", 177, "天", ["秩序", "善"], 8812, 11518, 10670, 13965, 3,3,0.78, "ArtsAll1", 0, 0, "", 1, {}, {}, {attackBuff: [20,30], npStrength: [10,20], npGainBuff: [20,30]}, [16,33], {damagePlus: 185});
    initialServant(4,"Assassin", "望月千代女", 185, "地", ["混沌", "恶"], 8510, 11637, 10304, 14110, 1,5,0.8, "ArtsSingle1", 0, 0, "", 1, {}, {cardBuff: [10,30]}, {}, [6,13,20,26]);
    initialServant(4,"Assassin", "加藤段藏", 188, "地", ["中立", "中庸"], 8935, 11055, 10818, 13404, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5, {cardBuff: [20,30]});
    initialServant(4,"Assassin", "牛若丸", 218, "人", ["中立", "夏"], 9456, 10580, 11449, 12828, 3,5,0.54, "BusterSingle1", 0, 0, "", 0.8, {}, {cardBuff: [20,30]}, {}, [6,13,20,26], {cardBuff: 11});
    initialServant(4,"Assassin", "虞美人", 230, "地", ["秩序", "恶"], 7970, 13389, 9650, 16234, 3,1,0, "BusterAll1", 50, 100, "OcCardBuff", 1.5);
    initialServant(4,"Assassin", "格蕾", 243, "人", ["秩序", "善"], 9456, 10580, 11449, 12828, 3,1,0, "BusterAll1", 0, 0, "", 1.5, {attackBuff: [20,30], specialAttack: [50,100]}, {cardBuff: [20,40]});
    initialServant(4,"Assassin", "沖田總司", 267, "人", ["中立", "夏"], 9337, 10366, 11305, 12569, 3,3,0.92, "BusterSingle1", 0, 0, "", 0.8, {}, {npStrength: [10,20]}, {cardBuff: [30,50]}, [16,33]);
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Assassin", "荆轲", 42, "人", ["混沌", "善"], 7207, 8293, 9754, 11244, 1,1,1.05, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {cardBuff: [20,30]});
    initialServant(3,"Assassin", "百貌的哈桑", 110, "人", ["秩序", "恶"], 6686, 9310, 9049, 12623, 1,13,0.38, "ArtsSingle2", 0, 0, "", 1, {npGainBuff: [10,20]}, {}, {}, [16,5,11,8,11,5,8,5,2,8,2,11]);
    initialServant(3,"Assassin", "风魔小太郎", 117, "人", ["混沌", "恶"], 7091, 8844, 9597, 11991, 3,5,0.54, "BusterSingle2", 0, 0, "", 0.8, {}, {}, {defDecreaseAll: [10,20]}, [6,13,20,26]);
    initialServant(3,"Assassin", "风魔小太郎EN", 117, "人", ["混沌", "恶"], 7091, 8844, 9597, 11991, 3,5,0.54, "BusterSingle2", 0, 0, "", 0.8, {}, {}, {}, [6,13,20,26]);
    initialServant(3,"Assassin", "静谧的哈桑", 124, "人", ["秩序", "恶"], 6636, 9310, 8981, 12623, 1,1,0.53, "ArtsSingle2", 0, 0, "", 1);
    initialServant(3,"Assassin", "冈田以藏", 210, "人", ["中立", "恶"], 6879, 8844, 9310, 11991, 1,4,0.79, "ArtsSingle1", 0, 0, "", 1, {specialAttack: [50,100]}, {}, {}, [10,20,30]);
    initialServant(2,"Assassin", "咒腕的哈桑", 40, "人", ["秩序", "恶"], 6280, 7594, 9100, 10960, 1,1,1.07, "QuickSingle1", 0, 0, "", 0.8);
    initialServant(2,"Assassin", "夏尔・亨利・桑松", 43, "人", ["秩序", "恶"], 5456, 8309, 7906, 11991, 1,1,0, "BusterSingle2", 0, 0, "", 1.5, {specialAttack: [40,60]});
    initialServant(2,"Assassin", "歌剧魅影", 44, "地", ["混沌", "恶"], 5654, 8393, 8193, 12112, 3,1,0.71, "ArtsAll2", 0, 0, "", 1);
    initialServant(1,"Assassin", "佐佐木小次郎", 39, "人", ["中立", "恶"], 5735, 6220, 8912, 9588, 1,3,1.05, "QuickSingle2", 0, 0, "", 0.8, {}, {}, {}, [16,33], {}, { cardBuff: 20 });
    initialServant(1,"Assassin", "佐佐木小次郎EN", 39, "人", ["中立", "恶"], 5735, 6220, 8912, 9588, 1,3,1.05, "QuickSingle1", 0, 0, "", 0.8, {}, {}, {}, [16,33]);
    initialServant(1,"Assassin", "夏綠蒂・科黛", 259, "人", ["中立", "善"], 5488, 6220, 8528, 9588, 1,1,0.52, "ArtsSingle1", 0, 0, "", 1, {}, {attackBuff: [20,30]});
}


function initBerserker(){
    //----------------------------------Berserker---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Berserker", "坂田金时", 51, "人", ["秩序", "善"], 12712, 12150, 13915, 13311, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 2, damagePlus: 125});
    initialServant(5,"Berserker", "弗拉德三世", 52, "地", ["混沌", "恶"], 11499, 13770, 12587, 15086, 1,10,0.5, "ArtsSingle1", 0, 0, "", 1, [1,3,5,7,9,10,12,14,16]);
    initialServant(5,"Berserker", "库・丘林〔Alter〕", 98, "地", ["混沌", "恶"], 12805, 12210, 14017, 13377, 1,1,0, "BusterSingle1", 30, 70, "OcAttackBuff", 1.5, [], {cardBuff: 6, damagePlus: 150});
    initialServant(5,"Berserker", "源赖光", 114, "天", ["混沌", "善"], 11556, 13500, 12650, 14790, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {cardBuff: 12, damagePlus: 150});
    initialServant(5,"Berserker", "谜之女主角X〔Alter〕", 155, "星", ["中立", "恶"], 11113, 14175, 12165, 15529, 1,9,1.07, "QuickSingle1", 150, 200, "NpSpecialAttack", 0.8, [2,4,6,8,11,13,15,17]);
    initialServant(5,"Berserker", "土方岁三", 161, "人", ["秩序", "恶"], 12089, 12028, 13233, 13177, 1,1,0, "BusterSingle2", 800, 1200, "NpRemainHpDamage", 1.5, [], {cardBuff: 5});
    initialServant(5,"Berserker", "土方岁三EN", 161, "人", ["秩序", "恶"], 12089, 12028, 13233, 13177, 1,1,0, "BusterSingle1", 600, 1000, "NpRemainHpDamage", 1.5, [], {cardBuff: 5});
    initialServant(5,"Berserker", "项羽", 226, "人", ["秩序", "中庸"], 11613, 13770, 12712, 15086, 3,5,0.51, "BusterSingle1", 20, 60, "OcNpStrength", 0.8, [6,13,20,26]);
    initialServant(5,"Berserker", "阿周那〔Alter〕", 247, "天", ["秩序", "善", "恶"], 11669, 13837, 12773, 15159, 3,1,0, "BusterAll1", 20, 60, "CardDecrease", 1.5, [], {cardBuff: 12, damagePlus: 250});
    initialServant(5,"Berserker", "宮本武藏", 261, "人", ["混沌", "善"], 12712, 12150, 13915, 13311, 3,4,0.51, "ArtsAll1", 0, 0, "", 1, [10,20,30], {damagePlus: 125});
    /******************************************4星********************************************************************/
    initialServant(4,"Berserker", "赫拉克勒斯", 47, "天", ["混沌", "狂"], 10655, 10327, 12901, 12521, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 8, damagePlus: 200});
    initialServant(4,"Berserker", "兰斯洛特", 48, "地", ["秩序", "狂"], 10477, 10327, 12685, 12521, 3,10,0.5, "BusterSingle1", 10, 30, "OcAttackBuff", 0.8, [3,5,3,7,8,10,12,14,16]);
    initialServant(4,"Berserker", "玉藻猫", 58, "地", ["混沌", "善"], 9026, 11458, 10929, 13893, 3,5,0.71, "BusterSingle2", 0, 0, "", 0.8, [6,13,20,26]);
    initialServant(4,"Berserker", "弗兰肯斯坦", 82, "地", ["混沌", "中庸"], 9441, 10687, 11431, 12958, 3,6,0.83, "QuickAll3", 0, 0, "", 0.8, [4,9,14,19,23]);
    initialServant(4,"Berserker", "贝奥武夫", 89, "地", ["混沌", "善"], 10247, 10327, 12407, 12521, 1,1,0, "BusterSingle3", 0, 0, "", 1.5, [], {cardBuff: 1});
    initialServant(4,"Berserker", "茨木童子", 116, "地", ["混沌", "恶"], 9636, 10954, 11667, 13282, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 8});
    initialServant(4,"Berserker", "茶茶", 162, "人", ["混沌", "中庸"], 8945, 11025, 10831, 13368, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {cardBuff: 3});
    initialServant(4,"Berserker", "彭忒西勒亚", 171, "地", ["秩序", "善"], 10502, 10175, 12716, 12337, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 12, damagePlus: 175});
    initialServant(4,"Berserker", "织田信长", 178, "人", ["混沌", "夏"], 10146, 10023, 12285, 12153,1,1,0, "BusterSingle1", 150, 200, "NpSpecialAttack", 1.5, [], {cardBuff: 6});
    initialServant(4,"Berserker", "阿塔兰忒〔Alter〕", 202, "地", ["混沌", "恶"], 9806, 10634, 11873, 12894, 1,5,1.05, "QuickSingle1", 0, 0, "", 0.8, [6,13,20,26]);
    initialServant(4,"Berserker", "贞德〔Berserker〕", 219, "人", ["混沌", "夏"], 10298, 9922, 12469, 12030, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 12});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Berserker", "吕布奉先", 49, "人", ["混沌", "恶"], 8119, 8302, 10988, 11256, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 10});
    initialServant(3,"Berserker", "大流士三世", 55, "人", ["秩序", "中庸"], 7608, 8763, 10297, 11881, 3,1,0, "BusterAll2", 0, 0, "", 1.5, [], {cardBuff: 8});
    initialServant(3,"Berserker", "清姬", 56, "地", ["混沌", "恶"], 6644, 9166, 8992, 12428, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {cardBuff: 12});
    initialServant(3,"Berserker", "森長可", 251, "人", ["混沌", "狂"], 7732, 8019, 10464, 10872, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 4});
    initialServant(2,"Berserker", "血斧埃里克", 57, "人", ["混沌", "中庸"], 6290, 7688, 9115, 11095, 3,1,0, "BusterAll1", 30, 50, "OcAttackBuff", 1.5, [], {cardBuff: 8});
    initialServant(2,"Berserker", "莎樂美", 260, "地", ["混沌", "恶"], 6884, 6885, 9975, 9936, 1,3,0.51, "ArtsSingle1", 0, 0, "", 1, [16,33]);
    initialServant(1,"Berserker", "斯巴达克斯", 50, "人", ["中立", "中庸"], 5073, 7722, 7883, 11904, 3,1,0, "BusterAll2", 0, 0, "", 1.5, [], {cardBuff: 12});
    initialServant(1,"Berserker", "保罗・班扬", 174, "地", ["中立", "中庸"], 6044, 6196, 9391, 9551, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {cardBuff: 4});
}

function initExtra(){
//----------------------------------Shielder---------------------------------------------------------------------//
    /******************************************4星********************************************************************/
    //----------------------------------Ruler---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Ruler", "天草四郎", 93, "人", ["秩序", "善"], 10972, 14107, 12011, 15455, 3,1,0, "BusterAll2", 0, 0, "", 1.5);
    initialServant(5,"Ruler", "阿爾托莉亞・潘德拉剛", 265, "天", ["秩序", "夏"], 9593, 16912, 10501, 18528, 3,1,0, "BusterAll1", 20, 40, "OcCardBuff", 1.5);
    /******************************************4星********************************************************************/
    initialServant(4,"Ruler", "马大", 135, "人", ["秩序", "善"], 9546, 11250, 11558, 13640, 1,1,0, "BusterSingle2", 20, 60, "DefDecrease", 1.5);
    initialServant(4,"Ruler", "马大EN", 135, "人", ["秩序", "善"], 9546, 11250, 11558, 13640, 1,1,0, "BusterSingle1", 10, 50, "DefDecrease", 1.5);
    initialServant(4,"Ruler", "魁札尔·科亚特尔", 233, "天", ["秩序", "善"], 9687, 11306, 11729, 13708, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {damagePlus: 250});
    initialServant(4,"Ruler", "阿斯特蕾亞", 242, "天", ["秩序", "善"], 9734, 11531, 11786, 13981, 1,8,0.43, "ArtsSingle1", 150, 200, "NpSpecialAttack", 1, [2,5,8,11,13,16,19], {cardBuff: 10, damagePlus: 225});
    //----------------------------------Avenger---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Avenger", "岩窟王 爱德蒙・唐泰斯", 96, "人", ["混沌", "恶"], 12641, 12177, 13838, 13340, 3,8,0.62, "BusterSingle2", 0, 0, "", 0.8, [3,6,10,13,16,13,10]);
    initialServant(5,"Avenger", "岩窟王 爱德蒙・唐泰斯EN", 96, "人", ["混沌", "恶"], 12641, 12177, 13838, 13340, 3,8,0.62, "BusterSingle1", 0, 0, "", 0.8, [3,6,10,13,16,13,10]);
    initialServant(5,"Avenger", "贞德〔Alter〕", 106, "人", ["混沌", "恶"], 13244, 11761, 14498, 12885, 1,1,0, "BusterSingle1", 0, 0, "", 1.5);
    initialServant(5,"Avenger", "魔王信長", 250, "地", ["混沌", "中庸"], 12641, 11761, 13838, 12885, 3,1,0, "BusterAll1", 150, 200, "NpSpecialAttack", 1.5);
    initialServant(5,"Avenger", "太空 伊斯塔(Arts)", 268, "星", ["秩序", "恶"], 12612, 13041, 13806, 14287, 3,3,0.69, "ArtsAll1", 20, 60, "OcNpStrength", 1, [16,33], {damagePlus: 270});
    initialServant(5,"Avenger", "太空 伊斯塔(Buster)", 268, "星", ["秩序", "恶"], 12612, 13041, 13806, 14287, 3,1,0, "BusterAll1", 20, 60, "OcNpStrength", 1.5, [], {damagePlus: 270});
    initialServant(5,"Avenger", "太空 伊斯塔(Quick)", 268, "星", ["秩序", "恶"], 12612, 13041, 13806, 14287, 3,3,0.69, "BusterSingle1", 20, 60, "OcNpStrength", 0.8, [16,33], {damagePlus: 270});
    /******************************************4星********************************************************************/
    initialServant(4,"Avenger", "戈尔贡", 147, "地", ["混沌", "恶"], 10706, 10197, 12963, 12364, 3,1,0, "BusterAll2", 0, 0, "", 1.5);
    initialServant(4,"Avenger", "海森・罗伯", 158, "地", ["混沌", "恶"], 10628, 9949, 12868, 12063, 1,8,0.79, "QuickSingle2", 0, 0, "", 0.8, [2,5,8,11,13,16,19]);
    initialServant(4,"Avenger", "海森・罗伯EN", 158, "地", ["混沌", "恶"], 10628, 9949, 12868, 12063, 1,8,0.79, "QuickSingle1", 0, 0, "", 0.8, [2,5,8,11,13,16,19]);
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Avenger", "安东尼奥·萨列里", 204, "地", ["混沌", "恶"], 8125, 7840, 10996, 10630, 3,3,0.7, "ArtsAll1", 0, 0, "", 1, [16,33]);
    //----------------------------------MoonCancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"MoonCancer", "BB", 220, "地", ["混沌", "恶"], 11182, 14812, 12240, 16227, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {damagePlus: 250});
    initialServant(5,"MoonCancer", "吉娜可＝加里吉利", 244, "天", ["秩序", "善"], 9166, 17844, 10034, 19549, 3,3,0.35, "ArtsAll1", 0, 0, "", 1, [16,33], {damagePlus: 175}, { defDecrease: 30 });
    /******************************************4星********************************************************************/
    initialServant(4,"MoonCancer", "BB", 166, "人", ["混沌", "善"], 8197, 13643, 9925, 16542, 1,5,0.61, "ArtsSingle1", 0, 0, "", 1, [6,13,20,26], {cardBuff: 10});
    //----------------------------------Alterego---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Alterego", "梅尔特莉莉丝（溶解莉莉丝）", 163, "地", ["秩序", "善"], 11692, 13402, 12799, 14682, 1,8,0.92, "QuickSingle1", 0, 0, "", 0.8, [2,5,8,11,13,16,19], {cardBuff: 8, damagePlus: 225});
    initialServant(5,"Alterego", "杀生院祈荒", 167, "兽", ["混沌", "恶"], 11668, 14606, 12772, 16001, 3,3,0.55, "ArtsAll1", 0, 0, "", 1, [16,33]);
    initialServant(5, "Alterego", "冲田总司〔Alter〕", 209, "人", ["中立", "中庸"], 12465, 12696, 13645, 13909, 3,1,0, "BusterAll1", 0, 0, "", 1.5);
    initialServant(5,"Alterego", "西托奈", 224, "天", ["混沌", "善"], 11668, 13965, 12772, 15299, 1,6,0.83, "ArtsSingle1", 0, 0, "", 1, [4,9,14,19,23], {cardBuff: 10, damagePlus: 225});
    initialServant(5,"Alterego", "帝王花", 238, "地", ["秩序", "善"], 12835, 13338, 14050, 14612, 3,1,0, "BusterAll1", 40, 80, "OcCardBuff", 1.5, [], {cardBuff: 11, damagePlus: 250});
    /******************************************4星********************************************************************/
    initialServant(4,"Alterego", "帕森莉普（热情迷唇）", 164, "地", ["秩序", "中庸"], 10299, 10901, 12470, 13217, 3,1,0, "BusterAll2", 0, 0, "", 1.5, [], {damagePlus: 200});
    initialServant(4,"Alterego", "帕森莉普（热情迷唇）EN", 164, "地", ["秩序", "中庸"], 10299, 10901, 12470, 13217, 3,1,0, "BusterAll1", 0, 0, "", 1.5, [], {damagePlus: 200});
    initialServant(4,"Alterego", "机械伊丽酱", 190, "人", ["秩序", "善"], 9997, 10901, 12104, 13217, 1,1,0, "BusterSingle1", 0, 0, "", 1.5);
    //----------------------------------Foreigner---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Foreigner", "阿比盖尔·威廉姆斯", 195, "地", ["混沌", "恶"], 12100, 13770, 13245, 15086, 1,1,0, "BusterSingle1", 0, 0, "", 1.5, [], {cardBuff: 8, damagePlus: 175});
    initialServant(5,"Foreigner", "葛饰北斋", 198, "人", ["混沌", "中庸"], 12100, 13230, 13245, 14494, 3,5,0.33, "ArtsAll1", 150, 200, "NpSpecialAttack", 1, [6,13,20,26], {cardBuff: 4, damagePlus: 175});
    initialServant(5,"Foreigner", "杨贵妃", 275, "人", ["混沌", "善"], 12342, 13365, 13510, 14642, 1,4,0.51, "ArtsSingle1", 150, 200, "NpSpecialAttack", 1, [10,20,30], {damagePlus: 175});
    /******************************************4星********************************************************************/
    initialServant(4,"Foreigner", "谜之女主角XX", 222, "星", ["秩序", "善"], 9751, 11250, 11806, 13640, 1,4,0.64, "ArtsSingle1", 20, 60, "OcAttackBuff", 1, [10,20,30]);
}
