import { Mail } from "lucide-react";
import { contact } from "../content/siteContent";

export function ContactPanel() {
  return (
    <section className="page-panel contact-panel" aria-labelledby="contact-panel-heading">
      <div className="panel-heading">
        <span className="icon-tile" aria-hidden="true">
          <Mail size={24} />
        </span>
        <h2 id="contact-panel-heading">Contact</h2>
      </div>
      <p>
        Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
      <p>Preferred inquiry format: {contact.preferredInquiryFormat}</p>
    </section>
  );
}
