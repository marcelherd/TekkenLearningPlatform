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
      return 'PAUL';
    case 1:
      return 'LAW';
    case 2:
      return 'KING';
    case 3:
      return 'YOSHIMITSU';
    case 4:
      return 'HWOARANG';
    case 5:
      return 'XIAOYU';
    case 6:
      return 'JIN';
    case 7:
      return 'BRYAN';
    case 8:
      return 'HEIHACHI';
    case 9:
      return 'KAZUYA';
    case 10:
      return 'STEVE';
    case 11:
      return 'JACK_7';
    case 12:
      return 'ASUKA';
    case 13:
      return 'DEVIL_JIN';
    case 14:
      return 'FENG';
    case 15:
      return 'LILI';
    case 16:
      return 'DRAGUNOV';
    case 17:
      return 'LEO';
    case 18:
      return 'LARS';
    case 19:
      return 'ALISA';
    case 20:
      return 'CLAUDIO';
    case 21:
      return 'KATARINA';
    case 22:
      return 'LUCKY_CHLOE';
    case 23:
      return 'SHAHEEN';
    case 24:
      return 'JOSIE';
    case 25:
      return 'GIGAS';
    case 26:
      return 'KAZUMI';
    case 27:
      return 'DEVIL_KAZUMI';
    case 28:
      return 'NINA';
    case 29:
      return 'MASTER_RAVEN';
    case 30:
      return 'LEE';
    case 31:
      return 'BOB';
    case 32:
      return 'AKUMA';
    case 33:
      return 'KUMA';
    case 34:
      return 'PANDA';
    case 35:
      return 'EDDY';
    case 36:
      return 'ELIZA';
    case 37:
      return 'MIGUEL';
    case 38:
      return 'TEKKEN_FORCE';
    case 39:
      return 'KID_KAZUYA';
    case 40:
      return 'JACK_4';
    case 41:
      return 'YOUNG_HEIHACHI';
    case 42:
      return 'TRAINING_DUMMY';
    case 43:
      return 'GEESE';
    case 44:
      return 'NOCTIS';
    case 45:
      return 'ANNA';
    case 46:
      return 'LEI';
    case 47:
      return 'MARDUK';
    case 48:
      return 'ARMOR_KING';
    case 49:
      return 'JULIA';
    case 50:
      return 'NEGAN';
    case 51:
      return 'ZAFINA';
    case 52:
      return 'GANRYU';
    case 53:
      return 'LEROY';
    case 54:
      return 'FAHKUMRAM';
    case 55:
      return 'KUNIMITSU';
    case 56:
      return 'LIDIA';
    case 71:
      return 'NOT_YET_LOADED';
    case 255:
      return 'NO_SELECTION';
    default:
      return '';
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
      return '';
  }
}
