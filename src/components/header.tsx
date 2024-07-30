import ThemeToggle from "@/components/theme-toggle";
import React from "react";

export default function Header() {
	return (
		<div className="w-full flex justify-between items-center">
			<h1 className="font-bold">Todo List</h1>
			<ThemeToggle />
		</div>
	);
}
