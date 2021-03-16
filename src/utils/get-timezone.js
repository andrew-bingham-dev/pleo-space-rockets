export async function getTimezone(launchSiteId) {
	// Fetch launchsite coordinates from SpaceX API
	const launchSiteDetails = await fetch(
		`https://api.spacexdata.com/v3/launchpads/${launchSiteId}`
	).then(res => res.json());

	// Extract the latitude and longitude of the launch site
	const latitude = await launchSiteDetails.location.latitude;
	const longitude = await launchSiteDetails.location.longitude;

	// Fetch the timezone which corresponds with the launch site coordinates
	const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=I8D39IMTCNHC&format=json&by=position&lat=${latitude}&lng=${longitude}`;
	const timezone = await fetch(url).then(res => res.json());
	console.log('lat: ', latitude);
	console.log('long: ', longitude);
	console.log('timezone: ', timezone);
	return timezone.abbreviation;
}
