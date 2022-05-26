export function parseDirection(direction: number): string {
  switch (direction) {
    case 2:
      return 'd/b';
    case 4:
      return 'd';
    case 8:
      return 'd/f';
    case 16:
      return 'b';
    case 32:
      return 'n';
    case 64:
      return 'f';
    case 128:
      return 'u/b';
    case 256:
      return 'u';
    case 512:
      return 'u/f';
    default:
      return '';
  }
}

export function parseAttack(attack: number): string {
  switch (attack) {
    case 512:
      return '1';
    case 1024:
      return '2';
    case 2048:
      return '3';
    case 4096:
      return '4';
    case 1536:
      return '1+2';
    case 2560:
      return '1+3';
    case 4608:
      return '1+4';
    case 3072:
      return '2+3';
    case 6144:
      return '3+4';
    case 3584:
      return '1+2+3';
    case 6656:
      return '1+3+4';
    case 7168:
      return '2+3+4';
    case 7680:
      return '1+2+3+4';
    case 8192:
      return 'RAGE';
    default:
      return '';
  }
}

export function parseCharacter(characterId: number): string {
  switch (characterId) {
    case 0:
      return 'Paul';
    case 1:
      return 'Law';
    case 2:
      return 'King';
    case 3:
      return 'Yoshimitsu';
    case 4:
      return 'Hwoarang';
    case 5:
      return 'Xiaoyu';
    case 6:
      return 'Jin';
    case 7:
      return 'Bryan';
    case 8:
      return 'Heihachi';
    case 9:
      return 'Kazuya';
    case 10:
      return 'Steve';
    case 11:
      return 'Jack 7';
    case 12:
      return 'Asuka';
    case 13:
      return 'Devil Jin';
    case 14:
      return 'Feng';
    case 15:
      return 'Lili';
    case 16:
      return 'Dragunov';
    case 17:
      return 'Leo';
    case 18:
      return 'Lars';
    case 19:
      return 'Alisa';
    case 20:
      return 'Claudio';
    case 21:
      return 'Katarina';
    case 22:
      return 'Lucky Chloe';
    case 23:
      return 'Shaheen';
    case 24:
      return 'Josie';
    case 25:
      return 'Gigas';
    case 26:
      return 'Kazumi';
    case 27:
      return 'Devil Kazumi';
    case 28:
      return 'Nina';
    case 29:
      return 'Master Raven';
    case 30:
      return 'Lee';
    case 31:
      return 'Bob';
    case 32:
      return 'Akuma';
    case 33:
      return 'Kuma';
    case 34:
      return 'Panda';
    case 35:
      return 'Eddy';
    case 36:
      return 'Eliza';
    case 37:
      return 'Miguel';
    case 38:
      return 'Tekken Force';
    case 39:
      return 'Kid Kazuya';
    case 40:
      return 'Jack 4';
    case 41:
      return 'Young Heihachi';
    case 42:
      return 'Training Dummy';
    case 43:
      return 'Geese';
    case 44:
      return 'Noctis';
    case 45:
      return 'Anna';
    case 46:
      return 'Lei';
    case 47:
      return 'Marduk';
    case 48:
      return 'Armor King';
    case 49:
      return 'Julia';
    case 50:
      return 'Negan';
    case 51:
      return 'Zafina';
    case 52:
      return 'Ganryu';
    case 53:
      return 'Leroy';
    case 54:
      return 'Fahkumram';
    case 55:
      return 'Kunimitsu';
    case 56:
      return 'Lidia';
    case 71:
      return 'NOT_YET_LOADED';
    case 255:
      return 'NO_SELECTION';
    default:
      return 'Unknown';
  }
}

export function parseStage(stage: number): string {
  switch (stage) {
    case 0:
      return 'Mishima Dojo';
    case 1:
      return 'Forgotten Realm';
    case 2:
    case 53: // Jungle Outpost 2
      return 'Jungle Outpost';
    case 3:
      return 'Arctic Snowfall';
    case 4:
    case 54: // Twilight Conflict 2
      return 'Twilight Conflict';
    case 5:
      return "Dragon's Nest";
    case 6:
      return 'Souq';
    case 7:
      return "Devil's Pit";
    case 8:
      return 'Mishima Building';
    case 9:
      return 'Abandoned Temple';
    case 30:
      return 'Duomo Di Sirio';
    case 31:
      return 'Arena';
    case 32:
    case 33: // G Corp. Helipad (Night)
      return 'G Corp. Helipad';
    case 35:
      return 'Brimstone & Fire';
    case 36:
      return 'Precipice of Fate';
    case 37:
      return 'Violet Systems';
    case 39:
      return 'Kinder Gym';
    case 40:
    case 55: // Infinite Azure 2
      return 'Infinite Azure';
    case 41:
      return 'Geometric Plane';
    case 51:
      return 'Howard Estate';
    case 52:
      return 'Hammerhead';
    case 56:
      return 'Last Day on Earth';
    case 57:
      return 'Cave of Enlightenment';
    case 58:
      return 'Vermilion Gates';
    case 59:
      return 'Island Paradise';
    default:
      return 'Unknown';
  }
}

export function parseRank(rank: number): string {
  switch (rank) {
    case 0:
      return 'Beginner';
    case 1:
      return '9th Kyu';
    case 2:
      return '8th Kyu';
    case 3:
      return '7th Kyu';
    case 4:
      return '6th Kyu';
    case 5:
      return '5th Kyu';
    case 6:
      return '4th Kyu';
    case 7:
      return '3rd Kyu';
    case 8:
      return '2nd Kyu';
    case 9:
      return '1st Kyu';
    case 10:
      return '1st Dan';
    case 11:
      return '2nd Dan';
    case 12:
      return '3rd Dan';
    case 13:
      return 'Initiate';
    case 14:
      return 'Mentor';
    case 15:
      return 'Expert';
    case 16:
      return 'Grandmaster';
    case 17:
      return 'Brawler';
    case 18:
      return 'Marauder';
    case 19:
      return 'Fighter';
    case 20:
      return 'Vanguard';
    case 21:
      return 'Warrior';
    case 22:
      return 'Vindicator';
    case 23:
      return 'Juggernaut';
    case 24:
      return 'Usurper';
    case 25:
      return 'Vanquisher';
    case 26:
      return 'Destroyer';
    case 27:
      return 'Savior';
    case 28:
      return 'Overlord';
    case 29:
      return 'Genbu';
    case 30:
      return 'Byakko';
    case 31:
      return 'Seiryu';
    case 32:
      return 'Suzaku';
    case 33:
      return 'Mighty Ruler';
    case 34:
      return 'Revered Ruler';
    case 35:
      return 'Divine Ruler';
    case 36:
      return 'Eternal Ruler';
    case 37:
      return 'Fujin';
    case 38:
      return 'Raijin';
    case 39:
      return 'Yaksa';
    case 40:
      return 'Ryujin';
    case 41:
      return 'Emperor';
    case 42:
      return 'Tekken King';
    case 43:
      return 'Tekken God';
    case 44:
      return 'True Tekken God';
    case 45:
      return 'Tekken God Prime';
    case 46:
      return 'Tekken God Omega';
    default:
      return 'Unknown';
  }
}
