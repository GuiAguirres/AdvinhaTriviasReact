import { Button, Card, Container, Form } from 'react-bootstrap';
import React, { FormEvent, useState } from 'react';
import apiRequestManager, { APIResultType } from '../../api/APIRequestManager';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { AppIcon } from '../../components/AppIcon';
import PalavraDTO from '../../models/Trivia/PalavraDTO';

export default function DetalhesTrivia() {

	const navigate = useNavigate();

	const { id } = useParams();

	const [formStatus, setFormStatus] = useState(true)
	const [formTitulo, setFormTitulo] = useState("")
    const [formDescricao, setFormDescricao] = useState("")

	const [newWord, setNewWord] = useState("")

	const [words, setWords] = useState<PalavraDTO[]>([])

	const { isLoading, isFetching, isRefetching, refetch } = useQuery<boolean>(['trivia', id], () => fetchData(id), {enabled: id !== undefined})

	const handleSubmitTriviaForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		save()
	};

	const handleSubmitPalavraForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		addWord()
	};

	async function addWord() {
		await apiRequestManager.postWord(id, {
			id: 0,
			texto: newWord
		})
		refetch()
		//setWords(oldWords => [...oldWords, newWord])
		setNewWord("")
	}

	async function removeWord(index: number) {
		await apiRequestManager.deleteWord(words[index].id)
		setWords(oldWords => oldWords.filter((_, i) => i != index))
	}

	async function fetchData(id: any) {
		let res = await apiRequestManager.getTrivia(id)

		if (res.result != APIResultType.Ok)
			return false

		setFormTitulo(res.data?.titulo ?? "")
		setFormDescricao(res.data?.descricao ?? "")
		setWords(res.data?.palavras ?? [])
		return true
	}

	async function save() {
		var res = await apiRequestManager.postTrivia({
			id: Number.parseInt(id ?? "0"),
			titulo: formTitulo,
			descricao: formDescricao
		})

		if (res.result != APIResultType.Ok) {
			alert(res.message)
			return
		}

		navigate(`/${res.data?.id}`)

	}

	return (
		<Container fluid className="layout" style={{minHeight: "100vh"}}>

			<Button type="reset" onClick={() => { navigate("/admin/trivia/") }}>Voltar</Button>

			<Card className="mb-4">
				<Card.Body>

					<Form onSubmit={handleSubmitTriviaForm}>

						<Form.Group className="mb-3" controlId="titulo">
							<Form.Label>Título</Form.Label>
							<Form.Control type="text" placeholder="Informe aqui o título" value={formTitulo} onChange={(event)=>{ setFormTitulo(event.target.value); }} disabled={!formStatus}/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="descricao">
							<Form.Label>Descrição</Form.Label>
							<Form.Control type="text" placeholder="Informe aqui a descrição" value={formDescricao} onChange={(event)=>{ setFormDescricao(event.target.value); }} disabled={!formStatus}/>
						</Form.Group>

						<Button type="submit">Salvar</Button>

					</Form>

					{id != undefined && Number.parseInt(id) > 0 ? <Form onSubmit={handleSubmitPalavraForm}>

						<Form.Group className="mb-3" controlId="newWord">
							<Form.Label>Palavra</Form.Label>
							<Form.Control type="text" placeholder="Adicione aqui a palavra" value={newWord} onChange={(event)=>{ setNewWord(event.target.value); }} disabled={!formStatus}/>
							<Button type="submit">+</Button>
						</Form.Group>

					</Form> : null}

					{words.map((w, i) => (
						<Card key={w.id}>
							<Card.Body>
								{w.texto} <AppIcon.TrashCan className="float-right" onClick={() => { removeWord(i) }}/>
							</Card.Body>
						</Card>
					))}

				</Card.Body>
			</Card>

		</Container>
	);
}