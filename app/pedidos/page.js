'use client'

import { useEffect, useState, useMemo } from "react"
import { Sidebar } from "../../components/Sidebar"
import { PendingPanel } from "../../components/PendingPanel"
import { ApprovedPanel } from "../../components/ApprovedPanel"

import {motion} from 'framer-motion'

function Home() {
  const [period, setPeriod] = useState({
    start: new Date(2024, 10, 11),   
    end: new Date(2024, 11, 10) 
  });

  const panels = useMemo(() => ({
    'Pendentes': <PendingPanel />,
    'Aprovados': <ApprovedPanel period={period} setPeriod={setPeriod} />
  }), [period, setPeriod]);


  const panelState = useState('Aprovados');
  const currentPanel = panelState[0]

  function promptLogin(){
    const acessToken = sessionStorage.getItem("cadastro-alibras-token");

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
    <Sidebar panelState={panelState}/>
    <motion.div
        key={currentPanel}  
        initial={{ opacity: 0, }} 
        animate={{ opacity: 1,}}    
        exit={{ opacity: 0,}}    
        transition={{ duration: 0.5 }}     
      className="w-full max-h-screen overflow-auto transition-all">
       {panels[currentPanel]}
    </motion.div>
  </>)
}

export default Home
