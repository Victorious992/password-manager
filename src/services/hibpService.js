// src/services/hibpService.js

export async function checkPasswordPwned(password) {
  if (!password) return 0;

  const sha1 = await sha1Hash(password);
  const prefix = sha1.slice(0, 5);
  const suffix = sha1.slice(5).toUpperCase();

  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const text = await res.text();

    // Each line is "HASH_SUFFIX:COUNT"
    const lines = text.split('\n');
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return parseInt(count, 10);
      }
    }
    return 0;
  } catch (error) {
    console.error("HIBP API error:", error);
    return 0; // Fail silently on errors
  }
}

// Helper to SHA1 hash the password in the browser
async function sha1Hash(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();
  return hashHex;
}
