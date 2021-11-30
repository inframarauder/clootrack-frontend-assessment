const initialState = {
	loading: false,
	chartData: [],
};

function reducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case "SET_LOADING":
			return {
				...state,
				loading: true,
			};
		case "SET_CHART_DATA":
			return {
				...state,
				chartData: payload,
				loading: false,
			};
		case "UPDATE_CHART_DATA":
			return {
				...state,
				chartData: state.chartData.map((item, index) => {
					if (index === payload.chartIndex) {
						return {
							...item,
							elements: item.elements.map((element) => {
								if (element.name === payload.name) {
									return {
										...element,
										value: payload.value,
									};
								}
								return element;
							}),
						};
					}
					return item;
				}),
				loading: false,
			};
		default:
			return { ...state };
	}
}

export default reducer;
