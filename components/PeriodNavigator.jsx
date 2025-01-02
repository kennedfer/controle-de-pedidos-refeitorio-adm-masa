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
  
    console.log(period);
  
    setPeriod({
      start: newStart,
      end: newEnd
    });
  };
  

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className='w-full flex justify-around border'>
      <button onClick={() => changePeriod('previous')}>{"<<"}</button>
      <span>{`Periodo: ${formatDate(period.start)} to ${formatDate(period.end)}`}</span>
      <button onClick={() => changePeriod('next')}>{">>"}</button>
    </div>
  );
}