"use client";

import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [theme, setTheme] = useState<string>();

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) {
			setTheme(savedTheme);
			document.documentElement.classList.toggle("dark", savedTheme === "dark");
		} else {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
				.matches
				? "dark"
				: "light";
			setTheme(systemTheme);
			document.documentElement.classList.toggle("dark", systemTheme === "dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	};

	return (
		<div className="flex items-center">
			<span className="mr-2">
				{theme === "dark" ? "Dark Mode" : "Light Mode"}
			</span>
			<Switch
				checked={theme === "dark"}
				onCheckedChange={toggleTheme}
				aria-label="Toggle Theme"
			/>
		</div>
	);
};

export default ThemeToggle;
