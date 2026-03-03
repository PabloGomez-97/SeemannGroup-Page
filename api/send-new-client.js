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
    const formData = req.body;

    // Validar campos obligatorios
    const requiredFields = [
      'rut', 'razonSocial', 'representanteLegal', 'rutRepresentante', 'giro',
      'direccionComercial', 'comunaComercial', 'ciudadComercial',
      'nombreResponsableContabilidad', 'cargoContabilidad', 'emailContabilidad',
      'fonoContabilidad', 'faxContabilidad', 'comexExportaciones', 'cargoComex',
      'gerenteComercial', 'emailGerente', 'fonoGerente', 'faxGerente',
      'nombreSolicitante', 'celularSolicitante'
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos',
        missingFields 
      });
    }

    // 1. GUARDAR EN GOOGLE SHEETS (Nueva hoja "Nuevos Clientes")
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
        
        // Preparar datos para Google Sheets
        const sheetData = [
          timestamp,
          formData.rut,
          formData.razonSocial,
          formData.nombreFantasia || 'N/A',
          formData.representanteLegal,
          formData.rutRepresentante,
          formData.giro,
          formData.formaPago || 'N/A',
          formData.plazo || 'N/A',
          formData.direccionComercial,
          formData.comunaComercial,
          formData.ciudadComercial,
          formData.direccionEntregaCarga || 'N/A',
          formData.comunaEntregaCarga || 'N/A',
          formData.ciudadEntregaCarga || 'N/A',
          formData.direccionEntregaDoctos || 'N/A',
          formData.comunaEntregaDoctos || 'N/A',
          formData.ciudadEntregaDoctos || 'N/A',
          formData.nombreResponsableContabilidad,
          formData.cargoContabilidad,
          formData.emailContabilidad,
          formData.celularContabilidad || 'N/A',
          formData.fonoContabilidad,
          formData.faxContabilidad,
          formData.comexExportaciones,
          formData.cargoComex,
          formData.gerenteComercial,
          formData.emailGerente,
          formData.fonoGerente,
          formData.faxGerente,
          formData.nombreSolicitante,
          formData.fechaSolicitud || 'N/A',
          formData.celularSolicitante
        ];
        
        // Usar la hoja "NuevosClientes" (o puedes usar el mismo sheet con diferente rango)
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/NuevosClientes!A:AG:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              values: [sheetData],
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
      
      // Email HTML para el cliente
      const clientEmailHTML = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #bd2121 0%, #8b1515 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">SEEMANN GROUP</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Confirmación de Registro</p>
          </div>
          
          <div style="background: white; padding: 30px 20px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Estimado/a <strong>${formData.nombreSolicitante}</strong>,
            </p>
            <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 25px;">
              Gracias por completar el formulario de <strong>Nuevos Clientes</strong>. Hemos recibido correctamente su información y la estamos procesando.
            </p>
            
            <div style="background: #f8f9fa; border-left: 4px solid #bd2121; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <h3 style="margin: 0 0 15px 0; color: #bd2121; font-size: 18px;">Resumen de su Registro</h3>
              <table style="width: 100%; font-size: 14px;">
                <tr><td style="padding: 6px 0; color: #666;"><strong>Empresa:</strong></td><td style="padding: 6px 0;">${formData.razonSocial}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;"><strong>RUT:</strong></td><td style="padding: 6px 0;">${formData.rut}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;"><strong>Representante Legal:</strong></td><td style="padding: 6px 0;">${formData.representanteLegal}</td></tr>
                <tr><td style="padding: 6px 0; color: #666;"><strong>Email Contabilidad:</strong></td><td style="padding: 6px 0;">${formData.emailContabilidad}</td></tr>
              </table>
            </div>
            
            <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 25px 0;">
              Nuestro equipo de <strong>Finanzas</strong> revisará su información y se pondrá en contacto con usted a la brevedad para continuar con el proceso de alta como cliente.
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 4px; margin: 25px 0;">
              <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>⏰ Tiempo de respuesta:</strong> Recibirá una respuesta dentro de las próximas 24-48 horas hábiles.
              </p>
            </div>
            
            <p style="font-size: 15px; color: #555; margin-top: 30px;">
              Saludos cordiales,<br>
              <strong style="color: #bd2121;">Equipo Seemann Group</strong><br>
              <span style="font-size: 13px; color: #888;">Soluciones Logísticas Internacionales</span>
            </p>
          </div>
          
          <div style="background: #343a40; color: #adb5bd; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0 0 10px 0;">SEEMANN GROUP | 35+ años moviendo confianza</p>
            <p style="margin: 0;">📞 +56 2 2604 8386 | 📧 contacto@seemanngroup.com</p>
          </div>
        </div>
      `;

      // Enviar email al cliente (email de contabilidad)
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'Seemann Group', email: 'pablotrax03@gmail.com' },
            to: [{ 
              email: formData.emailContabilidad, 
              name: formData.nombreResponsableContabilidad 
            }],
            subject: 'Confirmación de Registro - Nuevos Clientes Seemann Group',
            htmlContent: clientEmailHTML,
          }),
        });
      } catch (err) {
        console.error('Error email cliente:', err.message);
      }

      // Email detallado para el equipo de Seemann
      const teamEmailHTML = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; color: #333;">
          <div style="background: linear-gradient(135deg, #bd2121 0%, #8b1515 100%); color: white; padding: 30px 20px;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 700;">🆕 NUEVO CLIENTE REGISTRADO</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.95;">Formulario Web - Nuevos Clientes</p>
          </div>
          
          <div style="padding: 25px 20px; background: white;">
            
            <!-- DATOS PRINCIPALES -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #bd2121; font-size: 20px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #bd2121;">
                📋 Datos Principales
              </h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background: #f8f9fa;"><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">RUT</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.rut}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">Razón Social</td><td style="padding: 10px; border: 1px solid #dee2e6;"><strong>${formData.razonSocial}</strong></td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">Nombre Fantasía</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.nombreFantasia || 'N/A'}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">Representante Legal</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.representanteLegal}</td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">RUT Representante</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.rutRepresentante}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">Giro</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.giro}</td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">Forma de Pago</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.formaPago || 'N/A'}</td></tr>
                <tr><td style="padding: 10px; border: 1px solid #dee2e6; font-weight: 600;">Plazo</td><td style="padding: 10px; border: 1px solid #dee2e6;">${formData.plazo || 'N/A'}</td></tr>
              </table>
            </div>

            <!-- DIRECCIONES -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #bd2121; font-size: 20px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #bd2121;">
                📍 Direcciones
              </h2>
              
              <h3 style="font-size: 16px; color: #495057; margin: 15px 0 10px 0;">Dirección Comercial</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #555;">
                <strong>${formData.direccionComercial}</strong><br>
                ${formData.comunaComercial}, ${formData.ciudadComercial}
              </p>
              
              <h3 style="font-size: 16px; color: #495057; margin: 15px 0 10px 0;">Entrega de Carga</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #555;">
                ${formData.direccionEntregaCarga || 'N/A'}<br>
                ${formData.comunaEntregaCarga || 'N/A'}, ${formData.ciudadEntregaCarga || 'N/A'}
              </p>
              
              <h3 style="font-size: 16px; color: #495057; margin: 15px 0 10px 0;">Entrega de Documentos</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #555;">
                ${formData.direccionEntregaDoctos || 'N/A'}<br>
                ${formData.comunaEntregaDoctos || 'N/A'}, ${formData.ciudadEntregaDoctos || 'N/A'}
              </p>
            </div>

            <!-- CONTABILIDAD -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #bd2121; font-size: 20px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #bd2121;">
                💼 Contabilidad y Contactos
              </h2>
              
              <h3 style="font-size: 16px; color: #495057; margin: 15px 0 10px 0;">Responsable de Contabilidad</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Nombre</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.nombreResponsableContabilidad}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Cargo</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.cargoContabilidad}</td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Email</td><td style="padding: 8px; border: 1px solid #dee2e6;"><a href="mailto:${formData.emailContabilidad}" style="color: #bd2121;">${formData.emailContabilidad}</a></td></tr>
                <tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Celular</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.celularContabilidad || 'N/A'}</td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Teléfono</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.fonoContabilidad}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Fax</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.faxContabilidad}</td></tr>
              </table>
              
              <h3 style="font-size: 16px; color: #495057; margin: 15px 0 10px 0;">Comex Exportaciones</h3>
              <p style="margin: 5px 0; font-size: 14px; color: #555;">
                <strong>${formData.comexExportaciones}</strong> - ${formData.cargoComex}
              </p>
              
              <h3 style="font-size: 16px; color: #495057; margin: 15px 0 10px 0;">Gerente Comercial</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Nombre</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.gerenteComercial}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Email</td><td style="padding: 8px; border: 1px solid #dee2e6;"><a href="mailto:${formData.emailGerente}" style="color: #bd2121;">${formData.emailGerente}</a></td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Teléfono</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.fonoGerente}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Fax</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.faxGerente}</td></tr>
              </table>
            </div>

            <!-- DATOS SOLICITANTE -->
            <div style="margin-bottom: 20px;">
              <h2 style="color: #bd2121; font-size: 20px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #bd2121;">
                👤 Datos del Solicitante
              </h2>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Nombre</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.nombreSolicitante}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Fecha Solicitud</td><td style="padding: 8px; border: 1px solid #dee2e6;">${formData.fechaSolicitud || 'N/A'}</td></tr>
                <tr style="background: #f8f9fa;"><td style="padding: 8px; border: 1px solid #dee2e6; font-weight: 600;">Celular</td><td style="padding: 8px; border: 1px solid #dee2e6;"><a href="tel:${formData.celularSolicitante}" style="color: #bd2121;">${formData.celularSolicitante}</a></td></tr>
              </table>
            </div>

            <!-- METADATA -->
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #6c757d;">
              <p style="margin: 0; font-size: 13px; color: #6c757d;">
                <strong>📅 Fecha de Registro:</strong> ${new Date().toLocaleString('es-CL', { 
                  timeZone: 'America/Santiago',
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}<br>
                <strong>🌐 Origen:</strong> Formulario Web - Nuevos Clientes
              </p>
            </div>
          </div>
          
          <div style="background: #343a40; color: #adb5bd; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Este mensaje fue generado automáticamente desde el formulario de Nuevos Clientes</p>
          </div>
        </div>
      `;

      // Enviar email al equipo de Seemann
      try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'Formulario Nuevos Clientes', email: 'pablotrax03@gmail.com' },
            to: [{ email: 'pablotrax03@gmail.com', name: 'Equipo Seemann - Finanzas' }],
            subject: `🆕 Nuevo Cliente Registrado: ${formData.razonSocial}`,
            htmlContent: teamEmailHTML,
          }),
        });
      } catch (err) {
        console.error('Error email equipo:', err.message);
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Formulario de nuevo cliente enviado exitosamente'
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
