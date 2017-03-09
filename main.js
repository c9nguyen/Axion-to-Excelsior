var AM = new AssetManager();

/*===============================================================*/



var startLoading = function() {
        //     var canvas = document.getElementById("gameWorld");
        // var ctx = canvas.getContext("2d");
        // var img = new Image();
        // img.src = "./img/back/intro.png";
        // ctx.drawImage(img, 0 ,0);
        // console.log("I did that");
        // ctx.fillText("Loading", 400, 350);
    

AM.queueDownload("./img/back/cloud.png");
AM.queueDownload("./img/back/sky.png");
AM.queueDownload("./img/back/back.png");
AM.queueDownload("./img/back/intro.png");
AM.queueDownload("./img/back/mapselect.jpg");
AM.queueDownload("./img/back/cardselect.jpg");

AM.queueDownload("./img/map/01/back.png");

AM.queueDownload("./img/tiles/en_spritesheet.png");
AM.queueDownload("./img/tiles/en1_spritesheet.png");
AM.queueDownload("./img/tiles/bsc_spritesheet.png");

AM.queueDownload("./img/tiles/02/en_spritesheet.png");
AM.queueDownload("./img/tiles/02/en1_spritesheet.png");
AM.queueDownload("./img/tiles/02/bsc_spritesheet.png");

//Loading player unit
for (var i = 0; i < 6; i++) {
    AM.queueDownload("./img/unit/h00" + i + "/card.png");
    AM.queueDownload("./img/unit/h00" + i + "/card_click.png");
    AM.queueDownload("./img/unit/h00" + i + "/card_mouseover.png");
    AM.queueDownload("./img/unit/h00" + i + "/card_disable.png");
    AM.queueDownload("./img/unit/h00" + i + "/stand.png");
    AM.queueDownload("./img/unit/h00" + i + "/walk.png");
    AM.queueDownload("./img/unit/h00" + i + "/jump.png");
    AM.queueDownload("./img/unit/h00" + i + "/attack.png");
    AM.queueDownload("./img/unit/h00" + i + "/die.png");
}

AM.queueDownload("./img/unit/h000/attack2.png");

AM.queueDownload("./img/unit/h001/skill.png");

AM.queueDownload("./img/unit/h002/attack2.png");

AM.queueDownload("./img/unit/h003/attack2.png");

AM.queueDownload("./img/unit/h005/attack2.png");


AM.queueDownload("./img/unit/h100/card.png");
AM.queueDownload("./img/unit/h100/card_click.png");
AM.queueDownload("./img/unit/h100/card_mouseover.png");
AM.queueDownload("./img/unit/h100/card_disable.png");
AM.queueDownload("./img/unit/h100/stand.png");
AM.queueDownload("./img/unit/h100/walk.png");
AM.queueDownload("./img/unit/h100/jump.png");
AM.queueDownload("./img/unit/h100/die.png");
AM.queueDownload("./img/unit/h100/attack1.png");
AM.queueDownload("./img/unit/h100/attack2.png");
AM.queueDownload("./img/unit/h100/attack3.png");

//Loading summoned unit
for (var i = 0; i < 1; i++) {
    AM.queueDownload("./img/unit/s00" + i + "/card.png");
    AM.queueDownload("./img/unit/s00" + i + "/card_click.png");
    AM.queueDownload("./img/unit/s00" + i + "/card_mouseover.png");
    AM.queueDownload("./img/unit/s00" + i + "/card_disable.png");
    AM.queueDownload("./img/unit/s00" + i + "/stand.png");
    AM.queueDownload("./img/unit/s00" + i + "/walk.png");
    AM.queueDownload("./img/unit/s00" + i + "/jump.png");
    AM.queueDownload("./img/unit/s00" + i + "/attack.png");
    AM.queueDownload("./img/unit/s00" + i + "/regen.png");
    AM.queueDownload("./img/unit/s00" + i + "/die.png");
}

AM.queueDownload("./img/unit/s000/attack_effect.png");


//Loading monsters
for (var i = 0; i < 10; i++) {
    AM.queueDownload("./img/unit/m00" + i + "/stand.png");
    AM.queueDownload("./img/unit/m00" + i + "/walk.png");
    AM.queueDownload("./img/unit/m00" + i + "/jump.png");
    AM.queueDownload("./img/unit/m00" + i + "/attack.png");
    AM.queueDownload("./img/unit/m00" + i + "/die.png");
}


AM.queueDownload("./img/unit/m000/card.png");
AM.queueDownload("./img/unit/m000/card_mouseover.png");
AM.queueDownload("./img/unit/m000/card_click.png");

AM.queueDownload("./img/unit/m003/skill.png");

AM.queueDownload("./img/unit/m006/attack_effect.png");

AM.queueDownload("./img/unit/m007/skill.png");

AM.queueDownload("./img/unit/m008/regen.png");

AM.queueDownload("./img/unit/m009/skill.png");

// Loading bosses
AM.queueDownload("./img/unit/m100/stand.png");
AM.queueDownload("./img/unit/m100/walk.png");
AM.queueDownload("./img/unit/m100/jump.png");
AM.queueDownload("./img/unit/m100/attack.png");
AM.queueDownload("./img/unit/m100/attack2.png");
AM.queueDownload("./img/unit/m100/attack3.png");
AM.queueDownload("./img/unit/m100/attack4.png");
AM.queueDownload("./img/unit/m100/die.png");

AM.queueDownload("./img/unit/m101/stand.png");
AM.queueDownload("./img/unit/m101/walk.png");
AM.queueDownload("./img/unit/m101/jump.png");
AM.queueDownload("./img/unit/m101/attack.png");
AM.queueDownload("./img/unit/m101/attack_effect1.png");
AM.queueDownload("./img/unit/m101/attack_effect3.png");
AM.queueDownload("./img/unit/m101/attack_effect2.png");
AM.queueDownload("./img/unit/m101/attack_effect4.png");
AM.queueDownload("./img/unit/m101/skill2.png");
AM.queueDownload("./img/unit/m101/skill3.png");
AM.queueDownload("./img/unit/m101/skill4.png");
AM.queueDownload("./img/unit/m101/die.png");

AM.queueDownload("./img/unit/m102/stand.png");
AM.queueDownload("./img/unit/m102/walk.png");
AM.queueDownload("./img/unit/m102/jump.png");
AM.queueDownload("./img/unit/m102/attack.png");
AM.queueDownload("./img/unit/m102/attack2.png");
AM.queueDownload("./img/unit/m102/skill.png");
AM.queueDownload("./img/unit/m102/die.png");

AM.queueDownload("./img/unit/m105/stand.png");
AM.queueDownload("./img/unit/m105/walk.png");
AM.queueDownload("./img/unit/m105/jump.png");
AM.queueDownload("./img/unit/m105/attack.png");
AM.queueDownload("./img/unit/m105/attack2.png");
AM.queueDownload("./img/unit/m105/attack3.png");
AM.queueDownload("./img/unit/m105/die.png");

AM.queueDownload("./img/unit/tower0/stand.png");
AM.queueDownload("./img/unit/tower0/attack.png");
AM.queueDownload("./img/unit/tower0/attack2.png");
AM.queueDownload("./img/unit/tower0/die.png");
AM.queueDownload("./img/unit/tower0/skill_icon.png");
AM.queueDownload("./img/unit/tower0/skill_icon_disable.png");
AM.queueDownload("./img/unit/tower0/attack_effect.png");
AM.queueDownload("./img/unit/tower0/skill2_icon.png");
AM.queueDownload("./img/unit/tower0/skill2_icon_disable.png");
AM.queueDownload("./img/unit/tower0/attack2_effect.png");

AM.queueDownload("./img/unit/tower1/stand.png");
AM.queueDownload("./img/unit/tower1/die.png");
AM.queueDownload("./img/unit/tower1/die_after.png");

AM.queueDownload("./img/unit/tower2/stand.png");
AM.queueDownload("./img/unit/tower2/die.png");
AM.queueDownload("./img/unit/tower2/die_after.png");
AM.queueDownload("./img/unit/tower2/attack2.png");
AM.queueDownload("./img/unit/tower2/attack2_effect.png");
AM.queueDownload("./img/unit/tower2/attack3.png");

AM.queueDownload("./img/unit/tower3/stand.png");
AM.queueDownload("./img/unit/tower3/die.png");
AM.queueDownload("./img/unit/tower3/die_after.png");
AM.queueDownload("./img/unit/tower3/attack.png");
AM.queueDownload("./img/unit/tower3/attack_effect.png");
AM.queueDownload("./img/unit/tower3/attack3.png");


AM.queueDownload("./img/ui/start_button_disable.png");
AM.queueDownload("./img/ui/start_button_pressed.png");
AM.queueDownload("./img/ui/start_button_mouseover.png");

AM.queueDownload("./img/ui/cards_button.png");
AM.queueDownload("./img/ui/cards_pressbutton.png");
AM.queueDownload("./img/ui/cards_hoverbutton.png");

AM.queueDownload("./img/ui/settings_button.png");
AM.queueDownload("./img/ui/settings_pressbutton.png");
AM.queueDownload("./img/ui/settings_hoverbutton.png");

AM.queueDownload("./img/ui/maps_button.png");
AM.queueDownload("./img/ui/maps_pressbutton.png");
AM.queueDownload("./img/ui/maps_hoverbutton.png");

AM.queueDownload("./img/ui/shop_button.png");
AM.queueDownload("./img/ui/shop_pressbutton.png");
AM.queueDownload("./img/ui/shop_hoverbutton.png");

AM.queueDownload("./img/ui/exit_button.png");

AM.queueDownload("./img/ui/right_arrow_button.png");
AM.queueDownload("./img/ui/right_arrow_hoverbutton.png");
AM.queueDownload("./img/ui/right_arrow_pressbutton.png");
AM.queueDownload("./img/ui/left_arrow_button.png");
AM.queueDownload("./img/ui/left_arrow_hoverbutton.png");
AM.queueDownload("./img/ui/left_arrow_pressbutton.png");
AM.queueDownload("./img/ui/up_arrow_button.png");
AM.queueDownload("./img/ui/up_arrow_hoverbutton.png");
AM.queueDownload("./img/ui/up_arrow_pressbutton.png");
AM.queueDownload("./img/ui/down_arrow_button.png");
AM.queueDownload("./img/ui/down_arrow_hoverbutton.png");
AM.queueDownload("./img/ui/down_arrow_pressbutton.png");

AM.queueDownload("./img/ui/select_blue_check.png");
AM.queueDownload("./img/ui/select_blue_uncheck.png");
AM.queueDownload("./img/ui/select_black_check.png");
AM.queueDownload("./img/ui/select_black_uncheck.png");
AM.queueDownload("./img/ui/select_white_check.png");
AM.queueDownload("./img/ui/select_white_uncheck.png");
AM.queueDownload("./img/ui/musicAni.png");
AM.queueDownload("./img/ui/effectAni.png");

AM.queueDownload("./img/effect/e0000/stab.png");
AM.queueDownload("./img/effect/e0000/9.swingP1.2_0.png");
AM.queueDownload("./img/effect/e0000/shuriken_hit.png");
AM.queueDownload("./img/effect/e0001/shuriken.png");
AM.queueDownload("./img/effect/e0002/dummy.png");

AM.queueDownload("./img/effect/e0003/effect.png");
AM.queueDownload("./img/effect/e0003/ball.png");
AM.queueDownload("./img/effect/e0003/hit.png");

AM.queueDownload("./img/effect/e1001/effect.png");
AM.queueDownload("./img/effect/e1001/mouse.png");
AM.queueDownload("./img/effect/e1001/card.png");
AM.queueDownload("./img/effect/e1001/card_disable.png");
AM.queueDownload("./img/effect/e1001/card_mouseover.png");
AM.queueDownload("./img/effect/e1001/card_click.png");

AM.queueDownload("./img/effect/e1002/effect.png");
AM.queueDownload("./img/effect/e1002/mouse.png");
AM.queueDownload("./img/effect/e1002/card.png");
AM.queueDownload("./img/effect/e1002/card_disable.png");
AM.queueDownload("./img/effect/e1002/card_mouseover.png");
AM.queueDownload("./img/effect/e1002/card_click.png");
AM.queueDownload("./img/effect/e1002/tile_all.png");

AM.queueDownload("./img/effect/passive/att.png");
AM.queueDownload("./img/effect/passive/def.png");
AM.queueDownload("./img/effect/passive/speed.png");
AM.queueDownload("./img/effect/passive/att_down.png");
AM.queueDownload("./img/effect/passive/def_down.png");
AM.queueDownload("./img/effect/passive/speed_down.png");
AM.queueDownload("./img/effect/passive/stun.png");
AM.queueDownload("./img/effect/passive/poison.png");
AM.queueDownload("./img/map/01/map.png");
AM.queueDownload("./img/effect/e1001/mob_1.png");
AM.queueDownload("./img/effect/e1001/mob_6.png");

AM.queueDownload("./img/effect/portal/portal.png");
AM.queueDownload("./img/effect/portal/portal_mouseover.png");

for(var i = 0; i < 10; i++){
    AM.queueDownload("./img/ui/numbers/" + i +".png");
    AM.queueDownload("./img/ui/numbers/" + i +"_0.png");
    AM.queueDownload("./img/effect/number/" + i +".png");
}
AM.queueDownload("./img/effect/number/miss.png");

AM.queueDownload("./img/ui/numbers/1_1.png");
AM.queueDownload("./img/ui/numbers/1_2.png");
AM.queueDownload("./img/ui/numbers/2_1.png");
AM.queueDownload("./img/ui/numbers/2_2.png");
AM.queueDownload("./img/ui/numbers/3_1.png");
AM.queueDownload("./img/ui/numbers/3_2.png");
AM.queueDownload("./img/ui/numbers/minusnormal.png");
AM.queueDownload("./img/ui/numbers/minushover.png");
AM.queueDownload("./img/ui/numbers/minuspress.png");
AM.queueDownload("./img/ui/numbers/plusnormal.png");
AM.queueDownload("./img/ui/numbers/plushover.png");
AM.queueDownload("./img/ui/numbers/pluspress.png");



//SOUND
AM.queueDownload("./sound/effects/smb_stomp.wav", true);
AM.queueDownload("./sound/effects/smw_thud.wav", true);
AM.queueDownload("./sound/effects/smw_yoshi_runs_away.wav", true);
AM.queueDownload("./sound/effects/swords/quicksworddraw.wav", true);
AM.queueDownload("./sound/effects/swords/slowsworddraw.wav", true);
AM.queueDownload("./sound/effects/swords/stickswing1.wav", true);
AM.queueDownload("./sound/effects/swords/stab.wav", true);
AM.queueDownload("./sound/effects/swords/sweeps.wav", true);
AM.queueDownload("./sound/effects/swords/fastwind.wav", true);
AM.queueDownload("./sound/effects/swords/whoosh.wav", true);
AM.queueDownload("./sound/effects/swords/whoosh1.wav", true);
AM.queueDownload("./sound/effects/swords/whoosh2.wav", true);
AM.queueDownload("./sound/effects/swords/whoosh3.wav", true);
AM.queueDownload("./sound/effects/swords/woodhit.wav", true);
AM.queueDownload("./sound/effects/swords/woodhit1.wav", true);
AM.queueDownload("./sound/effects/swords/woodhit2.wav", true);

AM.queueDownload("./sound/effects/effects/footstep1.wav", true);
AM.queueDownload("./sound/effects/effects/footstep2.wav", true);

AM.queueDownload("./sound/effects/swords/swordhitwood.wav", true);
AM.queueDownload("./sound/effects/swords/epicswordclash.wav", true);
AM.queueDownload("./sound/effects/swords/swordclash00.wav", true);
AM.queueDownload("./sound/effects/swords/swordclash01.wav", true);
AM.queueDownload("./sound/effects/swords/swordclash03.wav", true);
AM.queueDownload("./sound/effects/swords/swordclash03-1.wav", true);
AM.queueDownload("./sound/effects/swords/swordclash03-2.wav", true);
AM.queueDownload("./sound/effects/swords/swordclash25.wav", true);
AM.queueDownload("./sound/effects/swords/swordslice.wav", true);
AM.queueDownload("./sound/effects/swords/swordslice14.wav", true);
AM.queueDownload("./sound/effects/swords/shuriken3.wav", true);
AM.queueDownload("./sound/effects/swords/shuriken1.wav", true);

// Charge
AM.queueDownload("./sound/effects/charge/chargelasersmall.wav", true);
AM.queueDownload("./sound/effects/charge/energyshortsword5.wav", true);
AM.queueDownload("./sound/effects/charge/energywhip2.wav", true);
AM.queueDownload("./sound/effects/charge/lightsaberwave.wav", true);
AM.queueDownload("./sound/effects/charge/lightsaberwave-1.wav", true);

// Magic
AM.queueDownload("./sound/effects/magic/magicsfxshort.wav", true);

// Rock
AM.queueDownload("./sound/effects/rock/thud5.wav", true);
AM.queueDownload("./sound/effects/rock/thud6.wav", true);
AM.queueDownload("./sound/effects/rock/rockfall.wav", true);
AM.queueDownload("./sound/effects/tower/earthshake.wav", true);
AM.queueDownload("./sound/effects/tower/thunder1.wav", true);

//monster
AM.queueDownload("./sound/effects/monster/axeimpact.wav", true);
AM.queueDownload("./sound/effects/monster/axeconcretehit.wav", true);
AM.queueDownload("./sound/effects/monster/axestab1.wav", true);
AM.queueDownload("./sound/effects/monster/crackandstress1.wav", true);
AM.queueDownload("./sound/effects/monster/ice1.wav", true);

AM.queueDownload("./sound/effects/monster/boneneck.wav", true);
AM.queueDownload("./sound/effects/monster/boneneck-1.wav", true);
AM.queueDownload("./sound/effects/monster/monster.wav", true);
AM.queueDownload("./sound/effects/monster/monster2.wav", true);
AM.queueDownload("./sound/effects/monster/monsterbird.wav", true);
AM.queueDownload("./sound/effects/monster/monsterbird-1.wav", true);
AM.queueDownload("./sound/effects/monster/monstercat.wav", true);
AM.queueDownload("./sound/effects/monster/monsterroar.wav", true);

//spell
AM.queueDownload("./sound/effects/spell/wind.mp3", true);
AM.queueDownload("./sound/effects/spell/explosion.ogg", true);

// MUSIC
AM.queueDownload("./sound/music/battle/KH-squirming-evil.mp3", true);
AM.queueDownload("./sound/music/battle/YGO-vs-darknite.mp3", true);
AM.queueDownload("./sound/music/battle/KH-monstrous-monstro.mp3", true);
AM.queueDownload("./sound/music/battle/KH-scherzo-di-notte.mp3", true);
AM.queueDownload("./sound/music/battle/KH-go-for-it.mp3", true);
AM.queueDownload("./sound/music/battle/YGO-vs-lancastrians.mp3", true);
AM.queueDownload("./sound/music/battle/YGO-vs-seto.mp3", true);
AM.queueDownload("./sound/music/battle/YGO-vs-yugi.mp3", true);
AM.queueDownload("./sound/music/KH-dearly-beloved.mp3", true);

AM.queueDownload("./sound/music/mappedstoryMainTheme.mp3", true);
AM.queueDownload("./sound/music/deckbuilding.mp3", true);

AM.queueDownload("./sound/music/gameover/YGO-duel-won.mp3", true);
AM.queueDownload("./sound/music/gameover/YGO-duel-lost.mp3", true);
AM.queueDownload("./sound/music/gameover/mappedstoryUpbeat.mp3", true);
AM.queueDownload("./sound/music/gameover/KH-end-of-the-world.mp3", true);




AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.sceneManager.addScene('mainmenu',MainMenu);
    gameEngine.sceneManager.addScene('battle',Battle);
    gameEngine.sceneManager.addScene('mapmenu',MapMenu);
    gameEngine.sceneManager.addScene('deckbuilding',DeckBuilding);
    gameEngine.start();

    gameEngine.sceneManager.startScene('mainmenu');
});
}