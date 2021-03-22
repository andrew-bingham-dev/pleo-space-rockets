export function formatDate(timestamp) {
	return new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZoneName: 'short',
	}).format(new Date(timestamp));
}

// Remove the timezone id
export function formatDateTimeWithZoneName(timestamp, timezone) {
	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: timezone.zoneName,
	}).format(new Date(timestamp));
}

// Convert UTC datetime to local
export function convertUtcToLocal(timestamp) {
	let localDateTime = new Date(timestamp).toString();
	const [formattedLocalDateTime, timeZoneDifference] = localDateTime.split('+');
	return formattedLocalDateTime;
}
