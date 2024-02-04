import * as utils from "../utils";
import { Task } from "../classes/Task";

export class UserSettings {
    username: string;
    password: string;
    emailAddress: string;
    userNickname: string;
    profileColour: string;
    scheduleStart: Date;
    scheduleEnd: Date;
    focusLength: number;
    breakfastTime: Date;
    lunchTime: Date;
    dinnerTime: Date;
    workoutLength: number;
    tasks: Task[];

    constructor (
        username = "",
        password = "",
        emailAddress = "",
        userNickname = "",
        profileColour = "",
        scheduleStart = new Date(),
        scheduleEnd = new Date(),
        focusLength = 30,
        breakfastTime = new Date(),
        lunchTime = new Date(),
        dinnerTime = new Date(),
        workoutLength = 30,
        tasks = []
    ) {
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.userNickname = userNickname;
        this.profileColour = profileColour;
        this.scheduleStart = scheduleStart;
        this.scheduleEnd = scheduleEnd;
        this.focusLength = focusLength;
        this.breakfastTime = breakfastTime;
        this.lunchTime = lunchTime;
        this.dinnerTime = dinnerTime;
        this.workoutLength = workoutLength;
        this.tasks = tasks;

    }

    changeScheduleStart(newValue: Date) {
        if (newValue > this.scheduleEnd) {
            this.scheduleStart = new Date(this.scheduleEnd.getTime() - 3600000);
        } else {
            this.scheduleStart = newValue;
        }
    }

    changeScheduleEnd(newValue: Date) {
        if (newValue < this.scheduleStart) {
            this.scheduleEnd = new Date(this.scheduleStart.getTime() + 3600000);
        } else {
            this.scheduleEnd = newValue;
        }
    }

    changeFocusLength(newValue: string) {
        let focusNumber = (newValue.split(" "))[0];
        this.focusLength = parseInt(focusNumber);
    }

    changeWorkoutLength(newValue: string) {
        let workoutNumber = (newValue.split(" "))[0];
        this.workoutLength = parseInt(workoutNumber);
    }

    onProfileColourChanged(inputValue: string) {
        this.profileColour = inputValue;
    }

    onBreakfastTimeChanged(inputValue: Date) {
        if (inputValue > this.scheduleStart) {
            this.breakfastTime = inputValue;
        } else {
            this.breakfastTime = this.scheduleStart;
        }
    }

    onLunchTimeChanged(inputValue: Date) {
        if (inputValue > this.scheduleStart) {
            this.lunchTime = inputValue;
        } else {
            this.lunchTime = new Date(this.scheduleStart.getTime() + 3600000);
        }
    }

    onDinnerTimeChanged(inputValue: Date) {
        if (inputValue > this.scheduleStart) {
            this.dinnerTime = inputValue;
        } else {
            this.dinnerTime = new Date(this.scheduleStart.getTime() + 2 * 3600000);
        }
    }
}