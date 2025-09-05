export default function useUtils() {

  function randomAlphanumeric(length = 4): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    
    let result = '';
    
    // Add 2 letters
    for (let i = 0; i < 2; i++) {
      result += letters[Math.floor(Math.random() * letters.length)];
    }
    
    // Add 2 numbers
    for (let i = 0; i < 2; i++) {
      result += numbers[Math.floor(Math.random() * numbers.length)];
    }
    
    // Shuffle the result to avoid predictable letter-number pattern
    return result.split('').sort(() => Math.random() - 0.5).join('');
  }

  return {
    randomAlphanumeric
  }
}