import axios from 'axios';

export default async function handler(req, res) {
	const { id } = req.query; // Object Destructuring

	const { data } = await axios.get(
		`https://rickandmortyapi.com/api/character/?page=${id}`
	);

	res.status(200).json(data);
}
