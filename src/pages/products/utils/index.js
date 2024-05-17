// utils.js
export const generateProductId = (data) => {
    const maxId = Math.max(...data.map((item) => parseInt(item.product_id)));
    return maxId >= 0 ? maxId + 1 : 1;
  };
  
  export const validateSalesCount = (count) => {
    const salesCount = parseInt(count);
    return !isNaN(salesCount) && salesCount >= 1 && salesCount <= 5000;
  };
  