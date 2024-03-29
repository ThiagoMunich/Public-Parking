import React, { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { FormControl, FormGroup } from '@material-ui/core';

import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SportsMotorsportsIcon from '@material-ui/icons/SportsMotorsports';

import { useFormik } from 'formik';

function ModalCadastrarVeiculo({ abrir, fechar, cadastrar }) {
	const [carro, setCarro] = useState(true);
	const [moto, setMoto] = useState(false);
	const [caminhao, setCaminhao] = useState(false);

	const [tipoVeiculo, setTipoVeiculo] = useState('Carro');
	const [tipoIcone, setTipoIcone] = useState(0);

	const handleCarro = () => {
		setCarro(true);
		setTipoVeiculo('Carro');
		setTipoIcone(1);
		setMoto(false);
		setCaminhao(false);
	};

	const handleCaminhao = () => {
		setCaminhao(true);
		setTipoVeiculo('Carga e descarga');
		setTipoIcone(2);
		setCarro(false);
		setMoto(false);
	};

	const handleMoto = () => {
		setMoto(true);
		setTipoVeiculo('Moto');
		setTipoIcone(3);
		setCarro(false);
		setCaminhao(false);
	};

	const { handleSubmit, getFieldProps, resetForm } = useFormik({
		initialValues: {
			estacionado: false,
			nome: '',
			placa: '',
			tipo: 0,
		},
		onSubmit: values => {
			values.tipo = tipoIcone;
			cadastrar(values);
			resetForm();
			setTimeout(fechar, 1);
		},
	});

	return (
		<>
			<Dialog open={abrir} onClose={fechar}>
				<DialogTitle>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<ButtonGroup fullWidth>
							<Button onClick={handleCarro}>
								<DriveEtaIcon />
							</Button>
							<Button onClick={handleCaminhao}>
								<LocalShippingIcon />
							</Button>
							<Button onClick={handleMoto}>
								<SportsMotorsportsIcon />
							</Button>
						</ButtonGroup>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
						<Typography variant='overline'>{tipoVeiculo}</Typography>
					</div>
				</DialogTitle>
				<form onSubmit={handleSubmit}>
					<DialogContent>
						<FormControl fullWidth>
							<FormGroup>
								<TextField
									required
									margin='dense'
									autoComplete='off'
									variant='outlined'
									label='Nome do veículo'
									{...getFieldProps('nome')}
								/>
							</FormGroup>
						</FormControl>
						<FormControl fullWidth>
							<FormGroup>
								<TextField
									required
									label='Placa'
									margin='dense'
									autoComplete='off'
									variant='outlined'
									{...getFieldProps('placa')}
								/>
							</FormGroup>
						</FormControl>
						<br />
					</DialogContent>
					<DialogActions>
						<Button size='small' color='secondary' onClick={fechar}>
							Cancelar
						</Button>
						<Button type='submit' size='small' color='primary'>
							Salvar
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}

export default ModalCadastrarVeiculo;
