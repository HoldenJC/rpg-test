export class Player {
  constructor(){
    this.name = "";
    // this.role = "";
    this.xp = 0;
    this.inventory = [];
    this.areaCount = 0;
    this.currentArea = "";
  }

  setRole(selectedRole){

    if(selectedRole === "fighter"){
      this.role = new Role("fighter", 3, 1, 2);
    } else if(selectedRole === "mage"){
      this.role = new Role("mage", 1, 3, 2);
    } else if(selectedRole === "archer"){
      this.role = new Role("archer", 1, 2, 3);
    }
  }



  setArea(map){
    this.currentArea = map.areaMap[this.areaCount];
    this.areaCount++;
  }



  setXP(xpValue){
    this.xp = xpValue;
  }

  setInventory(inventoryValue){
    if(inventoryValue !== ""){
      this.inventory.push(inventoryValue);
    }
  }

  getItemPower(item){
    for (let i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i]===item){
        return this[i][1];
      }
    }
  }
}

export class Role {
  constructor(name, strength, intelligence, agility){
    this.name = name;
    this.strength = strength;
    this.intelligence = intelligence;
    this.agility = agility;
  }
}

export class AreaMap {
  constructor(){
    this.areaMap = [];
  }

  setAreaMap(area){
    this.areaMap.push(area);
  }

}

export class Area {
  constructor(areaBg, fleeToArea, lookArea, itemsArea){
    this.areaBg = areaBg;
    this.fleeToArea = fleeToArea;
    this.lookArea = lookArea;
    this.itemsArea = itemsArea;
  }
}
