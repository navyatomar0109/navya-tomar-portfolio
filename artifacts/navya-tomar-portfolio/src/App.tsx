import { type ReactNode, useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ExternalLink, Menu, Quote, Share2, Sparkles, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Contact', href: '#contact' },
];

const interests = [
  { number: '01', title: 'Technical curiosity', text: 'I like finding the logic underneath an idea — then making it clearer, kinder, and easier to use.', color: 'bg-[#f4d45e]' },
  { number: '02', title: 'Design with intent', text: 'Visual choices are never decoration alone. They can invite attention, build trust, and make a message stay.', color: 'bg-[#ea765e]' },
  { number: '03', title: 'Community leadership', text: 'The best work grows in the room: listening closely, sharing credit, and making space for more voices.', color: 'bg-[#358c87] text-[#f2ead9]' },
];

const timeline = [
  {
    index: '01',
    title: 'SRIJAN Social Internship',
    label: 'Social internship',
    body: 'A hands-on social internship shaped by field learning, community-facing work, and a closer look at how awareness becomes action.',
    accent: 'coral',
  },
  {
    index: '02',
    title: 'M.D.D. Of India NGO',
    label: 'Social volunteering',
    body: 'Supported awareness related to the POCSO Act, child marriage, and child labour through volunteering with M.D.D. Of India NGO.',
    accent: 'sun',
  },
  {
    index: '03',
    title: 'UPES Student Chapter',
    label: 'Core technical & design team',
    body: 'Part of the Core Technical & Design Team in UPES Student Chapter — contributing where technical thinking and visual communication meet.',
    accent: 'teal',
  },
  {
    index: '04',
    title: 'WIE IEEE Hackathon',
    label: '3-day hackathon',
    body: 'Participated in a 3-day hackathon organized by WIE IEEE, moving from debugging and idea submission to a final presentation.',
    accent: 'navy',
  },
];

const achievements = [
  {
    tag: 'Field + desk',
    title: 'M.D.D. Of India internship completion',
    text: 'Completed a two-month internship with field visits, awareness programs, child-marriage and child-labour identification activities, and office-desk work.',
    number: 'A',
    tone: 'bg-[#358c87] text-[#f2ead9]',
    certificateHref: '/certificates/navya-tomar-mdd-internship-certificate.pdf',
    certificateLabel: 'Open internship PDF',
  },
  {
    tag: 'Innovation challenge',
    title: 'WIE Week 2026 Hackathon',
    text: 'A 3-Day Innovation Challenge by IEEE UPES Student Branch and IEEE WIE Student Branch Affinity Group — including debugging, idea submission, and final presentation participation.',
    number: 'B',
    tone: 'bg-[#f4d45e]',
    certificateHref: '/certificates/navya-tomar-wie-week-2026-hackathon.png',
    certificateLabel: 'Open hackathon certificate',
  },
  {
    tag: 'Speaker session',
    title: 'WIE-Inspire TED-Style Speaker Session',
    text: 'Participated in the WIE-Inspire TED-Style Speaker Session by the IEEE Women in Engineering Student Branch Affinity Group as part of WIE Week 2026.',
    number: 'C',
    tone: 'bg-[#ea765e]',
    certificateHref: '/certificates/navya-tomar-wie-inspire-speaker-session.png',
    certificateLabel: 'Open speaker session certificate',
  },
];

