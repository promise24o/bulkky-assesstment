export const formatCurrency = (amount) => {
  return `₦${amount.toLocaleString('en-NG', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};
