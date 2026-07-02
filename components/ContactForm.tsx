"use client";

import { useState } from "react";
import { contact, site } from "../content/site";

const field =
  "h-12 border border-neutral-300 bg-white px-4 text-base outline-none focus:border-blue-900";

type Status = "idle" | "sending" | "done" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const data = {
      name: String(f.get("name") || "").trim(),
      company: String(f.get("company") || "").trim(),
      email: String(f.get("email") || "").trim(),
      message: String(f.get("message") || "").trim()
    };
    setStatus("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!r.ok) throw new Error(String(r.status));
      setStatus("done");
      form.reset();
    } catch {
      // 服务端不可用时回退为预填邮件
      const subject = `经营咨询 · ${data.name || data.email || "网站访客"}`;
      const body = `姓名：${data.name}\n公司：${data.company}\n邮箱：${data.email}\n\n希望讨论的经营议题：\n${data.message}\n`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("error");
    }
  }

  return (
    <form className="grid gap-5 border border-neutral-200 bg-neutral-50 p-6 sm:p-8" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-neutral-950">{contact.formTitle}</h2>
      <label className="grid gap-2"><span className="text-sm font-semibold text-neutral-700">姓名</span><input className={field} name="name" required /></label>
      <label className="grid gap-2"><span className="text-sm font-semibold text-neutral-700">公司</span><input className={field} name="company" /></label>
      <label className="grid gap-2"><span className="text-sm font-semibold text-neutral-700">邮箱</span><input className={field} name="email" type="email" required /></label>
      <label className="grid gap-2"><span className="text-sm font-semibold text-neutral-700">你希望讨论的经营议题</span><textarea className="min-h-36 resize-y border border-neutral-300 bg-white px-4 py-3 text-base outline-none focus:border-blue-900" name="message" /></label>
      <button className="button-dark justify-self-start" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "提交中…" : "发送咨询"}
      </button>
      {status === "done" && (
        <p className="text-sm leading-6 text-green-700">
          已收到你的咨询，我们会在 24 小时内通过邮箱回复；也欢迎直接发邮件至{" "}
          <a className="font-semibold text-blue-900" href={`mailto:${site.email}`}>{site.email}</a>。
        </p>
      )}
      {status === "error" && (
        <p className="text-sm leading-6 text-neutral-600">
          网络提交未成功，已为你打开邮件客户端预填内容；如未弹出，请直接发邮件至{" "}
          <a className="font-semibold text-blue-900" href={`mailto:${site.email}`}>{site.email}</a>。
        </p>
      )}
    </form>
  );
}
