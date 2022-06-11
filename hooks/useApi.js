import axios from 'axios';
import { useQuery } from 'react-query';

const fetchCharacters = async ({ queryKey }) => {
	const { data } = await axios.get(`/api/rick-morty/${queryKey[1]}`);
	return data;
};

const useFetchCharacters = (page) => {
	// console.log(page);
	return useQuery(['characters', page], fetchCharacters, {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
		refetchOnMount: false
	});
};

export { useFetchCharacters };
