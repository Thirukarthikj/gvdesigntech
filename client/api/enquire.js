export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(200).json({ status: 'ok', message: 'GV DESIGN TECH API Endpoint' });
  }

  try {
    const body = req.body || {};
    const { fullName, mobileNumber, email, course, preferredMode, message, website } = body;

    // Honeypot spam check
    if (website) {
      return res.status(200).json({ success: true, message: 'Enquiry received.' });
    }

    const cleanedMobile = (mobileNumber || '').toString().trim().replace(/^(\+91|0)/, '').replace(/\s+/g, '');
    const refId = `GVD-${Date.now().toString().slice(-6)}`;

    const whatsappLines = [
      `*NEW ADMISSION ENQUIRY — GV DESIGN TECH*`,
      ``,
      `*Student Name:* ${fullName ? fullName.trim() : 'Candidate'}`,
      `*Mobile Number:* +91 ${cleanedMobile}`,
      email && email.trim() ? `*Email:* ${email.trim()}` : null,
      `*Course Selected:* ${course || 'General Technical Enquiry'}`,
      `*Preferred Schedule:* ${preferredMode || '100% Live Interactive Online'}`,
      message && message.trim() ? `*Student Note:* ${message.trim()}` : null,
      `*Enquiry Ref ID:* ${refId}`,
      ``,
      `_Transmitted via GV DESIGN TECH Official Website (Oddanchatram)_`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/919655364707?text=${encodeURIComponent(whatsappLines)}`;

    return res.status(200).json({
      success: true,
      enquiryId: refId,
      message: 'Enquiry registered successfully with GV DESIGN TECH admissions.',
      whatsappUrl
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      enquiryId: `GVD-${Date.now().toString().slice(-6)}`,
      message: 'Enquiry processed.',
      whatsappUrl: 'https://wa.me/919655364707'
    });
  }
}

