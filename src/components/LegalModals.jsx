function Modal({ id, title, children }) {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}-label`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-lg">
        <div className="modal-content" style={{ background: 'var(--panel)', color: 'var(--text)', border: '1px solid var(--border)' }}>
          <div className="modal-header" style={{ borderColor: 'var(--border)' }}>
            <h2 className="modal-title" id={`${id}-label`} style={{ fontSize: 20 }}>
              {title}
            </h2>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Chiudi" />
          </div>
          <div className="modal-body" style={{ fontSize: 14.5 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LegalModals({ contactEmail }) {
  const email = contactEmail || 'info@nswebcraft.it';

  return (
    <>
      <Modal id="privacy-policy-modal" title="Privacy Policy">
        <p style={{ marginBottom: 14 }}>
          <strong>Titolare del trattamento:</strong> Nicolò Salvestrini, contattabile all'indirizzo{' '}
          <a href={`mailto:${email}`} style={{ color: 'var(--blue)' }}>{email}</a>.
        </p>
        <p style={{ marginBottom: 14 }}>
          <strong>Dati raccolti.</strong> Tramite il modulo di contatto di questo sito vengono raccolti nome, indirizzo
          email, tipo di richiesta e il testo del messaggio inviato volontariamente dall'utente.
        </p>
        <p style={{ marginBottom: 14 }}>
          <strong>Finalità.</strong> I dati sono trattati esclusivamente per rispondere alla richiesta inviata e per
          eventuali comunicazioni relative a un progetto o un'opportunità di lavoro discussi tramite il modulo.
        </p>
        <p style={{ marginBottom: 14 }}>
          <strong>Base giuridica e conservazione.</strong> Il trattamento si basa sul consenso implicito nell'invio del
          modulo. I dati sono conservati solo per il tempo necessario a gestire la richiesta e non vengono ceduti a
          terzi né utilizzati per finalità di marketing.
        </p>
        <p>
          <strong>Diritti dell'interessato.</strong> In qualsiasi momento puoi richiedere l'accesso, la rettifica o la
          cancellazione dei tuoi dati scrivendo all'indirizzo email sopra indicato.
        </p>
      </Modal>

      <Modal id="cookie-policy-modal" title="Cookie Policy">
        <p style={{ marginBottom: 14 }}>
          Questo sito non utilizza cookie di tracciamento, profilazione o analytics di terze parti.
        </p>
        <p style={{ marginBottom: 14 }}>
          Vengono impiegati unicamente cookie tecnici, strettamente necessari al corretto funzionamento del sito (ad
          esempio per mantenere le preferenze di visualizzazione durante la navigazione). Questi cookie non richiedono
          consenso secondo la normativa vigente, in quanto essenziali all'erogazione del servizio.
        </p>
        <p>
          Non vengono installati cookie di terze parti per pubblicità o social media.
        </p>
      </Modal>
    </>
  );
}
