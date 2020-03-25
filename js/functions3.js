"use strict";
function compareServants() {
    if($("ddlLvs").selectedIndex > 2) {
	$("ddlLvs").selectedIndex = 0;
    }
    let nServant = $("ddlServant").length;
    for(let i=1;i<nServant;i++) {
	$("ddlServant").selectedIndex = i;
	$("txtNpSpecialAttack").value = 100;
	initialEffects();
	calc();
    }
}
function adjLvs() {
    let id=$("ddlServant").value;
    if (id == -1) { return; }
    let servant = servants[id];  
    let lv = $("ddlLvs").value;
    let Star = servant.star;
    if(lv > 90){
	$("ckIsMaxGrail").checked = true;
        $("txtAtk").value = servant.maxAtk;
        $("txtMaxHp").value = servant.maxHp;
    }
    else {
	$("ckIsMaxGrail").checked = false;
        if(Star < 5){
            if(Star > 1){
                lv = servant.lvs[0];
            }
            else {
                lv = servant.lvs[1];
            }
            $("txtAtk").value = lv.a;
            $("txtMaxHp").value = lv.h;
        }
    }
    adjHp();
}
function noOverkill() {
    $("txtOverkill1").value = 0;
    $("txtOverkill2").value = 0;
    $("txtOverkill3").value = 0;
    $("spanOverkill1").innerHTML = "100%";
    $("spanOverkill2").innerHTML = "100%";
    $("spanOverkill3").innerHTML = "100%";
    $("btnAdjOverkill").value = "全鞭尸";
}
function randomSupport(n,i) {
    let id = $("ddlSupport"+n).value;
    let skillLv = $("ddlSupport"+n+"Skill"+i).value;
    if(id == -1 || skillLv == -1) { return; }
    let servant = servants[id];
    let skill = servant["support"+i];
    if(!skill) { return; }
    let noMiss = $("ckSupport"+n+"NoMiss"+i).checked;
    let buff = [];
    if(buff = skill.randomAttackBuff) {
	let attackBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtAttackBuff").value -= (noMiss? -attackBuff : attackBuff);
    }
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
    if(buff = skill.randomEffect) {
	let randomIndex = $("btnSwitchEffect").count;
	let currentEffect = Object.keys(buff)[randomIndex];
	let currentBuff = buff[currentEffect];
	switch(currentEffect) {
	    case "noEffect":
		$("btnSwitchEffect").value = "切换 无效果";
		break;
	    case "cardBuff":
		$("btnSwitchEffect").value = "切换 卡牌buff";
		let cardBuff = currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * skillLv * 10) / 10;
        	$("txtCardBuff").value -= -cardBuff;
		break;
	    case "attackBuff":
		$("btnSwitchEffect").value = "切换 攻击buff";
		let attackBuff = currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * skillLv * 10) / 10;
		$("txtAttackBuff").value -= -attackBuff;
		break;
	    case "npStrength":
		$("btnSwitchEffect").value = "切换 宝威buff";
		let npStrength = currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * skillLv * 10) / 10;
		$("txtNpStrength").value -= -npStrength;
	}
	abling("btnSwitchEffect");
    }
}
function bindSupport(n,i) {
    let id = $("ddlSupport"+n).value;
    let skillLv = $("ddlSupport"+n+"Skill"+i).value;
    if(id == -1 || skillLv == -1) { return; }
    let servant = servants[id];
    let skill = servant["support"+i];
    if(!skill) { return; }
    let buff = [];
    let noMiss = $("ckSupport"+n+"NoMiss"+i).checked;
    let color = $("ddlColor").value;
    let str = "出现致命bug，请反馈至https://nga.178.com/read.php?tid=20424898，谢谢配合！"
    if((buff = skill.cardBuff) && buff.length < 3) {
	alert(str);
    }
    if((buff = skill.cardDecreaseSingle) && buff.length < 3) {
        alert(str);
    }
    if((buff = skill.cardDecreaseAll) && buff.length < 3) {
        alert(str);
    }
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
    if((buff = skill.cardBuff) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        let cardBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardBuff").value -= -cardBuff;
    }
    if((buff = skill.cardDecreaseSingle) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        let cardDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardResist1").value -= cardDecrease;
    }
    if((buff = skill.cardDecreaseAll) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        let cardDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardResist1").value -= cardDecrease;
        $("txtCardResist2").value -= cardDecrease;
        $("txtCardResist3").value -= cardDecrease;
    }
    if(buff = skill.npStrength) {
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
function unbindSupport(n,servant,i) {
    let skillLv = $("ddlSupport"+n+"Skill"+i).value;
    if(!servant || skillLv == -1) { return; }
    let skill = servant["support"+i];
    if(!skill) { return; }
    let buff = [];
    let noMiss = $("ckSupport"+n+"NoMiss"+i).checked;
    let color = $("ddlColor").value;
    if(buff = skill.attackBuff) {
        let attackBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtAttackBuff").value -= attackBuff;
    }
    if((buff = skill.randomAttackBuff) && noMiss) {
        let attackBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtAttackBuff").value -= attackBuff;
    }
    if(buff = skill.defDecreaseSingle) {
        let defDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtEnemyDefence1").value -= -defDecrease;
    }
    if(buff = skill.defDecreaseAll) {
        let defDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtEnemyDefence1").value -= -defDecrease;
        $("txtEnemyDefence2").value -= -defDecrease;
        $("txtEnemyDefence3").value -= -defDecrease;
    }
    if((buff = skill.cardBuff) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        let cardBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardBuff").value -= cardBuff;
    }
    if((buff = skill.cardDecreaseSingle) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        let cardDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardResist1").value -= -cardDecrease;
    }
    if((buff = skill.cardDecreaseAll) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        let cardDecrease = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtCardResist1").value -= -cardDecrease;
        $("txtCardResist2").value -= -cardDecrease;
        $("txtCardResist3").value -= -cardDecrease;
    }
    if(buff = skill.npStrength) {
        let npStrength = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtNpStrength").value -= npStrength;
    }
    if(buff = skill.specialAttack) {
        let specialAttack = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtSpecialAttack").value -= specialAttack;
    }
    if(buff = skill.damagePlus) {
        let damagePlus = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtDamagePlus").value -= damagePlus;
    }
    if(buff = skill.npGainBuff) {
        let npGainBuff = buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10;
        $("txtNpGainBuff").value -= npGainBuff;
    }
}
function initialSupport(n) {
    let sid = $("ddlSupport"+n).value;
    if(sid == -1) {
        disabling("ddlSupport"+n+"Skill1","ckSupport"+n+"NoMiss1","ddlSupport"+n+"Skill2","ckSupport"+n+"NoMiss2","ddlSupport"+n+"Skill3","ckSupport"+n+"NoMiss3");
    }
    else {
        let support = servants[sid];
        for(let i=1;i<=3;i++) {
            let skill = support["support"+i];
            if(skill && Object.keys(skill).length > 0) {
                abling("ddlSupport"+n+"Skill"+i);
                if(skill.randomAttackBuff) {
                    abling("ckSupport"+n+"NoMiss"+i);
                }
                else {
                    disabling("ckSupport"+n+"NoMiss"+i);
                }
            }
            else {
                disabling("ddlSupport"+n+"Skill"+i,"ckSupport"+n+"NoMiss"+i);
            }
        }
    }
    let servant = servants[$("ddlSupport"+n).oldvalue];
    for(let i=1;i<=3;i++) {
	unbindSupport(n,servant,i);
	bindSupport(n,i);
    }
    $("ddlSupport"+n).oldvalue = $("ddlSupport"+n).value;
}
function changeSupport(n,i) {
    let id = $("ddlSupport"+n).value;
    if(id == -1) { return; }
    let servant = servants[id];
    let skill = servant["support"+i];
    if(!skill) { return; }
    let skillLv = $("ddlSupport"+n+"Skill"+i).value;
    let oldLv = $("ddlSupport"+n+"Skill"+i).oldvalue;
    let buff = [];
    let o = 0;
    let noMiss = $("ckSupport"+n+"NoMiss"+i).checked;
    let color = $("ddlColor").value;
    let str = "出现致命bug，请反馈至https://nga.178.com/read.php?tid=20424898，谢谢配合！";
    if((buff = skill.cardBuff) && buff.length < 3) {
        alert(str);
    }
    if((buff = skill.cardDecreaseSingle) && buff.length < 3) {
        alert(str);
    }
    if((buff = skill.cardDecreaseAll) && buff.length < 3) {
        alert(str);
    }
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
    if(buff = skill.defDecreaseSingle) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let defDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtEnemyDefence1").value -= defDecrease - o;
    }
    if(buff = skill.defDecreaseAll) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let defDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtEnemyDefence1").value -= defDecrease - o;
        $("txtEnemyDefence2").value -= defDecrease - o;
        $("txtEnemyDefence3").value -= defDecrease - o;
    }
    if((buff = skill.cardBuff) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let cardBuff = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtCardBuff").value -= o - cardBuff;
    }
    if((buff = skill.cardDecreaseSingle) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
        o = (oldLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * oldLv * 10) / 10);
        let cardDecrease = (skillLv == -1? 0 : buff[0] + Math.ceil((buff[1] - buff[0]) / 10 * skillLv * 10) / 10);
        $("txtCardResist1").value -= cardDecrease - o;
    }
    if((buff = skill.cardDecreaseAll) && (color == buff[2] || (buff.length > 3 && color == buff[3]) || (buff.length > 4 && color == buff[4]))) {
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
    $("ddlSupport"+n+"Skill"+i).oldvalue = $("ddlSupport"+n+"Skill"+i).value;
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
    if(buff = skill.randomEffect) {
        let randomIndex = $("btnSwitchEffect").count;
        let currentEffect = Object.keys(buff)[randomIndex];
        let currentBuff = buff[currentEffect];
        switch(currentEffect) {
	    case "noEffect":
		if(skillLv >= 0) {
                    abling("btnSwitchEffect");
                    $("btnSwitchEffect").value = "切换 无效果";
                }
		break;
            case "cardBuff":
		if(skillLv >= 0) {
		    abling("btnSwitchEffect");
		    $("btnSwitchEffect").value = "切换 卡牌buff";
		}
		o = (oldLv == -1? 0 : currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * oldLv * 10) / 10);
                let cardBuff = (skillLv == -1? 0 : currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * skillLv * 10) / 10);
                $("txtCardBuff").value -= o - cardBuff;
                break;
            case "attackBuff":
		if(skillLv >= 0) {
		    abling("btnSwitchEffect");
                    $("btnSwitchEffect").value = "切换 攻击buff";
		}
		o = (oldLv == -1? 0 : currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * oldLv * 10) / 10);
                let attackBuff = (skillLv == -1? 0 : currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * skillLv * 10) / 10);
                $("txtAttackBuff").value -= o - attackBuff;
		break;
	    case "npStrength":
		if(skillLv >= 0) {
                    abling("btnSwitchEffect");
                    $("btnSwitchEffect").value = "切换 宝威buff";
                }
                o = (oldLv == -1? 0 : currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * oldLv * 10) / 10);
                let npStrength = (skillLv == -1? 0 : currentBuff[0] + Math.ceil((currentBuff[1] - currentBuff[0]) / 10 * skillLv * 10) / 10);
                $("txtNpStrength").value -= o - npStrength;
        }
	if(skillLv == -1) {
	    disabling("btnSwitchEffect");
	    $("btnSwitchEffect").value = "切换";
	}
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
    else {
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
    let oldLength = $("ddlServant").length;
    for(let i=oldLength;i>0;i--){
	$("ddlServant").remove(i);
    }
    let server = $("ddlServer").value;
    let star = $("ddlFilterStar").value;
    let Class = $("ddlFilterClass").value;
    let color = $("ddlFilterColor").value;
    let nTarget = $("ddlFilterNpType").value;
    let nCount = 0;
    let serverValue = 0;
    servants.forEach(function(servant){
        if((star == -1 || servant.star == star) && (Class == -1 || servant.Class == Class) && (color == -1 || servant.cardColor == color) && (nTarget == -1 || servant.target == nTarget)) {
	    if(server == -1) {
		$("ddlServant").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
	    }
	    else {
            	switch(servant.name.slice(-2)) {
                    case "SC":
                    	serverValue = 1;
                    	break;
                    case "TC":
                    	serverValue = 2;
                    	break;
                    case "EN":
                    	serverValue = 3;
                    	break;
                    default:
                    	serverValue = 0;
            	}
		if(serverValue <= server) {
		    if(serverValue > 0) {
		    	$("ddlServant").remove(nCount);
		    	nCount--;
		    }
		    $("ddlServant").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
		    nCount++;
		}
	    }
	}
    })
}
function initialSupportList() {
    let oldLength = $("ddlSupport1").length;
    for(let i=oldLength;i>0;i--){
        $("ddlSupport1").remove(i);
        $("ddlSupport1").remove(i);
        $("ddlSupport1").remove(i);
        $("ddlSupport1").remove(i);
        $("ddlSupport1").remove(i);
    }
    let server = $("ddlServer").value;
    let nCount = 0;
    let serverValue = 0;
    servants.forEach(function(servant){
	if(servant.support1 || servant.support2 || servant.support3) {
	    if(server == -1) {
	    	$("ddlSupport1").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
	    	$("ddlSupport2").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
	    	$("ddlSupport3").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
            	$("ddlSupport4").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
            	$("ddlSupport5").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
	    }
	    else {
		switch(servant.name.slice(-2)) {
                    case "SC":
                        serverValue = 1;
                        break;
                    case "TC":
                        serverValue = 2;
                        break;
                    case "EN":
                        serverValue = 3;
                        break;
                    default:
                        serverValue = 0;
                }
                if(serverValue <= server) {
                    if(serverValue > 0) {
                        $("ddlSupport1").remove(nCount);
                        $("ddlSupport2").remove(nCount);
                        $("ddlSupport3").remove(nCount);
                        $("ddlSupport4").remove(nCount);
                        $("ddlSupport5").remove(nCount);
                        nCount--;
                    }
                    $("ddlSupport1").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
                    $("ddlSupport2").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
                    $("ddlSupport3").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
                    $("ddlSupport4").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
                    $("ddlSupport5").options.add(new Option(`[${servant.star}][${servant.Class}]${servant.name}`, servant.id));
                    nCount++;
                }
	    }
	}
    })
}
function initialEffects() {
    for(let n=1;n<=5;n++) {
        let sid = $("ddlSupport"+n).value;
        if(sid == -1) {
            disabling("ddlSupport"+n+"Skill1","ckSupport"+n+"NoMiss1","ddlSupport"+n+"Skill2","ckSupport"+n+"NoMiss2","ddlSupport"+n+"Skill3","ckSupport"+n+"NoMiss3");
        }
        else {
            let support = servants[sid];
            for(let i=1;i<=3;i++) {
                let skill = support["support"+i];
                if(skill && Object.keys(skill).length > 0) {
                    abling("ddlSupport"+n+"Skill"+i);
                    if(skill.randomAttackBuff) {
                        abling("ckSupport"+n+"NoMiss"+i);
                    }
                    else {
                        disabling("ckSupport"+n+"NoMiss"+i);
                    }
                }
                else {
                    disabling("ddlSupport"+n+"Skill"+i,"ckSupport"+n+"NoMiss"+i);
                }
            }
        }
	$("ddlSupport"+n).oldvalue = $("ddlSupport"+n).value;
    }
    let id = $("ddlServant").value;
    if (id != -1) {
	abling("ckIsMaxGrail","ddlLvs","ddlClass","ddlColor","ckIsCritical","txtAtk","txtFouAtk","txtCraftEssenceAtk","ddlOrder","ckIsFirstBuster","ddlCraftEssence","ddlEnemyClass","ddlEnemyAttribute","ckIsSpecialAttack","txtEnemyDefence","txtCardResist","ddlMysticCode","txtSpecialAttack","txtAttackBuff","txtNpStrength","txtBusterBuff","txtArtsBuff","txtQuickBuff","txtDamagePlus","btnClearBuff","btnCalculate");
        let servant = servants[id];
        disabling("btnAccumulate","btnSwitchEffect");
	$("btnSwitchEffect").value = "切换";
        for(let i=1;i<=3;i++) {
            let skill = servant["skill"+i];
            if(skill && Object.keys(skill).length > 0) {
                abling("ddlSkill"+i);
                if(skill.randomAttackBuff || skill.randomCardBuff || skill.randomNpStrength || skill.randomChargeNp) {
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
            if(skill && skill.randomEffect) {
                $("btnSwitchEffect").count = 0;
            }
        }
	if(npEffect && npEffect.accAttackBuff) {
	    abling("btnAccumulate");
	}
/*
        bindServantData(id);
        clearBuff();
	bindSkill(1);
	bindSkill(2);
	bindSkill(3);
	for(let n=1;n<=5;n++) {
	    for(let i=1;i<=3;i++) {
		bindSupport(n,i);
		$("ddlSupport"+n+"Skill"+i).oldvalue = $("ddlSupport"+n+"Skill"+i).value;
	    }
	}
*/
	$("ddlSkill1").oldvalue = $("ddlSkill1").value;
	$("ddlSkill2").oldvalue = $("ddlSkill2").value;
	$("ddlSkill3").oldvalue = $("ddlSkill3").value;
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
	abling("ckIsMaxGrail","ddlLvs","ddlColor","ckIsCritical","txtFouAtk","txtCraftEssenceAtk","ddlOrder","ckIsFirstBuster","ddlCraftEssence","ddlSkill1","ckNoMiss1","ddlSkill2","ckNoMiss2","ddlSkill3","ckNoMiss3","ddlEnemyClass","ddlEnemyAttribute","ckIsSpecialAttack","ddlMysticCode");
	let nLvs = $("ddlLvs").length;
        for(let i=3;i<nLvs;i++) {
            $("ddlLvs").remove(3);
        }
        $("ddlLvs").oldvalue = 5;
	disabling("ddlClass","txtAtk","btnSwitchEffect","txtEnemyDefence","txtCardResist","txtSpecialAttack","txtAttackBuff","txtNpStrength","txtBusterBuff","txtArtsBuff","txtQuickBuff","txtDamagePlus","btnAccumulate","btnClearBuff","btnCalculate");
	$("btnSwitchEffect").value = "切换";
	$("spanAttribute").innerHTML = "";
	$("txtEnemyDefence").basevalue = 0;
	$("txtBusterBuff").basevalue = 0;
	$("txtArtsBuff").basevalue = 0;
	$("txtQuickBuff").basevalue = 0;
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
    if(ClassSkill && ClassSkill.npGainBuff) {
	$("txtNpGainBuff").basevalue = ClassSkill.npGainBuff;
    }
    else {
	$("txtNpGainBuff").basevalue = 0;
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
    $("txtNpGainBuff").value = $("txtNpGainBuff").basevalue;
    if($("ddlOverkillMode").selectedIndex == 0) {
	$("txtOverkill1").value = 0;
        $("txtOverkill2").value = 0;
        $("txtOverkill3").value = 0;
    }
    else {
        $("txtOverkill1").anothervalue = 0;
        $("txtOverkill2").anothervalue = 0;
        $("txtOverkill3").anothervalue = 0;
    }
    $("spanOverkill1").innerHTML = "100%";
    $("spanOverkill2").innerHTML = "100%";
    $("spanOverkill3").innerHTML = "100%";
    $("txtAttackBuff").value -= -$("txtCeAttackBuff").value;
    let ceCardBuff = 0;
    switch(getFloat("ddlColor")){
        case 1.5:
            ceCardBuff = getFloat("txtCeBusterBuff");
            break;
        case 1:
            ceCardBuff = getFloat("txtCeArtsBuff");
            break;
        case 0.8:
            ceCardBuff = getFloat("txtCeQuickBuff");
    }
    $("txtCardBuff").value -= -ceCardBuff;
    $("txtNpStrength").value -= -$("txtCeNpStrength").value;
    $("txtSpecialAttack").value -= -$("txtCeSpecialAttack").value;
    $("txtNpGainBuff").value -= -$("txtCeNpGainBuff").value;
    $("txtDamagePlus").value -= -$("txtCeDamagePlus").value;
}
//根据OC重设所有buff
function setOc() {
    let id = $("ddlServant").value;
    if(id == -1){ return; }
    let servant = servants[id];
    let ocs = servant.oc;
    let ocLevel = $("ddlOvercharge").value;
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
