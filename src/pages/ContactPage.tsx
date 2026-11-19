import { useState } from 'react';
import { CheckCircle2, Clock, Instagram, Mail, MessageSquare, Share2, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const updateField = (key: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: ContactErrors = {};
    if (form.name.trim().length < 2) {
      next.name = 'Please enter your name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (form.subject.trim().length < 3) {
      next.subject = 'Please enter a short subject.';
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please enter at least 10 characters in your message.';
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmittedName(form.name.trim());
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7138D4]">
            Get In Touch
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
            Contact AURAVIBE
          </h1>
          <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-[#747583]">
            Have a question about wireless audio specifications, order fulfillment, or warranty coverage? Send our team a note using the form below.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 rounded-[28px] border border-[#EAEAF0] bg-white p-6 sm:p-8">
            {submittedName ? (
              <div className="py-10 text-center">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F5EF] text-[#16805B]">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold text-[#171923]">
                  Message Received, {submittedName}
                </h2>
                <p className="mt-2 mx-auto max-w-md text-sm text-[#747583]">
                  Thank you for reaching out to AURAVIBE. Your inquiry has been validated and logged in this storefront session.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedName(null)}
                  className="mt-6 rounded-xl bg-[#7138D4] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5425AE]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold text-[#171923]">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Alex Morgan"
                      className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                        errors.name
                          ? 'border-[#C43874] bg-[#FCEAF1]/30'
                          : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#171923]">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="you@example.com"
                      className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                        errors.email
                          ? 'border-[#C43874] bg-[#FCEAF1]/30'
                          : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#171923]">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    placeholder="Product compatibility or order inquiry"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.subject
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#171923]">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Tell us how we can assist you..."
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.message
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-[#7138D4] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information Sidebar */}
          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-lg font-bold text-[#171923]">
                Support Channels
              </h2>

              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0EDFF] text-[#7138D4]">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#171923]">Support Email</p>
                  <p className="text-sm text-[#747583]">support@auravibe.example</p>
                  <p className="mt-0.5 text-xs text-[#747583]">
                    Configurable storefront support address for deployment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF1FF] text-[#4776DF]">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#171923]">Response Window</p>
                  <p className="text-sm text-[#747583]">Monday – Friday, 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F5EF] text-[#16805B]">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-[#171923]">Self-Service Guides</p>
                  <p className="text-sm text-[#747583]">
                    Check{' '}
                    <Link to="/support/faqs" className="font-semibold text-[#7138D4] hover:underline">
                      FAQs
                    </Link>
                    ,{' '}
                    <Link to="/support/shipping" className="font-semibold text-[#7138D4] hover:underline">
                      Shipping
                    </Link>
                    , or{' '}
                    <Link to="/support/warranty" className="font-semibold text-[#7138D4] hover:underline">
                      Warranty
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="border-t border-[#EAEAF0] pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#747583]">
                  Social Channels
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="#top"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Instagram"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EAEAF0] bg-white text-[#747583] hover:border-[#7138D4] hover:text-[#7138D4]"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="#top"
                    onClick={(e) => e.preventDefault()}
                    aria-label="YouTube"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EAEAF0] bg-white text-[#747583] hover:border-[#7138D4] hover:text-[#7138D4]"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                  <a
                    href="#top"
                    onClick={(e) => e.preventDefault()}
                    aria-label="Share"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#EAEAF0] bg-white text-[#747583] hover:border-[#7138D4] hover:text-[#7138D4]"
                  >
                    <Share2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
