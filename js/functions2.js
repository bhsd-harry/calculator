"use strict";
function noOverkill() {
    $("txtOverkill1").value = 0;
    $("txtOverkill2").value = 0;
    $("txtOverkill3").value = 0;
    $("spanOverkill1").innerHTML = "100%";
    $("spanOverkill2").innerHTML = "100%";
    $("spanOverkill3").innerHTML = "100%";
    $("btnAdjOverkill").value = "全鞭尸";
}
function randomSkill(label) {
    let id = $("ddlServant").value;
    let skillLv = $("ddlSkill"+label).value;
    if(id == -1 || skillLv == -1) { return; }
    let servant = servants[id];
    let skill = servant["skill"+label];
    if(!skill) { return; }
    let noMiss = $("ckNoMiss"+label).checked;
    let buff = [];
    if(buff = skill.randomAttackBuff) {
	let attackBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtAttackBuff").value -= (noMiss? -attackBuff : attackBuff);
    }
    if(buff = skill.randomCardBuff) {
        let cardBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardBuff").value -= (noMiss? -cardBuff : cardBuff);
    }
    if(buff = skill.randomNpStrength) {
        let npStrength = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtNpStrength").value -= (noMiss? -npStrength : npStrength);
    }
}
function bindSkill(label) {
    let id = $("ddlServant").value;
    let skillLv = $("ddlSkill"+label).value;
    if(id == -1 || skillLv == -1) { return; }
    let servant = servants[id];
    let skill = servant["skill"+label];
    if(!skill) { return; }
    let buff = [];
    let noMiss = $("ckNoMiss"+label).checked;
    if(buff = skill.attackBuff) {
	let attackBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtAttackBuff").value -= -attackBuff;
    }
    if((buff = skill.randomAttackBuff) && noMiss) {
        let attackBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtAttackBuff").value -= -attackBuff;
    }
    if(buff = skill.defDecreaseSingle) {
	let defDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtEnemyDefence1").value -= defDecrease;
    }
    if(buff = skill.defDecreaseAll) {
	let defDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtEnemyDefence1").value -= defDecrease;
	$("txtEnemyDefence2").value -= defDecrease;
	$("txtEnemyDefence3").value -= defDecrease;
    }
    if(buff = skill.cardBuff) {
	let cardBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtCardBuff").value -= -cardBuff;
    }
    if((buff = skill.randomCardBuff) && noMiss) {
        let cardBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardBuff").value -= -cardBuff;
    }
    if(buff = skill.cardDecreaseSingle) {
        let cardDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardResist1").value -= cardDecrease;
    }
    if(buff = skill.cardDecreaseAll) {
	let cardDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtCardResist1").value -= cardDecrease;
	$("txtCardResist2").value -= cardDecrease;
	$("txtCardResist3").value -= cardDecrease;
    }
    if(buff = skill.npStrength) {
	let npStrength = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtNpStrength").value -= -npStrength;
    }
    if((buff = skill.randomNpStrength) && noMiss) {
        let npStrength = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtNpStrength").value -= -npStrength;
    }
    if(buff = skill.specialAttack) {
	let specialAttack = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtSpecialAttack").value -= -specialAttack;
    }
    if(buff = skill.damagePlus) {
	let damagePlus = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtDamagePlus").value -= -damagePlus;
    }
    if(buff = skill.npGainBuff) {
	let npGainBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
	$("txtNpGainBuff").value -= -npGainBuff;
    }
}
function changeSkill(label) {
    let id = $("ddlServant").value;
    if(id == -1) { return; }
    let servant = servants[id];
    let skill = servant["skill"+label];
    if(!skill) { return; }
    let skillLv = $("ddlSkill"+label).value;
    let oldLv = $("ddlSkill"+label).oldvalue;
    let buff = [];
    let o = 0;
    let noMiss = $("ckNoMiss"+label).checked;
    let nCount = $("btnAccumulate").count;
    if(buff = skill.attackBuff) {
	o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let attackBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtAttackBuff").value -= o - attackBuff;
    }
    if((buff = skill.randomAttackBuff) && noMiss) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let attackBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtAttackBuff").value -= o - attackBuff;
    }
    if(buff = skill.accAttackBuff) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let attackBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtAttackBuff").value -= (o - attackBuff) * nCount;
    }
    if(buff = skill.defDecreaseSingle) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let defDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtEnemyDefence1").value -= defDecrease - o;
    }
    if(buff = skill.accDefDecrease) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let defDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtEnemyDefence1").value -= (defDecrease - o) * nCount;
    }
    if(buff = skill.defDecreaseAll) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let defDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtEnemyDefence1").value -= defDecrease - o;
	$("txtEnemyDefence2").value -= defDecrease - o;
	$("txtEnemyDefence3").value -= defDecrease - o;
    }
    if(buff = skill.cardBuff) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let cardBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtCardBuff").value -= o - cardBuff;
    }
    if((buff = skill.randomCardBuff) && noMiss) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let cardBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtCardBuff").value -= o - cardBuff;
    }
    if(buff = skill.accCardBuff) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let cardBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtCardBuff").value -= (o - cardBuff) * nCount;
    }
    if(buff = skill.cardDecreaseSingle) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let cardDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtCardResist1").value -= cardDecrease - o;
    }
    if(buff = skill.cardDecreaseAll) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let cardDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtCardResist1").value -= cardDecrease - o;
	$("txtCardResist2").value -= cardDecrease - o;
	$("txtCardResist3").value -= cardDecrease - o;
    }
    if(buff = skill.npStrength) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let npStrength = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtNpStrength").value -= o - npStrength;
    }
    if((buff = skill.randomNpStrength) && noMiss) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let npStrength = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtNpStrength").value -= o - npStrength;
    }
    if(buff = skill.specialAttack) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let specialAttack = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtSpecialAttack").value -= o - specialAttack;
    }
    if(buff = skill.damagePlus) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let damagePlus = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtDamagePlus").value -= o - damagePlus;
    }
    if(buff = skill.npGainBuff) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
	let npGainBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
	$("txtNpGainBuff").value -= o - npGainBuff;
    }
}
function calPerDamage(label) {
    let id = $("ddlServant").value;
    if(id == -1) { return; }
    let ok = getInt("txtOverkill"+label);
    let servant = servants[id];
    if(ok<2 || servant.hit != $("txtNHits").value){
	$("spanOverkill"+label).innerHTML = "100%";
    }
    else{
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
    for(let i=1;i<=3;i++){
        $("ddlEnemyClass"+i).selectedIndex = Class;
        $("ckIsUndying"+i).checked = isUndying;
        $("ddlEnemyAttribute"+i).selectedIndex = attribute;
        $("ckIsSpecialAttack"+i).checked = isSpecialAttack;
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
	abling("ckIsMaxGrail","ddlLvs","ddlClass","ddlColor","txtAtk","txtFouAtk","txtCraftEssenceAtk","txtBaseNp","ddlNpLevel","txtNpCoefficient","txtNHits","btnAdjOverkill","ddlCraftEssence","ddlEnemyClass1","ckIsUndying1","ddlMysticCode","ddlEnemyAttribute1","ckIsSpecialAttack1","txtAttackBuff","txtEnemyDefence1","txtCardBuff","txtCardResist1","txtNpStrength","txtSpecialAttack","txtNpSpecialAttack","txtDamagePlus","txtNpGainBuff","txtOverkill1","btnAddZhuge","btnAddMerlin","btnAddTamamo","btnAddSkadi","btnClearBuff","btnCalculate");
        bindServantData(id);
        adjHp()
        clearBuff();
	bindSkill(1);
	bindSkill(2);
	bindSkill(3);
        setOc();
        $("ddlOvercharge").oldvalue = $("ddlOvercharge").value;
	$("ddlSkill1").oldvalue = $("ddlSkill1").value;
	$("ddlSkill2").oldvalue = $("ddlSkill2").value;
	$("ddlSkill3").oldvalue = $("ddlSkill3").value;
        $("btnAdjOverkill").value = "全鞭尸";
	let servant = servants[id];
	let npEffect = servant.npEffect;
	let ocs = servant.oc;
	if((npEffect && npEffect.npRemainHpDamage) || ocs.type == "NpRemainHpDamage") {
	    abling("txtMaxHp","txtFouHp","txtCraftEssenceHp","txtRemainHp","btnAdjHp");
	}
	else {
	    disabling("txtMaxHp","txtFouHp","txtCraftEssenceHp","txtRemainHp","btnAdjHp");
	}
	if(ocs.oc1 == ocs.oc5) {
	    disabling("ddlOvercharge");
	}
	else {
	    abling("ddlOvercharge");
	}
	if($("ddlNTarget").selectedIndex == 0) {
	    disabling("ddlNTarget","ddlEnemyClass2","ckIsUndying2","ddlEnemyClass3","ckIsUndying3","btnApplyEnemy1","ddlEnemyAttribute2","ckIsSpecialAttack2","btnApplyEnemy2","ddlEnemyAttribute3","ckIsSpecialAttack3","btnApplyEnemy3","txtEnemyDefence2","txtEnemyDefence3","txtCardResist2","txtCardResist3","txtOverkill2","txtOverkill3");
	}
	else {
	    abling("ddlNTarget","ddlEnemyClass2","ckIsUndying2","ddlEnemyClass3","ckIsUndying3","btnApplyEnemy1","ddlEnemyAttribute2","ckIsSpecialAttack2","btnApplyEnemy2","ddlEnemyAttribute3","ckIsSpecialAttack3","btnApplyEnemy3","txtEnemyDefence2","txtEnemyDefence3","txtCardResist2","txtCardResist3","txtOverkill2","txtOverkill3");
	}
	disabling("btnAccumulate");
	for(let i=1;i<=3;i++) {
	    let skill = servant["skill"+i];
	    if(skill && Object.keys(skill).length > 0) {
	        abling("ddlSkill"+i);
	        if(skill.randomAttackBuff || skill.randomCardBuff || skill.randomNpStrength) {
		    abling("ckNoMiss"+i);
	        }
	        else {
		    disabling("ckNoMiss"+i);
	        }
	    }
	    else {
	        disabling("ddlSkill"+i,"ckNoMiss"+i);
	    }
	    if(skill && (skill.accAttackBuff || skill.accDefDecrease || skill.accCardBuff)) {
		abling("btnAccumulate");
	    }
	}
	if(servant.star == $("ddlLvs").oldvalue) { return; }
	let nLvs = $("ddlLvs").length;
	for(let i=3;i<nLvs;i++) {
	    $("ddlLvs").remove(3);
	}
	switch(servant.star) {
	    case 4:
		$("ddlLvs").options.add(options[0]);
		break;
	    case 2:
		$("ddlLvs").options.add(options[2]);
                break;
	    case 3:
                $("ddlLvs").options.add(options[1]);
		break;
	    case 1:
		$("ddlLvs").options.add(options[1]);
		$("ddlLvs").options.add(options[3]);
	}
	$("ddlLvs").oldvalue = servant.star;
    }
    else {
	disabling("ckIsMaxGrail","ddlLvs","ddlClass","ddlColor","txtAtk","txtFouAtk","txtCraftEssenceAtk","txtBaseNp","txtMaxHp","txtFouHp","txtCraftEssenceHp","txtRemainHp","btnAdjHp","ddlNpLevel","txtNpCoefficient","ddlOvercharge","ddlNTarget","ddlSkill1","ckNoMiss1","ddlSkill2","ckNoMiss2","ddlSkill3","ckNoMiss3","txtNHits","btnAdjOverkill","ddlCraftEssence","ddlEnemyClass1","ckIsUndying1","ddlEnemyClass2","ckIsUndying2","ddlEnemyClass3","ckIsUndying3","ddlMysticCode","ddlEnemyAttribute1","ckIsSpecialAttack1","btnApplyEnemy1","ddlEnemyAttribute2","ckIsSpecialAttack2","btnApplyEnemy2","ddlEnemyAttribute3","ckIsSpecialAttack3","btnApplyEnemy3","txtAttackBuff","txtEnemyDefence1","txtEnemyDefence2","txtEnemyDefence3","txtCardBuff","txtCardResist1","txtCardResist2","txtCardResist3","txtNpStrength","txtSpecialAttack","txtNpSpecialAttack","txtDamagePlus","txtNpGainBuff","txtOverkill1","txtOverkill2","txtOverkill3","btnAccumulate","btnAddZhuge","btnAddMerlin","btnAddTamamo","btnAddSkadi","btnClearBuff","btnCalculate");
	$("spanAttribute").innerHTML = "";
	$("txtEnemyDefence1").basevalue = 0;
	$("txtCardBuff").basevalue = 0;
	$("txtNpStrength").basevalue = 0;
	$("txtDamagePlus").basevalue = 0;
	clearBuff();
    }
}
function adjHp(){
    let totalHp = getInt("txtMaxHp") + getInt("txtFouHp") + getInt("txtCraftEssenceHp");
    $("txtRemainHp").value = totalHp;
    adjustNpRemainHpDamage();
}
function adjustNpRemainHpDamage() {
    let id = $("ddlServant").value;
    if(id == -1) { return; }
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
    $("btnAccumulate").count = 0;
    $("btnAccumulate").value = "累   加";
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
            $("txtAttackBuff").value -= -ocs[ocLevel];
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
