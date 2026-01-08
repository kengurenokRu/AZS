import { Column } from './column';
import {RenderStation} from './renderStation';

export class Stantion {
    #queue = [];
    #filling = [];
    #ready = [];
    constructor(typeStantion, renderApp = null) {
        this.typeStantion = typeStantion;
        this.renderApp = renderApp;
        this.renderStation = null;

    }

    get filling() {
        return this.#filling;
    }

    get queue() {
        return this.#queue;
    }

    init() {
        for (const optionStantion of this.typeStantion) {
            for (let i = 0; i < optionStantion.count; i++) {
                this.#filling.push(new Column(optionStantion.type, optionStantion.speed));
            }
        }

        if (this.renderApp) {
            this.renderStation = new RenderStation(this.renderApp, this);
        }

        setInterval(() => {
            this.checkQueueToFilling();
        }, 2000);
    }

    checkQueueToFilling() {
        if (this.#queue.length) {
            for (let i = 0; i < this.#queue.length; i++) {
                for (let j = 0; j < this.#filling.length; j++) {
                    if (!this.#filling[j].car &&
                        this.#queue[i].typeFuel === this.#filling[j].type) {
                        this.#filling[j].car = this.#queue.splice(i, 1)[0];
                        this.fillingGo(this.#filling[j]);
                        this.renderStation.renderStation();  
                        break;
                    }
                }
            }
        }
    }

    fillingGo(column) {
        const car = column.car;
        const start = column.car.needPetrol;
        let nowTank = car.nowTank;
        const timetId = setInterval(() => {
            console.log(car.getTitle(), nowTank);
            nowTank += column.speed;
            if (nowTank >= car.maxTank) {
                clearInterval(timetId);
                const total = car.nowTank - start;
                car.fillUp();
                column.car = null;
                this.leaveClient({ car, total });
            }
        }, 1000);
    }

    leaveClient({ car, total }) {
        this.#ready.push(car);
        this.renderStation.renderStation();  
    }

    addCarQueue(car) {
        this.#queue.push(car);
        this.renderStation.renderStation();  
    }
}