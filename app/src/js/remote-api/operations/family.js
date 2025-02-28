export default {
	getFamiliesList: () => ['families'],
	getFamily: id => [`family/${id}`],
	getFamiliesSearchList: () => ['families_search'],
	publishFamily: family => [`family/validate/${family.id}`, { method: 'PUT' }],
	putFamily: family => [
		`family/${family.id}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(family),
		},
		() => Promise.resolve(family.id),
	],
	postFamily: family => [
		`family`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(family),
		},
		res => res.text(),
	],
};