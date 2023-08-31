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

    setName(newName: string) {
        this.name = newName;
    }

    setColour(newColour: string) {
        if (newColour.length == 6) {
            this.colour = ("#" + newColour);
        } else {
            this.colour = this.colour;
        }
    }

    setPriority(newPriority: number) {
        this.priority = utils.clamp(newPriority, 0, 2);
    }

    setEnjoyment(newEnjoyment: number) {
        this.enjoyment = utils.clamp(newEnjoyment, 0, 2);
    }

}