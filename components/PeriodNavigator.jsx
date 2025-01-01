import React, { useState } from 'react';

export function PeriodNavigator() {
  const [period, setPeriod] = useState({
    start: new Date(2024, 10, 11),   
    end: new Date(2024, 11, 10)      
  });

  
  const changePeriod = (direction) => {
    const newStart = new Date(period.start);
    if (direction === 'previous') {
      newStart.setMonth(newStart.getMonth() - 1);
    } else {
      newStart.setMonth(newStart.getMonth() + 1);
    }
    const newEnd = new Date(newStart);
    newEnd.setDate(10);

    setPeriod({
      start: newStart,
      end: newEnd
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className='w-full'>
      <button onClick={() => changePeriod('previous')}>{"<<"}</button>
      <span>{`Period: ${formatDate(period.start)} to ${formatDate(period.end)}`}</span>
      <button onClick={() => changePeriod('next')}>{">>"}</button>
    </div>
  );
}