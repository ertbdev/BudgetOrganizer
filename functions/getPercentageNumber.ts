export const getPercentageNumber = (value: number, million?: boolean) => {
  return (value * 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
