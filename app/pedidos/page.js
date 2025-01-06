'use client'

import { useEffect, useState } from "react"
import { PeriodNavigator } from "../../components/PeriodNavigator"
import { OrdersTable } from "../../components/PendingTable"
import { DashboardSidebar } from "../../components/DashboardSidebar"
import { PendingPanel } from "../../components/PendingPanel"
import { Divider } from "antd"
import { ApprovedPanel } from "../../components/ApprovedPanel"

import {motion} from 'framer-motion'
import { useRouter } from "next/navigation"

function Home() {
  const [period, setPeriod] = useState({
    start: new Date(2024, 10, 11),   
    end: new Date(2024, 11, 10) 
  });

  const router = useRouter();

  //MEMORIZAR ISSO react.MEMO
  const panels = {
    'Pendentes': <PendingPanel/>,
    'Aprovados': <ApprovedPanel period={period} setPeriod={setPeriod}/>
  }

  const panelState = useState('Aprovados');
  const currentPanel = panelState[0]

  function promptLogin(){
    const acessToken = sessionStorage.getItem("cadastro-alibras-tokens");

    if (!acessToken) {
      const password = prompt('Senha de acesso?')
      
      if(password == null){
        return panelState[1]("Aprovados")
      }

      if(password == "admin2025"){
        return sessionStorage.setItem("cadastro-alibras-token", "ok")
      }

      promptLogin();
    }
  }

  useEffect(()=>{
    if(currentPanel == 'Pendentes') promptLogin();
  },[panelState])

  return (<>
    <DashboardSidebar panelState={panelState}/>
    <motion.div
        key={currentPanel}  // Garantindo que a animação seja acionada toda vez que o painel mudar
        initial={{ opacity: 0, }}  // Início da animação
        animate={{ opacity: 1,}}    // Fim da animação
        exit={{ opacity: 0,}}     // Quando o painel sai
        transition={{ duration: 0.5 }}     // Duração da animação
      className="w-full max-h-screen overflow-auto transition-all">
       {panels[currentPanel]}
    </motion.div>
  </>)
}

export default Home
