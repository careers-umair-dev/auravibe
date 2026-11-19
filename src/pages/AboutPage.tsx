import { ArrowRight, AudioWaveform, Compass, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { ABOUT_CRAFT_IMAGE, HERO_IMAGE } from '../data/catalog';

const BRAND_VALUES = [
  {
    icon: AudioWaveform,
    bg: '#F0EDFF',
    color: '#7138D4',
    title: 'Acoustic Honesty',
    description:
      'Every driver and waveguide is voiced for natural warmth, articulate vocals, and clean low-frequency control without harsh exaggeration.',
  },
  {
    icon: Layers,
    bg: '#EAF1FF',
    color: '#4776DF',
    title: 'Tactile Craftsmanship',
    description:
      'We pair CNC-machined anodized aluminum with breathable acoustic textiles and soft-touch polymers engineered for daily durability.',
  },
  {
    icon: Compass,
    bg: '#E4F5EF',
    color: '#16805B',
    title: 'Effortless Portability',
    description:
      'Compact pocket cases, fold-flat headphone yokes, and multi-day battery life mean your listening setup adapts cleanly wherever you work.',
  },
  {
    icon: ShieldCheck,
    bg: '#FCEAF1',
    color: '#C43874',
    title: 'Dependable Ownership',
    description:
      'Transparent warranty protection, replaceable ear cushions, and universal USB-C charging extend the usable life of every device.',
  },
];

export function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-8 sm:pt-12">
        <div className="aura-hero-bg grid grid-cols-1 items-center gap-8 rounded-[28px] border border-[#EAEAF0] p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7138D4]">
              About AURAVIBE
            </p>
            <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#171923] text-balance">
              Sound Designed Around Calm Focus &amp; Everyday Movement.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] sm:text-base leading-relaxed text-[#747583]">
              AURAVIBE builds wireless headphones, studio earbuds, portable speakers, and desktop charging essentials for listeners who value quiet precision over visual clutter.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-[24px] bg-white p-2 shadow-lg">
              <SafeImage
                src={HERO_IMAGE}
                alt="Listener wearing AURAVIBE wireless over-ear headphones"
                loading="eager"
                className="aspect-[4/3] w-full rounded-[18px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7138D4]">
              Our Mission
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#171923]">
              Make Reference-Grade Sound Effortless
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#747583]">
              Great audio gear should disappear the moment music begins. We strip away unnecessary complexity—delivering instant wireless pairing, dependable battery endurance, and balanced acoustic voicing across every product tier.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7138D4]">
              Our Vision
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#171923]">
              Harmonious Objects for Modern Spaces
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#747583]">
              From pocket earbuds to living-room acoustic speakers and aluminum charging pads, our industrial design language blends harmoniously into creative studios, workspaces, and personal travel kits.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
            Core Design Pillars
          </h2>
          <p className="mt-1.5 text-sm sm:text-[15px] text-[#747583]">
            The engineering and material principles behind every AURAVIBE release.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="rounded-[24px] border border-[#EAEAF0] bg-white p-6"
              >
                <span
                  style={{ backgroundColor: val.bg, color: val.color }}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[#171923]">
                  {val.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#747583]">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Craft Highlight + CTA */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-8 rounded-[28px] border border-[#EAEAF0] bg-[#F8F8FC] p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-6 overflow-hidden rounded-2xl bg-white">
            <SafeImage
              src={ABOUT_CRAFT_IMAGE}
              alt="AURAVIBE acoustic lineup on pale oak studio table"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:pl-4">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
              Experience the Complete Collection
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#747583]">
              Explore our active noise-canceling headphones, compact true wireless earbuds, 360-degree speakers, and Qi2 charging pads ready for immediate dispatch.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
              >
                Shop All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-[#EAEAF0] bg-white px-6 py-3.5 text-sm font-semibold text-[#171923] hover:bg-[#F0EDFF]"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
