class Character {
    static MAX_HEALTH = 100;

    constructor(name) {
        this.name = name;
        this.health = Character.MAX_HEALTH;
        this.inventory = [];
    }

    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result;
    }
}

class Adventurer extends Character {
    static ROLES = ["Fighterx", "Beast", "Beserker", "Warrior"];

    constructor(name, role) {
        super(name);
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}. Choose from: ${Adventurer.ROLES.join(", ")}`);
        }
        this.role = role;
        this.inventory.push("kryptroll", "100 gold currency");
    }

    scout() {
        console.log(`${this.name} is scouting ahead...`);
        this.roll();
    }

    duel(opponent) {
        console.log(`${this.name} is dueling ${opponent.name}!`);
        while (this.health > 50 && opponent.health > 50) {
            let myRoll = this.roll();
            let opponentRoll = opponent.roll();
            
            if (myRoll > opponentRoll) {
                opponent.health -= 1;
            } else if (opponentRoll > myRoll) {
                this.health -= 1;
            }
            
            console.log(`${this.name}: ${this.health} HP, ${opponent.name}: ${opponent.health} HP`);
        }
        const winner = this.health > 50 ? this.name : opponent.name;
        console.log(`${winner} wins the duel!`);
    }
}

class Companion extends Character {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    follow() {
        console.log(`${this.name} the ${this.type} is following their adventurer.`);
    }
}

class AdventurerFactory {
    constructor(role) {
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}. Choose from: ${Adventurer.ROLES.join(", ")}`);
        }
        this.role = role;
        this.adventurers = [];
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role);
        this.adventurers.push(newAdventurer);
        return newAdventurer;
    }

    findByIndex(index) {
        return this.adventurers[index];
    }

    findByName(name) {
        return this.adventurers.find((a) => a.name === name);
    }
}

const scorpion = new Adventurer("Scorpion", "Warrior");
scorpion.inventory.push("katana", "superpotion", "artifact");
scorpion.companion = new Companion("Leo", "Dragon");
scorpion.companion.companion = new Companion("Frank", "Flea");
scorpion.companion.companion.inventory.push("small hat", "sunglasses");

// this is to log each item
for (let item of scorpion.inventory) {
    console.log(item);
}

//testing the rolls
scorpion.roll();
scorpion.roll(2);
scorpion.scout();

// testing the companion method
scorpion.companion.follow();

// adventure and generate
const beasts = new AdventurerFactory("Beast");
const beastScorpion = beasts.generate("Scorpion the Beast");

// testing the duel method
const warrior = new Adventurer("Subzero", "Warrior");
scorpion.duel(warrior);
