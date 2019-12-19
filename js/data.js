"use strict";
var servants = [];//定义数组
var id = 0;


function intialData() {
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
    initAss();
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
* @param {String} career 职介
* @param {String} name 从者名
* @param {Number} servantNo 从者编号(茹西教王的理想鄉和wiki从者编号都一样的)
* @param {String} camp 阵营
* @param {Array} attributes 属性
* @param {Number} atk ATK
* @param {Number} hp HP
* @param {Number} maxAtk 100级ATK
* @param {Number} maxHp  100级HP
* @param {Number} target 宝具目标数
* @param {Number} hit 宝具hit数
* @param {Number} np 宝具np获取率
* @param {Number} tl1 1宝倍率
* @param {Number} tl2 2宝倍率
* @param {Number} tl3 3宝倍率
* @param {Number} tl4 4宝倍率
* @param {Number} tl5 5宝倍率
* @param {Number} oc1 100 OC
* @param {Number} oc2 200 OC
* @param {Number} oc3 300 OC
* @param {Number} oc4 400 OC
* @param {Number} oc5 500 OC
* @param {String} type 特攻类型，目前有以下8种
*    TreasureSpecialAttack：宝具特攻
*    SpecialAttackPowerBuff：特攻威力Buff，比如杰克女性特攻
*    ""：无特攻
*    TreasureSpecialRemainHpAttack：双子宝具特攻
*    TreasureSpecialExplosionAttack：自爆弓宝具特攻
*    TreasureSpecialCardPowerAttack：R金时OC绿魔放
*    TreasureSpecialAtkPowerAttack：B兰OC加攻
*    TreasurePowerBuff：宫本半藏OC宝具威力提升
*    TreasureCombinedDown：灾星简降防降色卡耐性
* @param {Number} cardColor 卡牌倍率(B卡：1.5，A卡：1，Q卡：0.8)
* @param {Object} careerSkill 职介技能(比如狂化EX、神性Debuff) 
*    cardColor: 0.8(Quick)，1(Arts)，1.5(Buster)，0(All)，-1(None)，-2(Quick和Arts)，-3(Buster和Quick), -4 (Buster和Arts)
*    cardBuff: 10(卡牌Buff), 
*    fixedDamageBuff: 0(神性Debuff), 
* @param {Object} treasureSideEffect 宝具副效果(oc特攻只能显示一种副效果，所以剩余其他的副效果存储到这个对象里)
*    treasurePowerBuff：宝具威力buff
*    cardPowerBuff：卡牌buff
*    specialAttack: 宝具特攻
*/
function initialServant(star,career, name,servantNo, camp, attributes, atk, hp, maxAtk, maxHp, target, hit, np, tl1, tl2, tl3, tl4, tl5, oc1, oc2, oc3, oc4, oc5, type, cardColor, careerSkill, treasureSideEffect) {
    //id++;//下标最好还是从0开始
    let tl = {};
    tl["tl1"] = tl1;
    tl["tl2"] = tl2;
    tl["tl3"] = tl3;
    tl["tl4"] = tl4;
    tl["tl5"] = tl5;

    let oc = {};
    oc["oc1"] = oc1;
    oc["oc2"] = oc2;
    oc["oc3"] = oc3;
    oc["oc4"] = oc4;
    oc["oc5"] = oc5;

    oc["type"] = type;

    let model = {
        id: id,
        star:star,
        career: career,
        name: name,
        servantNo: servantNo,
        camp: camp,
        attributes: attributes,
        atk: atk,
        hp: hp,
        maxAtk: maxAtk,
        maxHp: maxHp,
        target: target,
        hit: hit,
        np: np,
        tl: tl,
        oc: oc,
        cardColor: cardColor,
        careerSkill: careerSkill,
        treasureSideEffect: treasureSideEffect
    }
    servants[id] = model;
    id++;
}

function initSaber(){
    initialServant(5,"Saber", "阿尔托莉雅·潘德拉贡", 2, "地", ["秩序", "善"], 11221, 15150, 12283, 16597, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Saber", "阿尔提拉", 8, "人", ["混沌", "善"], 12343, 13907, 13511, 15236, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 175});
    initialServant(5,"Saber", "沖田総司", 68, "人", ["中立", "中庸"], 12068, 13225, 13210, 14489, 1,3,1.09, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 2, fixedDamageBuff: 0});
    initialServant(5,"Saber", "莫德雷德", 76, "地", ["混沌", "中庸"], 11723, 14680, 12833, 16083, 3,1,0, 400, 500, 550, 575, 600, 180, 190, 200, 210, 220, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Saber", "尼禄・克劳狄乌斯〔花嫁〕", 90, "人", ["混沌", "花嫁"], 11607, 14248, 12706, 15609, 1,2,0.7, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Saber", "两仪式", 91, "人", ["中立", "中庸"], 10721, 15453, 11736, 16929, 3,1,0.84, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 0, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(5,"Saber", "两仪式EN", 91, "人", ["中立", "中庸"], 10721, 15453, 11736, 16929, 3,1,0.84, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 0, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(5,"Saber", "宫本武藏", 153, "人", ["混沌", "善"], 12037, 13635, 13176, 14938, 1,1,0, 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Saber", "亚瑟・潘德拉贡〔Prototype〕", 160, "地", ["秩序", "善"], 12465, 13975, 13645, 15310, 3,1,0, 300, 400, 450, 475, 500, 10, 20, 30, 40, 50, "TreasurePowerBuff", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Saber", "齐格鲁德", 213, "地", ["中立","善"], 12465, 13975, 13645, 15310, 1,1,0, 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 175});
    initialServant(5,"Saber", "剪舌麻雀的红阎魔", 234, "地", ["秩序", "善"], 11607, 13960, 12706, 15294, 1,5,0.56, 900, 1200, 1350, 1425, 1500, 40, 45, 50, 55, 60, "SpecialAttackPowerBuff", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(5,"Saber", "阿斯托尔福", 270, "地", ["混沌", "善"], 11694, 14248, 12801, 15609, 1,9,0.52, 1200, 1600, 1800, 1900, 2000, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
/******************************************4星********************************************************************/
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Alter〕",3, "人", ["秩序", "恶"], 10248, 11589, 12408, 14051, 3,1,0, 450, 550, 600, 625, 650, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Lily〕", 4, "地", ["秩序", "善"], 7726, 10623, 9355, 12880, 3,1,0, 400, 550, 625, 662.5, 700, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Lily〕EN", 4, "地", ["秩序", "善"], 7726, 10623, 9355, 12880, 3,1,0, 300, 450, 525, 562.5, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Saber", "尼禄・克劳狄乌斯", 5, "人", ["混沌", "善"], 9449, 11753, 11441, 14250, 3,1,0.84, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Saber", "齐格弗里德", 6, "地", ["混沌", "善"], 8181, 14165, 9905, 17175, 3,1,0, 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Saber", "罗摩", 101, "天", ["秩序", "善"], 9854, 11993, 11931, 14541, 1,1,0, 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 200});
    initialServant(4,"Saber", "兰斯洛特", 121, "地", ["秩序", "善"], 9949, 11589, 12046, 14051, 1,1,0.83, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0}, { cardPowerBuff: 30 });
    initialServant(4,"Saber", "高文", 123, "地", ["秩序", "善"], 10173, 11419, 12317, 13845, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Saber", "伊丽莎白・巴陶里〔勇者〕", 138, "地", ["混沌", "善"], 9899, 11248, 11986, 13638, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Saber", "铃鹿御前", 165, "天", ["中立", "恶"], 9544, 11753, 11556, 14250, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 200});
    initialServant(4,"Saber", "弗兰肯斯坦", 176, "地", ["中立", "夏"], 9353, 11993, 11325, 14541, 1,5,0.7, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -3, cardBuff: "2|12", fixedDamageBuff: 0});
    initialServant(4,"Saber", "柳生但马守宗矩", 187, "人", ["秩序", "中庸"], 9999, 11135, 12107, 13501, 1,4,0.81, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Saber", "女王梅芙", 221, "地", ["混沌", "恶"], 8017, 13609, 9707, 16501, 1,6,0.72, 900, 1200, 1350, 1425, 1500, 0,0,0,0,0, "", 1, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});	
    initialServant(4,"Saber", "迪尔姆德·奥迪那", 223, "地",["秩序","中庸"], 10048, 11362 , 12166, 13776, 1,10,0.73, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Saber", "拉克什米・芭伊", 245, "人", ["秩序", "善"], 9949, 11362, 12046, 13776, 3,4,1.01, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 200});
    initialServant(4,"Saber", "葛飾北齋", 264, "人", ["混沌", "善"], 9389, 11873, 11368, 14396, 1,8,0.46, 900, 1200, 1350, 1425, 1500, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 100});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Saber", "盖乌斯・尤里乌斯・凯撒", 7, "人", ["中立", "中庸"], 7497, 9595, 10146, 13009, 1,10,1.1, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 150});
    initialServant(3,"Saber", "弗格斯・马克・罗伊", 72, "地", ["秩序", "中庸"], 7460, 9786, 10096, 13268, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Saber", "贝狄威尔", 126, "星", ["秩序", "善"], 7627, 9595, 10322, 13009, 1,1,0, 800, 1000, 1100, 1150, 1200, 30, 45, 60, 75, 90, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(1,"Saber", "伊阿宋", 254, "地", ["秩序", "善"], 5457, 7575, 8479, 11677, 3,5,0.37, 450, 600, 675, 712.5, 750, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});

}


function initArcher(){
   
    //----------------------------------Archer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Archer", "吉尔伽美什", 12, "天", ["混沌", "善"], 12280, 13097, 13442, 14348, 3,1,0, 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175}, { treasurePowerBuff: 30 });
    initialServant(5,"Archer", "俄里翁", 60, "天", ["混沌", "中庸"], 11107, 14553, 12158, 15943, 1,5,1, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Archer", "尼古拉・特斯拉", 77, "星", ["混沌", "善"], 11781, 13825, 12896, 15146, 3,1,0, 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Archer", "阿周那", 84, "天", ["秩序", "中庸"], 12342, 13230, 13510, 14494, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175});
    initialServant(5,"Archer", "阿尔托莉雅・潘德拉贡〔Archer〕", 129, "地", ["秩序", "善"], 11276, 14553, 12343, 15943, 1,10,0.59, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(5,"Archer", "伊修塔尔", 142, "天", ["秩序", "善"], 12252, 13965, 13412, 15299, 3,1,0, 400, 500, 550, 575, 600, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 225});
    initialServant(5,"Archer", "伊修塔尔EN", 142, "天", ["秩序", "善"], 12252, 13965, 13412, 15299, 3,1,0, 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 225});
    initialServant(5,"Archer", "詹姆斯·莫里亚蒂", 156, "人", ["混沌", "恶"], 11781, 13685, 12896, 14992, 1,1,0, 600, 800, 900, 950, 1000, 20, 25, 30, 35, 40,"TreasureSpecialDefReduceAttck", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Archer", "拿破仑", 212, "星", ["中立", "善"], 12033, 13097, 13172, 14348, 3,1,0, 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Archer", "拿破仑EN", 212, "星", ["中立", "善"], 12033, 13097, 13172, 14348, 3,1,0, 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Archer", "贞德（Archer）", 216, "人", ["秩序", "夏"], 10525, 15743, 11521, 17247, 3,4,0.68, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    /******************************************4星********************************************************************/
    initialServant(4,"Archer", "卫宫", 11, "人", ["中立", "中庸"], 9398, 11521, 11379, 13969, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "阿塔兰忒", 14, "地", ["中立", "恶"], 8633, 12476, 10453, 15127, 3,10,0.5, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "织田信长", 69, "人", ["中立", "中庸"], 9494, 11637, 11495, 14110, 3,1,0, 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "特里斯坦", 122, "地", ["秩序", "善"], 9735, 11637, 11787, 14110, 1,7,0.58, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "安妮・伯妮&玛丽・里德", 131, "人", ["混沌", "中庸"], 9446, 11521, 11437, 13969, 1,1,0, 600, 800, 900, 950, 1000, 600, 600, 600, 600, 600, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "克洛伊·冯·爱因兹贝伦", 137, "天", ["混沌", "善"], 9845, 10914, 11920, 13233, 1,6,0.38, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "卫宫〔Alter〕", 157, "人", ["混沌", "恶"], 8996, 12250, 10892, 14853, 1,10,0.43, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "卫宫〔Alter〕EN", 157, "人", ["混沌", "恶"], 8996, 12250, 10892, 14853, 1,10,0.43, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "海伦娜・布拉瓦茨基", 180, "人", ["混沌", "善"], 9446, 11404, 11437, 13827, 3,4,0.38, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Archer", "巴御前", 184, "地", ["中立", "中庸"], 9946, 10804, 12043, 13100, 1,1,0, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 1.5, { cardColor:1.5, cardBuff: 2, fixedDamageBuff: 0});
    initialServant(4,"Archer", "巴御前EN", 184, "地", ["中立", "中庸"], 9946, 10804, 12043, 13100, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor:1.5, cardBuff: 2, fixedDamageBuff: 0});
    initialServant(4,"Archer", "阿提拉·the·圣〔诞〕", 197, "星", ["混沌", "善"], 9759, 11637, 11816, 14110, 1,10,0.59, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor:0.8, cardBuff: 12, fixedDamageBuff: 175});
    initialServant(4,"Archer", "浅上藤乃", 200, "人", ["秩序", "恶"], 10299, 11025, 12470, 13368, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor:1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Archer", "喀戎", 207, "天", ["秩序", "善"], 9294, 12250, 11253, 14853, 1,4,0.68, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150});
    initialServant(4,"Archer", "马嘶", 248, "天", ["混沌", "中庸"], 10249, 11245, 12409, 13634, 1,1,0, 600, 800, 900, 950, 1000, 600, 700, 800, 900, 1000, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: 1.5, cardBuff: 5, fixedDamageBuff: 210});
    initialServant(4,"Archer", "刑部姬", 262, "地", ["中立", "夏"], 8895, 12476, 10770, 15127, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 145});
    initialServant(4,"Archer", "灾星简", 269, "人", ["混沌", "中庸"], 8996, 12495, 10892, 15150, 1,5,0.71, 1200, 1600, 1800, 1900, 2000, 10, 15, 20, 25, 30, "TreasureCombinedDown", 0.8, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(4,"Archer", "南丁格尔（圣诞）", 271, "人", ["秩序", "善"], 9859, 11080, 11936, 13434, 3,6,0.6, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Archer", "罗宾汉", 13, "人", ["中立", "善"], 6715, 10187, 9088, 13812, 1,1,0.87, 900, 1200, 1350, 1425, 1500, 200, 212.5, 225, 237.5, 250, "TreasureSpecialAttack", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Archer", "尤瑞艾莉", 15, "天", ["混沌", "善"], 7032, 9506, 9517, 12889, 1,1,0.9, 1200, 1200, 1200, 1200, 1200, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 300}, { specialAttack: 250});
    initialServant(3,"Archer", "大卫", 63, "天", ["秩序", "中立"], 7736, 8643, 10470, 11719, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Archer", "幼吉尔", 95, "天", ["混沌", "善"], 7696, 8731, 10415, 11838, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175});
    initialServant(3,"Archer", "比利小子", 105, "人", ["混沌", "中庸"], 6890, 9506, 9325, 12889, 1,3,0.56, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 7, fixedDamageBuff: 0});
    initialServant(3,"Archer", "俵藤太", 125, "人", ["中立", "善"], 7032, 9800, 9517, 13287, 3,1,0, 400, 500, 550, 575, 600, 50, 62.5, 75, 87.5, 100, "SpecialAttackPowerBuff", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Archer", "威廉泰尔", 246, "人", ["秩序", "善"], 7384, 9310, 9993, 12623, 1,3,0.66, 900, 1200, 1350, 1425, 1500, 200, 212.5, 225, 237.5, 250, "TreasureSpecialAttack", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(2,"Archer", "帕里斯", 255, "地", ["中立", "中庸"], 6523, 7834, 9452, 11306, 1,5,0.43, 1200, 1600, 1800, 1900, 2000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(1,"Archer", "阿拉什", 16, "地", ["混沌", "中庸"], 5816, 7122, 9037, 10979, 3,1,0, 800, 1000, 1100, 1150, 1200, 0, 200, 400, 600, 800, "TreasureSpecialExplosionAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
}

