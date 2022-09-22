const base_url = 'http://localhost:3000/api/tasks'

export const getAllTasks = (): string => base_url

export const newTask = (): string => `${base_url}/new`

export const getTask = (id: string): string => `${base_url}/${id}`

export const editTask = (id: string | undefined): string => `${base_url}/edit/${id}`

export const deleteTask = (id: number): string => `${base_url}/delete/${id}`