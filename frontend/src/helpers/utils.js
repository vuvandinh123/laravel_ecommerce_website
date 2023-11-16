export function calculateTimeDifference(targetTimeString) {
    const targetTime = new Date(targetTimeString);
    const currentTime = new Date();
    const timeDifference = currentTime - targetTime;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);
    return {
      hours: hoursDifference,
      minutes: minutesDifference,
      seconds: secondsDifference
    };
  }
  