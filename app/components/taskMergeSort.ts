import { Task } from "./classes/Task";
import * as utils from "./utils";

export function sortTasks(tasks: Task[], sortBy: string) {
    return divide(tasks, sortBy);
}

function divide(tasks: Task[], sortBy: string) {
    var midpoint = Math.ceil(tasks.length / 2);
    var low = tasks.slice(0, midpoint);
    var high = tasks.slice(midpoint);
    if (midpoint > 1) {
        low = divide(low, sortBy);
        high = divide(high, sortBy);
    }
    return combine(low, high, sortBy);
}

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
                    var lowScore = calculateImportance(lowItem);
                    var highScore = calculateImportance(highItem);
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

