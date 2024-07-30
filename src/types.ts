export interface Todo {
	id: string;
	createdAt: number;
	title: string;
	description: string;
	isDone: boolean;
	priority: Priority;
	dueDate?: number;
}

export type Priority = "Low" | "Medium" | "High";
export const priorities: Priority[] = ["Low", "Medium", "High"];
