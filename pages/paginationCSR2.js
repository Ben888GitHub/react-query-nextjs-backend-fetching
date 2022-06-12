import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useFetchCharacters } from '../hooks/useApi';
import Image from 'next/image';

function PaginationCSR() {
	const router = useRouter();

	const [page, setPage] = useState(parseInt(router.query.page) || 1);

	useEffect(() => {
		if (router.isReady) {
			if (router.query.page) {
				router.push(
					`/paginationCSR?page=${parseInt(router.query.page)}`,
					undefined,
					{
						shallow: true
					}
				) && setPage(parseInt(router.query.page));
				console.log(Number(router.query.page));
			}

			// router.query.page &&
		}

		console.log(`rerender`);
	}, [router.isReady]);

	const { data, isPreviousData, isLoading, error } = useFetchCharacters(page);

	// console.log(data);

	// isLoading && <p>Loading...</p>;

	// error && <p>Error...</p>;

	return (
		<div>
			<h1>Pagination CSR</h1>
			<>
				<button
					disabled={page === 1}
					onClick={() => {
						setPage(page - 1);
						router.push(`/paginationCSR?page=${page - 1}`, undefined, {
							shallow: true
						});
					}}
				>
					Previous
				</button>
			</>
			<>
				<button
					disabled={!data?.info?.next || isPreviousData}
					onClick={() => {
						setPage(page + 1);
						router.push(`/paginationCSR?page=${page + 1}`, undefined, {
							shallow: true
						});
					}}
				>
					Next
				</button>
			</>
			<>
				<div className="grid-container">
					{data?.results?.map((character) => (
						<article key={character.id}>
							<Image
								src={character.image}
								alt={character.name}
								height={250}
								loading="eager"
								width={300}
								priority
							/>

							<div className="text">
								<p>Name: {character.name}</p>
								<p>Lives in: {character.location.name}</p>
								<p>Species: {character.species}</p>
								<i>Id: {character.id} </i>
								<p>Status: {character.status}</p>
							</div>
						</article>
					))}
				</div>
			</>
		</div>
	);
}

export default PaginationCSR;
