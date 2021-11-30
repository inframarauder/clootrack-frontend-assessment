import getApiData from "../../utils/getApiData";

export const setChartData = () => async (dispatch) => {
	dispatch({ type: "SET_LOADING" });
	try {
		const data = await getApiData();
		data.forEach((item) => {
			let chartCompatibleData = item.elements.map((element, index) => {
				return {
					name: `item_${index}`,
					value: element,
				};
			});
			item.elements = chartCompatibleData;
		});

		console.log(data);
		dispatch({ type: "SET_CHART_DATA", payload: data });
	} catch (error) {
		console.error(error);
		alert("Something went wrong!");
	}
};

export const updateChartData = (update) => (dispatch) => {
	dispatch({ type: "UPDATE_CHART_DATA", payload: update });
};
