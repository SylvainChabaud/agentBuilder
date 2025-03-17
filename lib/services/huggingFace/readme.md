# Modèles Gratuits sur Hugging Face

Hugging Face propose une large gamme de modèles gratuits pour divers cas d'utilisation, tels que la génération de texte, la traduction, le résumé automatique, l'analyse de sentiments, et plus encore. Ce document détaille quelques-uns des modèles populaires gratuits et explique comment les utiliser avec l'API Hugging Face.

---

## **1. Génération de Texte**

### **GPT-2**
- **Modèle** : `gpt2`
- **Description** : Modèle de génération de texte général capable de produire des textes cohérents.
- **Endpoint** : `models/gpt2`
- **Exemple d'utilisation** :

```javascript
const endpoint = `models/gpt2`;
const body = {
  inputs: "Hugging Face est une plateforme de...",
};
```

### **DistilGPT-2**
- **Modèle** : `distilgpt2`
- **Description** : Version légère et rapide de GPT-2.
- **Endpoint** : `models/distilgpt2`

---

## **2. Traduction**

### **Helsinki-NLP (OPUS MT)**
- **Modèles Disponibles** :
  - Anglais → Français : `Helsinki-NLP/opus-mt-en-fr`
  - Français → Anglais : `Helsinki-NLP/opus-mt-fr-en`
  - Anglais → Allemand : `Helsinki-NLP/opus-mt-en-de`
- **Exemple d'utilisation** :

```javascript
const endpoint = `models/Helsinki-NLP/opus-mt-en-fr`;
const body = {
  inputs: "Hello, how are you?",
};
```

---

## **3. Analyse de Sentiments**

### **DistilBERT Fine-tuned SST-2**
- **Modèle** : `distilbert-base-uncased-finetuned-sst-2-english`
- **Description** : Modèle optimisé pour analyser les sentiments (positif/négatif).
- **Endpoint** : `models/distilbert-base-uncased-finetuned-sst-2-english`
- **Exemple d'utilisation** :

```javascript
const endpoint = `models/distilbert-base-uncased-finetuned-sst-2-english`;
const body = {
  inputs: "I love using Hugging Face!",
};
```

---

## **4. Résumé Automatique**

### **Bart**
- **Modèle** : `facebook/bart-large-cnn`
- **Description** : Modèle puissant pour résumer de longs documents ou articles.
- **Endpoint** : `models/facebook/bart-large-cnn`
- **Exemple d'utilisation** :

```javascript
const endpoint = `models/facebook/bart-large-cnn`;
const body = {
  inputs: "[Texte à résumer]",
};
```

### **Pegasus**
- **Modèle** : `google/pegasus-xsum`
- **Description** : Idéal pour des résumés concis.
- **Endpoint** : `models/google/pegasus-xsum`

---

## **5. Génération d'Images**

### **Stable Diffusion**
- **Modèle** : `stabilityai/stable-diffusion-2`
- **Description** : Génère des images à partir d'une description textuelle.
- **Endpoint** : `models/stabilityai/stable-diffusion-2`
- **Exemple d'utilisation** :

```javascript
const endpoint = `models/stabilityai/stable-diffusion-2`;
const body = {
  inputs: "A futuristic cityscape at sunset",
};
```

---

## **6. Questions-Réponses**

### **DistilBERT pour QA**
- **Modèle** : `distilbert-base-cased-distilled-squad`
- **Description** : Répond à des questions basées sur un contexte donné.
- **Endpoint** : `models/distilbert-base-cased-distilled-squad`
- **Exemple d'utilisation** :

```javascript
const endpoint = `models/distilbert-base-cased-distilled-squad`;
const body = {
  inputs: {
    question: "Qu'est-ce que Hugging Face ?",
    context: "Hugging Face est une plateforme de NLP et de Machine Learning...",
  },
};
```

---

## **Comment utiliser ces modèles**

1. **Configurer la clé API** :
   - Ajoutez votre clé API Hugging Face dans votre fichier `.env.local` :
     ```plaintext
     NEXT_PUBLIC_HUGGING_FACE_API_KEY=ta_cle_api
     ```

2. **Créer une fonction pour appeler l'API** :
   - Exemple de fonction générique :
     ```javascript
     export const fetchFromHuggingFace = async (endpoint, options = {}) => {
       const apiKey = process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY;

       if (!apiKey) {
         throw new Error("Clé API Hugging Face non configurée.");
       }

       const url = `https://api-inference.huggingface.co/${endpoint}`;

       const response = await fetch(url, {
         headers: {
           Authorization: `Bearer ${apiKey}`,
           "Content-Type": "application/json",
         },
         ...options,
       });

       if (!response.ok) {
         const error = await response.json();
         throw new Error(error.error || "Erreur API Hugging Face");
       }

       return await response.json();
     };
     ```

3. **Appeler les modèles spécifiques** :
   - Utilisez les endpoints et les exemples ci-dessus pour interagir avec les modèles gratuits.

---

## **Références Utiles**
- Documentation Hugging Face : [https://huggingface.co/docs](https://huggingface.co/docs)
- Liste des modèles : [https://huggingface.co/models](https://huggingface.co/models)

---