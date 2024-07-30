import { number, z } from "zod";

export const todoSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Text is required"),
	priority: z.enum(["Low", "Medium", "High"]),
	dueDate: number().min(1, "Date is required"),
});
