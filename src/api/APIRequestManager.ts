import PalavraDTO from "../models/Trivia/PalavraDTO";
import TriviaDetalhesDTO from "../models/Trivia/TriviaDetalhesDTO";
import TriviaDTO from "../models/Trivia/TriviaDTO"

class APIRequestManager {

	// private baseUrl: string = process.env.API_BASE_URL!

	async getTrivias(): Promise<APIResponse<TriviaDTO[]>> {
		return await this.get(`https://localhost:7167/Trivia/v1`);
	}

	async getTrivia(id: any): Promise<APIResponse<TriviaDetalhesDTO>> {
		return await this.get(`https://localhost:7167/Trivia/v1/${id}`);
	}

	async postTrivia(trivia: TriviaDTO): Promise<APIResponse<TriviaDTO>> {
		return await this.post(`https://localhost:7167/Trivia/v1`, trivia);
	}

	async postWord(triviaId: any, word: PalavraDTO): Promise<APIResponse<PalavraDTO>> {
		return await this.post(`https://localhost:7167/Trivia/v1/${triviaId}/Palavra`, word);
	}

	async deleteWord(id: any): Promise<APIResponse<null>> {
		return await this.delete(`https://localhost:7167/Palavra/v1/${id}`);
	}

	private async get<T>(_url: string): Promise<APIResponse<T>> {
		let url = new URL(_url)
		let response = await fetch(url)

		if (response.status !== 200)
			return fail(response.statusText)

		try {
			let json = await response.json() as T

			return success(json)
		} catch (ex: any) {
			return fail(ex.message)
		}
	}

	private async post<TB, TR>(_url: string, body: TB): Promise<APIResponse<TR>> {
		let url = new URL(_url)
		let response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
			  'Content-Type': 'application/json'
			}
		  })

		if (response.status !== 200)
			return fail(response.statusText)

		try {
			let json = await response.json() as TR

			return success(json)
		} catch (ex: any) {
			return fail(ex.message)
		}
	}

	private async delete(_url: string): Promise<APIResponse<null>> {
		let url = new URL(_url)
		let response = await fetch(url, {
			method: 'DELETE'
		  })

		if (response.status !== 200)
			return fail(response.statusText)

		return success(null)
	}

}

export interface APIResponse<T> {
	result: APIResultType
	data: T | null
	message: string | null
}

export enum APIResultType {
	Error = 0,
	Ok = 1
}

function success<T>(data: T, message: string = ""): APIResponse<T> {
	return {
		result: APIResultType.Ok,
		data,
		message
	}
}

function fail<T>(message: string): APIResponse<T> {
	return {
		result: APIResultType.Error,
		data: null,
		message
	}
}

const apiRequestManager = Object.freeze(new APIRequestManager())

export default apiRequestManager