export interface Task {
    id: number
    title: string
    description: string
}

export type NewTask = Omit<Task, 'id'>