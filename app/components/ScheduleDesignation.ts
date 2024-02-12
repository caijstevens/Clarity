import { Task } from "./classes/Task";
import * as utils from "./utils";
import thisUser from "/Home.svelte";
import { UserSettings } from "./classes/UserSettings";


let tasks = thisUser.tasks;

// This function brings together the full list of sorted tasks which can then be placed back into the user interface.
export function listSeparateSort(tasks: Task[]) {
    let fixedTasks = [];
    let dynamicTasks = [];
    let sortedFixed: Task[] = [];
    let sortedDynamic: Task[] = [];
    // adds tasks to correct respective list
    for (let i=0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        if (currentTask.dynamic) {
            dynamicTasks.push(currentTask);
        } else {
            fixedTasks.push(currentTask);
        }
    }
    console.log("dynamicTasks 1st: ", dynamicTasks[0].name, "Task 2nd: ", dynamicTasks[1].name); 
    if (fixedTasks.length > 0) {
       sortedFixed = sortTasks(fixedTasks, "Date"); 
    }
    if (dynamicTasks.length > 0) {
        sortedDynamic = sortTasks(dynamicTasks, "Importance"); 
    }
   
    return [sortedFixed, sortedDynamic];
}

export function buildSchedule(tasks: Task[]) {
    if (tasks.length == 0) {
        return tasks;
    } else {
        let sortedFixed: Task[] = [];
        let sortedDynamic: Task[] = [];
        [sortedFixed, sortedDynamic] = listSeparateSort(tasks);
        console.log(JSON.stringify(sortedFixed))
        console.log(JSON.stringify(sortedDynamic))
        let processedTasks = gapFinder(sortedFixed, sortedDynamic, 0);
        return processedTasks;
    }
}

// This function is used to place the dynamic tasks between the fixed tasks, finding a gap of appropriate length to place the dynamic task in.
function oldGapFinder(placedTasks: Task[], dynamicTasks: Task[], index: number) {
    console.log(JSON.stringify(placedTasks))
    console.log(JSON.stringify(dynamicTasks))
    if (dynamicTasks.length == 0) {
        console.log("none left")
        return placedTasks;
    } else {
        let timeGap = ((placedTasks[index + 1].displayedStart.getTime() - placedTasks[index].displayedStart.getTime() + (placedTasks[index].displayedLength * (36000000))));
        let checkingTask = dynamicTasks[0];
        console.log(timeGap)
        console.log(checkingTask.displayedLength * 3600000)
        if (timeGap >= checkingTask.displayedLength * 3600000) {
            console.log("fits")
            placedTasks.splice(index + 1, 0, checkingTask);
            checkingTask.displayedStart = placedTasks[index + 1].endTime;
            dynamicTasks.splice(0, 1);
            return oldGapFinder(placedTasks, dynamicTasks, index + 1);
        } else {
            console.log("does not fit")
            if (index == placedTasks.length - 1) {
                return oldGapFinder(placedTasks, dynamicTasks, 0);
            } else {
                return oldGapFinder(placedTasks, dynamicTasks, index + 1); 
            }
        }
    }
}

function gapFinder(placedTasks: Task[], dynamicTasks: Task[], index: number, startTime: Date, endTime: Date) {
    let hasFoundStart = false;
    let gaps = [];
    for (let index = 0; index < placedTasks.length - 1; index++) {
        let taskEnd = (placedTasks[index].displayedStart.getTime() + (placedTasks[index].displayedLength * 3600000));
        if (taskEnd < startTime.getTime()) {
            continue;

        } else if ((placedTasks[index].displayedStart.getTime() > endTime.getTime())) {
            if ((placedTasks[index -1 ].displayedStart.getTime() + (placedTasks[index - 1].displayedLength * 3600000)) < endTime.getTime()) {
                gaps.push({start: (placedTasks[index - 1].displayedStart.getTime() + (placedTasks[index - 1].displayedLength * 3600000)), end: endTime.getTime()});
                
            }
            break;
        }
        if (!hasFoundStart) {
            hasFoundStart = true;
            if (placedTasks[index].displayedStart.getTime() > startTime.getTime()) {
                gaps.push({start: startTime, end: placedTasks[index].displayedStart});
            }
        }
        if (taskEnd < placedTasks[index + 1].displayedStart.getTime() && placedTasks[index + 1].displayedStart.getTime() < endTime.getTime()) {
            gaps.push({start: taskEnd, end: placedTasks[index + 1].displayedStart.getTime()});
        }
    }
    if ((placedTasks[placedTasks.length - 1].displayedStart.getTime() + (placedTasks[placedTasks.length - 1].displayedLength * 3600000)) < endTime.getTime() && placedTasks[placedTasks.length - 1].displayedStart.getTime() > startTime.getTime()) {
        gaps.push({start: (placedTasks[placedTasks.length - 1].displayedStart.getTime() + (placedTasks[placedTasks.length - 1].displayedLength * 3600000)), end: endTime.getTime()});
    }
    if (gaps.length == 0) {
        gaps.push({start: startTime.getTime(), end: endTime.getTime()})
    }
    return gaps;
}
    
function processDay(placedTasks: Task[], dynamicTasks: Task[], day: Date | undefined) {
    if (dynamicTasks.length == 0) {
        return placedTasks;
    }
    if (!day) {
        day = new Date(Date.now());
    }

}

// This function purely just calls divide() to sort the list of tasks. In a later algorithm, this is used to sort the fixed and dynamic tasks separately.
export function sortTasks(tasks: Task[], sortBy: string) {
    console.log("dynamicTasks 1st: ", tasks[0].name, "Task 2nd: ", tasks[1].name); 
    return divide(tasks, sortBy);
}


// This function is used at the very beginning to divide the full list of tasks into lists of just 1 task, ready to be sorted. It calls combine() at the end of the function to combine all of the tasks into a sorted list.
function divide(tasks: Task[], sortBy: string) {
    var midpoint = Math.ceil(tasks.length / 2);
    console.log("Midpoint: ", midpoint);
    var low = tasks.slice(0, midpoint);
    console.log("Low part of array: ", low[0].name);
    var high = tasks.slice(midpoint);
    console.log("High part of array: ", high[0].name);
    
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
    console.log("Low first elment: ",low[0].name, "High first elment: ", high[0].name, "Low length: ", lengthLow, "High Length: ", lengthHigh );
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
                    console.log("Low score: ",lowScore, "High score: ", highScore);
                    if (lowScore <= highScore) {
                        combined.push(highItem);
                        indexHigh++;
                    } else {
                        combined.push(lowItem);
                        indexLow++;
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
    console.log("Combined 1st: ", combined[0].name, "Combined 2nd: ", combined[1].name); 
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
    console.log("Task name: ", task.name, "Priority score: ", priorityScore, "Enjoyment score: ", enjoymentScore); 

    score =+ (priorityScore + enjoymentScore);
    console.log("Task name: ", task.name, "Final score: ", score); 
    return score;
}