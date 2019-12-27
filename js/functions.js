"use strict";
function initialServantList() {
    servants.forEach(function(servant){
         $("ddlServant").options.add(new Option(`【${servant.star}】【${servant.Class}】${servant.name}`, servant.id));
    })
}
function initialEffects() {
    let id = $("ddlServant").value;
    if (id != "-1") {
        bindServantData(id);
        adjHp()
        clearBuff();
        setOc();
        $("ddlOvercharge").oldvalue = $("ddlOvercharge").value;
    }
}
function adjHp(){
    let totalHp = getFloat("txtMaxHp") + getFloat("txtFouHp") + getFloat("txtCraftEssenceHp");
    $("txtRemainHp").value = totalHp;
    adjustNpRemainHpDamage();
}
function adjustNpRemainHpDamage() {
    let id = $("ddlServant").value;
    if(id == "-1") {
        return;
    }
    let servant = servants[id];
    let npEffect = servant.npEffect;
    let isNpRemainHpDamage = (npEffect && npEffect.npRemainHpDamage);
    if (servant.oc.type == "NpRemainHpDamage" || isNpRemainHpDamage) {//双子宝具特攻
        calNpRemainHpDamage();
    }
}
//计算双子宝具总倍率
function calNpRemainHpDamage() {
    let servant = servants[$("ddlServant").value];
    let ocs = servant.oc;
    let npEffect = servant.npEffect;
    let ocLevel = $("ddlOvercharge").value;
    //附加倍率《超蓄力威力提升》 (此倍率×自身已损失HP所占百分比,与宝具倍率加算)
    //【※总倍率＝攻击倍率+HP特攻倍率*(1—现在HP/最大HP)】
    let totalHp = getFloat("txtMaxHp") + getFloat("txtFouHp") + getFloat("txtCraftEssenceHp");
    let remainHp = getFloat("txtRemainHp");
    let npCoef = servant.NP[$("ddlNpLevel").selectedIndex];
    //附加倍率
    if(ocs.type == "NpRemainHpDamage") {
        npCoef += servant.oc[ocLevel] * Math.max(0, 1 - remainHp / totalHp);
    }
    else if(npEffect && npEffect.npRemainHpDamage) {
        npCoef += npEffect.npRemainHpDamage * Math.max(0, 1 - remainHp / totalHp);
    }
    //向下取整总宝具倍率
    $("txtNpCoefficient").value = Math.floor(npCoef * 10) / 10;
}
//宝具等级变化
function changeNpCoefficient() {
    let servant = servants[$("ddlServant").value];
    let ocs = servant.oc;
    let npEffect = servant.npEffect;
    let isNpRemainHpDamage = (npEffect && npEffect.npRemainHpDamage);
    if(npEffect && npEffect.npCoefficient) {
        $("txtNpSpecialAttack").value = servant.NP[$("ddlNpLevel").selectedIndex];
        return;
    }
    $("txtNpCoefficient").value = servant.NP[$("ddlNpLevel").selectedIndex];
    if (ocs.type == "NpRemainHpDamage" || isNpRemainHpDamage) {//双子宝具
        calNpRemainHpDamage();
    }
    else if (ocs.type == "OcNpDamage") {//自爆弓
        calOcNpDamage();
    }
}
//计算自爆弓宝具总倍率
function calOcNpDamage() {
    let servant = servants[$("ddlServant").value];
    let ocLevel = $("ddlOvercharge").value;
    let npCoef = servant.NP[$("ddlNpLevel").selectedIndex] + servant.oc[ocLevel];
    $("txtNpCoefficient").value = npCoef;
}
//绑定从者职介技能
function bindClassSkill(servant) {
    //{ cardBuff: 10, damagePlus: 0}
    let ClassSkill = servant.ClassSkill;
    if (ClassSkill && ClassSkill.cardBuff) {
        $("txtCardBuff").basevalue = ClassSkill.cardBuff;
    }
    else {
        $("txtCardBuff").basevalue = 0;
    }
    if (ClassSkill && ClassSkill.damagePlus) {
        $("txtDamagePlus").basevalue = ClassSkill.damagePlus;
    }
    else {
        $("txtDamagePlus").basevalue = 0;
    }
}
//宝具副效果补充
function bindNpEffect(servant) {
    let npEffect = servant.npEffect;
    if (npEffect && npEffect.npStrength) {//单个数值，比如1001宝具的20%宝具威力buff
        $("txtNpStrength").basevalue = npEffect.npStrength;
    }
    else {
        $("txtNpStrength").basevalue = 0;
    }
    if (npEffect && npEffect.cardBuff) {//单个数值，比如剑兰宝具的30%蓝魔放buff
        $("txtCardBuff").basevalue += npEffect.cardBuff;
    }
    if (npEffect && npEffect.npSpecialAttack) {
        $("txtNpSpecialAttack").value = npSpecialAttack;
    }
    if (npEffect && npEffect.defDecrease) {
        $("txtEnemyDefence").basevalue = -npEffect.defDecrease;
    }
    else {
        $("txtEnemyDefence").basevalue = 0;
    }
    if (npEffect && npEffect.npCoefficient) {
        $("txtNpCoefficient").value = npEffect.npCoefficient;
    }
}
function clearBuff(){
    $("txtNpStrength").value = $("txtNpStrength").basevalue;
    $("txtCardBuff").value = $("txtCardBuff").basevalue;
    $("txtAttackBuff").value = 0;
    $("txtEnemyDefence").value = $("txtEnemyDefence").basevalue;
    $("txtSpecialAttack").value = 0;
    $("txtDamagePlus").value = $("txtDamagePlus").basevalue;
    $("txtNpGainBuff").value = 0;
    $("txtOverkill1").value = 0;
    $("txtOverkill2").value = 0;
    $("txtOverkill3").value = 0;
}
//根据OC重设所有buff
function setOc() {
    let id = $("ddlServant").value;
    if(id == "-1"){
        $("ddlOvercharge").selectedIndex = 0;
        return;
    }
    let servant = servants[id];
    let ocs = servant.oc;
    let ocLevel = $("ddlOvercharge").value;
    if (ocs.oc1 == ocs.oc5) {
        $("ddlOvercharge").selectedIndex = 0;
    }
    switch(ocs.type) {
        case "NpRemainHpDamage": //双子宝具倍率提升
            calNpRemainHpDamage();
            break;
        case "OcNpDamage": //自爆弓倍率提升
            calOcNpDamage();
            break;
        case "OcCardBuff": //R金时OC绿魔放
	case "CardDecrease":
            $("txtCardBuff").value -= -ocs[ocLevel];
            break;
        case "OcAttackBuff": //B兰OC加攻
            $("txtAttackBuff").value = ocs[ocLevel];
            break;
        case "DefDecrease": //宝具前降防
            $("txtEnemyDefence").value -= ocs[ocLevel];
            break;
        case "OcNpStrength": //宫本半藏OC宝具威力提升
            $("txtNpStrength").value -= -ocs[ocLevel];
            break;
        case "CombinedDecrease":
            $("txtEnemyDefence").value -= ocs[ocLevel];
            $("txtCardBuff").value -= -ocs[ocLevel];
            break;
        case "NpSpecialAttack": //宝具特攻
            $("txtNpSpecialAttack").value = ocs[ocLevel];
            break;
        case "SpecialAttackBuff": //杰克女性特攻
            $("txtSpecialAttack").value = ocs[ocLevel];
    }
}
function adjustOc(){
    let id = $("ddlServant").value;
    if(id == "-1") {
        $("ddlOvercharge").selectedIndex = 0;
        return;
    }
    let servant = servants[id];
    let ocs = servant.oc;
    let ocLevel = $("ddlOvercharge").value;
    let oldocLevel = $("ddlOvercharge").oldvalue;
    if(ocs.oc1 == ocs.oc5){
        $("ddlOvercharge").selectedIndex = 0;
        return;
    }
    switch(ocs.type) {
        case "NpRemainHpDamage":
            calNpRemainHpDamage();
            break;
        case "OcNpDamage":
            calOcNpDamage();
            break;
        case "OcCardBuff":
	case "CardDecrease":
            $("txtCardBuff").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
        case "OcAttackBuff":
            $("txtAttackBuff").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
        case "DefDecrease":
            $("txtEnemyDefence").value -= ocs[ocLevel] - ocs[oldocLevel];
            break;
        case "OcNpStrength":
            $("txtNpStrength").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
        case "CombinedDecrease":
            $("txtEnemyDefence").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtCardBuff").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
        case "NpSpecialAttack":
            $("txtNpSpecialAttack").value = ocs[ocLevel];
            break;
        case "SpecialAttackBuff":
            $("txtSpecialAttack").value -= ocs[oldocLevel] - ocs[ocLevel];
    }
}
