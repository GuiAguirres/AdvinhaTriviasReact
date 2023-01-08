import { Button, Card, Container } from 'react-bootstrap';
import React, { useState } from 'react';
import apiRequestManager, { APIResultType } from '../../api/APIRequestManager';
import { useQuery } from 'react-query';
import TriviaDTO from '../../models/Trivia/TriviaDTO';
import { useNavigate } from "react-router-dom";

export default function ListaTrivias() {

	const navigate = useNavigate();

	const [trivias, setTrivias] = useState<TriviaDTO[]>([]);

	const { isLoading, isFetching, isRefetching, refetch } = useQuery('trivias', fetchData)

	async function fetchData() {
		let res = await apiRequestManager.getTrivias()

		if (res.result != APIResultType.Ok) {
			alert(res.message)
			setTrivias([])
			return true
		}

		setTrivias(res.data ?? [])

		return true
	}

	function handleClick(id: number) {
		navigate(`/admin/trivia/${id}`)
	}

	return (
		<Container fluid className="layout" style={{minHeight: "100vh"}}>
			<h1>Trivias</h1>
			<br/>
			<Button type="reset" onClick={() => { navigate("/admin/trivia/criar") }}>Criar</Button>
			<br/>
			{trivias.map(t => (
				<div key={t.id} onClick={() => {handleClick(t.id)}} style={{cursor: "pointer"}}>
					<h4>{t.titulo}</h4>
					<p>{t.descricao}</p>
				</div>
			))}
		</Container>
	)

}