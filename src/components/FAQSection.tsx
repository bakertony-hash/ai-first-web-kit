import { faqItems } from "../content/siteContent";

export function FAQSection() {
  return (
    <section className="section faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading">Questions and answers</h2>
      <div className="faq-list">
        {faqItems.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
