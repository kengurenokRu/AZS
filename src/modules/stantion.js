import { Column } from './column';

export class Stantion {
    constructor(typeStantion) {
        this.typeStantion = typeStantion;
        this.queue = [];
        this.filling = [];
        this.ready = [];
    }

    init() {
        for (const optionStantion of this.typeStantion) {
            for (let i = 0; i < optionStantion.count; i++) {
                this.filling.push(new Column(optionStantion.type, optionStantion.speed));
            }
        }


        setInterval(() => {
            this.checkQueueToFilling();
        }, 2000);
    }

    checkQueueToFilling() {
        if (this.queue.length) {
            for (let i = 0; i < this.queue.length; i++) {
                for (let j = 0; j < this.filling.length; j++) {
                    if (!this.filling[j].car &&
                        this.queue[i].typeFuel === this.filling[j].typeFuel) {

                        this.filling[j].car = this.queue.splice(i, 1)[0];
                    }
                }
            }
        }
    }
}