function scrollToId(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareState, setShareState] = useState<'idle' | 'copied' | 'shared'>('idle');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToId(href);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Navya Tomar — design, technology, impact",
      text: "Meet Navya Tomar: a student designer and technologist connecting technical curiosity with social impact.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareState('shared');
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareState('copied');
      }
    } catch {
      setShareState('idle');
    }
    window.setTimeout(() => setShareState('idle'), 2600);
  };

  return (
    <div className="portfolio-shell min-h-[100dvh]">
      <div className="fixed left-0 top-0 z-50 h-1 bg-[#ea765e] transition-[width] duration-150" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <header className="relative z-40 border-b border-[#23273f]/20 bg-[#f2ead9]/90 backdrop-blur-md">
        <div className="section-wrap flex h-[74px] items-center justify-between">
          <button type="button" onClick={() => handleNav('#top')} className="focus-ring group flex items-center gap-3" aria-label="Back to top" data-testid="button-back-to-top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#23273f] font-display text-lg font-bold text-[#f4d45e] transition-transform duration-200 group-hover:rotate-12">N</span>
            <span className="font-display text-lg font-bold tracking-[-.04em]">navya tomar<span className="text-[#ea765e]">.</span></span>
          </button>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => handleNav(item.href)} className="focus-ring eyebrow text-[#23273f]/70 transition-colors hover:text-[#ea765e]" data-testid={`link-nav-${item.label.toLowerCase()}`}>
                {item.label}
              </button>
            ))}
            <button type="button" onClick={handleShare} className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#23273f] px-4 py-2 font-mono-custom text-[10px] font-bold uppercase tracking-[.12em] transition-colors hover:bg-[#23273f] hover:text-[#f2ead9]" data-testid="button-share-header">
              <Share2 size={13} strokeWidth={2.2} />
              Share
            </button>
          </nav>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="focus-ring rounded-full border border-[#23273f] p-2 md:hidden" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} data-testid="button-toggle-menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="section-wrap flex flex-col gap-4 border-t border-[#23273f]/20 py-5 md:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <button key={item.href} type="button" onClick={() => handleNav(item.href)} className="focus-ring eyebrow flex items-center justify-between text-left text-[#23273f]" data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}>
                {item.label}
                <ArrowUpRight size={16} />
              </button>
            ))}
            <button type="button" onClick={handleShare} className="focus-ring eyebrow flex items-center gap-2 pt-2 text-left text-[#ea765e]" data-testid="button-share-mobile">
              <Share2 size={14} /> Share this portfolio
            </button>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero-grid relative overflow-hidden border-b border-[#23273f]/20" aria-labelledby="hero-heading">
          <div className="section-wrap grid min-h-[calc(100dvh-74px)] items-center gap-14 py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 lg:py-24">
            <div className="relative z-10">
              <div className="reveal mb-8 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ea765e] shadow-[0_0_0_5px_rgba(234,118,94,.18)]" />
                <p className="eyebrow text-[#358c87]">Student designer & technologist</p>
              </div>
              <h1 id="hero-heading" className="reveal reveal-delay-1 font-display display-tight max-w-[760px] text-[clamp(4.4rem,11vw,9.7rem)] font-bold">
                Ideas with
                <span className="block text-[#ea765e]">a point</span>
                <span className="block outline-word">of view.</span>
              </h1>
              <div className="reveal reveal-delay-2 mt-10 flex max-w-[570px] items-start gap-5">
                <span className="mt-2 h-px w-12 shrink-0 bg-[#23273f]" />
                <p className="text-balance text-lg leading-relaxed text-[#23273f]/75 md:text-xl">
                  I&apos;m Navya Tomar — exploring where technical curiosity, thoughtful design, and meaningful social impact can meet.
                </p>
              </div>
              <div className="reveal reveal-delay-3 mt-11 flex flex-wrap items-center gap-4">
                <button type="button" onClick={() => handleNav('#work')} className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#23273f] px-6 py-3.5 font-mono-custom text-[11px] font-bold uppercase tracking-[.1em] text-[#f2ead9] transition-transform hover:-translate-y-1" data-testid="button-explore-work">
                  Explore the work <ArrowDown size={15} className="link-arrow" />
                </button>
                <button type="button" onClick={() => handleNav('#contact')} className="focus-ring group inline-flex items-center gap-2 px-3 py-3 font-mono-custom text-[11px] font-bold uppercase tracking-[.1em] text-[#23273f] underline decoration-[#ea765e] decoration-2 underline-offset-8" data-testid="button-start-conversation">
                  Start a conversation <ArrowUpRight size={15} className="link-arrow" />
                </button>
              </div>
            </div>

            <div className="relative mx-auto h-[440px] w-full max-w-[500px] lg:h-[560px]" aria-label="A visual map of Navya's work" data-testid="visual-hero-collage">
              <div className="absolute left-[10%] top-[10%] h-[72%] w-[72%] rotate-[-8deg] border border-[#23273f]/30 bg-[#f4d45e] p-5 shadow-[12px_15px_0_rgba(35,39,63,.12)]">
                <div className="h-full border border-[#23273f]/40 p-4">
                  <div className="flex items-center justify-between border-b border-[#23273f]/30 pb-3">
                    <span className="eyebrow">field notes / 01</span>
                    <span className="font-mono-custom text-[10px]">NT—26</span>
                  </div>
                  <div className="relative mt-8 h-[72%] overflow-hidden bg-[#358c87]">
                    <div className="absolute left-[19%] top-[18%] h-32 w-32 rounded-full border-[18px] border-[#f2ead9]/90" />
                    <div className="absolute bottom-[15%] right-[10%] h-36 w-36 rotate-45 border border-[#f2ead9]/80" />
                    <div className="absolute bottom-8 left-6 right-6 border-t border-dashed border-[#f2ead9]/70" />
                    <div className="absolute left-6 top-6 font-display text-4xl font-bold leading-none text-[#f2ead9]">listen<br />closely.</div>
                    <div className="absolute bottom-6 right-6 font-mono-custom text-[9px] uppercase tracking-[.15em] text-[#f2ead9]">people / process / possibility</div>
                  </div>
                </div>
              </div>
              <div className="float-note absolute right-[4%] top-[7%] z-10 w-40 rotate-[12deg] bg-[#ea765e] p-5 text-[#23273f] shadow-[8px_9px_0_rgba(35,39,63,.14)]">
                <Sparkles size={21} className="mb-5" />
                <p className="font-display text-xl font-bold leading-[.95]">Make it useful.<br />Make it felt.</p>
                <p className="mt-5 font-mono-custom text-[9px] uppercase tracking-[.12em]">working principle</p>
              </div>
              <div className="absolute bottom-[8%] right-[2%] z-10 flex h-32 w-32 -rotate-[11deg] flex-col justify-between rounded-full bg-[#23273f] p-5 text-[#f2ead9] shadow-[8px_9px_0_rgba(35,39,63,.14)]">
                <ArrowUpRight size={22} className="self-end text-[#f4d45e]" />
                <p className="font-mono-custom text-[10px] uppercase leading-relaxed tracking-[.1em]">design<br />for real<br />life</p>
              </div>
              <div className="absolute bottom-0 left-[2%] z-10 rotate-[-5deg] bg-[#f2ead9] px-4 py-3 font-mono-custom text-[10px] uppercase tracking-[.08em] shadow-[5px_6px_0_rgba(35,39,63,.12)]">curiosity → care</div>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-custom text-[9px] uppercase tracking-[.18em] text-[#23273f]/60 lg:flex">
            <span className="h-8 w-px bg-[#23273f]/40" /> scroll to wander
          </div>
        </section>

        <section id="about" className="scroll-mt-20 border-b border-[#23273f]/20 py-24 md:py-32" aria-labelledby="about-heading">
          <div className="section-wrap grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="eyebrow mb-5 text-[#ea765e]">01 / the throughline</p>
              <h2 id="about-heading" className="font-display text-5xl font-bold leading-[.94] tracking-[-.06em] md:text-7xl">Curiosity is<br /><span className="text-[#358c87]">a form of care.</span></h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-2xl leading-snug tracking-[-.025em] md:text-3xl">I am drawn to questions that sit between people and systems: how a message travels, how an interface behaves, how a community gets heard.</p>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#23273f]/70">My portfolio is still taking shape, but the direction is clear. I want to keep learning across design and technology while using both as tools for participation, awareness, and positive change.</p>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {interests.map((interest) => (
                  <article key={interest.number} className={`card-lift min-h-52 ${interest.color} p-5`} data-testid={`card-interest-${interest.number}`}>
                    <span className="font-mono-custom text-[10px] font-bold opacity-65">{interest.number}</span>
                    <h3 className="mt-12 font-display text-xl font-bold leading-none">{interest.title}</h3>
                    <p className="mt-3 text-sm leading-5 opacity-80">{interest.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-20 border-b border-[#23273f]/20 bg-[#23273f] py-24 text-[#f2ead9] md:py-32" aria-labelledby="work-heading">
          <div className="section-wrap">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#f4d45e]">02 / where I&apos;ve shown up</p>
                <h2 id="work-heading" className="font-display text-5xl font-bold leading-[.92] tracking-[-.06em] md:text-7xl">Work in the<br /><span className="text-[#ea765e]">real world.</span></h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#f2ead9]/65">Experiences that have made the work more grounded, collaborative, and accountable.</p>
            </div>
            <div className="border-t border-[#f2ead9]/30">
              {timeline.map((item) => (
                <article key={item.index} className="group grid gap-5 border-b border-[#f2ead9]/30 py-8 transition-colors hover:bg-[#2d3250] md:grid-cols-[70px_1fr_1.15fr] md:items-center md:gap-10" data-testid={`timeline-item-${item.index}`}>
                  <span className="font-mono-custom text-xs text-[#f4d45e]">{item.index}</span>
                  <div>
                    <p className={`eyebrow mb-3 ${item.accent === 'coral' ? 'text-[#ea765e]' : item.accent === 'sun' ? 'text-[#f4d45e]' : item.accent === 'teal' ? 'text-[#69c0b7]' : 'text-[#f2ead9]/60'}`}>{item.label}</p>
                    <h3 className="font-display text-2xl font-bold tracking-[-.04em] md:text-3xl">{item.title}</h3>
                  </div>
                  <div className="flex items-start justify-between gap-6">
                    <p className="max-w-md text-sm leading-6 text-[#f2ead9]/67">{item.body}</p>
                    <ArrowUpRight size={22} className="link-arrow mt-1 shrink-0 text-[#ea765e]" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="recognition" className="scroll-mt-20 overflow-hidden border-b border-[#23273f]/20 py-24 md:py-32" aria-labelledby="recognition-heading">
          <div className="section-wrap">
            <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#358c87]">03 / selected achievements</p>
                <h2 id="recognition-heading" className="font-display text-5xl font-bold leading-[.92] tracking-[-.06em] md:text-7xl">Proof of<br /><span className="text-[#ea765e]">showing up.</span></h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#23273f]/70">A few moments where learning became doing — in the field, in a team, and on a stage.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr_.8fr]">
              {achievements.map((achievement, index) => (
                <article key={achievement.title} className={`card-lift flex min-h-[350px] flex-col justify-between p-6 ${achievement.tone} ${index === 0 ? 'lg:min-h-[410px]' : ''}`} data-testid={`card-achievement-${achievement.number}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="eyebrow rounded-full border border-current/30 px-3 py-2 text-[9px]">{achievement.tag}</span>
                    <span className="font-display text-5xl font-bold opacity-30">{achievement.number}</span>
                  </div>
                  <div>
                    <h3 className="max-w-sm font-display text-3xl font-bold leading-[.95] tracking-[-.05em]">{achievement.title}</h3>
                    <p className="mt-5 max-w-sm text-sm leading-6 opacity-80">{achievement.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#23273f]/20 bg-[#f4d45e] py-20" aria-label="Portfolio statement">
          <div className="marquee-track flex gap-10 font-display text-5xl font-bold uppercase tracking-[-.05em] text-[#23273f] md:text-7xl">
            <span>technical curiosity</span><span className="text-[#ea765e]">•</span><span>meaningful impact</span><span className="text-[#358c87]">•</span><span>community leadership</span><span className="text-[#ea765e]">•</span>
            <span aria-hidden="true">technical curiosity</span><span aria-hidden="true" className="text-[#ea765e]">•</span><span aria-hidden="true">meaningful impact</span><span aria-hidden="true" className="text-[#358c87]">•</span><span aria-hidden="true">community leadership</span>
          </div>
        </section>

        <section id="certificates" className="scroll-mt-20 border-b border-[#23273f]/20 py-24 md:py-32" aria-labelledby="certificates-heading">
          <div className="section-wrap grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="eyebrow mb-5 text-[#ea765e]">04 / certificates</p>
              <h2 id="certificates-heading" className="font-display text-5xl font-bold leading-[.92] tracking-[-.06em] md:text-7xl">Keep the<br /><span className="text-[#358c87]">receipts.</span></h2>
              <p className="mt-7 max-w-sm text-sm leading-6 text-[#23273f]/70">Recognition matters most when it points back to the work. Open each original certificate below.</p>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={`certificate-${achievement.number}`} className="group flex items-center justify-between gap-4 border-b border-[#23273f]/25 py-6" data-testid={`certificate-row-${achievement.number}`}>
                  <div className="flex min-w-0 items-center gap-5">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-mono-custom text-xs font-bold ${index === 0 ? 'bg-[#358c87] text-[#f2ead9]' : index === 1 ? 'bg-[#f4d45e]' : 'bg-[#ea765e]'}`}>{achievement.number}</span>
                    <div className="min-w-0">
                      <p className="font-display text-lg font-bold leading-tight tracking-[-.03em]">{achievement.title}</p>
                      <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-[.12em] text-[#23273f]/50">original file available</p>
                    </div>
                  </div>
                  <a href={achievement.certificateHref} target="_blank" rel="noreferrer" aria-label={achievement.certificateLabel} className="shrink-0 rounded-full border border-[#23273f]/30 p-3 transition-colors hover:bg-[#23273f] hover:text-[#f2ead9]" data-testid={`button-certificate-${achievement.number}`}>
                    <ExternalLink size={16} />
                  </a>
                </div>
              ))}
              <p className="pt-3 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#23273f]/50">Files open in a new tab for easy viewing and downloading.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 relative overflow-hidden bg-[#358c87] py-24 text-[#f2ead9] md:py-32" aria-labelledby="contact-heading">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[38px] border-[#f4d45e]/70" aria-hidden="true" />
          <div className="absolute -bottom-32 left-[-5%] h-80 w-80 rotate-12 border border-[#f2ead9]/30" aria-hidden="true" />
          <div className="section-wrap relative">
            <div className="grid gap-12 lg:grid-cols-[1.35fr_.65fr] lg:items-end">
              <div>
                <p className="eyebrow mb-7 text-[#f4d45e]">05 / make something matter</p>
                <h2 id="contact-heading" className="font-display text-[clamp(4rem,10vw,8.8rem)] font-bold leading-[.84] tracking-[-.07em]">Let&apos;s make<br /><span className="text-[#f4d45e]">the next thing</span><br />count.</h2>
              </div>
              <div className="lg:pb-2">
                <div className="mb-8 flex items-start gap-3">
                  <Quote size={21} className="mt-1 shrink-0 text-[#f4d45e]" />
                  <p className="font-display text-2xl font-semibold leading-tight">Good work asks better questions.</p>
                </div>
                <p className="max-w-xs text-sm leading-6 text-[#f2ead9]/75">Have a thoughtful idea, a community problem, or a room that needs another perspective? I&apos;d love to hear about it.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={handleShare} className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#f4d45e] px-5 py-3.5 font-mono-custom text-[10px] font-bold uppercase tracking-[.1em] text-[#23273f] transition-transform hover:-translate-y-1" data-testid="button-share-contact">
                    {shareState === 'copied' || shareState === 'shared' ? <Check size={15} /> : <Share2 size={15} />}
                    {shareState === 'copied' ? 'Link copied' : shareState === 'shared' ? 'Shared' : 'Share this page'}
                  </button>
                  <button type="button" onClick={() => handleNav('#top')} className="focus-ring group inline-flex items-center gap-2 rounded-full border border-[#f2ead9]/60 px-5 py-3.5 font-mono-custom text-[10px] font-bold uppercase tracking-[.1em] text-[#f2ead9] transition-colors hover:bg-[#f2ead9] hover:text-[#358c87]" data-testid="button-back-top-contact">
                    Back to top <ArrowUpRight size={14} className="link-arrow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#23273f] py-7 text-[#f2ead9]">
        <div className="section-wrap flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <p className="font-display text-lg font-bold">navya tomar<span className="text-[#ea765e]">.</span></p>
          <p className="font-mono-custom text-[9px] uppercase tracking-[.13em] text-[#f2ead9]/55">student designer / technologist / community builder</p>
          <button type="button" onClick={handleShare} className="focus-ring inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.1em] text-[#f4d45e] transition-colors hover:text-[#ea765e]" data-testid="button-share-footer">
            <Share2 size={14} /> Share / pass it on
          </button>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;