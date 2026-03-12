export const generateXAxisLabels = (selectedPeriod, data) => {
    if (!data || data.length === 0) return [];
    
    switch(selectedPeriod) {
      case "24h":
        return data.map((_, index) => `${index + 1}ч`);
        
      case "week":
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        return data.map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (data.length - 1 - index));
          return days[date.getDay() === 0 ? 6 : date.getDay() - 1];
        });
        
      case "month":
        return data.map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (data.length - 1 - index));
          return date.getDate().toString();
        });
        
      case "all":
      default:
        if (data.length > 60) {
          return data.map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (data.length - 1 - index));
            return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
          }).filter((_, i) => i % 7 === 0);
        } else {
          return data.map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() - (data.length - 1 - index));
            return date.getDate().toString();
          });
        }
    }
  };