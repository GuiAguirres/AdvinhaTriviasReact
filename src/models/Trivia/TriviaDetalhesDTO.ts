import PalavraDTO from "./PalavraDTO"

export default interface TriviaDetalhesDTO {
	id: number
	titulo: string
  	descricao: string
  	dataInicio: Date
  	dataFim: Date
	palavras: PalavraDTO[]
}