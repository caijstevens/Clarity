import { Task } from "./classes/Task";
import * as utils from "./utils";
import { UserSettings } from "./classes/UserSettings";

let thisUser = new UserSettings();
let tasks = thisUser.tasks;

// This function brings together the full list of sorted tasks which can then be placed back into the user interface.
export function listSeparateSort(tasks: Task[]) {
    let fixedTasks = [];
    let dynamicTasks = [];
    // adds tasks to correct respective list
    for (let i=0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        if (currentTask.dynamic) {
            dynamicTasks.push(currentTask);
        } else {
            fixedTasks.push(currentTask);
        }
    }
    let sortedFixed = sortTasks(fixedTasks, "Date");
    let sortedDynamic = sortTasks(dynamicTasks, "Importance");
    return [sortedFixed, sortedDynamic];
}

export function buildSchedule(tasks: Task[]) {
    if (tasks.length == 0) {
        return tasks;
    } else {
        let sortedFixed: Task[] = [];
        let sortedDynamic: Task[] = [];
        [sortedFixed, sortedDynamic] = listSeparateSort(tasks);
        let processedTasks = gapFinder(sortedFixed, sortedDynamic, 0);
        return processedTasks;
    }
}

// This function is used to place the dynamic tasks between the fixed tasks, finding a gap of appropriate length to place the dynamic task in.
function gapFinder(placedTasks: Task[], dynamicTasks: Task[], index: number) {
    if (dynamicTasks.length == 0) {
        return placedTasks;
    } else {
        if (index == placedTasks.length) {
            placedTasks.concat(dynamicTasks);
            return placedTasks;
        } else {
            let timeGap = ((placedTasks[index + 1].displayedStart.getTime() - placedTasks[index].displayedStart.getTime() + (placedTasks[index].displayedLength * (36000000))));
            let checkingTask = dynamicTasks[0];
            if (timeGap >= checkingTask.displayedLength * 3600000) {
                placedTasks.splice(index + 1, 0, checkingTask);
                checkingTask.displayedStart = placedTasks[index + 1].endTime;
                dynamicTasks.splice(0, 1);
                return gapFinder(placedTasks, dynamicTasks, index = index + 1);
            } else {
                if (index == placedTasks.length - 1) {
                    return gapFinder(placedTasks, dynamicTasks, index=0);
                } else {
                    return gapFinder(placedTasks, dynamicTasks, index + 1); 
                }
                             

            }
        }
    }
}

// This function purely just calls divide() to sort the list of tasks. In a later algorithm, this is used to sort the fixed and dynamic tasks separately.
export function sortTasks(tasks: Task[], sortBy: string) {
    return divide(tasks, sortBy);
}


// This function is used at the very beginning to divide the full list of tasks into lists of just 1 task, ready to be sorted. It calls combine() at the end of the function to combine all of the tasks into a sorted list.
function divide(tasks: Task[], sortBy: string) {
    var midpoint = Math.ceil(tasks.length / 2);
    var low = tasks.slice(0, midpoint);
    var high = tasks.slice(midpoint);
    console.log(low, high);
    
    if (midpoint > 1) {
        low = divide(low, sortBy);
        high = divide(high, sortBy);
    }
    return combine(low, high, sortBy);
}

//This function is part of the merge sort, sorting each list of items by order of date if they are fixed, and by order of importance if they are dynamic. It calls calculateImportance() to sort the items
function combine(low: Task[], high: Task[], sortBy: string) {
    var indexLow = 0;
    var indexHigh = 0;
    var lengthLow = low.length;
    var lengthHigh = high.length;
    var combined = [];
    while (indexLow < lengthLow || indexHigh < lengthHigh) {
        var lowItem = low[indexLow];
        var highItem = high[indexHigh];
        if (lowItem) {
            if (!highItem) {
                combined.push(lowItem);
                indexLow++;
            } else {
                if (sortBy === "Date") {
                    if (lowItem.startTime <= highItem.startTime) {
                        combined.push(lowItem);
                        indexLow++;
                    } else {
                        combined.push(highItem);
                        indexHigh++;
                    }
                } else if (sortBy === "Importance") {
                    let lowScore = calculateImportance(lowItem);
                    let highScore = calculateImportance(highItem);
                    if (lowScore <= highScore) {
                        combined.push(lowItem);
                        indexLow++;
                    } else {
                        combined.push(highItem);
                        indexHigh++;
                    }
                }
            }
        } else {
            if (highItem) {
                combined.push(highItem);
                indexHigh++;
            }
        }
    }
    return combined; 
}

// used to calculate the importance value of each task. returns a value between 0-10, with 10 being the most important. has a weighting of 40% deadline, 40% priority and 20% enjoyment. This is used to determine the order in which dynamic tasks are scheduled, within constraints such as time.
function calculateImportance(task: Task) {
    // priority 40%, deadline 40%, enjoyment 20%
    var score = 0;
    if (task.hasDeadline && task.deadline) {
        var daysToDeadline = (task.deadline.getTime() - Date.now()) / 86400;
        var clampedScore = utils.clamp((4 * (7 - daysToDeadline) / 7), 0, 4);
        score =+ clampedScore;
    }
    var priorityScore = utils.clamp((4 * (task.priority) / 3), 0, 4);
    var enjoymentScore = utils.clamp((2 * (task.enjoyment) / 3), 0, 2);
    score =+ (priorityScore + enjoymentScore);
    return score;
}