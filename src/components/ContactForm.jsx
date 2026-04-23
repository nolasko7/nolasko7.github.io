import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

const TEXTS = {
  es: {
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre completo',
    emailLabel: 'Email',
    emailPlaceholder: 'tu@email.com',
    messageLabel: 'Mensaje',
    messagePlaceholder: '¿En qué puedo ayudarte? Contame sobre tu proyecto...',
    submit: 'Enviar_Mensaje',
    submitting: 'Enviando...',
    success: '¡Mensaje enviado! Te respondo pronto.',
    successSub: 'Suelo responder en menos de 24 horas.',
    sendAnother: 'Enviar otro',
    error: 'Algo falló al enviar. Probá de nuevo o contactame directo.',
    spam: 'Has enviado un mensaje recientemente. Por favor espera unas horas.',
    captcha: 'Por favor, completa el captcha.',
  },
  en: {
    nameLabel: 'Name',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'How can I help? Tell me about your project...',
    submit: 'Send_Message',
    submitting: 'Sending...',
    success: 'Message sent! I\'ll get back to you soon.',
    successSub: 'I usually reply within 24 hours.',
    sendAnother: 'Send another',
    error: 'Something went wrong. Try again or reach out directly.',
    spam: 'You sent a message recently. Please wait a few hours.',
    captcha: 'Please complete the captcha.',
  },
};

const COOLDOWN_TIME = 60 * 60 * 1000; // 1 hour

export default function ContactForm({ language = 'es' }) {
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | spam | captcha
  const t = TEXTS[language] || TEXTS.es;

  const checkRateLimit = () => {
    const lastSent = localStorage.getItem('last_email_sent');
    if (lastSent) {
      const timeSinceLastSent = Date.now() - parseInt(lastSent, 10);
      if (timeSinceLastSent < COOLDOWN_TIME) {
        return false; // Rate limited
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check for simple bots
    const formData = new FormData(formRef.current);
    if (formData.get('_honey')) {
      setStatus('success');
      formRef.current.reset();
      return;
    }

    // Rate limiting for human spam
    if (!checkRateLimit()) {
      setStatus('spam');
      return;
    }

    setStatus('loading');
    try {
      // reCAPTCHA v2 Invisible: Execute it and wait for the token
      if (import.meta.env.VITE_CAPTCHA_SITE_KEY) {
        const token = await recaptchaRef.current.executeAsync();
        if (!token) {
          setStatus('captcha');
          return;
        }
      }

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      localStorage.setItem('last_email_sent', Date.now().toString());
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      console.error('[Error enviando mensaje]', err);
      setStatus('error');
    }
  };

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-[#f7f5f0] font-medium">{t.success}</p>
        <p className="text-stone-400 text-sm">{t.successSub}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-1 text-xs font-mono uppercase tracking-widest text-stone-500 hover:text-green-500 transition-colors"
        >
          [ {t.sendAnother} ]
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="_honey" tabIndex="-1" autoComplete="off" />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-400">{t.nameLabel}</label>
        <input
          type="text"
          name="from_name"
          required
          placeholder={t.namePlaceholder}
          className="bg-stone-900/50 border border-stone-800 focus:border-green-500 rounded-lg px-4 py-3 text-[#f7f5f0] placeholder-stone-600 text-sm outline-none transition-colors duration-200 focus:bg-stone-900/80"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-400">{t.emailLabel}</label>
        <input
          type="email"
          name="reply_to"
          required
          placeholder={t.emailPlaceholder}
          className="bg-stone-900/50 border border-stone-800 focus:border-green-500 rounded-lg px-4 py-3 text-[#f7f5f0] placeholder-stone-600 text-sm outline-none transition-colors duration-200 focus:bg-stone-900/80"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-400">{t.messageLabel}</label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t.messagePlaceholder}
          className="bg-stone-900/50 border border-stone-800 focus:border-green-500 rounded-lg px-4 py-3 text-[#f7f5f0] placeholder-stone-600 text-sm outline-none transition-colors duration-200 focus:bg-stone-900/80 resize-none"
        />
      </div>

      {/* Invisible reCAPTCHA v2 */}
      {import.meta.env.VITE_CAPTCHA_SITE_KEY && (
        <div className="flex justify-center my-2 scale-90 origin-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY}
            theme="dark"
            badge="inline"
          />
        </div>
      )}

      {/* Error / Spam / Captcha messages */}
      {(status === 'error' || status === 'spam' || status === 'captcha') && (
        <p className="text-amber-400 text-xs font-mono border border-amber-900/50 bg-amber-950/30 rounded-lg px-3 py-2">
          ⚠ {t[status]}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="group mt-1 w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:bg-stone-700 disabled:cursor-not-allowed text-[#141410] disabled:text-stone-500 font-mono text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t.submitting}
          </>
        ) : (
          <>
            {t.submit}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
