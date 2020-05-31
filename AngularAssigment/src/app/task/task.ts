export class Task {
    id: number;
    name: string;
    isCompleted: boolean;
}
export enum TaskType {
    UpcomingTasks = 'Upcomming Tasks',
    CompletedTasks= 'Completed Tasks'
}
