import React from 'react'

export default function FocusSection() {
  const articles = [
    {
      href: "/ratgeber/hg/garten-im-mai-diese-gartenarbeiten-liegen-im-wonnemonat-an",
      image: "https://dekpuvkwdajkn.cloudfront.net/eyJidWNrZXQiOiJnYy1jcmVlbXMtbWVkaWEiLCJrZXkiOiI2ODJjMjk5N2YzMTI0OC40NzA5NjM1Ny5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMCwiaGVpZ2h0IjozMDAsImNyb3AiOnsieCI6ImNlbnRlciIsInkiOiJjZW50ZXIifX19fQ==",
      category: "Ratgeber",
      title: "Garten im Mai: Diese Gartenarbeiten liegen im Wonnemonat an",
      text: "Häufig sieht der Garten im Mai schon richtig toll aus: Frühlingsblumen locken Bienen und Schmetterlinge an, und alles grünt und wächst. Jetzt sollten Sie auch die Ärmel hochkrempeln und sich an die Gartenarbeit machen, denn im Wonnemonat liegt so einiges an.",
      cta: "Mehr erfahren"
    },
    {
      href: "/ratgeber/gl/corona-erkaeltung-oder-grippe-unterschiede-kennen-symptome-richtig-deuten",
      image: "https://dekpuvkwdajkn.cloudfront.net/eyJidWNrZXQiOiJnYy1jcmVlbXMtbWVkaWEiLCJrZXkiOiI2NTY0NDY5ZTM1YzIzMS44Nzg2NzgyMS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMCwiaGVpZ2h0IjozMDAsImNyb3AiOnsieCI6ImNlbnRlciIsInkiOiJjZW50ZXIifX19fQ==",
      category: "Ratgeber",
      title: "Erkältung, Grippe, Corona? Symptome richtig deuten",
      text: "Bin ich nur erkältet, habe ich eine Grippe oder sogar Corona? Diese Frage lässt sich ohne ärztliche Untersuchung meist nicht hundertprozentig beantworten. Dennoch gibt es Symptome, in denen sich die Erkrankungen unterscheiden. Unser Ratgeber gibt Ihnen einen Überblick.",
      cta: "Jetzt informieren"
    },
    {
      href: "/branchenbuch/branche/heizung_&_sanitär",
      image: "https://dekpuvkwdajkn.cloudfront.net/eyJidWNrZXQiOiJnYy1jcmVlbXMtbWVkaWEiLCJrZXkiOiI2ODJjNjBiN2NjMjgxMC45ODg3MjMwMS53ZWJwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6MzAwLCJjcm9wIjp7IngiOiJjZW50ZXIiLCJ5IjoiY2VudGVyIn19fX0=",
      category: "Häufig gesucht",
      title: "Profis für Heizungsbau",
      text: "Eine defekte Heizung im Winter ist nicht nur unangenehm, sondern kann auch erhebliche Schäden in Ihrem Zuhause zur Folge haben. Schnelles Handeln ist jetzt entscheidend, um eine Schimmelbildung und Frostschäden an den Rohren zu vermeiden. Ein Profi für Heizungsbau hilft Ihnen dabei.",
      cta: "Profi finden"
    }
  ]

  return (
    <section>
      <h2 className="mod-bildTextTeaser__title gc-text--startseite-h2">Gelbe Seiten im Fokus</h2>
      <div className="startseite__wrapper">
        <h3 className="mod-bildTextTeaser__subTitle gc-text--startseite-h3">Aktuelles aus erster Hand</h3>
        <div className="startseite__wrapper__container container--flexbox">
          {articles.map((article, index) => (
            <a 
              key={index}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mod-bildTextTeaser__imageContainer"
            >
              <div className="mod-bildTextTeaser__image">
                <img loading="lazy" decoding="async" alt="" width={500} height={300} src={article.image} />
              </div>
              <div className="mod-bildTextTeaser__textContainer">
                <p className="mod-bildTextTeaser__textContainer__header">{article.category}</p>
                <div className="mod-bildTextTeaser__textContainer__title">{article.title}</div>
                <p className="mod-bildTextTeaser__textContainer__text">{article.text}</p>
                <div className="mod-bildTextTeaser__more">{article.cta}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
