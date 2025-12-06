let myString: string = "Hello, TypeScript!";
let myNumber: number = 42;
let myBoolean: boolean = true;

function somme(a: number, b: number): number {
    return a + b;
}

console.log(somme(10, 20));

interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    age: number;
}

class EtudiantImpl implements Etudiant {
    id: number;
    nom: string;
    prenom: string;
    age: number;

    constructor(id: number, nom: string, prenom: string, age: number) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    afficherInfos(): void {
        console.log(`ID: ${this.id}, Nom: ${this.nom}, Prénom: ${this.prenom}, Age: ${this.age}`);
    }
}

const etudiant = new EtudiantImpl(1, "Lassoued", "Mohamed", 40);
etudiant.afficherInfos();

function createArray<T>(items: T[]): T[] {
    return new Array<T>().concat(items);
}

let numberArray = createArray<number>([1, 2, 3]);
let stringArray = createArray<string>(["a", "b", "c"]);

console.log(numberArray);
console.log(stringArray);

function printInfo(info: string | number, details?: string): void {
    console.log(`Info: ${info}`);
    if (details) {
        console.log(`Details: ${details}`);
    }
}

printInfo("Some info");
printInfo(123, "With details");

enum Role {
    Admin,
    User,
    Guest
}

let myRole: Role = Role.Admin;
console.log(`My role is: ${Role[myRole]}`);
