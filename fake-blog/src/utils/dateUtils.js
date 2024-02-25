export const getRandomDateWithinRange = (lowerThresholdDays, upperThresholdDays) => {
    const currentDate = new Date();
    const lowerDate = new Date(currentDate);
    const upperDate = new Date(currentDate);
  
    lowerDate.setDate(currentDate.getDate() - lowerThresholdDays);
    upperDate.setDate(currentDate.getDate() - upperThresholdDays);
  
    const lowerTime = lowerDate.getTime();
    const upperTime = upperDate.getTime();
  
    const randomTime = lowerTime + Math.random() * (upperTime - lowerTime);
    const randomDate = new Date(randomTime);
  
    return randomDate;
  }
  

  