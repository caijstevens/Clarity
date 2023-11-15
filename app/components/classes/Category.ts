import * as utils from "../utils";

export class Category {
    name: string;
    colour: string;
    priority: number;
    enjoyment: number;

    constructor (
        name="New Category",
        colour = ("#" + "010101"),
        priority = 1,
        enjoyment = 0,
    ) {

        this.name=name;
        this.colour=colour;
        this.priority=priority;
        this.enjoyment=enjoyment;

    }

    onColourChanged(inputValue: string) {
        this.colour = inputValue;
    }

    onPriorityChanged(inputValue: number) {
        this.priority = utils.clamp(inputValue, 0, 2);
    }

    onEnjoymentChanged(inputValue: number) {
        this.enjoyment = utils.clamp(inputValue, 0, 2);
    }
}