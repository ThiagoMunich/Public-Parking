import React, { useState, createContext, useEffect } from 'react';

interface ISaldo {
	saldo: number;
}

interface IVeiculos {
	estacionado: boolean;
	nome: string;
	placa: string;
	tipo: number;
}

interface IMainContext {
	saldo: ISaldo;
	veiculos: IVeiculos[];
	setVeiculos: (veiculos: IVeiculos[]) => void;
	setSaldo: (saldo: ISaldo) => void;
	tema: 'dark' | 'light';
	trocarTema: () => void;
}

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const MainContext = createContext<IMainContext>({} as IMainContext);

const MainProvider: React.FC<Props> = ({ children }) => {
	const [tema, setTema] = useState<'dark' | 'light'>('dark');

	const [saldo, setSaldo] = useState<ISaldo>({ saldo: 0.0 } as ISaldo);
	const [veiculos, setVeiculos] = useState<IVeiculos[]>([]);

	useEffect(() => {
		if (localStorage.getItem('@FaixaAzul-Tema') !== null) {
			setTema(localStorage.getItem('@FaixaAzul-Tema') === 'dark' ? 'dark' : 'light');
		}
	}, []);

	function trocarTema() {
		setTema(tema === 'dark' ? 'light' : 'dark');
		localStorage.setItem('@FaixaAzul-Tema', tema === 'dark' ? 'light' : 'dark');
	}

	return (
		<MainContext.Provider value={{ saldo, setSaldo, veiculos, setVeiculos, tema, trocarTema }}>
			{children}
		</MainContext.Provider>
	);
};

export default MainProvider;
