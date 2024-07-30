import type { Todo } from "@/types";
import type { Row } from "@tanstack/react-table";

const priorityOrderAsc = ["Low", "Medium", "High"];
const priorityOrderDesc = ["High", "Medium", "Low"];

export const sortPriority = (
	rowA: Row<Todo>,
	rowB: Row<Todo>,
	columnId: string,
	desc?: boolean,
): number => {
	const order = desc ? priorityOrderDesc : priorityOrderAsc;
	const priorityA = rowA.getValue<string>(columnId);
	const priorityB = rowB.getValue<string>(columnId);
	return order.indexOf(priorityA) - order.indexOf(priorityB);
};

export const sortIsDone = (
	rowA: Row<Todo>,
	rowB: Row<Todo>,
	columnId: string,
	desc?: boolean,
): number => {
	const isDoneA = rowA.getValue<boolean>(columnId);
	const isDoneB = rowB.getValue<boolean>(columnId);
	if (isDoneA === isDoneB) return 0;
	if (desc) {
		return isDoneA ? 1 : -1;
	}
	return isDoneA ? -1 : 1;
};

export const sortDueDate = (
	rowA: Row<Todo>,
	rowB: Row<Todo>,
	columnId: string,
	desc?: boolean,
): number => {
	const dateA = new Date(rowA.getValue<number>(columnId) * 1000);
	const dateB = new Date(rowB.getValue<number>(columnId) * 1000);
	if (dateA.getTime() === dateB.getTime()) return 0;
	if (desc) {
		return dateA > dateB ? -1 : 1;
	}
	return dateA < dateB ? -1 : 1;
};
