"use client";

import { useCallback } from 'react';

interface EventData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | boolean | undefined;
}

// Generar event_id único para deduplicación
function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function useMetaTracking() {
  const trackEvent = useCallback((
    eventName: string,
    customData: EventData = {}
  ) => {
    // Enviar evento via Pixel (client-side)
    if (typeof window !== 'undefined' && window.fbq) {
      // Generar event_id único para evitar duplicados
      const eventId = generateEventId();

      // Enviar con event_id para deduplicación
      window.fbq('track', eventName, customData, { eventID: eventId });

      // Log siempre (incluye URL de origen para debugging)
      console.log(`[Meta Pixel] Evento "${eventName}" enviado desde:`, {
        url: window.location.href,
        hostname: window.location.hostname,
        eventID: eventId,
        data: customData
      });
    }
  }, []);

  // Eventos específicos predefinidos para facilitar el uso
  const trackLead = useCallback((source: string) => {
    // Disparar evento custom ClickWhatsApp1
    trackEvent('ClickWhatsApp1', {
      content_name: 'Solicitud de Usuario WhatsApp',
      content_category: 'Lead Generation',
      content_type: 'whatsapp_click',
      source: source, // 'main_button' o 'secondary_button'
      value: 2.5, // Valor estimado del lead para ROAS (entre $2-3 USD)
      currency: 'USD',
    });
  }, [trackEvent]);

  const trackContact = useCallback((source: string) => {
    trackEvent('Contact', {
      content_name: 'Contacto via WhatsApp',
      content_category: 'Contact',
      source: source,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLead,
    trackContact,
  };
}
