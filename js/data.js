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

    initNew();

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
* @param {String} eName 从者英文名
* @param {Number} servantNo 从者编号(茹西教王的理想鄉和wiki从者编号都一样的)
* @param {Array} keys 搜索关键词
* @param {String} camp 阵营
* @param {Array} attributes 属性
* @param {Array} characteristics 特性
* @param {Number} atk ATK
* @param {Number} hp HP
* @param {Number} maxAtk 100级ATK
* @param {Number} maxHp  100级HP
* @param {Number} cards 配卡
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
* @param {Number} cardColor 卡牌倍率(B卡：1.5，A卡：1，Q卡：0.8)
* @param {Object} careerSkill 职介技能(比如狂化EX、神性Debuff) 
*    cardColor: 0.8(Quick)，1(Arts)，1.5(Buster)，0(All)，-1(None)，-2(Quick和Arts)，-3(Buster和Quick), -4 (Buster和Arts)
*    cardBuff: 10(卡牌Buff), 
*    fixedDamageBuff: 0(神性Debuff), 
*    critialPowerBuff: 0(暴击威力Buff)
* @param {Object} treasureSideEffect 宝具副效果(oc特攻只能显示一种副效果，所以剩余其他的副效果存储到这个对象里)
*    treasurePowerBuff：宝具威力buff
*    cardPowerBuff：卡牌buff
*/
function initialServant(star,career, name, eName, servantNo, keys, camp, attributes, characteristics, atk, hp, maxAtk, maxHp, cards, tl1, tl2, tl3, tl4, tl5, oc1, oc2, oc3, oc4, oc5, type, cardColor, careerSkill, treasureSideEffect) {
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
        eName: eName,
        servantNo: servantNo,
        keys: keys,
        camp: camp,
        attributes: attributes,
        characteristics:characteristics,
        atk: atk,
        hp: hp,
        maxAtk: maxAtk,
        maxHp: maxHp,
        cards: cards,
        tl: tl,
        oc: oc,
        cardColor: cardColor,
        careerSkill: careerSkill,
        treasureSideEffect: treasureSideEffect
    }
    servants[id] = model;
    id++;
}
function initNew(){
	
        
	
	
	
	
	
	
	
	
}



function initSaber(){
    initialServant(5,"Saber", "阿尔托莉雅·潘德拉贡", "Altria Pendragon", 2, [], "地", ["秩序", "善"], [], 11221, 15150, 12283, 16597, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Saber", "阿尔提拉", "Artila", 8, [], "人", ["混沌", "善"], [], 12343, 13907, 13511, 15236, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(5,"Saber", "沖田総司", "Okita Souji", 68, [], "人", ["中立", "中庸"], [], 12068, 13225, 13210, 14489, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 2, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Saber", "莫德雷德", "Mordred", 76, [], "地", ["混沌", "中庸"], [], 11723, 14680, 12833, 16083, "AABBQ", 400, 500, 550, 575, 600, 180, 190, 200, 210, 220, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Saber", "尼禄・克劳狄乌斯〔花嫁〕", "Nero Claudius（Bride)", 90, [], "人", ["混沌", "花嫁"], [], 11607, 14248, 12706, 15609, "AABBQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Saber", "两仪式", "Ryougi Shiki（Saber)", 91, [], "人", ["中立", "中庸"], [], 10721, 15453, 11736, 16929, "AABBQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 0, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 6 });
    initialServant(5,"Saber", "宫本武藏", "Miyamoto Musashi", 153, [], "人", ["混沌", "善"], [], 12037, 13635, 13176, 14938, "ABBBQ", 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, null);
    initialServant(5,"Saber", "亚瑟・潘德拉贡〔Prototype〕", "Arthur Pendragon〔Prototype〕", 160, [], "地", ["秩序", "善"], [], 12465, 13975, 13645, 15310, "AABBQ", 300, 400, 450, 475, 500, 10, 20, 30, 40, 50, "TreasurePowerBuff", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Saber", "齐格鲁德", "Sigurd", 213, [], "地", ["中立","善"], [], 12465, 13975, 13645, 15310, "AABBQ", 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(5,"Saber", "剪舌麻雀的红阎魔", "Shita-kiri Suzume no Benienma", 234, [], "地", ["秩序", "善"], [], 11607, 13960, 12706, 15294, "AABBQ", 900, 1200, 1350, 1425, 1500, 40, 45, 50, 55, 60, "SpecialAttackPowerBuff", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 10 });
	
/******************************************4星********************************************************************/
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Alter〕", "Altria Pendragon（Alter)", 3, [], "人", ["秩序", "恶"], [], 10248, 11589, 12408, 14051, "AABBQ", 450, 550, 600, 625, 650, 0, 0, 0, 0, 0, "", 1.5, null);
    initialServant(4,"Saber", "阿尔托莉雅·潘德拉贡〔Lily〕", "Altria Pendragon（Lily)", 4, [], "地", ["秩序", "善"], [], 7726, 10623, 9355, 12880, "AABBQ", 400, 550, 625, 662.5, 700, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "尼禄・克劳狄乌斯", "Nero Claudius", 5, [], "人", ["混沌", "善"], [], 9449, 11753, 11441, 14250, "AABBQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "齐格弗里德", "Siegfried", 6, [], "地", ["混沌", "善"], [], 8181, 14165, 9905, 17175, "AABBQ", 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "罗摩", "Rama", 101, [], "天", ["秩序", "善"], [], 9854, 11993, 11931, 14541, "AABBQ", 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(4,"Saber", "兰斯洛特", "Lancelot", 121, [], "地", ["秩序", "善"], [], 9949, 11589, 12046, 14051, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 }, { cardPowerBuff: 30 });
    initialServant(4,"Saber", "高文", "Gawain", 123, [], "地", ["秩序", "善"], [], 10173, 11419, 12317, 13845, "ABBBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "伊丽莎白・巴陶里〔勇者〕", "Erzsebet Bathory（Brave)", 138, [], "地", ["混沌", "善"], [], 9899, 11248, 11986, 13638, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "铃鹿御前", "Suzuka Gozen", 165, [], "天", ["中立", "恶"], [], 9544, 11753, 11556, 14250, "AABBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(4,"Saber", "弗兰肯斯坦", "Frankenstein2", 176, [], "地", ["中立", "夏"], [], 9353, 11993, 11325, 14541, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -3, cardBuff: "2|12", fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "柳生但马守宗矩", "Yagyuu Dajimanokami Munenori", 187, [], "人", ["秩序", "中庸"], [], 9999, 11135, 12107, 13501, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "女王梅芙", "Queen Medb Saber", 221, [], "地", ["混沌", "恶"], [], 8017, 13609, 9707, 16501, "AABBQ", 900, 1200, 1350, 1425, 1500, 0,0,0,0,0, "", 1, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });	
    initialServant(4,"Saber", "迪尔姆德·奥迪那", "Diarmuid Ua Duibhne〔Saber〕", 223, [],"地",["秩序","中庸"], [], 10048, 11362 , 12166, 13776, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Saber", "拉克什米・芭伊", "", 245, [], "人", ["秩序", "善"], [], 9949, 11362, 12046, 13776, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(4,"Saber", "葛飾北齋", "", 264, [], "人", ["混沌", "善"], [], 9389, 11873, 11368, 14396, "AABQQ", 900, 1200, 1350, 1425, 1500, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 100, critialPowerBuff: 0 });
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Saber", "盖乌斯・尤里乌斯・凯撒", "Gaius Julius Caesar", 7, [], "人", ["中立", "中庸"], [], 7497, 9595, 10146, 13009, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(3,"Saber", "弗格斯・马克・罗伊", "Fergus Mac Roich", 72, [], "地", ["秩序", "中庸"], [], 7460, 9786, 10096, 13268, "ABBBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Saber", "贝狄威尔", "Bedwyr", 126, [], "星", ["秩序", "善"], [], 7627, 9595, 10322, 13009, "ABBQQ", 800, 1000, 1100, 1150, 1200, 30, 45, 60, 75, 90, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Saber", "伊阿宋", "", 254, [], "地", ["秩序", "善"], [], 5457, 7575, 8479, 11677, "AABBQ", 450, 600, 675, 712.5, 750, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });

}


