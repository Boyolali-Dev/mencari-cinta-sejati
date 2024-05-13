	interface TodoCardTypeProps {
		todo: string;
		inprogress: string;
		completed: string;
		hold: string;
	}
	
	export const TodoCardType = {
		Todo      : "todo",
		InProgress: "inprogress",
		Completed : "completed",
		Hold      : "hold"
	}