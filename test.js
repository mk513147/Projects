const url = 'https://paragraph-generator.p.rapidapi.com/paragraph-generator?topic=How%20to%20Make%20Your%20First%20Virtual%20Team%20Meeting%20a%20Success&section_heading=How%20to%20keep%20track%20of%20what%20you\'ve%20discussed';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '00bd450707mshf48442cc8f53089p1dddb2jsn2808725b6ada',
		'x-rapidapi-host': 'paragraph-generator.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}