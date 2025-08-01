import zxcvbn from 'zxcvbn';

export function generatePassword(length = 12) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

export function analyzeStrength(password) {
  const result = zxcvbn(password);
  return {
    score: result.score,
    feedback: result.feedback.suggestions.join(' ') || '',
  };
}
