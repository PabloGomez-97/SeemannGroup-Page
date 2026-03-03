import { GoogleAuth } from 'google-auth-library';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { nombre, telefono, correo, cargo } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // 1. GUARDAR EN GOOGLE SHEETS
    if (process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_CREDENTIALS) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
        
        const auth = new GoogleAuth({
          credentials: credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();
        const timestamp = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
        
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/Respuestas!A:E:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [[timestamp, nombre, telefono, correo || 'No proporcionado', cargo || 'No proporcionado']],
            }),
          }
        );

        if (!response.ok) {
          console.error('Error Google Sheets:', await response.text());
        }
      } catch (sheetError) {
        console.error('Error Google Sheets:', sheetError.message);
      }
    }

    // 2. ENVIAR EMAILS CON BREVO
    if (process.env.BREVO_API_KEY) {
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="border-bottom: 3px solid #bd2121; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #bd2121;">SEEMANN GROUP</h2>
            <p style="margin: 5px 0 0 0; color: #666;">Confirmación de Contacto</p>
          </div>
          <p>Estimado/a <strong>${nombre}</strong>,</p>
          <p>Gracias por contactarnos. Hemos recibido su información:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Nombre:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${nombre}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Teléfono:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${telefono}</td></tr>
            ${correo ? `<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${correo}</td></tr>` : ''}
            ${cargo ? `<tr><td style="padding: 8px; border: 1px solid #ddd; background: #f9f9f9;"><strong>Cargo:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${cargo}</td></tr>` : ''}
          </table>
          <p>Nuestro equipo se pondrá en contacto con usted a la brevedad.</p>
          <p>Saludos cordiales,<br><strong>Equipo Seemann Group</strong></p>
        </div>
      `;

      // Email al cliente
      if (correo) {
        try {
          await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': process.env.BREVO_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sender: { name: 'Seemann Group', email: 'pablotrax03@gmail.com' },
              to: [{ email: correo, name: nombre }],
              subject: 'Confirmación de Contacto - Seemann Group',
              htmlContent: emailHTML,
            }),
          });
        } catch (err) {
          console.error('Error email cliente:', err.message);
        }
      }

      // Email al equipo (versión mejorada para evitar spam)
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'Seemann Group', email: 'pablotrax03@gmail.com' },
            to: [{ email: 'pablotrax03@gmail.com', name: 'Pablo Piñeiro' }],
            subject: `Nuevo contacto: ${nombre}`,
            htmlContent: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <div style="background: linear-gradient(135deg, #bd2121 0%, #8b1515 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; margin-bottom: 20px;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Nuevo Contacto</h1>
                  <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 14px;">Formulario Web - Seemann Group</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                        <strong style="color: #495057; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Nombre</strong>
                        <span style="color: #212529; font-size: 16px;">${nombre}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                        <strong style="color: #495057; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Teléfono</strong>
                        <a href="tel:${telefono}" style="color: #bd2121; font-size: 16px; text-decoration: none; font-weight: 500;">${telefono}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                        <strong style="color: #495057; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</strong>
                        <span style="color: #212529; font-size: 16px;">${correo || 'No proporcionado'}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <strong style="color: #495057; display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Cargo</strong>
                        <span style="color: #212529; font-size: 16px;">${cargo || 'No proporcionado'}</span>
                      </td>
                    </tr>
                  </table>
                </div>
                
                <div style="background: #e9ecef; padding: 15px; border-radius: 8px; border-left: 4px solid #bd2121;">
                  <p style="margin: 0; font-size: 13px; color: #6c757d; line-height: 1.6;">
                    <strong>Fecha:</strong> ${new Date().toLocaleString('es-CL', { 
                      timeZone: 'America/Santiago',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}<br>
                    Este mensaje fue enviado automáticamente desde el formulario de contacto web.
                  </p>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #dee2e6; text-align: center;">
                  <p style="margin: 0; color: #6c757d; font-size: 12px;">
                    <strong style="color: #bd2121;">SEEMANN GROUP</strong><br>
                    Soluciones Logísticas Internacionales<br>
                    <a href="tel:+56226048386" style="color: #6c757d; text-decoration: none;">+56 2 2604 8386</a>
                  </p>
                </div>
              </div>
            `,
            textContent: `NUEVO CONTACTO - Seemann Group\n\nNombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${correo || 'No proporcionado'}\n\nFecha: ${new Date().toLocaleString('es-CL')}\n\nEste es un mensaje automático del formulario de contacto web.`,
          }),
        });
      } catch (err) {
        console.error('Error email equipo:', err.message);
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Registro completado exitosamente'
    });

  } catch (error) {
    console.error('Error general:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
};
