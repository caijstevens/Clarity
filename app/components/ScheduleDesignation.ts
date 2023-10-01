import { Task } from "./classes/Task";
import { listSeparateSort } from "./processTasks";

export function buildSchedule(tasks: Task[]) {
    let {sortedFixed, sortedDynamic} = listSeparateSort(tasks);
    let processedTasks = gapFinder(sortedFixed, sortedDynamic, 0);
}

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
                dynamicTasks.splice(0, 1);
                return gapFinder(placedTasks, dynamicTasks, 0);
            } else {
                return gapFinder(placedTasks, dynamicTasks, index + 1)                
            }
        }
    }
}