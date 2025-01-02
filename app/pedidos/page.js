'use client'

import { useEffect, useState } from "react"
import { PeriodNavigator } from "../../components/PeriodNavigator"
import { OrdersTable } from "../../components/OrdersTable"
import { DashboardSidebar } from "../../components/DashboardSidebar"
import { PendingPanel } from "../../components/PendingPanel"
import { Divider } from "antd"
import { ApprovedPanel } from "../../components/ApprovedPanel"

function Home() {
  const [period, setPeriod] = useState({
    start: new Date(2024, 10, 11),   
    end: new Date(2024, 11, 10) 
  });

  //MEMORIZAR ISSO react.MEMO
  const panels = {
    'Pendentes': <PendingPanel/>,
    'Aprovados': <ApprovedPanel period={period} setPeriod={setPeriod}/>
  }

  const panelState = useState('Pendentes');
  const currentPanel = panelState[0]

  return (<>
    <DashboardSidebar panelState={panelState}/>
    <main className="w-screen h-screen">
       {panels[currentPanel]}
    </main>
  </>)
}

export default Home
