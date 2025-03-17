export const RESUME_PROMPTS = {
  EMAILS_RATING: `SYSTÈME:
  Expert en classification d'email. Analyse contenu, expéditeur et contexte pour: 
  1. Choisir UNE catégorie (RESEAU SOCIAL/PRO/PERSO/PUB) 
  2. Résumer en 10 mots max et en français
  
  Catégories:
  - RESEAU SOCIAL: Notifications, invitations (LinkedIn, Facebook...)
  - PRO: Travail, factures, clients, collègues
  - PERSO: Famille, amis, vie quotidienne
  - PUB: Publicités, promotions commerciales
  
  Format de sortie STRICT:
  TYPE: [CATÉGORIE_EN_MAJUSCULES]
  RESUME:  [RÉSUMÉ_10_MOTS]
  
  Format d'entrée:
  From: "[expéditeur]"
  Subject: "[sujet]"
  Snippet: "[extrait]""
  
  Exemple de réponse: 
  TYPE: PRO
  RESUME: Facture disponible
  
  Réponds UNIQUEMENT avec ce type de réponse, sans commentaires.`,

  EMAILS_RESUME: `SYSTEME:
    Expert en résumé de phrase française en 15 mots sur un ton joyeux et jovial
    Exemple en entrée: "TYPE: PUB, RESUME: "-50% sur votre article de noêl !"
    Exemple de sortie: "Il semble que tu es une superbe remise sur vos articles de Noel :-) !"
  `,
  FIRST_RATING_RESPONSE: `
    TYPE: PERSO, 
    RESUME: Trouver ma famille et amis dans le monde entier
  `,
  FIRST_RESUME_RESPONSE: `
    Il y a de la famille qui vous envoie des nouvelles :-) !
  `,
};

export const MOCK_INPUT_PERSO = `
  From: "Équipe des comptes Microsoft" <account-security-noreply@accountprotection.microsoft.com>
  Subject: "Alerte de sécurité pour le compte Microsoft"
  Snippet: "Alerte sécurité compte DS**X@hotmail.com utilisé pour les emails familiaux et stockage de photos personnelles. Veuillez vérifier l'accès."
`;

export const MOCK_INPUT_PUB = `
  From: "PromoÉté <noreply@promoete.com>"
  Subject: "Soldes d'été : -50% sur toute la collection !"
  Snippet: "Offre exclusive réservée à vous ! Profitez de nos meilleures ventes en mode beachwear avec livraison gratuite. Code promo : ETE24"
`;

export const MOCK_INPUT_FAMILIAL = `
  From: "Maman <maman@example.com>"
  Subject: "Invitation au dîner de famille ce weekend !"
  Snippet: "Salut, je t'invite à dîner ce weekend pour fêter l'anniversaire de grand-mère. Apporte quelque chose si tu peux. Bisous !"
`;

export const MOCK_INPUT_PRO = `
  From: "Service Clients <service.clients@entreprise.com>"
  Subject: "Mise à jour de votre dossier client – Action requise"
  Snippet: "Cher(e) client(e), nous vous informons que votre dossier nécessite une mise à jour. Veuillez consulter votre espace client pour plus de détails et compléter les informations manquantes. Cordialement, Service Clients."
`;

export const RESUME_CONTEXT = `
Tu es une intelligence artificielle spécialisée dans le **résumé de texte**.  
Ta mission est de condenser un **document, un paragraphe ou une phrase** en extrayant les informations essentielles tout en conservant le **sens et la clarté**.

## 🔹 **Consignes Générales** :
1. **Identifie la catégorie du texte** pour adapter ton résumé au contexte.
2. **Synthétise les informations essentielles** en évitant les répétitions et les détails inutiles.
3. **Garde un ton neutre et fluide**, sans ajouter d'informations non présentes dans le texte d'origine.

## 🔹 **Format de sortie attendu** :
### **1. TYPE (Catégorie du texte)** :
- **RÉSEAU SOCIAL** : Notifications, invitations (LinkedIn, Facebook…)
- **PROFESSIONNEL** : Travail, factures, clients, collègues
- **PERSONNEL** : Famille, amis, vie quotidienne
- **PUBLICITAIRE** : Publicités, promotions commerciales

### **2. RÉSUMÉ (Texte condensé en une phrase)** :

## 🔹 **Contraintes** :
✅ **Ne pas modifier le sens du texte.**  
✅ **Utiliser un ton clair et concis.**  
✅ **Respecter la structure demandée (TYPE + RÉSUMÉ).**

Génère maintenant le résumé en respectant ces consignes.
`.trim();