function initLancer(){
    //----------------------------------Lancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Lancer", "斯卡哈", 70, "星", ["秩序", "善"], 11375, 14825, 12452, 16241, 1,1,0.71, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Lancer", "迦尔纳", 85, "天", ["秩序", "善"], 11976, 13632, 13110, 14934, 3,1,0, 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 200});
    initialServant(5,"Lancer", "布伦希尔德", 88, "天", ["中立", "善"], 11432, 14825, 12514, 16241, 1,1,0, 800, 1000, 1100, 1150, 1200, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 100});
    initialServant(5,"Lancer", "阿尔托莉雅・潘德拉贡〔Lancer〕", 119, "天", ["秩序", "善"], 10995, 15606, 12036, 17097, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(5,"Lancer", "玉藻前", 128, "天", ["中立", "夏"], 10726, 15147, 11741, 16594, 1,1,0, 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -2, cardBuff: "10|10", fixedDamageBuff: 230});
    initialServant(5,"Lancer", "恩奇都", 143, "天", ["中立", "中庸"], 10780, 15300, 11800, 16762, 1,1,0, 800, 1000, 1100, 1150, 1200, 30, 35, 40, 45, 50, "TreasureSpecialDefReduceAttck", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0}, { specialAttack: 200});
    initialServant(5,"Lancer", "恩奇都EN", 143, "天", ["中立", "中庸"], 10780, 15300, 11800, 16762, 1,1,0, 600, 800, 900, 950, 1000, 20, 25, 30, 35, 40, "TreasureSpecialDefReduceAttck", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Lancer", "艾蕾什基伽尔", 196, "地", ["混沌", "恶"], 10343, 16065, 11322, 17600, 3,1,0, 300, 400, 450, 475, 500, 10, 20, 30, 40, 50, "TreasureSpecialCardPowerAttack", 1.5, { cardColor:1, cardBuff: 11, fixedDamageBuff: 225});
    initialServant(5,"Lancer", "布拉达曼特", 232, "地", ["秩序", "善"], 10833, 15682, 11858, 17180, 3,5,0.7,600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    
    /******************************************4星********************************************************************/
    initialServant(4,"Lancer", "伊丽莎白・巴陶里", 18, "人", ["混沌", "恶"], 9122, 11870, 11045, 14392, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "伊丽莎白・巴陶里EN", 18, "人", ["混沌", "恶"], 9122, 11870, 11045, 14392, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "阿尔托莉雅・潘德拉贡〔Alter〕", 78, "天", ["秩序", "善"], 9968, 11761, 12069, 14260, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "芬恩・麦克库尔", 87, "天", ["中立", "中庸"], 8930, 12750, 10812, 15459, 3,3,0.55, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 125});
    initialServant(4,"Lancer", "神枪 李书文", 102, "人", ["中立", "恶"], 9653, 11360, 11688, 13774, 1,3,0.52, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "神枪 李书文EN", 102, "人", ["中立", "恶"], 9653, 11360, 11688, 13774, 1,3,0.52, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "清姬", 134, "地", ["混沌", "恶"], 8936, 11870, 10820, 14392, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "弗拉德三世〔Extra〕", 140, "人", ["秩序", "善"], 8775, 13005, 10625, 15769, 1,1,0, 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "贞德・Alter・Santa・Lily", 141, "人", ["混沌", "善"], 9261, 11870, 11213, 14392, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "美杜莎〔Lancer〕", 146, "地", ["中立", "善"], 8253, 13119, 9993, 15907, 1,8,0.44, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 250});
    initialServant(4,"Lancer", "源赖光", 181, "天", ["秩序", "善"], 9168, 12112, 11100, 14686, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -3, cardBuff: "6|11", fixedDamageBuff: 150});
    initialServant(4,"Lancer", "帕尔瓦蒂", 183, "天", ["秩序", "善"], 8127, 13253, 9840, 16069, 3,4,1.08, 600, 800, 900, 950, 1000,0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 225});
    initialServant(4,"Lancer", "哪吒", 193, "天", ["中立", "善"], 9284, 12112, 11241, 14686, 3,1,0, 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "瓦尔基里", 214, "天", ["秩序", "善"], 8037, 14025, 9731, 17005, 3,7,0.86, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor : -1, cardBuff:0, fixedDamageBuff: 200});
    initialServant(4,"Lancer", "茨木童子(Lancer)", 217, "地", ["混沌", "恶"], 9133, 12354, 11058, 14979, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardPowerBuff: 4, fixedDamageBuff: 0});
    initialServant(4,"Lancer", "長尾景虎", 252, "人", ["秩序", "善"], 9617, 11360, 11644, 13774, 1,8,0.45, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 150});
    initialServant(4,"Lancer", "謎之Alterego・Λ", 266, "地", ["秩序", "善"], 9261, 11749, 11213, 14246, 3,3,0.76, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 200});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Lancer", "库・丘林", 17, "天", ["秩序", "中庸"], 7239, 9593, 9797, 13007, 1,1,1.07, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175});
    initialServant(3,"Lancer", "库・丘林EN", 17, "天", ["秩序", "中庸"], 7239, 9593, 9797, 13007, 1,1,1.07, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175});
    initialServant(3,"Lancer", "库・丘林〔Prototype〕", 20, "天", ["秩序", "中庸"], 7082, 10098, 9584, 13691, 1,1,1.08, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175});
    initialServant(3,"Lancer", "罗穆路斯", 22, "星", ["混沌", "中立"], 7239, 9883, 9797, 13400, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Lancer", "赫克托耳", 64, "人", ["秩序", "中立"], 6928, 10200, 9376, 13829, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Lancer", "迪尔姆德・奥迪纳", 71, "地", ["秩序", "中庸"], 6877, 10098, 9307, 13691, 1,2,0.79, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Lancer", "豹人", 148, "地", ["混沌", "中庸"], 7022, 9593, 9503, 13007, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 2, fixedDamageBuff: 200});
    initialServant(2,"Lancer", "加雷斯", 256, "地", ["秩序", "善"], 5413, 9537, 7844, 13764, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
}


function initRider(){
    //----------------------------------Rider---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Rider", "弗朗西斯・德雷克", 65, "星", ["混沌", "恶"], 11326, 12830, 12398, 14056, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Rider", "女王梅芙", 99, "地", ["混沌", "恶"], 10296, 13968, 11270, 15303, 1,1,0, 800, 1000, 1100, 1150, 1200, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(5,"Rider", "伊斯坎达尔", 108, "人", ["中立", "善"], 11560, 13219, 12654, 14482, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 150});
    initialServant(5,"Rider", "奥兹曼迪亚斯", 118, "天", ["混沌", "中庸"], 11971, 12830, 13104, 14056, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 175});
    initialServant(5,"Rider", "魁札尔·科亚特尔", 144, "天", ["秩序", "善"], 12001, 12960, 13137, 14198, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 300});
    initialServant(5,"Rider", "阿尔托莉雅・潘德拉贡〔Alter〕", 179, "人", ["秩序", "恶"], 10776, 14256, 11796, 15618, 1,6,0.59, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Rider", "伊凡雷帝", 205, "人", ["秩序", "恶"], 11619, 13284, 12719, 14553, 3,1,0, 400, 500, 550, 575, 600, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1.5, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(5,"Rider", "伊凡雷帝EN", 205, "人", ["秩序", "恶"], 11619, 13284, 12719, 14553, 3,1,0, 300, 400, 450, 475, 500, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1.5, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(5,"Rider", "阿喀琉斯", 206, "地", ["秩序", "中庸"], 11883, 13219, 13008, 14482, 3,5,0.57, 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 150});
    initialServant(5,"Rider", "李奧納多・達文西", 253, "人", ["秩序", "善"], 10883, 14112, 11913, 15460, 3,3,0.49, 450, 600, 675, 712.5, 750, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1, { cardColor: -2, cardBuff: "8|6", fixedDamageBuff: 230});
    initialServant(5,"Rider", "欧罗巴", 274, "天", ["中立", "善"], 11737, 12571, 12848, 13772, 3,1,0, 300, 400, 450, 475, 500, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 0.8, cardBuff: "11", fixedDamageBuff: 150});
    /******************************************4星********************************************************************/
    initialServant(4,"Rider", "玛丽・安托瓦内特", 29, "人", ["秩序", "善"], 8293, 12348, 10041, 14972, 3,5,1, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0});
    initialServant(4,"Rider", "玛丽・安托瓦内特EN", 29, "人", ["秩序", "善"], 8293, 12348, 10041, 14972, 3,5,1, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0});
    initialServant(4,"Rider", "马大", 30, "人", ["秩序", "善"], 8014, 13068, 9703, 15845, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11.5, fixedDamageBuff: 150}, {cardPowerBuff : 20});
    initialServant(4,"Rider", "马大EN", 30, "人", ["秩序", "善"], 8014, 13068, 9703, 15845, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11.5, fixedDamageBuff: 150});
    initialServant(4,"Rider", "安妮・伯妮&玛丽・里德", 66, "人", ["混沌", "恶"], 9029, 11286, 10932, 13684, 1,6,0.84, 1600, 2000, 2200, 2300, 2400, 1200, 1400, 1600, 1800, 2000, "TreasureSpecialRemainHpAttack", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Rider", "阿尔托莉雅・潘德拉贡〔Santa Alter〕", 73, "人", ["秩序", "善"], 9258, 11286, 11209, 13684, 3,1,0, 450, 550, 600, 625, 650, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(4,"Rider", "阿斯托尔福", 94, "地", ["混沌", "善"], 8937, 11172, 10821, 13546, 3,1,0.66, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0});
    initialServant(4,"Rider", "坂田金时", 115, "地", ["秩序", "善"], 9819, 10800, 11889, 13095, 1,4,1.15, 1200, 1600, 1800, 1900, 2000, 10, 30, 50, 70, 90, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150});
    initialServant(4,"Rider", "莫德雷德", 132, "地", ["混沌", "善"], 9212, 11400, 11154, 13822, 3,5,0.71, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 5, fixedDamageBuff: 0});
    initialServant(4,"Rider", "伊修塔尔", 182, "天", ["秩序", "善"], 9603, 10692, 11627, 12964, 3,4,0.68, 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 225});
    initialServant(4,"Rider", "坂本龙马", 211, "人", ["中立", "中庸"], 8555, 11880, 10358, 14404, 1,4,0.56, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 170});
    initialServant(4,"Rider", "卡米拉", 263,  "地", ["中立", "恶"], 9651, 10476, 11685, 12702, 3,4,0.52, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Rider", "美杜莎", 23, "地", ["混沌", "善"], 7200, 8937, 9744, 12117, 3,1,0.58, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 95});
    initialServant(3,"Rider", "美杜莎EN", 23, "地", ["混沌", "善"], 7200, 8937, 9744, 12117, 3,1,0.58, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 95});
    initialServant(3,"Rider", "牛若丸", 27, "人", ["混沌", "中庸"], 7076, 9028, 9576, 12240, 1,1,0.87, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0});
    initialServant(3,"Rider", "亚历山大", 28, "人", ["中立", "善"], 7356, 8640, 9955, 11714, 3,1,0.86, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 100});
    initialServant(3,"Rider", "克里斯托弗·哥伦布", 172, "人", ["中立", "恶"], 6552, 9600, 8867, 13016, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Rider", "克里斯托弗·哥伦布EN", 172, "人", ["中立", "恶"], 6552, 9600, 8867, 13016, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Rider", "赤兔马", 231, "地", ["中立", "中庸"], 6434, 10483, 8708, 14214, 3,4,0.57, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(3,"Rider", "曼迪卡尔多", 273, "人", ["中立", "中庸"], 6756, 9600, 9143, 13016, 1,4,0.86, 900, 1200, 1350, 1425, 1500, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(2,"Rider", "聖喬治", 24, "人", ["秩序", "善"], 5236, 9200, 7587, 13278, 1,4,0.85, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(2,"Rider", "爱德华・蒂奇", 25, "人", ["混沌", "恶"], 6188, 7907, 8967, 11411, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(2,"Rider", "爱德华・蒂奇EN", 25, "人", ["混沌", "恶"], 6188, 7907, 8967, 11411, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(1,"Rider", "巴沙洛繆・羅伯茨", 257, "人", ["混沌","恶"], 5461, 6720, 8485, 10359, 3,6,0.65, 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: 0.8, cardBuff: 4, fixedDamageBuff: 0});
}

function initCaster(){
    //----------------------------------Caster---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Caster", "玄奘三藏", 113, "人", ["秩序", "善"], 11658, 12965, 12761, 14204, 1,1,0, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 11, fixedDamageBuff: 125});
    initialServant(5,"Caster", "莱昂纳多・达・芬奇", 127, "星", ["混沌", "善"], 10598, 14259, 11601, 15621, 3,1,0.54, 600, 750, 825, 862.5, 900, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(5,"Caster", "莱昂纳多・达・芬奇EN", 127, "星", ["混沌", "善"], 10598, 14259, 11601, 15621, 3,1,0.54, 450, 600, 675, 712.5, 750, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(5,"Caster", "伊莉雅斯菲尔", 136, "人", ["中立", "善"], 10857, 13825, 11885, 15146, 1,1,0, 800, 1000, 1100, 1150, 1200, 20, 40, 60, 80, 100, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Caster", "山鲁佐德", 169, "人", ["秩序", "中庸"], 9212, 15846, 10084, 17360, 3,5,0.51, 600, 750, 825, 862.5, 900, 200, 225, 250, 275, 300, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 11.5, fixedDamageBuff: 0}, { treasurePowerBuff: 20 });
    initialServant(5,"Caster", "山鲁佐德EN", 169, "人", ["秩序", "中庸"], 9212, 15846, 10084, 17360, 3,5,0.51, 450, 600, 675, 712.5, 750, 200, 225, 250, 275, 300, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 11.5, fixedDamageBuff: 0}, { treasurePowerBuff: 20 });
    initialServant(5,"Caster", "尼禄・克劳狄乌斯", 175, "人", ["混沌", "夏"], 10857, 13685, 11885, 14992, 3,1,0, 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, { cardColor: -2, cardBuff: "8|11", fixedDamageBuff: 0});
    initialServant(5,"Caster", "阿纳斯塔西娅", 201, "人", ["中立","中庸"], 10546, 14259, 11544, 15621, 3,4,0.51, 450, 600 ,675, 712.5, 750, 0, 0, 0, 0, 0, "", 1,{ cardColor: 1, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(5,"Caster", "紫式部", 237, "人", ["中立","中庸"], 11374, 12833, 12451, 14059, 3,6,0.45, 450, 600 ,675, 712.5, 750, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1,{ cardColor: 1, cardBuff: 7, fixedDamageBuff: 0});
    /******************************************4星********************************************************************/
    initialServant(4,"Caster", "伊丽莎白・巴陶里〔万圣节〕", 61, "人",["混沌","恶"], 8616, 11404, 10432, 13827, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Caster", "童谣", 74, "人",["中立","中庸"], 8629, 11882, 10448, 14407, 3,3,0.54, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(4,"Caster", "海伦娜・布拉瓦茨基", 100, "人",["混沌","善"], 8629, 11882, 10448, 14407, 3,3,0.45, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(4,"Caster", "托马斯・爱迪生", 103, "人",["秩序","中庸"], 7952, 11882, 9628, 14407, 3,1,0.51, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 4, fixedDamageBuff: 0});
    initialServant(4,"Caster", "尼托克丽丝", 120, "地", ["秩序", "善"], 9060, 11288, 10970, 13686, 3,3,0.54, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 175});
    initialServant(4,"Caster", "玛丽・安托瓦内特", 130, "人", ["秩序", "善"], 9060, 11404, 10970, 13827, 3,3,0.32, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(4,"Caster", "吉尔伽美什〔Caster〕", 145, "人",["秩序", "善"], 8460, 12005, 10243, 14556, 3,10,0.16, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 175});
    initialServant(4,"Caster", "喀耳刻", 192, "天",["混沌","中庸"], 8671, 12250, 10499, 14853, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Caster", "示巴女王", 194, "人",["中立","善"], 8629, 12127, 10448, 14704, 1,5,0.81, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Caster", "齐格", 208, "人",["中立","善"], 8394, 11288, 10163, 13686, 3,3,0.78, 450, 600, 675, 712.5, 750, 20, 25, 30, 35, 40, "TreasureSpecialDefReduceAttck", 1, { cardColor: 1, cardBuff: 6.5, fixedDamageBuff: 0});
    initialServant(4,"Caster", "酒吞童子（Caster）", 225, "地", ["混沌", "恶"], 9538, 11025, 11549, 13368, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 150});
	
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Caster", "美狄亚", 31, "地",["中立","恶"], 7418, 8643, 10039, 11719, 1,1,1.64, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(3,"Caster", "吉尔・德・雷", 32, "人",["混沌","恶"], 6514, 9506, 8816, 12889, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Caster", "梅菲斯托费勒斯", 35, "地",["混沌","恶"], 6839, 9216, 9255, 12495, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 7, fixedDamageBuff: 0});
    initialServant(3,"Caster", "库・丘林", 38, "天",["秩序","中庸"], 6580, 9604, 8905, 13022, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 175}, { cardPowerBuff: 20 });
    initialServant(3,"Caster", "库・丘林EN", 38, "天",["秩序","中庸"], 6580, 9604, 8905, 13022, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 175});
    initialServant(3,"Caster", "冯・霍恩海姆・帕拉塞尔苏斯", 79, "人",["混沌","善"], 6711, 9506, 9082, 12889, 3,3,0.55, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(3,"Caster", "查尔斯・巴贝奇", 80, "人",["混沌","中庸"], 5996, 10887, 8115, 14761, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Caster", "杰罗尼莫", 104, "人",["中立","善"], 6857, 9123, 9280, 12369, 3,1,0.9, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Caster","阿维斯布隆",203, "人",["秩序","中庸"], 6376, 9981, 8629, 13533, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(2,"Caster", "威廉・莎士比亚", 34, "人",["中立","中庸"], 5798, 8080, 8402, 11661, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(2,"Caster", "陳宮", 258, "人",["混沌","善"], 6119, 7755, 8867, 11192, 3,4,0.4, 900, 1200, 1350, 1425, 1500, 0, 225, 450, 675, 900, "TreasureSpecialExplosionAttack", 1, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0});
}


function initAss(){
    //----------------------------------Assassin---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Assassin", "开膛手杰克", 75, "地",["混沌","恶"], 11557, 12696, 12651, 13909, 1,4,1.07, 1400, 1800, 2000, 2100, 2200, 50, 62.5, 75, 87.5, 100, "SpecialAttackPowerBuff", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Assassin", "谜之女主角X", 86, "星",["混沌","善"], 11761, 12696, 12874, 13909, 1,12,0.81, 1600, 2000, 2200, 2300, 2400, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(5,"Assassin", "酒吞童子", 112, "地",["混沌","恶"], 11993, 12825, 13128, 14050, 3,1,0.55, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150});
    initialServant(5,"Assassin", "酒吞童子EN", 112, "地",["混沌","恶"], 11993, 12825, 13128, 14050, 3,1,0.55, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150});
    initialServant(5,"Assassin", "克利奥帕特拉", 139, "人",["秩序","中庸"], 11088, 13402, 12138, 14682, 3,1,0, 400, 500, 550, 575, 600, 30, 40, 50, 60, 70, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 125});
    initialServant(5,"Assassin", "克利奥帕特拉EN", 139, "人",["秩序","中庸"], 11088, 13402, 12138, 14682, 3,1,0, 300, 400, 450, 475, 500, 30, 40, 50, 60, 70, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 125});
    initialServant(5,"Assassin", "“山之翁”", 154, "人",["秩序","恶"], 11848, 13338, 12969, 14612, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Assassin", "賽米拉米斯", 199, "地",["秩序","惡"], 11309, 13266, 12379, 14533, 3,1,0, 400, 500, 550, 575, 600, 10, 20, 30, 40, 50, "TreasurePowerBuff", 1.5, { cardColor: 1, cardBuff: 12, fixedDamageBuff: 150});
    initialServant(5,"Assassin", "賽米拉米斯EN", 199, "地",["秩序","惡"], 11309, 13266, 12379, 14533, 3,1,0, 300, 400, 450, 475, 500, 10, 20, 30, 40, 50, "TreasurePowerBuff", 1.5, { cardColor: 1, cardBuff: 12, fixedDamageBuff: 150});
    initialServant(5,"Assassin", "李书文", 235, "人",["中立","恶"], 11470, 12568, 12556, 13769, 1,1,0.99, 900, 1200, 1350, 1425, 1500, 20, 25, 30, 35, 40, "TreasureSpecialDefReduceAttck", 1, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Assassin", "伽摩", 239, "天",["混沌","恶"], 11528, 12889, 12619, 14120, 1,10,0.74, 1200, 1600, 1800, 1900, 2000, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 225});
    /******************************************4星********************************************************************/
    initialServant(4,"Assassin", "卡米拉", 46, "地",["混沌","恶"], 9408, 10473, 11391, 12698, 1,1,0, 800, 1000, 1100, 1150, 1200, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "卡米拉EN", 46, "地",["混沌","恶"], 9408, 10473, 11391, 12698, 1,1,0, 600, 800, 900, 950, 1000, 120, 132.5, 145, 157.5, 170, "TreasureSpecialAttack", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "两仪式〔Assassin〕", 92, "人",["混沌","善"], 8867, 11055, 10736, 13404, 1,3,0.8, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "两仪式EN", 92, "人",["混沌","善"], 8867, 11055, 10736, 13404, 1,3,0.8, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "卫宫〔Assassin〕", 109, "人",["混沌","恶"], 8958, 11168, 10846, 13541, 1,15,0.28, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "斯卡哈", 133, "星",["中立","善"], 9049, 11168, 10956, 13541, 3,5,0.71, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "燕青", 159, "人",["混沌","恶"], 8661, 11637, 10487, 14110, 1,11,0.71, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 5, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "武则天", 170, "人",["秩序","恶"], 8981, 10942, 10874, 13267, 1,4,0.87, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "武则天EN", 170, "人",["秩序","恶"], 8981, 10942, 10874, 13267, 1,4,0.87, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "尼托克丽丝", 177, "天",["秩序","善"], 8812, 11518, 10670, 13965, 3,3,0.78, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 185});
    initialServant(4,"Assassin", "望月千代女", 185, "地",["混沌","恶"], 8510, 11637, 10304, 14110, 1,5,0.8, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "加藤段藏", 188, "地",["中立","中庸"], 8935, 11055, 10818, 13404, 3,1,0, 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "牛若丸", 218, "人",["中立","夏"], 9456, 10580, 11449, 12828, 3,5,0.54, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "虞美人", 230, "地",["秩序","恶"], 7970, 13389, 9650, 16234, 3,1,0, 300, 400, 450, 475, 500, 50, 62.5, 75, 87.5, 100, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "格蕾", 243, "人",["秩序","善"], 9456, 10580, 11449, 12828, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Assassin", "沖田總司", 267, "人",["中立","夏"], 9337, 10366, 11305, 12569, 3,3,0.92, 600, 800, 900, 950, 1000,0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Assassin", "荆轲", 42, "人",["混沌","善"], 7207, 8293, 9754, 11244, 3,1,1.05, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Assassin", "百貌的哈桑", 110, "人",["秩序","恶"], 6686, 9310, 9049, 12623, 1,13,0.38, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Assassin", "风魔小太郎", 117, "人",["混沌","恶"], 7091, 8844, 9597, 11991, 3,5,0.54, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Assassin", "静谧的哈桑", 124, "人",["秩序","恶"], 6636, 9310, 8981, 12623, 1,1,0.53, 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(3,"Assasin", "冈田以藏", 210, "人",["中立", "恶"], 6879, 8844, 9310, 11991, 1,4,0.79, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(2,"Assassin", "咒腕的哈桑", 40, "人",["秩序","恶"], 6280, 7594, 9100, 10960, 1,1,1.07, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(2,"Assassin", "夏尔・亨利・桑松", 43, "人",["秩序","恶"], 5456, 8309, 7906, 11991, 1,1,0, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(2,"Assassin", "歌剧魅影", 44, "地",["混沌","恶"], 5654, 8393, 8193, 12112, 3,1,0.71, 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(1,"Assassin", "佐佐木小次郎", 39, "人",["中立","恶"], 5735, 6220, 8912, 9588, 1,3,1.05, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0}, { cardPowerBuff: 20 });
    initialServant(1,"Assassin", "佐佐木小次郎EN", 39, "人",["中立","恶"], 5735, 6220, 8912, 9588, 1,3,1.05, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(1,"Assassin", "夏綠蒂・科黛", 259, "人",["中立","善"], 5488, 6220, 8528, 9588, 1,1,0.52, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
}


function initBerserker(){
    //----------------------------------Berserker---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Berserker", "坂田金时", 51, "人",["秩序","善"], 12712, 12150, 13915, 13311, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 2, fixedDamageBuff: 125});
    initialServant(5,"Berserker", "弗拉德三世", 52, "地",["混沌","恶"], 11499, 13770, 12587, 15086, 1,10,0.5, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(5,"Berserker", "库・丘林〔Alter〕", 98, "地",["混沌","恶"], 12805, 12210, 14017, 13377, 1,1,0, 600, 800, 900, 950, 1000, 30, 40, 50, 60, 70, "TreasureSpecialAtkPowerAttack", 1.5, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 150});
    initialServant(5,"Berserker", "源赖光", 114, "天",["混沌","善"], 11556, 13500, 12650, 14790, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -3, cardBuff: "12|11", fixedDamageBuff: 150});
    initialServant(5,"Berserker", "谜之女主角X〔Alter〕", 155, "星",["中立","恶"], 11113, 14175, 12165, 15529, 1,9,1.07, 1200, 1600, 1800, 1900, 2000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(5,"Berserker", "土方岁三", 161, "人",["秩序","恶"], 12089, 12028, 13233, 13177, 1,1,0, 800, 1000, 1100, 1150, 1200, 800, 900, 1000, 1100, 1200, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: 1.5, cardBuff: 5, fixedDamageBuff: 0});
    initialServant(5,"Berserker", "土方岁三EN", 161, "人",["秩序","恶"], 12089, 12028, 13233, 13177, 1,1,0, 600, 800, 900, 950, 1000, 600, 700, 800, 900, 1000, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: 1.5, cardBuff: 5, fixedDamageBuff: 0});
    initialServant(5,"Berserker", "项羽", 226, "人",["秩序","中庸"], 11613, 13770, 12712, 15086, 3,5,0.51, 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 0.8, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(5,"Berserker", "阿周那〔Alter〕", 247, "天",["秩序","善恶"], 11669, 13837, 12773, 15159, 3,1,0, 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 250});
    initialServant(5,"Berserker", "宮本武藏", 261, "人",["混沌","善"], 12712, 12150, 13915, 13311, 3,4,0.51, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -3, cardBuff: "12|4", fixedDamageBuff: 125});
    /******************************************4星********************************************************************/
    initialServant(4,"Berserker", "赫拉克勒斯", 47, "天",["混沌","狂"], 10655, 10327, 12901, 12521, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 200});
    initialServant(4,"Berserker", "兰斯洛特", 48, "地",["秩序","狂"], 10477, 10327, 12685, 12521, 3,10,0.5, 600, 800, 900, 950, 1000, 10, 15, 20, 25, 30, "TreasureSpecialAtkPowerAttack", 0.8, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Berserker", "玉藻猫", 58, "地",["混沌","善"], 9026, 11458, 10929, 13893, 3,5,0.71, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Berserker", "弗兰肯斯坦", 82, "地",["混沌","中庸"], 9441, 10687, 11431, 12958, 3,6,0.83, 900, 1100, 1200, 1250, 1300, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 4, fixedDamageBuff: 0});
    initialServant(4,"Berserker", "贝奥武夫", 89, "地",["混沌","善"], 10247, 10327, 12407, 12521, 1,1,0, 700, 900, 1000, 1050, 1100, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 1, fixedDamageBuff: 0});
    initialServant(4,"Berserker", "茨木童子", 116, "地",["混沌","恶"], 9636, 10954, 11667, 13282, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Berserker", "茶茶", 162, "人",["混沌","中庸"], 8945, 11025, 10831, 13368, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 3, fixedDamageBuff: 0});
    initialServant(4,"Berserker", "彭忒西勒亚", 171, "地",["秩序","善"], 10502, 10175, 12716, 12337, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 175});
    initialServant(4,"Berserker", "织田信长", 178, "人",["混沌","夏"], 10146, 10023, 12285, 12153,1,1,0, 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0});
    initialServant(4,"Berserker","阿塔兰忒〔Alter〕", 202, "地", ["混沌","恶"], 9806, 10634, 11873, 12894, 1,5,1.05, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(4,"Berserker","贞德〔Berserker〕", 219, "人",["混沌","夏"], 10298, 9922, 12469, 12030, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Berserker", "吕布奉先", 49, "人",["混沌","恶"], 8119, 8302, 10988, 11256, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 10, fixedDamageBuff: 0});
    initialServant(3,"Berserker", "大流士三世", 55, "人",["秩序","中庸"], 7608, 8763, 10297, 11881, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(3,"Berserker", "清姬", 56, "地",["混沌","恶"], 6644, 9166, 8992, 12428, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(3,"Berserker", "森長可", 251, "人",["混沌","狂"], 7732, 8019, 10464, 10872, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 4, fixedDamageBuff: 0});
    initialServant(2,"Berserker", "血斧埃里克", 57, "人",["混沌","中庸"], 6290, 7688, 9115, 11095, 3,1,0, 300, 400, 450, 475, 500, 30, 35, 40, 45, 50, "TreasureSpecialAtkPowerAttack", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0});
    initialServant(2,"Berserker", "莎樂美", 260, "地",["混沌","恶"], 6884, 6885, 9975, 9936, 1,3,0.51, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1.5, cardBuff: 5.5, fixedDamageBuff: 0});
   initialServant(1,"Berserker", "斯巴达克斯", 50, "人",["中立","中庸"], 5073, 7722, 7883, 11904, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0});
    initialServant(1,"Berserker", "保罗・班扬", 174, "地",["中立","中庸"], 6044, 6196, 9391, 9551, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 4, fixedDamageBuff: 0});
}

