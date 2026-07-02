import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { CTA } from "../components/CTA";
import { FloatingBooking } from "../components/FloatingBooking";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PWARegister } from "../components/PWARegister";
import { site } from "../content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cxodex.com"),
  title: {
    default: "CXODEX · 5 分钟企业经营诊断",
    template: `%s | ${site.brand}`
  },
  description: site.description,
  alternates: {
    canonical: "./"
  },
  applicationName: "CXODEX",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CXODEX",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png"
  },
  other: {
    "apple-mobile-web-app-capable": "yes"
  },
  openGraph: {
    title: "CXODEX · 5 分钟企业经营诊断",
    description: site.description,
    url: "https://www.cxodex.com",
    siteName: site.brand,
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "CXODEX · CEO Advisory" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "CXODEX · 5 分钟企业经营诊断",
    description: site.description,
    images: ["/og-image.png"]
  }
};

export const viewport: Viewport = {
  themeColor: "#15130f"
};

// 结构化数据：让搜索引擎识别品牌、创始人与站点
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://www.cxodex.com/#org",
      name: "CXODEX",
      url: "https://www.cxodex.com",
      logo: "https://www.cxodex.com/cxodex-logo.png",
      email: site.email,
      description: site.description,
      founder: { "@id": "https://www.cxodex.com/#person" },
      areaServed: "CN",
      knowsAbout: ["精益生产", "六西格玛", "企业扭亏", "国际业务开发", "组织变革", "CEO 教练"]
    },
    {
      "@type": "Person",
      "@id": "https://www.cxodex.com/#person",
      name: "王曙光",
      jobTitle: "CEO 顾问 · 经营改善专家",
      description: "30 年一号位实战经验：10 年 GE 总经理、六西格玛黑带大师，10 年好孩子集团 CEO，深度服务 16 个行业。",
      image: "https://www.cxodex.com/wang-shuguang-avatar.jpg",
      url: "https://www.cxodex.com/about",
      worksFor: { "@id": "https://www.cxodex.com/#org" }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.cxodex.com/#website",
      name: "CXODEX",
      url: "https://www.cxodex.com",
      publisher: { "@id": "https://www.cxodex.com/#org" },
      inLanguage: "zh-CN"
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__bipEvent=e;try{window.dispatchEvent(new Event('bip-ready'))}catch(_){}});window.addEventListener('appinstalled',function(){window.__bipEvent=null;});"
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script defer src="https://stats.cxodex.com/script.js" data-website-id="8627773e-9244-4c9a-b202-b0600f4e992a" />
        <Header />
        <main>{children}</main>
        <CTA />
        <Footer />
        <FloatingBooking />
        <PWARegister />
      </body>
    </html>
  );
}
