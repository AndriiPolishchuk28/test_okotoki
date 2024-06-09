export const fetсhCoins = async () => {
  try {
    const response = fetch('https://api-eu.okotoki.com/coins');
    return (await response).json();
  } catch (error) {
    console.log(error);
  }
};
