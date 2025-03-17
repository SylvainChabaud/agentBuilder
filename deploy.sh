#!/bin/bash
# Script de déploiement pour agentBuilder_api

# 0. Se placer dans le répertoire de l'application
cd /root/workspace/ia_models/agentBuilder_api || { echo "Répertoire introuvable"; exit 1; }

# 1. Arrêter tous les processus PM2
echo "Arrêt de tous les processus PM2..."
pm2 stop all

# 2. Lancer la construction de l'application Next.js
echo "Lancement de npm run build..."
npm run build

# 1. Arrêter tous les processus PM2
echo "Lance tous les processus PM2..."
pm2 start all

echo "Déploiement terminé."
