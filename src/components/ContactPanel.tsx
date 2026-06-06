import { contact } from "../content/siteContent";

export function ContactPanel() {
  return (
    <section aria-labelledby="contact-panel-heading">
      <h2 id="contact-panel-heading">Contact</h2>
      <p>
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
      <p>Preferred inquiry format: {contact.preferredInquiryFormat}</p>
    </section>
  );
}
