export const getDatesByPeriod = (selectedPeriod) => {
    const today = new Date();
    const fromDate = new Date(today);

    switch (selectedPeriod) {
        case "24h":
            fromDate.setDate(today.getDate() - 1);
            break;
        case "week":
            fromDate.setDate(today.getDate() - 7);
            break;
        case "month":
            fromDate.setDate(today.getDate() - 30);
            break;
        case "all":
        default:
            fromDate.setDate(today.getDate() - 31);
            break;
    }

    return {
        dateFrom: fromDate.toISOString().split('T')[0],
        dateTo: today.toISOString().split('T')[0]
    };
};
 