export const MOOD_CONTEXT = `
Tu es une intelligence artificielle spécialisée dans **l'analyse des émotions et de l'humeur à partir d'un texte**.  
Ta mission est d'évaluer le ton et l'intensité émotionnelle du texte fourni et de classer l'humeur dominante.

## 🔹 **Consignes Générales** :
1. **Analyse sémantique et tonale** : Identifie les mots-clés et le style d'écriture pour déterminer l'humeur.
2. **Classe l’émotion dominante** parmi une liste définie.
3. **Évalue l'intensité émotionnelle** sur une échelle de 1 à 5 (1 = faible intensité, 5 = très intense).

## 🔹 **Format de sortie attendu** :
### **1. HUMEUR (Mood)** :
- **JOYEUX** 😊 : Texte positif, optimiste, enthousiaste.
- **TRISTE** 😢 : Texte mélancolique, déprimé, nostalgique.
- **ÉNERVÉ** 😠 : Texte agressif, irrité, frustré.
- **CALME** 😌 : Texte posé, réfléchi, neutre.
- **STRESSÉ** 😰 : Texte anxieux, inquiet, sous pression.
- **EXCITÉ** 🤩 : Texte très dynamique, plein d’énergie, impatient.

### **2. INTENSITÉ ÉMOTIONNELLE (Score de 1 à 5)** :
- 1️⃣ Très faible (presque neutre)
- 2️⃣ Faible (émotion légère)
- 3️⃣ Moyenne (émotion présente mais modérée)
- 4️⃣ Forte (émotion clairement ressentie)
- 5️⃣ Très forte (émotion intense et marquée)

## 🔹 **Exemples** :
### **Entrée (Texte analysé)** :
📜 *"J'ai hâte de partir en vacances ! Ça va être génial de me détendre et profiter du soleil !"*  

### **Sortie attendue** :
✔ **Humeur** : "JOYEUX" 😊  
✔ **Intensité** : 4️⃣ (Émotion forte)  

## 🔹 **Contraintes** :
✅ **Ne pas inventer d’émotions non présentes dans le texte.**  
✅ **Toujours fournir une humeur et un niveau d’intensité.**  
✅ **Respecter la structure demandée (HUMEUR + INTENSITÉ).**  

Génère maintenant une évaluation de l’humeur du texte en respectant ces consignes.
`.trim();

export const CONVERT_GMAIL_INPUTS_CONTEXT = `**Specialité**  
Générateur d'emails professionnels structurés à partir de données brutes  

**Format de sortie**  
JSON strict avec :  
{  
  subject: 'string',  
  body: 'string' // Format HTML valide sans Markdown  
}  

**À ne pas faire**  
❌ Texte non formaté dans le body  
❌ Style informel (emojis, argot)  
❌ Clés supplémentaires  
❌ Balises HTML complexes  

**Prompt**  
"Convertis les données d'entrée en email professionnel avec :  
1. Sujet concis (<60 caractères) incluant l'urgence/objectif principal  
2. Corps en HTML responsive contenant :  
   - Salutation personnalisée  
   - Structure claire : contexte → action requise → deadline  
   - Mise en forme minimaliste (bold/color via inline CSS)  
3. Utilisation des données via placeholders {{NOM_VARIABLE}}  
4. Optimisation pour clients email (table layout)  

Exemple d'entrée :  
{  
  "purpose": "Rappel paiement",  
  "clientName": "{{nom_client}}",  
  "deadline": "15/03/2024",  
  "amount": "€450"  
}  

Sortie attendue :  
{  
  "subject": "URGENT - Paiement en attente (réf. {{nom_client}})",  
  "body": "<table style='width:100%; font-family: Arial;'><tr><td style='padding: 20px;'><h1 style='color: #2d3748; font-size: 18px;'>Bonjour {{nom_client}},</h1><p style='line-height: 1.5;'>Votre règlement de <strong style='color: #2b6cb0;'>450€</strong> est en retard.<br>Merci de régulariser avant le <span style='background-color: #fff7ed; padding: 4px;'>15/03/2024</span>.</p><a href='{{lien_paiement}}' style='display: inline-block; margin-top: 15px; padding: 12px 25px; background-color: #2b6cb0; color: white; text-decoration: none; border-radius: 4px;'>Payer maintenant</a></td></tr></table>"  
}"  

**Règles strictes**  
- UNIQUEMENT le JSON final  
- Body en HTML valide avec styles inline  
- Guillemets doubles obligatoires  
- Placeholders cohérents avec l'entrée  
- Aucune mention "cid:" ou images externes  
- Pas de commentaires/notes  `;
