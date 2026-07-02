import { ServiceCard } from "../../components/ServiceCard";
import { services } from "../../content/site";

export const metadata = {
  title: "服务",
  description:
    "CEO 实战陪跑、扭亏增盈（精益+六西格玛）、国际订单开拓与组织人事变革——面向创始人、董事长与 CEO 的核心服务。"
};

export default function ServicesPage() {
  return (
    <>
      <section className="section">
        <div className="section-inner">
          <p className="eyebrow">Services</p>
          <h1 className="max-w-5xl text-4xl font-semibold tracking-normal text-neutral-950 sm:text-5xl">{services.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-600">{services.subtitle}</p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner grid gap-px bg-neutral-200 p-0 sm:p-0 lg:grid-cols-2 xl:grid-cols-3">
          {services.items.map((item, index) => (
            <ServiceCard
              key={item.title}
              index={index + 1}
              title={item.title}
              body={item.body}
              target={item.target}
              problem={item.problem}
              deliverables={item.deliverables}
            />
          ))}
        </div>
      </section>
    </>
  );
}
