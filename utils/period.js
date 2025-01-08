export const calculateCurrentPeriod = () => {
    const today = new Date();
    let start = new Date(today.getFullYear(), today.getMonth(), 11);

    if (today.getDate() < 11) {
        start.setMonth(start.getMonth() - 1);
    }

    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    end.setDate(10);

    return { start, end };
};
