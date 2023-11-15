import * as utils from "../utils";

export class UserSettings {
    username: string;
    password: string;
    emailAddress: string;
    userNickname: string;
    profileColour: string;
    scheduleStart: Date;
    scheduleEnd: Date;
    focusLength: number;

    constructor (
        username = "",
        password = "",
        emailAddress = "",
        userNickname = "",
        profileColour = "",
        scheduleStart = new Date(),
        scheduleEnd = new Date(),
        focusLength = 30

    ) {
        this.username = username;
        this.password = password;
        this.emailAddress = emailAddress;
        this.userNickname = userNickname;
        this.profileColour = profileColour;
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

    changeFocusLength(newValue: string) {
        let focusNumber = (newValue.split(" "))[0];
        this.focusLength = parseInt(focusNumber);
    }

    onProfileColourChanged(inputValue: string) {
        this.profileColour = inputValue;
    }
}