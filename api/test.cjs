module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    return res.status(200).json({ 
      success: true, 
      message: 'Test endpoint working',
      body: req.body,
      env: {
        hasBrevo: !!process.env.BREVO_API_KEY,
        hasSheetId: !!process.env.GOOGLE_SHEET_ID,
        hasCredentials: !!process.env.GOOGLE_CREDENTIALS
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};
