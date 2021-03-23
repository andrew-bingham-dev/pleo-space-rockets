import useSWR from 'swr';

export async function getTimezone(launchSiteId) {
	// Fetch launchsite coordinates from SpaceX API
	let launchSiteDetails = await fetch(
		`https://api.spacexdata.com/v3/launchpads/${launchSiteId}`
	);
	launchSiteDetails = await launchSiteDetails.json();

	// Extract the latitude and longitude of the launch site
	const latitude = launchSiteDetails.location.latitude;
	const longitude = launchSiteDetails.location.longitude;

	// Fetch the timezone which corresponds with the launch site coordinates
	const key = process.env.REACT_APP_TIMEZONE_API_KEY;
	const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${latitude}&lng=${longitude}`;
	let timezone = await fetch(url);
	timezone = await timezone.json();
	return timezone;
}

export function useTimezone(launchSiteId) {
	return useSWR(launchSiteId, getTimezone);
}
