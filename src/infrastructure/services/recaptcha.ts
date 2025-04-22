
export async function verifyRecaptcha(
  token: string
): Promise<boolean> {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });

  if (!response.ok) {
    throw new Error('Failed to verify reCAPTCHA');
  }

  const data = await response.json();
  return data.success;
}