# Definieren des Basisimages
FROM node:14.17.0-alpine

# Erstellen des Arbeitsverzeichnisses
WORKDIR /app

# Kopieren der Paketdateien und Installation
COPY package*.json ./
RUN npm install
RUN npm install react-router-dom@6
RUN npm install firebase
RUN npm install antd
RUN chmod +x docker-entrypoint.sh



# Kopieren des Rests der Dateien
COPY . .

# Setzen der Umgebungsvariable für die App
ENV REACT_APP_API_URL=http://localhost:8000

# Exponieren des Ports
EXPOSE 3000

# Starten der Anwendung
CMD ["npm", "start"]