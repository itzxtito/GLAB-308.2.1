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
    static ROLES = ["Fighter", "Healer", "Wizard", "Warrior"];

    constructor(name, role) {
        super(name);
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: ${role}. Choose from: ${Adventurer.ROLES.join(", ")}`);
        }
        this.role = role;
        this.inventory.push("bedroll", "50 gold coins");
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

const robin = new Adventurer("Robin", "Warrior");
robin.inventory.push("sword", "potion", "artifact");
robin.companion = new Companion("Leo", "Cat");
robin.companion.companion = new Companion("Frank", "Flea");
robin.companion.companion.inventory.push("small hat", "sunglasses");

// Log each item in Robin's inventory
for (let item of robin.inventory) {
    console.log(item);
}

// Test the roll, scout, and duel methods
robin.roll();
robin.roll(2);
robin.scout();

// Test companion method
robin.companion.follow();

// Create an Adventurer Factory and generate adventurers
const healers = new AdventurerFactory("Healer");
const healerRobin = healers.generate("Robin the Healer");

// Test duel method
const warrior = new Adventurer("Thorn", "Warrior");
robin.duel(warrior);
