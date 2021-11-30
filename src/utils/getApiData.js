import axios from "axios";

export default async function getData() {
	const res = await axios.get(
		"https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
	);
	return res.data;
}
