console.log("Exercice 1 – Variables et portée");

var a = 1;
let b = 2;
const c = 3;

console.log("Avant le bloc :", { a, b, c });

{
    var a = 10;
    let b = 20;
    const c = 30;
    console.log("Dans le bloc :", { a, b, c });
}

console.log("Après le bloc :", { a, b, c });

try {
    c = 4;
} catch (error) {
    console.error("Réaffectation de const :", error.message);
}

console.log("\nExercice 2 – Fonctions fléchées");

const somme = (a, b) => a + b;
console.log("Somme fléchée :", somme(5, 10));

console.log("\nExercice 3 – Destructuring");

const user = { name: "Noor", age: 10, city: "Tunis" };
const { name, age } = user;
console.log("Destructuring :", { name, age });

console.log("\nExercice 4 – Spread Operator");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const mergedArr = [...arr1, ...arr2];
console.log("Fusion de tableaux :", mergedArr);

const originalObj = { a: 1, b: 2 };
const copiedObj = { ...originalObj, b: 3 };
console.log("Copie et modification d'objet :", { originalObj, copiedObj });

console.log("\nExercice 5 – Objet simple");

const livre = {
    titre: "L'Étranger",
    auteur: "Albert Camus",
    année: 1942,
    getInfo() {
        return `${this.titre} par ${this.auteur}, publié en ${this.année}.`;
    }
};
console.log(livre.getInfo());

console.log("\nExercice 6 – Classe ES6");

class Etudiant {
    constructor(nom, note) {
        this.nom = nom;
        this.note = note;
    }

    getMention() {
        if (this.note >= 16) return "Très bien";
        if (this.note >= 14) return "Bien";
        if (this.note >= 10) return "Passable";
        return "Échec";
    }
}

const etudiants = [
    new Etudiant("Ali", 17),
    new Etudiant("Béatrice", 14),
    new Etudiant("Cédric", 9)
];

etudiants.forEach(e => console.log(`${e.nom} a la mention : ${e.getMention()}`));

console.log("\nExercice 7 – Tableaux avancés");

const notes = [12, 5, 17, 9, 20];

const moyenne = notes.reduce((acc, note) => acc + note, 0) / notes.length;
console.log("Moyenne :", moyenne);

const notesTriees = [...notes].sort((a, b) => b - a);
console.log("Notes triées :", notesTriees);

const notesFiltrees = notes.filter(note => note >= 10);
console.log("Notes filtrées (>= 10) :", notesFiltrees);
