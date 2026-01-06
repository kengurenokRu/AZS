class Car {
    constructor( brand, model, maxTank) {
        this.brand = brand;
        this.model = model;
        this.maxTank = maxTank;
        this.nowTank = Math.floor(Math.random()*maxTank);
    }

    needPetrol() {
        return this.maxTank - this.nowTank;
    }

    fillUp() {
        this.nowTank = this.maxTank;
    }
}