function initExtra(){
//----------------------------------Shielder---------------------------------------------------------------------//
    /******************************************4星********************************************************************/

    //----------------------------------Ruler---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Ruler", "天草四郎", 93, "人",["秩序","善"], 10972, 14107, 12011, 15455, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Ruler", "阿爾托莉亞・潘德拉剛", 265, "天",["秩序","夏"], 9593, 16912, 10501, 18528, 3,1,0, 300, 400, 450, 475, 500, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0});
    /******************************************4星********************************************************************/
    initialServant(4,"Ruler", "马大", 135, "人",["秩序","善"], 9546, 11250, 11558, 13640, 1,1,0, 800, 1000, 1100, 1150, 1200, 20, 30, 40, 50, 60, "TreasureSpecialDefReduceAttck", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Ruler", "马大EN", 135, "人",["秩序","善"], 9546, 11250, 11558, 13640, 1,1,0, 600, 800, 900, 950, 1000, 10, 20, 30, 40, 50, "TreasureSpecialDefReduceAttck", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Ruler", "魁札尔·科亚特尔", 233, "天",["秩序","善"], 9687, 11306, 11729, 13708, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 250});
    initialServant(4,"Ruler", "阿斯特蕾亞", 242, "天",["秩序","善"], 9734, 11531, 11786, 13981, 1,8,0.43, 900, 1200, 1350, 1425, 1500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 225});
    //----------------------------------Avenger---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Avenger", "岩窟王 爱德蒙・唐泰斯", 96, "人",["混沌","恶"], 12641, 12177, 13838, 13340, 3,8,0.62, 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Avenger", "岩窟王 爱德蒙・唐泰斯EN", 96, "人",["混沌","恶"], 12641, 12177, 13838, 13340, 3,8,0.62, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Avenger", "贞德〔Alter〕", 106, "人",["混沌","恶"], 13244, 11761, 14498, 12885, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Avenger", "魔王信長", 250, "地",["混沌","中庸"], 12641, 11761, 13838, 12885, 3,1,0, 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Avenger", "太空 伊斯塔(Art)", 268, "星",["秩序","恶"], 12612, 13041, 13806, 14287, 3,3,0.69, 450, 600, 675, 712.5, 750, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 270});
    initialServant(5,"Avenger", "太空 伊斯塔(Buster)", 268, "星",["秩序","恶"], 12612, 13041, 13806, 14287, 3,1,0, 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 270});
    initialServant(5,"Avenger", "太空 伊斯塔(Quick)", 268, "星",["秩序","恶"], 12612, 13041, 13806, 14287, 3,3,0.69, 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 270});
    /******************************************4星********************************************************************/
    initialServant(4,"Avenger", "戈尔贡", 147, "地",["混沌","恶"], 10706, 10197, 12963, 12364, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Avenger", "海森・罗伯", 158, "地",["混沌","恶"], 10628, 9949, 12868, 12063, 1,8,0.79, 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(4,"Avenger", "海森・罗伯EN", 158, "地",["混沌","恶"], 10628, 9949, 12868, 12063, 1,8,0.79, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Avenger","安东尼奥·萨列里", 204,"地",["混沌","恶"], 8125, 7840, 10996, 10630, 3,3,0.7, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});

    //----------------------------------MoonCancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"MoonCancer", "BB", 220, "地",["混沌","恶"], 11182, 14812, 12240, 16227, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 250});
    initialServant(5,"MoonCancer", "吉娜可＝加里吉利", 244, "天",["秩序","善"], 9166, 17844, 10034, 19549, 3,3,0.35, 450, 600, 675, 712.5, 750, 30, 30, 30, 30, 30, "TreasureSpecialDefReduceAttck", 1, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 175});
    /******************************************4星********************************************************************/
    initialServant(4,"MoonCancer", "BB", 166, "人",["混沌","善"], 8197, 13643, 9925, 16542, 1,5,0.61, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0});

    //----------------------------------Alterego---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Alterego", "梅尔特莉莉丝（溶解莉莉丝）", 163, "地",["秩序","善"], 11692, 13402, 12799, 14682, 1,8,0.92, 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 225});
    initialServant(5,"Alterego", "杀生院祈荒", 167, "兽",["混沌","恶"], 11668, 14606, 12772, 16001, 3,3,0.55, 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5, "Alterego", "冲田总司〔Alter〕", 209, "人",["中立","中庸"], 12465, 12696, 13645, 13909, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});
    initialServant(5,"Alterego", "西托奈", 224, "天",["混沌","善"], 11668, 13965, 12772, 15299, 1,6,0.83, 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 225});
    initialServant(5,"Alterego", "帝王花", 238, "地",["秩序","善"], 12835, 13338, 14050, 14612, 3,1,0, 300, 400, 450, 475, 500, 40, 50, 60, 70, 80, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -4, cardBuff: "11|12", fixedDamageBuff: 250});
    /******************************************4星********************************************************************/
    initialServant(4,"Alterego", "帕森莉普（热情迷唇）", 164, "地",["秩序","中庸"], 10299, 10901, 12470, 13217, 3,1,0, 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 200});
    initialServant(4,"Alterego", "帕森莉普（热情迷唇）EN", 164, "地",["秩序","中庸"], 10299, 10901, 12470, 13217, 3,1,0, 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 200});
    initialServant(4,"Alterego", "机械伊丽酱", 190, "人",["秩序","善"], 9997, 10901, 12104, 13217, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0});

    //----------------------------------Foreigner---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Foreigner", "阿比盖尔·威廉姆斯", 195, "地",["混沌","恶"], 12100, 13770, 13245, 15086, 1,1,0, 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 175});
    initialServant(5,"Foreigner", "葛饰北斋", 198, "人",["混沌","中庸"], 12100, 13230, 13245, 14494, 3,5,0.33, 450, 600, 675, 712.5, 750, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 4, fixedDamageBuff: 175});
    /******************************************4星********************************************************************/
    initialServant(4,"Foreigner", "谜之女主角XX", 222, "星",["秩序","善"], 9751, 11250, 11806, 13640, 1,4,0.64, 900, 1200, 1350, 1425, 1500, 20, 30, 40, 50, 60, "TreasureSpecialAtkPowerAttack", 1, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0});
}
