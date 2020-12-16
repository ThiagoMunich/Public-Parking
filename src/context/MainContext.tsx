import React, {useState, createContext, useEffect} from 'react';

interface ISaldo {
  saldo: number;
}

interface IVeiculos {
  nome: string,
  placa: string,
  tipo: number,
}

interface IMainContext {
  saldo: ISaldo;
  setSaldo: (saldo: ISaldo) => void;
  tema: 'dark' | 'light';
  trocarTema: () => void;
}

export const MainContext = createContext<IMainContext>({} as IMainContext)

const MainProvider: React.FC = ({children}) => {
  
  const [tema,setTema] = useState<'dark' | 'light'>('dark')

  const [saldo, setSaldo] = useState<ISaldo>({} as ISaldo)

  useEffect(() => {
    if(localStorage.getItem('@FaixaAzul-Tema') !== null) {
      setTema(localStorage.getItem('@FaixaAzul-Tema') === 'dark' ? 'dark' : 'light')
    }
  },[])

  function trocarTema() {
    setTema(tema === 'dark' ? 'light' : 'dark');
    localStorage.setItem('@FaixaAzul-Tema', tema === 'dark' ? 'light' : 'dark');
  }

  return <MainContext.Provider value={{saldo,setSaldo, tema, trocarTema}}>{children}</MainContext.Provider>
  
}

export default MainProvider;