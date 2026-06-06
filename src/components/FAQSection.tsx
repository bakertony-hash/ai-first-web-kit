import { faqItems } from "../content/siteContent";

export function FAQSection() {
  return (
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">FAQ</h2>
      {faqItems.map((item) => (
        <article key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </article>
      ))}
    </section>
  );
}
