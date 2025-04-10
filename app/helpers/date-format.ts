export const dateFormat = (date: Date): string => {
	const yyyy = date.getFullYear();
	const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
	const dd = String(date.getDate()).padStart(2, "0");

	const formatted = `${yyyy}-${mm}-${dd}`;
	return formatted;
};
