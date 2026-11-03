export interface HeroSlide {
  id: string;
  kicker: string;
  watermark: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
}

export interface LookbookItem {
  id: string;
  lookNumber: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface DtfFeature {
  number: string;
  title: string;
  desc: string;
}

export interface SiteSettings {
  brandName: string;
  whatsAppNumber: string;
  announcementBar: {
    left: string;
    center: string;
  };
  promoBanner: {
    title: string;
    subtitle: string;
  };
  dtfCustomCta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  heroSlides: HeroSlide[];
  lookbookItems: LookbookItem[];
  dtfFeatures: DtfFeature[];
}
