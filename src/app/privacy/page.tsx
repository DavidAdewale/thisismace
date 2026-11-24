export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <section className="quiet-page">
      <div className="privacy-copy">
        <h1>Privacy</h1>
        <p>If you join Mace’s mailing list, we send your email address, optional first name, and available campaign tags to MailerLite to manage the list and understand how you found us. You can unsubscribe through any mailing-list email or reply with questions about your information.</p>
        <p>With your permission, Google Analytics measures visits and actions such as link clicks and signups. With advertising permission, Meta and, when enabled, TikTok measure campaign performance and help build advertising audiences. These services can use cookies and browser information. Signup event parameters omit your email address and name.</p>
        <p>Cookie settings in the footer lets you change your choice. We remember that choice in your browser and, if you opt in, keep campaign tags for the browsing session. You can join the mailing list with optional cookies turned off.</p>
      </div>
    </section>
  );
}
