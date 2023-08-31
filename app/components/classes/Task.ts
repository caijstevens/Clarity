import * as utils from "../utils";

export class Task {
    name: string;
    timeframe: number;
    category: number = 0;
    hasDeadline: boolean;
    deadline?: Date;
    dynamic: boolean;
    startTime: Date;
    endTime: Date;
    priority: number;
    enjoyment: number;
    displayedStart: Date;
    displayedLength: number;

    constructor(
        name = "New Task",
        timeframe = 0.5,
        hasDeadline = false,
        dynamic = true,
        priority = 1,
        enjoyment = 1,
        displayedStart = new Date(),
        displayedLength = 1
    ) {
        this.name = name;
        this.timeframe = timeframe;
        this.hasDeadline = hasDeadline;
        this.dynamic = dynamic;
        this.priority = priority;
        this.enjoyment = enjoyment;
        this.displayedStart = utils.getNextHour();
        this.displayedLength = displayedLength;
        this.startTime = utils.getNextHour();
        this.endTime = new Date(this.startTime.getTime() + 1800000);
    }
    
    onDynamicChanged(inputValue: boolean) {
        this.dynamic = inputValue;
        if (!this.dynamic && ((!this.startTime) || (this.startTime.getTime() < Date.now()))) {
            this.startTime = utils.getNextHour();
            this.endTime = new Date(this.startTime.getTime() + (3600000 * this.timeframe))
        }
    }

    onTimeframeChanged(newValue: number) {
        this.timeframe = newValue;
    }

    onHasDeadlineChanged(inputValue: boolean) {
        this.hasDeadline = inputValue;
        if (this.hasDeadline && ((!this.deadline) || ((Date.now() + 1800000) > this.deadline.getTime()))) {
            this.deadline = utils.getDay(new Date(Date.now() + 86400000));
        }
    }

    onDeadlineChanged(newValue: Date) {
        if ((Date.now() + 1800000) < newValue.getTime()) {
            this.deadline = newValue;
        } else if ((Date.now() + 1800000) > newValue.getTime()) {
            this.deadline = utils.getDay(new Date(Date.now() + 86400000))
        }
    }

    onStartTimeChanged(inputValue: Date) {
        let newValue: Date;
        if (inputValue.getTime() < 0) {
            newValue = utils.combineTimeAndDay(inputValue, this.startTime);
        } else {
            newValue = inputValue
        }
        let length = this.endTime.getTime() - this.startTime.getTime();
        if (Date.now() < newValue.getTime()) {
           this.startTime = newValue; 
        } else {
            this.startTime = utils.getNextHour();
        }
        
        this.endTime = new Date(this.startTime.getTime() + length);
    }

    onEndTimeChanged(inputValue: Date) {
        let newValue = utils.combineTimeAndDay(inputValue, this.startTime);
        if (this.startTime.getTime() < newValue.getTime()) {
            this.endTime = newValue;
        } else {
            this.endTime = new Date(this.startTime.getTime() + 1800000);
        }
    }

    onCategoryChanged(inputValue: number) {
        this.category = inputValue;
    }

    onPriorityChanged(inputValue: number) {
        this.priority = inputValue;
    }

    onEnjoymentChanged(inputValue: number) {
        this.enjoyment = inputValue;
    }

    calculateDisplayTimes() {
        if (!this.dynamic) {
            this.displayedStart = this.startTime;
            this.displayedLength = ((this.endTime.getTime() - this.startTime.getTime()) / 3600000);
        }
    }

}