import Image from "next/image";
import { contact, site } from "../../content/site";
import { ContactForm } from "../../components/ContactForm";

export const metadata = {
  title: "联系方式",
  description:
    "预约一次与王老师的私密沟通，聊聊你的企业当前最重要的经营问题；邮件或表单均可，24 小时内回复。"
};

export default function ContactPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">Contact</p>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">{contact.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">{contact.subtitle}</p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">邮箱</p>
            <a className="text-2xl font-semibold text-neutral-950 hover:text-blue-900" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="mt-8 max-w-md text-base leading-8 text-neutral-600">{contact.messageHint}</p>
            <div className="mt-10">
              <p className="eyebrow">微信</p>
              <div className="mt-3 inline-block border border-neutral-200 bg-white p-4">
                <Image src="/wechat-qr.png" alt="微信二维码：扫码添加王老师" width={200} height={200} className="h-48 w-48 object-contain" />
                <p className="mt-3 max-w-48 text-center text-sm leading-6 text-neutral-600">微信扫码，直接和王老师聊</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
