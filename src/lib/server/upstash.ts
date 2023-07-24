import {
	PRIVATE_UPSTASH_REDIS_REST_TOKEN,
	PRIVATE_UPSTASH_REDIS_REST_URL
} from '$env/static/private';

type CacheResponse = {
	result: any;
	error: string | null;
};

export const upstashClient = {
	set: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		key: string,
		value: string
	): Promise<CacheResponse> => {
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/set/${key}/${value}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}`
			}
		});

		return await response.json();
	},
	get: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		key: string
	): Promise<CacheResponse> => {
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/get/${key}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}`
			}
		});

		return await response.json();
	},
	hget: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		key: string,
		value: string
	): Promise<CacheResponse> => {
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/hget/${key}/${value}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}`
			}
		});

		return await response.json();
	},
	hmset: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		key: string,
		hashMap: Record<string, any>
	): Promise<CacheResponse> => {
		const hashMapArray = Object.entries(hashMap).flat();
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/hmset/${key}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}`
			},
			body: JSON.stringify(hashMapArray)
		});
		return await response.json();
	},
	hgetall: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		key: string
	): Promise<CacheResponse> => {
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/hgetall/${key}`, {
			headers: { Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}` }
		});
		const responseData = await response.json();
		if (responseData.error) {
			return responseData.error;
		}

		// Convert the list to a map and return
		const mapData: Record<string, any> = {};
		for (let i = 0; i < responseData.result.length; i += 2) {
			mapData[responseData.result[i]] = responseData.result[i + 1];
		}

		return { result: mapData, error: null };
	},
	pipeline: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		commands: string[][]
	): Promise<CacheResponse[]> => {
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/pipeline`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}`
			},
			body: JSON.stringify(commands)
		});
		return await response.json();
	},
	transaction: async (
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		commands: string[][]
	): Promise<CacheResponse[]> => {
		const response = await fetch(`${PRIVATE_UPSTASH_REDIS_REST_URL}/multi-exec`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${PRIVATE_UPSTASH_REDIS_REST_TOKEN}`
			},
			body: JSON.stringify(commands)
		});
		return await response.json();
	}
};
