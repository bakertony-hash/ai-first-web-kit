import { ChevronDown } from "lucide-react";
import { faqItems } from "../content/siteContent";

export function FAQSection() {
  return (
    <section className="section faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">FAQ</h2>
      <div className="faq-list">
        {faqItems.map((item) => (
          <article key={item.question}>
            <div>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
            <ChevronDown aria-hidden="true" size={18} />
          </article>
        ))}
      </div>
    </section>
  );
}
