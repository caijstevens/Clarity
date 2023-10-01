import { Task } from "./classes/Task";
import * as taskMergeSort from "./taskMergeSort";


export function listSeparateSort(tasks: Task[]) {
    let fixedTasks = [];
    let dynamicTasks = [];
    for (let i=0; i < tasks.length; i++) {
        let currentTask = tasks[i];
        if (currentTask.dynamic) {
            dynamicTasks.push(currentTask);
        } else {
            fixedTasks.push(currentTask);
        }
    }

    let sortedFixed = taskMergeSort.sortTasks(fixedTasks, "Date");
    let sortedDynamic = taskMergeSort.sortTasks(dynamicTasks, "Importance");
    return {sortedFixed, sortedDynamic}
}
