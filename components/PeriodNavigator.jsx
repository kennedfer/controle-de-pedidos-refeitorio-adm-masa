import { Button } from 'antd';
import React, { useState } from 'react';

export function PeriodNavigator({period, setPeriod}) {

  const changePeriod = (direction) => {
    const newStart = new Date(period.start);
    
    // Ajustar o mês conforme a direção
    if (direction === 'previous') {
      newStart.setMonth(newStart.getMonth() - 1); // Decrementa o mês
    } else {
      newStart.setMonth(newStart.getMonth() + 1); // Incrementa o mês
    }
  
    // Configura o novo start para o dia 11
    newStart.setDate(11);
  
    // Agora, cria o newEnd, que será o dia 10 do próximo mês
    const newEnd = new Date(newStart);
    newEnd.setMonth(newStart.getMonth() + 1); // Vai para o mês seguinte
    newEnd.setDate(10); // Dia 10 do próximo mês

    setPeriod({
      start: newStart,
      end: newEnd
    });
  };
  

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className='w-full flex p-2 pb-0 gap-2'>
      <Button size="small" onClick={() => changePeriod('previous')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
        </svg>
      </Button>
      <Button size="small" className='p-2 grow text-xs'>{`Periodo: ${formatDate(period.start)} to ${formatDate(period.end)}`}</Button>
      <Button size="small" onClick={() => changePeriod('next')}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
        </svg>
      </Button>
    </div>
  );
}