import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Priority, priorities } from "@/types";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

export default function PriorityDropdown({
	priority,
	isDone,
	onChange,
}: PriorityDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={isDone}>
				<Button variant="outline" className="ml-auto">
					{priority} <ChevronDownIcon className="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				{priorities.map((p) => (
					<DropdownMenuItem key={p} onClick={() => onChange(p)}>
						{p}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

interface PriorityDropdownProps {
	priority: Priority;
	isDone?: boolean;
	onChange: (priority: Priority) => void;
}
