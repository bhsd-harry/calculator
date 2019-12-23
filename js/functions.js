"use strict";
function adjHp() {
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
    if (servant.oc["type"] == "NpRemainHpDamage") {//双子宝具特攻
        calNpRemainHpDamage();
    }
}
//计算双子宝具总倍率
function calNpRemainHpDamage() {
    let servant = servants[$("ddlServant").value];
    let ocLevel = $("ddlOvercharge").value;
    //附加倍率《超蓄力威力提升》 (此倍率×自身已损失HP所占百分比,与宝具倍率加算)
    //【※总倍率＝攻击倍率+HP特攻倍率*(1—现在HP/最大HP)】
    let maxHp = getFloat("txtMaxHp");
    let fouHp = getFloat("txtFouHp");
    let craftEssenceHp = getFloat("txtCraftEssenceHp");
    let totalHp = maxHp + fouHp + craftEssenceHp;
    let remainHp = getFloat("txtRemainHp");
    //附加倍率
    let additionalCoef = servant.oc[ocLevel] * Math.max(0, 1 - remainHp / totalHp);
    //总宝具倍率
    let npCoef = servant.NP[$("ddlNpLevel").value] + additionalCoef;
    //向下取整总宝具倍率
    $("txtNpCoefficient").value = Math.floor(npCoef * 10) / 10;
}
//宝具等级选中项发生变化事件
function changeNpCoefficient() {
    let servant = servants[$("ddlServant").value];
    $("txtNpCoefficient").value = servant.NP[$("ddlNpLevel").value];
    if (servant.oc.type == "NpRemainHpDamage") {//双子宝具
        calNpRemainHpDamage();
    }
    else if (servant.oc.type == "OcNpDamage") {//自爆弓
        calOcNpDamage();
    }
}
//计算自爆弓宝具总倍率
function calOcNpDamage() {
    let servant = servants[$("ddlServant").value];
    let ocLevel = $("ddlOvercharge").value;
    let npCoef = servant.NP[$("ddlNpLevel").value] + servant.oc[ocLevel];
    $("txtNpCoefficient").value = npCoef;
}
//绑定从者基本信息
function bindServantData(id) {
    let servant = servants[id];
    //1.阵营
    $("spanAttribute").innerHTML = "<a href='javascript:;' data-value='@" + servant.attribute + "' onclick='autoClickSearch(this)'>" + servant.attribute + "</a>"
    //2.基本数据
    $("txtNTarget").value = servant.target;
    $("txtNHits").value = servant.hit;
    $("txtAttack").value = servant.atk;
    $("txtMaxHp").value = servant.hp;
    $("txtNpGain").value = servant.np;
    //3.宝具倍率
    changeNpCoefficient();
    //4.卡色
    document.querySelector("#ddlColor option[value='" + servant.cardColor + "']").selected = true;
    /技能/5.从者职介
    let Classes = $("ddlClass").options;
    for (let i = 0; i < Classes.length; i++) {
        let Class = Classes[i];
        if (Class.text == servant.Class) {
            Class.selected = true;
        }
    }
    //6.职介技能
    bindClassSkill(servant);
    //7.宝具副效果补充(oc特攻只能展示一种副效果，如：1001的oc特攻只展示了宝具特攻，副效果的20>宝具威力buff没展示，在这进行补充)
    bindNpEffect(servant);
    //8.属性
    bindAlignments(servant);
}
//绑定从者职介技能
function bindClassSkill(servant) {
    //{ cardBuff: 10, damagePlus: 0}
    let ClassSkill = servant.ClassSkill;
    if (ClassSkill && OClassSkill.cardBuff) {
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
    if (npEffect && npEffect.npStrength) {
        $("txtNpStrength").basevalue = npEffect.npStrength;
    }
    else {
	$("txtNpStrength").basevalue = 0;
    }
    if (npEffect && npEffect.cardBuff) {//单个数值，比如剑兰宝具的30%蓝魔放buff
        $("txtCardBuff").basevalue = $("txtCardBuff").basevalue + npEffect.cardBuff;
    }
    if (npEffect && npEffect.specialAttack) {
        $("txtNpSpecialAttack").value = npEffect.specialAttack;
    }
}
function clearBuff(){
    $("txtNpStrength").value = $("txtNpStrength").basevalue;
    $("txtCardBuff").value = $("txtCardBuff").basevalue;
    $("txtAttackBuff").value = 0;
    $("txtEnemyDefence").value = 0;
    $("txtSpecialAttack").value = 0;
    $("txtDamagePlus").value = $("txtDamagePlus").basevalue;
    $("txtNpGainBuff").value = 0;
    $("txtOverkill1").value = 0;
    $("txtOverkill2").value = 0;
    $("txtOverkill3").value = 0;
}
//根据OC设置buff
function setOc() {
    let id = $("ddlServant").value;
    if(id == "-1"){
	$("ddlOvercharge").selectedIndex = 0;
	return;
    }
    let servant = servants[id];
    let ocs = servant.oc;
    let ocLevel = $("ddlOvercharge").value;
    if (ocs["type"] == "NpRemainHpDamage") {//双子宝具倍率提升
        calNpRemainHpDamage();
    }
    else if (ocs["type"] == "OcNpDamage") {//自爆弓倍率提升
        calOcNpDamage();
    }
    else if (ocs["type"] == "OcCardBuff") {//R金时OC绿魔放
        $("txtCardBuff").value = $("txtCardBuff").basevalue + ocs[ocLevel];
    }
    else if (ocs["type"] == "OcAtkBuff") {//B兰OC加攻
        $("txtAttackBuff").value = ocs[ocLevel];
    }
    else if (ocs["type"] == "DefDecrease") {//宝具前降防
        $("txtEnemyDefence").value = 0 - ocs[ocLevel];
    }
    else if (ocs["type"] == "OcNpStrength") {//宫本半藏OC宝具威力提升
        $("txtNpStrength").value = $("txtNpStrength").basevalue + ocs[ocLevel];
    }
    else if (ocs["type"] == "CombinedDecrease") {
        $("txtEnemyDefence").value = 0 - ocs[ocLevel];
        $("txtCardBuff").value = $("txtCardBuff").basevalue + ocs[ocLevel];
    }
    else if (ocs["type"] == "NpSpecialAttack") {//宝具特攻
        $("txtNpSpecialAttack").value = ocs[ocLevel];
    }
    else if (ocs["type"] == "SpecialAttackBuff") {//杰克女性特攻
        $("txtSpecialAttack").value = ocs[ocLevel];
    }
    else if (ocs["type"] == "") {
        $("ddlOvercharge").selectedIndex = 0;
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
    if(oldocLevel === undefined){ oldocLevel = "oc1";}
    if(ocs["type"] == "" || ocs["oc1"] == ocs["oc5"]){
        $("ddlOvercharge").selectedIndex = 0;
        return;
    }
    else if (ocs["type"] == "NpRemainHpDamage") {//双子宝具特攻
        calNpRemainHpDamage();
    }
    else if (ocs["type"] == "OcNpDamage") {//自爆弓特攻
        calOcNpDamage();
    }
    else if (ocs["type"] == "OcCardBuff") {//R金时OC绿魔放
        let o = getFloat("txtCardBuff");
        $("txtCardBuff").value = o + ocs[ocLevel] - ocs[oldocLevel];
    }
    else if (ocs["type"] == "OcAtkBuff") {//B兰OC加攻
        let o = getFloat("txtAttackBuff");
        $("txtAttackBuff").value = o + ocs[ocLevel] - ocs[oldocLevel];
    }
    else if (ocs["type"] == "DefDecrease") {//宝具前降防
        let o = getFloat("txtEnemyDefence");
        $("txtEnemyDefence").value = o - ocs[ocLevel] + ocs[oldocLevel];
    }
    else if (ocs["type"] == "OcNpStrength") {//宫本半藏OC宝具威力提升
        let o = getFloat("txtNpStrength");
        $("txtNpStrength").value = o + ocs[ocLevel] - ocs[oldocLevel];
    }
    else if (ocs["type"] == "CombinedDecrease") {
        let o = getFloat("txtEnemyDefence");
        $("txtEnemyDefence").value = o - ocs[ocLevel] + ocs[oldocLevel];
        o = getFloat("txtCardBuff");
        $("txtCardBuff").value = o + ocs[ocLevel] - ocs[oldocLevel];
    }
    else if (ocs["type"] == "NpSpecialAttack") {//宝具特攻
        $("txtNpSpecialAttack").value = ocs[ocLevel];
    }
    else if (ocs["type"] == "SpecialAttackBuff") {//杰克女性特攻
        let o = getFloat("txtSpecialAttack");
        $("txtSpecialAttack").value = o + ocs[ocLevel] - ocs[oldocLevel];
    }
}
