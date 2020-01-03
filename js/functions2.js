"use strict";
function bindSkill(label) {
    let id = $("ddlServant").value;
    let skillLv = $("ddlSkill"+label).value;
    if(id == -1 || skillLv == -1) { return; }
    let servant = servants[id];
    let skill = servant["skill"+label];
    if(!skill) { return; }
    let buff = [];
    if(buff = skill.attackBuff) {
	let attackBuff = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtAttackBuff").value -= -attackBuff;
    }
    if(buff = skill.defDecreaseSingle) {
	let defDecrease = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtEnemyDefence1").value -= defDecrease;
    }
    if(buff = skill.defDecreaseAll) {
	let defDecrease = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtEnemyDefence1").value -= defDecrease;
	$("txtEnemyDefence2").value -= defDecrease;
	$("txtEnemyDefence3").value -= defDecrease;
    }
    if(buff = skill.cardBuff) {
	let cardBuff = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtCardBuff").value -= -cardBuff;
    }
    if(buff = skill.cardDecrease) {
	let cardDecrease = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtCardResist1").value -= cardDecrease;
	$("txtCardResist2").value -= cardDecrease;
	$("txtCardResist3").value -= cardDecrease;
    }
    if(buff = skill.npStrength) {
	let npStrength = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtNpStrength").value -= -npStrength;
    }
    if(buff = skill.specialAttack) {
	let specialAttack = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtSpecialAttack").value -= -specialAttack;
    }
    if(buff = skill.damagePlus) {
	let damagePlus = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtDamagePlus").value -= -damagePlus;
    }
    if(buff = skill.npGainBuff) {
	let npGainBuff = buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtNpGainBuff").value -= -npGainBuff;
    }
}
function changeSkill(label) {
    let id = $("ddlServant").value;
    if(id == -1) { return; }
    let oldLv = $("ddlSkill"+label).oldvalue;
    if(oldLv == -1) {
	bindSkill(label);
	return;
    }
    let servant = servants[id];
    let skill = servant["skill"+label];
    if(!skill) { return; }
    let skillLv = $("ddlSkill"+label).value;
    let buff = [];
    let o = 0;
    if(buff = skill.attackBuff) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let attackBuff = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtAttackBuff").value -= o - attackBuff;
    }
    if(buff = skill.defDecreaseSingle) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let defDecrease = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtEnemyDefence1").value -= defDecrease - o;
    }
    if(buff = skill.defDecreaseAll) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let defDecrease = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtEnemyDefence1").value -= defDecrease - o;
	$("txtEnemyDefence2").value -= defDecrease - o;
	$("txtEnemyDefence3").value -= defDecrease - o;
    }
    if(buff = skill.cardBuff) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let cardBuff = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtCardBuff").value -= o - cardBuff;
    }
    if(buff = skill.cardDecrease) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let cardDecrease = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtCardResist1").value -= cardDecrease - o;
	$("txtCardResist2").value -= cardDecrease - o;
	$("txtCardResist3").value -= cardDecrease - o;
    }
    if(buff = skill.npStrength) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let npStrength = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtNpStrength").value -= o - npStrength;
    }
    if(buff = skill.specialAttack) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let specialAttack = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtSpecialAttack").value -= o - specialAttack;
    }
    if(buff = skill.damagePlus) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let damagePlus = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtDamagePlus").value -= o - damagePlus;
    }
    if(buff = skill.npGainBuff) {
	o = buff[0] + Math.round((buff[1] - buff[0]) / 10 * oldLv * 10) / 10;
	let npGainBuff = (skillLv == -1? 0 : buff[0] + Math.round((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtNpGainBuff").value -= o - npGainBuff;
    }
}
function calPerDamage(label) {
    let id = $("ddlServant").value;
    if(id == -1) { return; }
    let ok = getInt("txtOverkill"+label);
    if(ok<2){
	$("spanOverkill"+label).innerHTML = "100%";
    }
    else{
	//Adjust $("spanOverkill").innerHTML
	let servant = servants[id];
	let damageDist = servant.damageDist;
	let perDamage = 0;
	let nHits = getInt("txtNHits") - ok;
	for(let i=0;i<=nHits;i++){
	    perDamage += damageDist[i];
	}
	$("spanOverkill"+label).innerHTML = perDamage.toString() + "%";
    }
}
function applyEnemy(label) {
    let Class = $("ddlEnemyClass"+label).selectedIndex;
    let isUndying = $("ckIsUndying"+label).checked;
    let attribute = $("ddlEnemyAttribute"+label).selectedIndex;
    let isSpecialAttack = $("ckIsSpecialAttack"+label).checked;
    for(let i=1, l="";i<=3;i++){
	l=i.toString();
        $("ddlEnemyClass"+l).selectedIndex = Class;
        $("ckIsUndying"+l).checked = isUndying;
        $("ddlEnemyAttribute"+l).selectedIndex = attribute;
        $("ckIsSpecialAttack"+l).checked = isSpecialAttack;
    }
}
function initialServantList() {
    servants.forEach(function(servant){
         $("ddlServant").options.add(new Option(`【${servant.star}】【${servant.Class}】${servant.name}`, servant.id));
    })
}
function initialEffects() {
    let id = $("ddlServant").value;
    if (id != -1) {
        bindServantData(id);
        adjHp()
        clearBuff();
	bindSkill("1");
	bindSkill("2");
	bindSkill("3");
        setOc();
        $("ddlOvercharge").oldvalue = $("ddlOvercharge").value;
	$("ddlSkill1").oldvalue = $("ddlSkill1").value;
	$("ddlSkill2").oldvalue = $("ddlSkill2").value;
	$("ddlSkill3").oldvalue = $("ddlSkill3").value;
    }
}
function adjHp(){
    let totalHp = getInt("txtMaxHp") + getInt("txtFouHp") + getInt("txtCraftEssenceHp");
    $("txtRemainHp").value = totalHp;
    adjustNpRemainHpDamage();
}
function adjustNpRemainHpDamage() {
    let id = $("ddlServant").value;
    if(id == -1) {
        return;
    }
    let servant = servants[id];
    let npEffect = servant.npEffect;
    let isNpRemainHpDamage = (npEffect && npEffect.npRemainHpDamage);
    if (servant.oc.type == "NpRemainHpDamage" || isNpRemainHpDamage) {
        calNpRemainHpDamage();
    }
}
function calNpRemainHpDamage() {
    let servant = servants[$("ddlServant").value];
    let ocs = servant.oc;
    let npEffect = servant.npEffect;
    let ocLevel = $("ddlOvercharge").value;
    //附加倍率《超蓄力威力提升》 (此倍率×自身已损失HP所占百分比,与宝具倍率加算)
    //【※总倍率＝攻击倍率+HP特攻倍率*(1—现在HP/最大HP)】
    let totalHp = getInt("txtMaxHp") + getInt("txtFouHp") + getInt("txtCraftEssenceHp");
    let remainHp = getInt("txtRemainHp");
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
        $("txtEnemyDefence1").basevalue = -npEffect.defDecrease;
    }
    else {
        $("txtEnemyDefence1").basevalue = 0;
    }
    if (npEffect && npEffect.npCoefficient) {
        $("txtNpCoefficient").value = npEffect.npCoefficient;
    }
}
function clearBuff(){
    $("txtAttackBuff").value = 0;
    let enemyDefence = $("txtEnemyDefence1").basevalue;
    $("txtEnemyDefence1").value = enemyDefence;
    $("txtEnemyDefence2").value = enemyDefence;
    $("txtEnemyDefence3").value = enemyDefence;
    $("txtCardBuff").value = $("txtCardBuff").basevalue;
    $("txtCardResist1").value = 0;
    $("txtCardResist2").value = 0;
    $("txtCardResist3").value = 0;
    $("txtNpStrength").value = $("txtNpStrength").basevalue;
    $("txtSpecialAttack").value = 0;
    $("txtDamagePlus").value = $("txtDamagePlus").basevalue;
    $("txtNpGainBuff").value = 0;
    $("txtOverkill1").value = 0;
    $("txtOverkill2").value = 0;
    $("txtOverkill3").value = 0;
    $("spanOverkill1").innerHTML = "100%";
    $("spanOverkill2").innerHTML = "100%";
    $("spanOverkill3").innerHTML = "100%";
}
//根据OC重设所有buff
function setOc() {
    let id = $("ddlServant").value;
    if(id == -1){
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
            $("txtCardBuff").value -= -ocs[ocLevel];
            break;
	case "CardDecrease":
            $("txtCardResist1").value = -ocs[ocLevel];
            $("txtCardResist2").value = -ocs[ocLevel];
            $("txtCardResist3").value = -ocs[ocLevel];
            break;
        case "OcAttackBuff": //B兰OC加攻
            $("txtAttackBuff").value = ocs[ocLevel];
            break;
        case "DefDecrease": //宝具前降防
            $("txtEnemyDefence1").value -= ocs[ocLevel];
            $("txtEnemyDefence2").value -= ocs[ocLevel];
            $("txtEnemyDefence3").value -= ocs[ocLevel];
            break;
        case "OcNpStrength": //宫本半藏OC宝具威力提升
            $("txtNpStrength").value -= -ocs[ocLevel];
            break;
        case "CombinedDecrease":
            $("txtEnemyDefence1").value -= ocs[ocLevel];
            $("txtEnemyDefence2").value -= ocs[ocLevel];
            $("txtEnemyDefence3").value -= ocs[ocLevel];
            $("txtCardResist1").value = -ocs[ocLevel];
            $("txtCardResist2").value = -ocs[ocLevel];
            $("txtCardResist3").value = -ocs[ocLevel];
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
    if(id == -1) {
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
            $("txtCardBuff").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
	case "CardDecrease":
            $("txtCardResist1").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtCardResist2").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtCardResist3").value -= ocs[ocLevel] - ocs[oldocLevel];
            break;
        case "OcAttackBuff":
            $("txtAttackBuff").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
        case "DefDecrease":
            $("txtEnemyDefence1").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtEnemyDefence2").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtEnemyDefence3").value -= ocs[ocLevel] - ocs[oldocLevel];
            break;
        case "OcNpStrength":
            $("txtNpStrength").value -= ocs[oldocLevel] - ocs[ocLevel];
            break;
        case "CombinedDecrease":
            $("txtEnemyDefence1").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtEnemyDefence2").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtEnemyDefence3").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtCardResist1").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtCardResist2").value -= ocs[ocLevel] - ocs[oldocLevel];
            $("txtCardResist3").value -= ocs[ocLevel] - ocs[oldocLevel];
            break;
        case "NpSpecialAttack":
            $("txtNpSpecialAttack").value = ocs[ocLevel];
            break;
        case "SpecialAttackBuff":
            $("txtSpecialAttack").value -= ocs[oldocLevel] - ocs[ocLevel];
    }
}
