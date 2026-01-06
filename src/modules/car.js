class Car {
    #maxTank;
    constructor(brand, model, maxTank) {
        this.brand = brand;
        this.model = model;
        this.#maxTank = maxTank;
        this.nowTank = Math.floor(Math.random() * maxTank);
    }

    getTitle() {
        return `${this.brand} ${this.model}`;
    }

    setModel(model) {
        this.model = model;
        return this;
    }

    needPetrol() {
        return this.#maxTank - this.nowTank;
    }

    fillUp() {
        this.nowTank = this.#maxTank;
    }

    get maxTank() {
        return this.#maxTank;
    }

    static logger(str) {
        console.log(str);
    }

    static from({ brand, model, maxTank }) {
        const car = new Car(brand, model, maxTank);
        Car.logger(Car.string + car);
        return car;
    }
}

export class PassangerCar extends Car {
    typeCar = 'passanger';
    constructor(brand, model, maxTank, typeFuel = 'petrol') {
        super(brand, model, maxTank);
        this.typeFuel = typeFuel;
    }
}

export class Truck extends Car {
    typeCar = 'truck';
    constructor(brand, model, maxTank, typeFuel = 'disel') {
        super(brand, model, maxTank);
        this.typeFuel = typeFuel;
    }
}

export const opel = new PassangerCar('Opel', 'Crossland', 45);

const bmw = Car.from({ brand: 'BMW', model: 'X7', maxTank: 80, });