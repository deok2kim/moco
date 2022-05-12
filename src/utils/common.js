export const formatNumber = num => {
  if (num === undefined) {
    return 0;
  }
  let result;
  if (typeof num === 'string') {
    result = parseFloat(num);
  }
  return result.toLocaleString('ko-kr');
};
