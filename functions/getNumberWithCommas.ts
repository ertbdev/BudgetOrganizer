export const getNumberWithCommas = (value: number, million?: boolean) => {
  if (million) {
    return (
      value
        .toString()
        .slice(0, -6)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'M'
    );
  }
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
