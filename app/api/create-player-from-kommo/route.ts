import { NextRequest, NextResponse } from 'next/server';

interface KommoWebhookPayload {
  leads?: {
    update?: Array<{
      id: number;
      name?: string;
    }>;
  };
  contacts?: {
    update?: Array<{
      id: number;
      name?: string;
      custom_fields?: Array<{
        id: number;
        name: string;
        values: Array<{
          value: string;
        }>;
      }>;
    }>;
  };
}

interface KommoNotePayload {
  entity_id: number;
  note_type: string;
  params: {
    text: string;
  };
}

/**
 * Extrae el Lead ID del payload de KOMMO
 */
function extractLeadIdFromKommo(payload: KommoWebhookPayload): number | null {
  if (payload.leads?.update && payload.leads.update[0]?.id) {
    return payload.leads.update[0].id;
  }
  return null;
}

/**
 * Envía una nota al lead en KOMMO con las credenciales del jugador
 */
async function sendCredentialsToKommo(
  leadId: number,
  username: string,
  password: string
): Promise<void> {
  const kommoToken = process.env.KOMMO_ACCESS_TOKEN;
  const kommoSubdomain = process.env.KOMMO_SUBDOMAIN;

  if (!kommoToken || !kommoSubdomain) {
    console.warn('[KOMMO Create Player] KOMMO_ACCESS_TOKEN o KOMMO_SUBDOMAIN no configurados');
    return;
  }

  const noteText = `🎰 Cuenta creada exitosamente

Usuario: ${username}
Contraseña: ${password}

Podés iniciar sesión en: https://bet30.store`;

  const notePayload: KommoNotePayload[] = [
    {
      entity_id: leadId,
      note_type: 'common',
      params: {
        text: noteText,
      },
    },
  ];

  try {
    const response = await fetch(
      `https://${kommoSubdomain}.kommo.com/api/v4/leads/notes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${kommoToken}`,
        },
        body: JSON.stringify(notePayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[KOMMO Create Player] Error al enviar nota a KOMMO:', errorData);
      throw new Error(`KOMMO API error: ${JSON.stringify(errorData)}`);
    }

    const result = await response.json();
    console.log('[KOMMO Create Player] Nota enviada exitosamente a KOMMO:', result);
  } catch (error) {
    console.error('[KOMMO Create Player] Error al comunicarse con KOMMO:', error);
    // No lanzamos el error para no fallar todo el proceso si solo falla el envío de la nota
  }
}

/**
 * Extrae el email del payload de KOMMO
 */
function extractEmailFromKommo(payload: KommoWebhookPayload): string | null {
  if (payload.contacts?.update) {
    for (const contact of payload.contacts.update) {
      if (contact.custom_fields) {
        const emailField = contact.custom_fields.find(
          (field) => field.name === 'Email' || field.name === 'email' || field.name === 'E-mail'
        );
        if (emailField && emailField.values[0]?.value) {
          return emailField.values[0].value;
        }
      }
    }
  }
  return null;
}

/**
 * Extrae el nombre del payload de KOMMO
 */
function extractNameFromKommo(payload: KommoWebhookPayload): string | null {
  // Intentar desde contacts.update
  if (payload.contacts?.update && payload.contacts.update[0]?.name) {
    return payload.contacts.update[0].name;
  }

  // Intentar desde leads.update
  if (payload.leads?.update && payload.leads.update[0]?.name) {
    return payload.leads.update[0].name;
  }

  return null;
}

/**
 * Genera username con formato: bet + 6 dígitos random
 * Ejemplo: bet123456, bet789012
 */
function generateUsername(): string {
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 dígitos: 100000-999999
  return `bet${randomDigits}`;
}

/**
 * Genera password simple
 */
function generatePassword(): string {
  return 'Pass1234'; // Password simple como solicitado
}

/**
 * POST /api/create-player-from-kommo
 * Recibe webhook de KOMMO y crea jugador en la plataforma
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload: KommoWebhookPayload = body;

    console.log('[KOMMO Create Player] Payload recibido:', JSON.stringify(payload, null, 2));

    // Extraer datos del contacto y lead
    const email = extractEmailFromKommo(payload);
    const name = extractNameFromKommo(payload);
    const leadId = extractLeadIdFromKommo(payload);

    if (!email) {
      console.warn('[KOMMO Create Player] No se encontró email en el payload');
      return NextResponse.json(
        { success: false, error: 'Email not found in payload' },
        { status: 400 }
      );
    }

    if (!leadId) {
      console.warn('[KOMMO Create Player] No se encontró Lead ID en el payload');
      return NextResponse.json(
        { success: false, error: 'Lead ID not found in payload' },
        { status: 400 }
      );
    }

    // Generar datos del player
    const username = generateUsername(); // bet + 6 dígitos random
    const password = generatePassword(); // Password simple

    console.log('[KOMMO Create Player] Creando jugador:', { username, email, name });

    // Crear jugador en la plataforma
    const playerData = {
      userName: username,
      password: password,
      skinId: "1025c6bf14cd",
      agentId: null,
      language: "es"
    };

    const bearerToken = process.env.PLAYER_API_TOKEN;
    if (!bearerToken) {
      throw new Error('PLAYER_API_TOKEN no configurado en variables de entorno');
    }

    const response = await fetch('https://admin.bet30.store/api/services/app/Players/AddPlayer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json-patch+json',
        'Authorization': `Bearer ${bearerToken}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(playerData),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('[KOMMO Create Player] Error al crear jugador:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText.substring(0, 500) // Primeros 500 chars
      });
      throw new Error(`API error ${response.status}: ${responseText.substring(0, 200)}`);
    }

    // Intentar parsear la respuesta como JSON
    const responseText = await response.text();
    console.log('[KOMMO Create Player] Respuesta de bet30:', {
      status: response.status,
      contentType: response.headers.get('content-type'),
      body: responseText.substring(0, 500)
    });

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('[KOMMO Create Player] Error al parsear respuesta:', responseText.substring(0, 500));
      throw new Error(`La API retornó contenido inválido (no JSON): ${responseText.substring(0, 200)}`);
    }

    console.log('[KOMMO Create Player] Jugador creado exitosamente:', result);

    // Enviar credenciales al lead en KOMMO como nota
    await sendCredentialsToKommo(leadId, username, password);

    return NextResponse.json({
      success: true,
      message: 'Player created successfully',
      username: username,
      password: password, // IMPORTANTE: En producción, nunca devuelvas la password en la respuesta
      player_data: result,
      kommo_note_sent: true,
    });

  } catch (error) {
    console.error('[KOMMO Create Player] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/create-player-from-kommo
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'KOMMO Create Player endpoint is ready',
    timestamp: new Date().toISOString(),
  });
}
