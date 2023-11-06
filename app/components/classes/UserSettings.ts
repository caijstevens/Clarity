import * as utils from "../utils";

export class UserSettings {
    username: string;
    userNickname: string;
    scheduleStart: Date;
    scheduleEnd: Date;
    focusLength: number;

    constructor (
        username = "",
        userNickname = "",
        scheduleStart = new Date(),
        scheduleEnd = new Date(),
        focusLength = 30

    ) {
        this.username = username;
        this.userNickname = userNickname;
        this.scheduleStart = scheduleStart;
        this.scheduleEnd = scheduleEnd;
        this.focusLength = focusLength;

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

    changeFocusLength(newValue: String) {
        let focusNumber = (newValue.split(" "))[0];
        this.focusLength = parseInt(focusNumber);
    }
}