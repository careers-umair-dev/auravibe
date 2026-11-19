import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

interface SupportTopicContent {
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string }>;
}

const TOPICS: Record<string, SupportTopicContent> = {
  faqs: {
    title: 'Frequently Asked Questions',
    subtitle: 'Answers to common questions about AURAVIBE wireless audio hardware and ordering.',
    sections: [
      {
        heading: 'Do AURAVIBE headphones and earbuds support multipoint Bluetooth?',
        body: 'Yes. Wireless Earbuds Pro, Premium Wireless Headphones, and Reference Silver Headphones support Bluetooth 5.4 multipoint pairing so you can stay connected to two devices simultaneously.',
      },
      {
        heading: 'How fast do wireless chargers deliver power?',
        body: 'The MagPad 15W Wireless Charger is Qi2-certified for up to 15W fast wireless charging on compatible smartphones and 5W trickle charging for wireless earbud cases.',
      },
      {
        heading: 'What payment methods are accepted at checkout?',
        body: 'This storefront currently supports Cash on Delivery (COD) with full itemized order verification before dispatch.',
      },
    ],
  },
  shipping: {
    title: 'Shipping Information',
    subtitle: 'Standard delivery thresholds, dispatch timelines, and order tracking.',
    sections: [
      {
        heading: 'Complimentary Standard Shipping',
        body: 'Orders with a subtotal of $150.00 or more qualify automatically for free standard delivery. Orders under $150.00 carry a flat $12.00 shipping fee.',
      },
      {
        heading: 'Dispatch & Delivery Windows',
        body: 'In-stock products are packed and dispatched within 1–2 business days. Typical courier transit ranges from 2–5 business days depending on destination.',
      },
    ],
  },
  returns: {
    title: 'Returns & Refunds',
    subtitle: '30-day straightforward returns on eligible hardware.',
    sections: [
      {
        heading: '30-Day Trial Window',
        body: 'If your AURAVIBE headphones, speaker, or charging accessory is not the right fit, you may request a return within 30 days of delivery in original condition with included cables and packaging.',
      },
      {
        heading: 'How Refunds Are Issued',
        body: 'Once returned items are inspected at our fulfillment center, refunds are processed promptly according to your original Cash on Delivery or settlement preference.',
      },
    ],
  },
  warranty: {
    title: 'Warranty Information',
    subtitle: '1-year limited hardware coverage included with every AURAVIBE product.',
    sections: [
      {
        heading: 'What Is Covered',
        body: 'Every AURAVIBE audio and power product includes a 1-year limited warranty covering manufacturing defects in acoustic drivers, battery cells, buttons, and charging circuitry.',
      },
      {
        heading: 'Normal Wear & Tear',
        body: 'Consumable parts such as silicone ear tips and cosmetic scratches from daily use are excluded from warranty replacement, though replacement ear pads and tips remain available.',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How AURAVIBE storefront data is handled locally.',
    sections: [
      {
        heading: 'Local Browser Storage',
        body: 'Shopping bag items, saved wishlist favorites, and order confirmation summaries are stored locally in your browser via localStorage so your cart persists cleanly between refreshes.',
      },
      {
        heading: 'Contact Inquiries',
        body: 'Details entered into checkout or contact forms are used strictly to display and validate your order summary or support request.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    subtitle: 'General storefront terms for browsing and placing orders.',
    sections: [
      {
        heading: 'Pricing & Availability',
        body: 'All product prices are listed in USD. Stock availability is displayed clearly on product cards and product detail pages prior to checkout.',
      },
      {
        heading: 'Order Confirmation',
        body: 'Upon confirming a Cash on Delivery order, a unique reference number and itemized receipt are generated immediately for your records.',
      },
    ],
  },
};

export function SupportPage() {
  const { topic = 'faqs' } = useParams<{ topic: string }>();
  const content = TOPICS[topic] || TOPICS.faqs;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#747583] hover:text-[#7138D4]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Storefront
        </Link>

        <h1 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
          {content.title}
        </h1>
        <p className="mt-2 text-sm sm:text-[15px] text-[#747583]">{content.subtitle}</p>

        <div className="mt-8 space-y-5">
          {content.sections.map((sec) => (
            <section
              key={sec.heading}
              className="rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-6 sm:p-7"
            >
              <h2 className="font-display text-lg font-bold text-[#171923]">{sec.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#747583]">{sec.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