function initArcher(){
   
    //----------------------------------Archer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Archer", "吉尔伽美什", "Gilgamesh", 12, [], "天", ["混沌", "善"], [], 12280, 13097, 13442, 14348, "AABBQ", 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175, critialPowerBuff: 11 }, { treasurePowerBuff: 30 });
    initialServant(5,"Archer", "俄里翁", "Orion", 60, [], "天", ["混沌", "中庸"], [], 11107, 14553, 12158, 15943, "AABQQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 11 });
    initialServant(5,"Archer", "尼古拉・特斯拉", "Nikola Tesla", 77, [], "星", ["混沌", "善"], [], 11781, 13825, 12896, 15146, "AABBQ", 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(5,"Archer", "阿周那", "Arjuna", 84, [], "天", ["秩序", "中庸"], [], 12342, 13230, 13510, 14494, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175, critialPowerBuff: 10 });
    initialServant(5,"Archer", "阿尔托莉雅・潘德拉贡〔Archer〕", "Altria Pendragon2", 129, [], "地", ["秩序", "善"], [], 11276, 14553, 12343, 15943, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(5,"Archer", "伊修塔尔", "Ishtar", 142, [], "天", ["秩序", "善"], [], 12252, 13965, 13412, 15299, "AABBQ", 400, 500, 550, 575, 600, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 225, critialPowerBuff: 10 });
    initialServant(5,"Archer", "詹姆斯·莫里亚蒂", "James Moriarty", 156, [], "人", ["混沌", "恶"], [], 11781, 13685, 12896, 14992, "AAABQ", 600, 800, 900, 950, 1000, 20, 25, 30, 35, 40,"TreasureSpecialDefReduceAttck", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 11 });
    initialServant(5,"Archer", "拿破仑", "Napoleon", 212, [], "星", ["中立", "善"], [], 12033, 13097, 13172, 14348, "AABBQ", 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff:6});
    initialServant(5,"Archer", "贞德（Archer）", "Jeanne d'Arc Archer", "216", [], "人", ["秩序", "夏"], [], 10525, 15743, 11521, 17247, "AABBQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });	   
    /******************************************4星********************************************************************/
    initialServant(4,"Archer", "卫宫", "Emiya", 11, [], "人", ["中立", "中庸"], [], 9398, 11521, 11379, 13969, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(4,"Archer", "阿塔兰忒", "Atalanta", 14, [], "地", ["中立", "恶"], [], 8633, 12476, 10453, 15127, "AABQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Archer", "织田信长", "Oda Nobunaga", 69, [], "人", ["中立", "中庸"], [], 9494, 11637, 11495, 14110, "AABBQ", 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(4,"Archer", "特里斯坦", "Tristan", 122, [], "地", ["秩序", "善"], [], 9735, 11637, 11787, 14110, "AABQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(4,"Archer", "安妮・伯妮&玛丽・里德", "Anne Bonny&Mary Read2", 131, [], "人", ["混沌", "中庸"], [], 9446, 11521, 11437, 13969, "AABBQ", 600, 800, 900, 950, 1000, 600, 600, 600, 600, 600, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Archer", "克洛伊·冯·爱因兹贝伦", "Chloe・von・Einzbern", 137, [], "天", ["混沌", "善"], [], 9845, 10914, 11920, 13233, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(4,"Archer", "卫宫〔Alter〕", "Emiya〔Alter〕", 157, [], "人", ["混沌", "恶"], [], 8996, 12250, 10892, 14853, "AABQQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Archer", "海伦娜・布拉瓦茨基", "Helena Blavatsky2", 180, [], "人", ["混沌", "善"], [], 9446, 11404, 11437, 13827, "AABQQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 6 });
    initialServant(4,"Archer", "巴御前", "Tomoe Gozen", 184, [], "地", ["中立", "中庸"], [], 9946, 10804, 12043, 13100, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor:1.5, cardBuff: 2, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Archer", "阿提拉·the·圣〔诞〕", "Artila2", 197, [], "星", ["混沌", "善"], [], 9759, 11637, 11816, 14110, "AABQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor:0.8, cardBuff: 12, fixedDamageBuff: 175, critialPowerBuff: 10 });
    initialServant(4,"Archer", "浅上藤乃", "Asagami Fujino", 200, [], "人", ["秩序", "恶"], [], 10299, 11025, 12470, 13368, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor:1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 11 });
    initialServant(4,"Archer", "喀戎", "Chiron", 207, [], "天", ["秩序", "善"], [], 9294, 12250, 11253, 14853, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150, critialPowerBuff: 10 });
    initialServant(4,"Archer", "马嘶", "", 248, [], "天", ["混沌", "中庸"], [], 10249, 11245, 12409, 13634, "ABBQQ", 600, 800, 900, 950, 1000, 600, 700, 800, 900, 1000, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: 1.5, cardBuff: 5, fixedDamageBuff: 210, critialPowerBuff: 12 });
    initialServant(4,"Archer", "刑部姬", "", 262, [], "地", ["中立", "夏"], [], 8895, 12476, 10770, 15127, "AAABQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 145, critialPowerBuff: 10 });
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Archer", "罗宾汉", "Robin Hood", 13, [], "人", ["中立", "善"], [], 6715, 10187, 9088, 13812, "AABQQ", 900, 1200, 1350, 1425, 1500, 200, 212.5, 225, 237.5, 250, "TreasureSpecialAttack", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(3,"Archer", "尤瑞艾莉", "Euryale", 15, [], "天", ["混沌", "善"], [], 7032, 9506, 9517, 12889, "AABQQ", 1200, 1200, 1200, 1200, 1200, 250, 250, 250, 250, 250, "TreasureSpecialAttack", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 300, critialPowerBuff: 11 });
    initialServant(3,"Archer", "大卫", "David", 63, [], "天", ["秩序", "中立"], [], 7736, 8643, 10470, 11719, "AAABQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(3,"Archer", "幼吉尔", "Child Gil", 95, [], "天", ["混沌", "善"], [], 7696, 8731, 10415, 11838, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175, critialPowerBuff: 10 });
    initialServant(3,"Archer", "比利小子", "Billy the Kid", 105, [], "人", ["混沌", "中庸"], [], 6890, 9506, 9325, 12889, "AABQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 7, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(3,"Archer", "俵藤太", "Tawara Toda", 125, [], "人", ["中立", "善"], [], 7032, 9800, 9517, 13287, "AABBQ", 400, 500, 550, 575, 600, 50, 62.5, 75, 87.5, 100, "SpecialAttackPowerBuff", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(3,"Archer", "威廉泰尔", "", 246, [], "人", ["秩序", "善"], [], 7384, 9310, 9993, 12623, "AABBQ", 900, 1200, 1350, 1425, 1500, 200, 212.5, 225, 237.5, 250, "TreasureSpecialAttack", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(2,"Archer", "帕里斯", "", 255, [], "地", ["中立", "中庸"], [], 6523, 7834, 9452, 11306, "AABQQ", 1200, 1600, 1800, 1900, 2000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 12 });
    initialServant(1,"Archer", "阿拉什", "Arash", 16, [], "地", ["混沌", "中庸"], [], 5816, 7122, 9037, 10979, "AABBQ", 800, 1000, 1100, 1150, 1200, 0, 200, 400, 600, 800, "TreasureSpecialExplosionAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 6 });
}

function initLancer(){
    //----------------------------------Lancer---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Lancer", "斯卡哈", "Scathach", 70, [], "星", ["秩序", "善"], [], 11375, 14825, 12452, 16241, "ABBQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, null);
    initialServant(5,"Lancer", "迦尔纳", "Karna", 85, [], "天", ["秩序", "善"], [], 11976, 13632, 13110, 14934, "ABBQQ", 400, 500, 550, 575, 600, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(5,"Lancer", "布伦希尔德", "Brynhildr", 88, [], "天", ["中立", "善"], [], 11432, 14825, 12514, 16241, "ABBQQ", 800, 1000, 1100, 1150, 1200, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 100, critialPowerBuff: 0 });
    initialServant(5,"Lancer", "阿尔托莉雅・潘德拉贡〔Lancer〕", "Altria Pendragon(Lancer)", 119, [], "天", ["秩序", "善"], [], 10995, 15606, 12036, 17097, "ABBQQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Lancer", "玉藻前", "Tamamo no Mae2", 128, [], "天", ["中立", "夏"], [], 10726, 15147, 11741, 16594, "ABBQQ", 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -2, cardBuff: "10|10", fixedDamageBuff: 230, critialPowerBuff: 0 });
    initialServant(5,"Lancer", "恩奇都", "Enkidu", 143, [], "天", ["中立", "中庸"], [], 10780, 15300, 11800, 16762, "ABQQQ", 800, 1000, 1100, 1150, 1200, 30, 35, 40, 45, 50, "TreasureSpecialDefReduceAttck", 1.5, null);
    initialServant(5,"Lancer", "艾蕾什基伽尔", "Ereshkigal", 196, [], "地", ["混沌", "恶"], [], 10343, 16065, 11322, 17600, "ABBQQ", 300, 400, 450, 475, 500, 10, 20, 30, 40, 50, "TreasureSpecialCardPowerAttack", 1.5, { cardColor:1, cardBuff: 11, fixedDamageBuff: 225, critialPowerBuff: 0 });
    initialServant(5,"Lancer", "布拉达曼特", "Bradamante", 232, [], "地", ["秩序", "善"], [], 10833, 15682, 11858, 17180, "AABQQ", 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 0.8, null);
    
    /******************************************4星********************************************************************/
    initialServant(4,"Lancer", "伊丽莎白・巴陶里", "Erzsebet Bathory", 18, [], "人", ["混沌", "恶"], [], 9122, 11870, 11045, 14392, "ABBQQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "阿尔托莉雅・潘德拉贡〔Alter〕", "Altria Pendragon（Alter)2", 78, [], "天", ["秩序", "善"], [], 9968, 11761, 12069, 14260, "ABBQQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "芬恩・麦克库尔", "Fionn mac Cumhaill", 87, [], "天", ["中立", "中庸"], [], 8930, 12750, 10812, 15459, "AABQQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 125, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "神枪 李书文", "Li Shu Wen", 102, [], "人", ["中立", "恶"], [], 9653, 11360, 11688, 13774, "AABQQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, null);
    initialServant(4,"Lancer", "清姬", "Kiyohime2", 134, [], "地", ["混沌", "恶"], [], 8936, 11870, 10820, 14392, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "弗拉德三世〔Extra〕", "Vlad III(Extra)", 140, [], "人", ["秩序", "善"], [], 8775, 13005, 10625, 15769, "ABBQQ", 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, null);
    initialServant(4,"Lancer", "贞德・Alter・Santa・Lily", "Jeanne d'Arc・Alter・Santa・Lily", 141, [], "人", ["混沌", "善"], [], 9261, 11870, 11213, 14392, "ABBQQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, null);
    initialServant(4,"Lancer", "美杜莎〔Lancer〕", "Medusa(Lancer)", 146, [], "地", ["中立", "善"], [], 8253, 13119, 9993, 15907, "AABQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 250, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "源赖光", "Minamoto Yorimitsu2", 181, [], "天", ["秩序", "善"], [], 9168, 12112, 11100, 14686, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -3, cardBuff: "6|11", fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "帕尔瓦蒂", "Parvati", 183, [], "天", ["秩序", "善"], [], 8127, 13253, 9840, 16069, "ABBQQ", 600, 800, 900, 950, 1000,0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 225, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "哪吒", "Nezha", 193, [], "天", ["中立", "善"], [], 9284, 12112, 11241, 14686, "ABBQQ", 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, null);
    initialServant(4,"Lancer", "瓦尔基里", "Valkyrie", 214, [], "天", ["秩序", "善"], [], 8037, 14025, 9731, 17005, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor : -1, cardBuff:0, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "茨木童子(Lancer)", "Ibaraki Douji Lancer", 217, [], "地", ["混沌", "恶"], [], 9133, 12354, 11058, 14979, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardPowerBuff: 4, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "長尾景虎", "", 252, [], "人", ["秩序", "善"], [], 9617, 11360, 11644, 13774, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(4,"Lancer", "謎之Alterego・Λ", "", 266, [], "地", ["秩序", "善"], [], 9261, 11749, 11213, 14246, "AABQQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 6, fixedDamageBuff: 200, critialPowerBuff: 0 });
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Lancer", "库・丘林", "Cu Chulainn", 17, [], "天", ["秩序", "中庸"], [], 7239, 9593, 9797, 13007, "ABBQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(3,"Lancer", "库・丘林〔Prototype〕", "Cu Chulainn（Prototype)", 20, [], "天", ["秩序", "中庸"], [], 7082, 10098, 9584, 13691, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(3,"Lancer", "罗穆路斯", "Romulus", 22, [], "星", ["混沌", "中立"], [], 7239, 9883, 9797, 13400, "ABBQQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, null);
    initialServant(3,"Lancer", "赫克托耳", "Hector", 64, [], "人", ["秩序", "中立"], [], 6928, 10200, 9376, 13829, "ABBQQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Lancer", "迪尔姆德・奥迪纳", "Diarmuid Ua Duibhne", 71, [], "地", ["秩序", "中庸"], [], 6877, 10098, 9307, 13691, "AABQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, null);
    initialServant(3,"Lancer", "豹人", "Jaguar Man", 148, [], "地", ["混沌", "中庸"], [], 7022, 9593, 9503, 13007, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 2, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(2,"Lancer", "加雷斯", "", 256, [], "地", ["秩序", "善"], [], 5413, 9537, 7844, 13764, "ABBQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
}


function initRider(){
    //----------------------------------Rider---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Rider", "弗朗西斯・德雷克", "Francis Drake", 65, [], "星", ["混沌", "恶"], [], 11326, 12830, 12398, 14056, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Rider", "女王梅芙", "Medb", 99, [], "地", ["混沌", "恶"], [], 10296, 13968, 11270, 15303, "AABBQ", 800, 1000, 1100, 1150, 1200, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Rider", "伊斯坎达尔", "Iskandar", 108, [], "人", ["中立", "善"], [], 11560, 13219, 12654, 14482, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(5,"Rider", "奥兹曼迪亚斯", "Ozymandias", 118, [], "天", ["混沌", "中庸"], [], 11971, 12830, 13104, 14056, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(5,"Rider", "魁札尔·科亚特尔", "Quetzalcoatl", 144, [], "天", ["秩序", "善"], [], 12001, 12960, 13137, 14198, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 300, critialPowerBuff: 0 });
    initialServant(5,"Rider", "阿尔托莉雅・潘德拉贡〔Alter〕", "Altria Pendragon（Alter）3", 179, [], "人", ["秩序", "恶"], [], 10776, 14256, 11796, 15618, "AABQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 12 });
    initialServant(5,"Rider", "伊凡雷帝", "Иван Грозный", 205, [], "人", ["秩序", "恶"], [], 11619, 13284, 12719, 14553, "AABBQ", 300, 400, 450, 475, 500, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1.5, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Rider", "阿喀琉斯", "Achilles", 206, [], "地", ["秩序", "中庸"], [], 11883, 13219, 13008, 14482, "AABQQ", 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(5,"Rider", "李奧納多・達文西", "", 253, [], "人", ["秩序", "善"], [], 10883, 14112, 11913, 15460, "AABBQ", 450, 600, 675, 712.5, 750, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1, { cardColor: -2, cardBuff: "8|6", fixedDamageBuff: 230, critialPowerBuff: 0 });
    /******************************************4星********************************************************************/
    initialServant(4,"Rider", "玛丽・安托瓦内特", "Marie Antoinette", 29, [], "人", ["秩序", "善"], [], 8293, 12348, 10041, 14972, "AABQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Rider", "马大", "Marthe", 30, [], "人", ["秩序", "善"], [], 8014, 13068, 9703, 15845, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 11.5, fixedDamageBuff: 150, critialPowerBuff: 0 }, {cardPowerBuff : 20});
    initialServant(4,"Rider", "安妮・伯妮&玛丽・里德", "Anne Bonny&Mary Read", 66, [], "人", ["混沌", "恶"], [], 9029, 11286, 10932, 13684, "AABQQ", 1600, 2000, 2200, 2300, 2400, 1200, 1400, 1600, 1800, 2000, "TreasureSpecialRemainHpAttack", 0.8, null);
    initialServant(4,"Rider", "阿尔托莉雅・潘德拉贡〔Santa Alter〕", "Altria Pendragon（Santa Alter)", 73, [], "人", ["秩序", "善"], [], 9258, 11286, 11209, 13684, "AABBQ", 450, 550, 600, 625, 650, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Rider", "阿斯托尔福", "Astolfo", 94, [], "地", ["混沌", "善"], [], 8937, 11172, 10821, 13546, "ABQQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(4,"Rider", "坂田金时", "Sakata Kintoki2", 115, [], "地", ["秩序", "善"], [], 9819, 10800, 11889, 13095, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 10, 30, 50, 70, 90, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(4,"Rider", "莫德雷德", "Mordred2", 132, [], "地", ["混沌", "善"], [], 9212, 11400, 11154, 13822, "AABQQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 5, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Rider", "伊修塔尔", "Ishtar2", 182, [], "天", ["秩序", "善"], [], 9603, 10692, 11627, 12964, "AABQQ", 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 0.8, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 225, critialPowerBuff: 10 });
    initialServant(4,"Rider", "坂本龙马", "Ryouma Sakamoto", 211, [], "人", ["中立", "中庸"], [], 8555, 11880, 10358, 14404, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 170, critialPowerBuff: 0 });
    initialServant(4,"Rider", "卡米拉", "", 263, [],  "地", ["中立", "恶"], [], 9651, 10476, 11685, 12702, "AABQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Rider", "美杜莎", "Medusa", 23, [], "地", ["混沌", "善"], [], 7200, 8937, 9744, 12117, "AABQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 95, critialPowerBuff: 6 });
    initialServant(3,"Rider", "牛若丸", "Ushiwakamaru", 27, [], "人", ["混沌", "中庸"], [], 7076, 9028, 9576, 12240, "AABQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Rider", "亚历山大", "Alexander", 28, [], "人", ["中立", "善"], [], 7356, 8640, 9955, 11714, "AABQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 100, critialPowerBuff: 0 });
    initialServant(3,"Rider", "克里斯托弗·哥伦布", "Cristoforo Colombo", 172, [], "人", ["中立", "恶"], [], 6552, 9600, 8867, 13016, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Rider", "赤兔马", "Red Hare", 231, [], "地", ["中立", "中庸"], [], 6434, 10483, 8708, 14214, "AABQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Rider", "聖喬治", "", 24, [], "人", ["秩序", "善"], [], 5236, 9200, 7587, 13278, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Rider", "爱德华・蒂奇", "Edward Teach", 25, [], "人", ["混沌", "恶"], [], 6188, 7907, 8967, 11411, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, null);
    initialServant(1,"Rider", "巴沙洛繆・羅伯茨", "", 257, [], "人", ["混沌","恶"], [], 5461, 6720, 8485, 10359, "AABQQ", 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: 0.8, cardBuff: 4, fixedDamageBuff: 0, critialPowerBuff: 0 });
}

function initCaster(){
    //----------------------------------Caster---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Caster", "玄奘三藏", "Genjou Sanzou", 113, [], "人", ["秩序", "善"], [], 11658, 12965, 12761, 14204, "AAABQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 11, fixedDamageBuff: 125, critialPowerBuff: 0 });
    initialServant(5,"Caster", "莱昂纳多・达・芬奇", "Leonardo da Vinci", 127, [], "星", ["混沌", "善"], [], 10598, 14259, 11601, 15621, "AAABQ", 600, 750, 825, 862.5, 900, 30, 40, 50, 60, 70, "TreasurePowerBuff", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Caster", "伊莉雅斯菲尔", "Illyasviel", 136, [], "人", ["中立", "善"], [], 10857, 13825, 11885, 15146, "AAABQ", 800, 1000, 1100, 1150, 1200, 20, 40, 60, 80, 100, "TreasureSpecialCardPowerAttack", 1.5, null);
    initialServant(5,"Caster", "山鲁佐德", "Scheherazade", 169, [], "人", ["秩序", "中庸"], [], 9212, 15846, 10084, 17360, "AAABQ", 600, 750, 825, 862.5, 900, 200, 225, 250, 275, 300, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 11.5, fixedDamageBuff: 0, critialPowerBuff: 0 }, { treasurePowerBuff: 20 });
    initialServant(5,"Caster", "尼禄・克劳狄乌斯", "Nero Claudius2", 175, [], "人", ["混沌", "夏"], [], 10857, 13685, 11885, 14992, "AABBQ", 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasurePowerBuff", 1.5, { cardColor: -2, cardBuff: "8|11", fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Caster", "阿纳斯塔西娅", "Анастасия", 201 ,[], "人", ["中立","中庸"],[], 10546, 14259, 11544, 15621, "AAABQ", 450, 600 ,675, 712.5, 750,0,0,0,0,0, "" , 1,{ cardColor: 1, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Caster", "紫式部", "Murasaki Shikibu", 237 ,[], "人", ["中立","中庸"],[], 11374, 12833, 12451, 14059, "AABQQ", 450, 600 ,675, 712.5, 750, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack" , 1,{ cardColor: 1, cardBuff: 7, fixedDamageBuff: 0, critialPowerBuff: 0 });
    /******************************************4星********************************************************************/
    initialServant(4,"Caster", "伊丽莎白・巴陶里〔万圣节〕", "Erzsebet Bathory（Halloween)", 61, [], "人",["混沌","恶"],[], 8616, 11404, 10432, 13827, "AAABQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "童谣", "Nursery Rhyme", 74, [], "人",["中立","中庸"],[], 8629, 11882, 10448, 14407, "AAABQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "海伦娜・布拉瓦茨基", "Helena Blavatsky", 100, [], "人",["混沌","善"],[], 8629, 11882, 10448, 14407, "AAABQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "托马斯・爱迪生", "Thomas Edison", 103, [], "人",["秩序","中庸"],[], 7952, 11882, 9628, 14407, "AAABQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 4, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "尼托克丽丝", "Nitocris", 120, [], "地", ["秩序", "善"], [], 9060, 11288, 10970, 13686, "AAABQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(4,"Caster", "玛丽・安托瓦内特", "Marie Antoinette2", 130, [], "人", ["秩序", "善"], [], 9060, 11404, 10970, 13827, "AAABQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "吉尔伽美什〔Caster〕", "Gilgamesh(Caster)", 145, [], "人",["秩序", "善"],[], 8460, 12005, 10243, 14556, "AAABQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(4,"Caster", "喀耳刻", "Circe", 192, [], "天",["混沌","中庸"],[], 8671, 12250, 10499, 14853, "AAABQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "示巴女王", "Queen of Sheba", 194, [], "人",["中立","善"],[], 8629, 12127, 10448, 14704, "AAABQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Caster", "齐格", "Sieg", 208, [], "人",["中立","善"],[], 8394, 11288, 10163, 13686, "AABBQ", 450, 600, 675, 712.5, 750, 20, 25, 30, 35, 40, "TreasureSpecialDefReduceAttck", 1, { cardColor: 1, cardBuff: 6.5, fixedDamageBuff: 0, critialPowerBuff: 12 });
    initialServant(4,"Caster", "酒吞童子（Caster）", "Shuten Douji(Caster)", 225, [], "地", ["混沌", "恶"], [], 9538, 11025, 11549, 13368, "AAABQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 150, critialPowerBuff: 0 });
	
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Caster", "美狄亚", "Medea", 31, [], "地",["中立","恶"],[], 7418, 8643, 10039, 11719, "AAABQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Caster", "吉尔・德・雷", "Gilles de Rais2", 32, [], "人",["混沌","恶"],[], 6514, 9506, 8816, 12889, "AAABQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Caster", "梅菲斯托费勒斯", "Mephistopheles", 35, [], "地",["混沌","恶"],[], 6839, 9216, 9255, 12495, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 7, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Caster", "库・丘林", "Cu Chulainn2", 38, [], "天",["秩序","中庸"],[], 6580, 9604, 8905, 13022, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 175, critialPowerBuff: 0 }, { cardPowerBuff: 20 });
    initialServant(3,"Caster", "冯・霍恩海姆・帕拉塞尔苏斯", "Von Hohenheim Paracelsus", 79, [], "人",["混沌","善"],[], 6711, 9506, 9082, 12889, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Caster", "查尔斯・巴贝奇", "Charles Babbage", 80, [], "人",["混沌","中庸"],[], 5996, 10887, 8115, 14761, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5,null);
    initialServant(3,"Caster", "杰罗尼莫", "Geronimo", 104, [], "人",["中立","善"],[], 6857, 9123, 9280, 12369, "AABBQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Caster","阿维斯布隆","Avicebron",203,[],"人",["秩序","中庸"],[], 6376, 9981, 8629, 13533, "AAABQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Caster", "威廉・莎士比亚", "William Shakespeare", 34, [], "人",["中立","中庸"],[], 5798, 8080, 8402, 11661, "AAABQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Caster", "陳宮", "", 258, [], "人",["混沌","善"],[], 6119, 7755, 8867, 11192, "AAABQ", 900, 1200, 1350, 1425, 1500, 0, 225, 450, 675, 900, "TreasureSpecialExplosionAttack", 1, { cardColor: 1, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
}


function initAss(){
    //----------------------------------Assassin---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Assassin", "酒吞童子", "Shuten Doji", 112, ["酒吞童子", "umb", "凹酱"], "地",["混沌","恶"],["人型","神性","魔性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克","龙"], 11993, 12825, 13128, 14050, "AABQQ", 450, 600, 675, 712, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(5,"Assassin", "“山之翁”", "Yama no okina", 154, ["山之翁", "王哈桑", "狂战信条"], "人",["秩序","恶"],["人型","被「天地乖离开辟之星」所克","所爱之人"], 11848, 13338, 12969, 14612, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(5,"Assassin", "谜之女主角X", "Mysterious Heroine X", 86, ["谜之女主角X", "X毛", "蜜汁女主角", "星战呆毛"], "星",["混沌","善"],["骑乘","人型","龙","阿尔托莉雅脸","亚瑟","王"], 11761, 12696, 12874, 13909, "AABQQ", 1600, 2000, 2200, 2300, 2400, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: 0.8, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Assassin", "开膛手杰克", "Jack the Ripper", 75, ["开膛手杰克", "女儿"], "地",["混沌","恶"],["人型","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 11557, 12696, 12651, 13909, "ABQQQ", 1400, 1800, 2000, 2100, 2200, 50, 62.5, 75, 87.5, 100, "SpecialAttackPowerBuff", 0.8,null);
    initialServant(5,"Assassin", "賽米拉米斯", "Semiramis", 199, ["賽米拉米斯", "女帝"], "地",["秩序","惡"],["人型","神性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克","王"], 11309, 13266, 12379, 14533, "AAABQ", 400, 500, 550, 575, 600, 10, 20, 30, 40, 50, "TreasurePowerBuff", 1.5, { cardColor: 1, cardBuff: 12, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(5,"Assassin", "克利奥帕特拉", "Cleopatra", 139, ["克利奥帕特拉", "超高校的艳后"], "人",["秩序","中庸"],["人型","神性","被「天地乖离开辟之星」所克","王"], 11088, 13402, 12138, 14682, "ABBQQ", 400, 500, 550, 575, 600, 30, 40, 50, 60, 70, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 125, critialPowerBuff: 0 });
    initialServant(5,"Assassin", "刑部姫", "Osakabehime", 189, ["刑部姫","刑部姬", "家里蹲"], "地",["混沌","中庸"],["人型","神性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 10824, 13822, 11849, 15143, "AABQQ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1, cardBuff: 11, fixedDamageBuff: 150, critialPowerBuff: 0 });
	initialServant(5,"Assassin", "李书文","Li Shuwen2", 235, ["李书文"], "人",["中立","恶"],["人型","被「天地乖离开辟之星」所克"], 11470, 12568, 12556, 13769, "AABBQ", 900, 1200, 1350, 1425, 1500, 20, 25, 30, 35, 40, "TreasureSpecialDefReduceAttck", 1, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    /******************************************4星********************************************************************/
    initialServant(4,"Assassin", "尼托克丽丝", "Nitocris2", 177, ["尼托克丽丝", "智慧的凝视", "女法老", "梅杰德神"], "天",["秩序","善"],["人型","神性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克","王"], 9737, 12737, 10670, 13965, "AABQQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 185, critialPowerBuff: 0 });
    initialServant(4,"Assassin", "卡米拉", "Carmilla", 46, ["卡米拉", "大龙娘", "铁处女"], "地",["混沌","恶"],["人型","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 9408, 10473, 11391, 12698, "ABQQQ", 800, 1000, 1100, 1150, 1200, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5,null);
    initialServant(4,"Assassin", "斯卡哈", "Scathach2", 133, ["斯卡哈", "bba", "师匠"], "星",["中立","善"],["人型","被「天地乖离开辟之星」所克","王"], 9049, 11168, 10956, 13541, "ABQQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8,null);
    initialServant(4,"Assassin", "斯忒诺", "Stheno", 41, ["大姐", "斯忒诺"], "天",["混沌","善"],["人型","神性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 8985, 11518, 10879, 13965, "ABQQQ", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 300, critialPowerBuff: 0 });
    initialServant(4,"Assassin", "武则天", "Wu Ze Tian", 170, ["武则天"], "人",["秩序","恶"],["人型","被「天地乖离开辟之星」所克","王"], 8981, 10942, 10874, 13267, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8,null);
    initialServant(4,"Assassin", "卫宫〔Assassin〕", "Emiya（Assassin)", 109, ["卫宫", "切丝", "Papa"], "人",["混沌","恶"],["人型","被「天地乖离开辟之星」所克","所爱之人"], 8958, 11168, 10846, 13541, "AABQQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Assassin", "加藤段藏", "Katou Danzou", 188, ["加藤段藏"], "地",["中立","中庸"],["人型","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 8935, 11055, 10818, 13404, "ABBQQ", 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5,null);
    initialServant(4,"Assassin", "两仪式〔Assassin〕", "Ryougi Shiki（Assassin)", 92, ["两仪式", "214", "A214", "哈根女王", "杀式"], "人",["混沌","善"],["人型","被「天地乖离开辟之星」所克"], 8867, 11055, 10736, 13404, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Assassin", "燕青", "Yan Qing", 159, ["燕青", "燕小乙", "天巧星"], "人",["混沌","恶"],["人型","被「天地乖离开辟之星」所克","所爱之人"], 8661, 11637, 10487, 14110, "ABQQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 5, fixedDamageBuff: 0, critialPowerBuff: 5 });
    initialServant(4,"Assassin", "望月千代女", "Mochizuki Chiyome", 185, ["望月千代女"], "地",["混沌","恶"],["人型","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 8510, 11637, 10304, 14110, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 0 });
	initialServant(4,"Assassin", "牛若丸", "Ushiwakamaru Assassin", 218, ["牛若丸"], "人",["中立","夏"],["人型","魔性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 9456, 10580, 11449, 12828, "ABQQQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 11, fixedDamageBuff: 0, critialPowerBuff: 11 });
	initialServant(4,"Assassin", "虞美人", "Consort Yu", 230, ["虞美人"], "地",["秩序","恶"],["人型","被「天地乖离开辟之星」所克","骑乘","所爱之人"], 7970, 13389, 9650, 16234, "ABBQQ", 300, 400, 450, 475, 500, 50, 62.5, 75, 87.5, 100, "TreasureSpecialCardPowerAttack", 1.5, null);
	
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Assassin", "荆轲", "Jing Ke", 42, ["荆轲"], "人",["混沌","善"],["人型","被「天地乖离开辟之星」所克"], 7207, 8293, 9754, 11244, "ABQQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8,null);
    initialServant(3,"Assassin", "风魔小太郎", "Fuuma Koutarou", 117, ["风魔小太郎"], "人",["混沌","恶"],["人型","被「天地乖离开辟之星」所克"], 7091, 8844, 9597, 11991, "ABQQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8,null);
    initialServant(3,"Assassin", "百貌的哈桑", "Hassan of Hundred Faces", 110, ["百貌的哈桑"], "人",["秩序","恶"],["人型","被「天地乖离开辟之星」所克"], 6686, 9310, 9049, 12623, "AABQQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1,null);
    initialServant(3,"Assassin", "静谧的哈桑", "Hassan of Serenity", 124, ["静谧的哈桑"], "人",["秩序","恶"],["人型","被「天地乖离开辟之星」所克"], 6636, 9310, 8981, 12623, "AABQQ", 1200, 1500, 1650, 1725, 1800, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(3,"Assasin","冈田以藏","Izou Okada",210,["冈田以藏"],"人",["中立","恶"],["人型", "被「天地乖离开辟之星」所克"],6879,8844,9310,11991,"AABQQ",900,1200,1350,1425,1500,0,0,0,0,0,"",1,null);
	
    initialServant(2,"Assassin", "咒腕的哈桑", "Hassan of the Cursed Arm", 40, ["咒腕的哈桑"], "人",["秩序","恶"],["人型","被「天地乖离开辟之星」所克"], 6280, 7594, 9100, 10960, "ABQQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8,null);
    initialServant(2,"Assassin", "歌剧魅影", "Phantom of the Opera", 44, ["歌剧魅影", "赛巴斯"], "地",["混沌","恶"],["人型","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克","被「神秘杀」所克"], 5654, 8393, 8193, 12112, "ABQQQ", 600, 750, 825, 862.5, 900, 0, 0, 0, 0, 0, "", 1,null);
    initialServant(2,"Assassin", "夏尔・亨利・桑松", "Charles Henri Sanson", 43, ["夏尔亨利桑松"], "人",["秩序","恶"],["人型","被「天地乖离开辟之星」所克"], 5456, 8309, 7906, 11991, "ABQQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 1.5,null);

    initialServant(1,"Assassin", "佐佐木小次郎", "Sasaki Koujirou", 39, ["佐佐木小次郎", "屠龙剑圣"], "人",["中立","恶"],["人型","被「天地乖离开辟之星」所克"], 5735, 6220, 8912, 9588, "ABQQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8,null);
    
}


function initBerserker(){
    //----------------------------------Berserker---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Berserker", "坂田金时", "Sakata Kintoki", 51, [], "人",["秩序","善"],[], 12712, 12150, 13915, 13311, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 2, fixedDamageBuff: 125, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "弗拉德三世", "Vlad III", 52, [], "地",["混沌","恶"],[], 11499, 13770, 12587, 15086, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "库・丘林〔Alter〕", "Cu Chulainn（Alter)", 98, [], "地",["混沌","恶"],[], 12805, 12210, 14017, 13377, "ABBBQ", 600, 800, 900, 950, 1000, 30, 40, 50, 60, 70, "TreasureSpecialAtkPowerAttack", 1.5, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "源赖光", "Minamoto Yorimitsu", 114, [], "天",["混沌","善"],[], 11556, 13500, 12650, 14790, "AABBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -3, cardBuff: "12|11", fixedDamageBuff: 150, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "谜之女主角X〔Alter〕", "Mysterious Heroine X〔Alter〕", 155, [], "星",["中立","恶"],[], 11113, 14175, 12165, 15529, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 0.8, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "土方岁三", "Hijikata Toshizou", 161, [], "人",["秩序","恶"],[], 12089, 12028, 13233, 13177, "ABBQQ", 800, 1000, 1100, 1150, 1200, 800, 900, 1000, 1100, 1200, "TreasureSpecialRemainHpAttack", 1.5, { cardColor: 1.5, cardBuff: 5, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "项羽", "Xiang Yu", 226, [], "人",["秩序","中庸"], [], 11613, 13770, 12712, 15086, "ABBBQ", 600, 800, 900, 950, 1000, 20, 30, 40, 50, 60, "TreasurePowerBuff", 0.8, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(5,"Berserker", "阿周那〔Alter〕", "", 247, [], "天",["秩序","善恶"], [], 11669, 13837, 12773, 15159, "ABBBQ", 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 250, critialPowerBuff: 0 });
    initialServant(5,"Berserker", "宮本武藏", "", 261, [], "人",["混沌","善"],[], 12712, 12150, 13915, 13311, "AABBQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -3, cardBuff: "12|4", fixedDamageBuff: 125, critialPowerBuff: 0 });
    /******************************************4星********************************************************************/
    initialServant(4,"Berserker", "赫拉克勒斯", "Hercules", 47, [], "天",["混沌","狂"],[], 10655, 10327, 12901, 12521, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 200, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "兰斯洛特", "Lancelot2", 48, [], "地",["秩序","狂"],[], 10477, 10327, 12685, 12521, "ABBBQ", 600, 800, 900, 950, 1000, 10, 15, 20, 25, 30, "TreasureSpecialAtkPowerAttack", 0.8, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "玉藻猫", "Tamamo Cat", 58, [], "地",["混沌","善"],[], 9026, 11458, 10929, 13893, "ABBBQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "弗兰肯斯坦", "Frankenstein", 82, [], "地",["混沌","中庸"],[], 9441, 10687, 11431, 12958, "ABBBQ", 900, 1100, 1200, 1250, 1300, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 4, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "贝奥武夫", "Beowulf", 89, [], "地",["混沌","善"],[], 10247, 10327, 12407, 12521, "ABBBQ", 700, 900, 1000, 1050, 1100, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 1, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "茨木童子", "Ibaraki Doji", 116, [], "地",["混沌","恶"],[], 9636, 10954, 11667, 13282, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "茶茶", "Cha Cha", 162, [], "人",["混沌","中庸"],[], 8945, 11025, 10831, 13368, "ABBBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 3, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "彭忒西勒亚", "Penthesilea", 171, [], "地",["秩序","善"],[], 10502, 10175, 12716, 12337, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(4,"Berserker", "织田信长", "Oda Nobunaga2", 178, [], "人",["混沌","夏"],[], 10146, 10023, 12285, 12153,"ABBBQ", 600, 800, 900, 950, 1000, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: 1.5, cardBuff: 6, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(4,"Berserker","阿塔兰忒〔Alter〕","Atalanta(Alter)", 202, [], "地", ["混沌","恶"], [], 9806, 10634, 11873, 12894, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(4,"Berserker","贞德〔Berserker〕","Jeanne d'Arc Berserker", 219, [], "人",["混沌","夏"], [], 10298, 9922, 12469, 12030, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    /******************************************3星及以下********************************************************************/
    initialServant(3,"Berserker", "吕布奉先", "Lu Bu Feng Xian", 49, [], "人",["混沌","恶"],[], 8119, 8302, 10988, 11256, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Berserker", "大流士三世", "Darius III", 55, [], "人",["秩序","中庸"],[], 7608, 8763, 10297, 11881, "ABBBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Berserker", "清姬", "Kiyohime", 56, [], "地",["混沌","恶"],[], 6644, 9166, 8992, 12428, "ABBBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(3,"Berserker", "森長可", "", 251, [], "人",["混沌","狂"],[], 7732, 8019, 10464, 10872, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 4, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Berserker", "血斧埃里克", "Eric Bloodaxe", 57, [], "人",["混沌","中庸"],[], 6290, 7688, 9115, 11095, "ABBBQ", 300, 400, 450, 475, 500, 30, 35, 40, 45, 50, "TreasureSpecialAtkPowerAttack", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(2,"Berserker", "莎樂美", "", 260, [], "地",["混沌","恶"],[], 6884, 6885, 9975, 9936, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1.5, cardBuff: 5.5, fixedDamageBuff: 0, critialPowerBuff: 0 });
   initialServant(1,"Berserker", "斯巴达克斯", "Spartacus", 50, [], "人",["中立","中庸"],[], 5073, 7722, 7883, 11904, "ABBBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 12, fixedDamageBuff: 0, critialPowerBuff: 0 });
    initialServant(1,"Berserker", "保罗・班扬", "Paul Bunyan", 174, [], "地",["中立","中庸"],[], 6044, 6196, 9391, 9551, "ABBBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 4, fixedDamageBuff: 0, critialPowerBuff: 0 });
}

function initExtra(){
//----------------------------------Shielder---------------------------------------------------------------------//
    /******************************************4星********************************************************************/

    //----------------------------------Ruler---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Ruler", "天草四郎", "Shirou Kotomine", 93, [], "人",["秩序","善"],[], 10972, 14107, 12011, 15455, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5,null);
    initialServant(5,"Ruler", "阿爾托莉亞・潘德拉剛", "", 265, [], "天",["秩序","夏"], [], 9593, 16912, 10501, 18528, "ABBQQ", 300, 400, 450, 475, 500, 20, 25, 30, 35, 40, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: 1, cardBuff: 8, fixedDamageBuff: 0, critialPowerBuff: 0 });
    /******************************************4星********************************************************************/
    initialServant(4,"Ruler", "马大", "Marthe2", 135, [], "人",["秩序","善"],[], 9546, 11250, 11558, 13640, "ABBBQ", 800, 1000, 1100, 1150, 1200, 20, 30, 40, 50, 60, "TreasureSpecialDefReduceAttck", 1.5,null);
    initialServant(4,"Ruler", "魁札尔·科亚特尔", "Quetzalcoatl2", 233, [], "天",["秩序","善"],[], 9687, 11306, 11729, 13708, "ABBQQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5,{ cardColor: -1, cardBuff: 0, fixedDamageBuff: 250, critialPowerBuff: 0 });
    initialServant(4,"Ruler", "阿斯特蕾亞", "", 242, [], "天",["秩序","善"],[], 9734, 11531, 11786, 13981, "AABBQ", 900, 1200, 1350, 1425, 1500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 225, critialPowerBuff: 10 });
    //----------------------------------Avenger---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Avenger", "岩窟王 爱德蒙・唐泰斯", "Edmond Dantes", 96, [], "人",["混沌","恶"],[], 12641, 12177, 13838, 13340, "ABBQQ", 800, 1000, 1100, 1150, 1200, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });
    initialServant(5,"Avenger", "贞德〔Alter〕", "Jeanne d'Arc（Alter)", 106, [], "人",["混沌","恶"],[], 13244, 11761, 14498, 12885, "AABBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(5,"Avenger", "魔王信長", "", 250, [], "地",["混沌","中庸"],[], 12641, 11761, 13838, 12885, "ABBBQ", 300, 400, 450, 475, 500, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 2 });
    /******************************************4星********************************************************************/
    initialServant(4,"Avenger", "戈尔贡", "Gorgon", 147, [], "地",["混沌","恶"],[], 10706, 10197, 12963, 12364, "AABBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 6 });
    initialServant(4,"Avenger", "海森・罗伯", "Hyesons Robert", 158, [], "地",["混沌","恶"],[], 10628, 9949, 12868, 12063, "AABQQ", 1600, 2000, 2200, 2300, 2400, 0, 0, 0, 0, 0, "", 0.8, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });

    /******************************************3星及以下********************************************************************/
    initialServant(3,"Avenger","安东尼奥·萨列里","Antonio Salieri", 204,[],"地",["混沌","恶"],[], 8125, 7840, 10996, 10630, "AABBQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 8 });

    //----------------------------------MoonCancer---------------------------------------------------------------------//
    /******************************************4星********************************************************************/
	initialServant(5,"MoonCancer", "BB", "BB Summer", 220, ["水B"], "地",["混沌","恶"],["神性","被「天地乖离开辟之星」所克","被「人类神话雷电降临」所克", "被「神秘杀」所克"], 11182, 14812, 12240, 18227, "AABBQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 250, critialPowerBuff: 0 });
    initialServant(4,"MoonCancer", "BB", "BB", 166, ["BB"], "人",["混沌","善"],["人型","被「天地乖离开辟之星」所克"], 8197, 13643, 9925, 16542, "AABQQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 0 });

    //----------------------------------Alterego---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Alterego", "梅尔特莉莉丝（溶解莉莉丝）", "Meltlilith", 163, [], "地",["秩序","善"],[], 11692, 13402, 12799, 14682, "ABBQQ", 1200, 1600, 1800, 1900, 2000, 0, 0, 0, 0, 0, "", 0.8, { cardColor: 0.8, cardBuff: 8, fixedDamageBuff: 225, critialPowerBuff: 10 });
    initialServant(5,"Alterego", "杀生院祈荒", "Sesshouin Kiara", 167, [], "兽",["混沌","恶"],[], 11668, 14606, 12772, 16001, "AABBQ", 450, 600, 675, 712.5, 750, 0, 0, 0, 0, 0, "", 1, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(5, "Alterego", "冲田总司〔Alter〕", "Okita Souji(Alter)", 209, [], "人",["中立","中庸"],[], 12465, 12696, 13645, 13909, "ABBQQ", 300, 400, 450, 475, 500, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 0, critialPowerBuff: 10 });
    initialServant(5,"Alterego", "西托奈", "Shitonai", 224, [], "天",["混沌","善"],[], 11668, 13965, 12772, 15299, "AABBQ", 900, 1200, 1350, 1425, 1500, 0, 0, 0, 0, 0, "", 1, { cardColor: 1, cardBuff: 10, fixedDamageBuff: 225, critialPowerBuff: 0 });
    initialServant(5,"Alterego", "帝王花", "Kingprotea", 238, [], "地",["秩序","善"],[], 12835, 13338, 14050, 14612, "AABBQ", 300, 400, 450, 475, 500, 20, 30, 40, 50, 60, "TreasureSpecialCardPowerAttack", 1.5, { cardColor: -4, cardBuff: "11|12", fixedDamageBuff: 250, critialPowerBuff: 8 });
    /******************************************4星********************************************************************/
    initialServant(4,"Alterego", "帕森莉普（热情迷唇）", "Passionlip", 164, [], "地",["秩序","中庸"],[], 10299, 10901, 12470, 13217, "ABBBQ", 400, 500, 550, 575, 600, 0, 0, 0, 0, 0, "", 1.5, { cardColor: -1, cardBuff: 0, fixedDamageBuff: 200, critialPowerBuff: 6 });
    initialServant(4,"Alterego", "机械伊丽酱", "mekaerichan", 190, [], "人",["秩序","善"],[], 9997, 10901, 12104, 13217, "ABBBQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, null);

    //----------------------------------Foreigner---------------------------------------------------------------------//
    /******************************************5星********************************************************************/
    initialServant(5,"Foreigner", "阿比盖尔·威廉姆斯", "Abigail Williams", 195, [], "地",["混沌","恶"],[], 12100, 13770, 13245, 15086, "AAABQ", 600, 800, 900, 950, 1000, 0, 0, 0, 0, 0, "", 1.5, { cardColor: 1.5, cardBuff: 8, fixedDamageBuff: 175, critialPowerBuff: 0 });
    initialServant(5,"Foreigner", "葛饰北斋", "Katsushika Hokusai", 198, [], "人",["混沌","中庸"],[], 12100, 13230, 13245, 14494, "AABBQ",  450, 600, 675, 712.5, 750, 150, 162.5, 175, 187.5, 200, "TreasureSpecialAttack", 1, { cardColor: 1, cardBuff: 4, fixedDamageBuff: 175, critialPowerBuff: 0 });
    /******************************************4星********************************************************************/
    initialServant(4,"Foreigner", "谜之女主角XX", "Mysterious Heroine XX", 222, [], "星",["秩序","善"],[], 9751, 11250, 11806, 13640, "AABBQ", 900, 1200, 1350, 1425, 1500, 20, 30, 40, 50, 60, "TreasureSpecialAtkPowerAttack", 1, { cardColor: 0.8, cardBuff: 10, fixedDamageBuff: 0, critialPowerBuff: 10 });
}
