package main

import (
	"net/http"
	"io/ioutil"
	"log"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"os"
)

// Clé API attendue (dans un vrai projet, utiliser une variable d'environnement)

// Middleware pour valider la clé API
func validateAPIKey(c *gin.Context) {
	err := godotenv.Load()
 if err != nil {
  log.Fatal("Error loading .env file")
 }

 APIKey := os.Getenv("API_KEY")

	apiKey := c.GetHeader("X-API-KEY") // Lire la clé API des en-têtes de la requête
	if apiKey != APIKey {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid API Key"})
		c.Abort() // Stoppe l'exécution du middleware suivant et ne route pas la requête
		return
	}
	// Si la clé est valide, passer à la prochaine étape
	c.Next()
}

// Fonction pour envoyer des requêtes HTTP à un service microservice
func proxyRequest(c *gin.Context, serviceURL string) {
	method := c.Request.Method

	client := &http.Client{}
	req, err := http.NewRequest(method, serviceURL, c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating request"})
		return
	}

	req.Header = c.Request.Header // Copier les en-têtes de la requête originale

	// Envoyer la requête au microservice
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "Error forwarding request"})
		return
	}
	defer resp.Body.Close()

	// Lire la réponse
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading response"})
		return
	}

	// Retourner la réponse du microservice au client
	c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), body)
}

func main() {
	r := gin.Default()

	// Appliquer le middleware de validation de clé API sur toutes les routes
	r.Use(validateAPIKey)

	// Route pour le service User
	r.Any("/user/*action", func(c *gin.Context) {
		serviceURL := "http://localhost:8081" + c.Param("action")
		proxyRequest(c, serviceURL)
	})

	// Route pour le service Produit
	r.Any("/product/*action", func(c *gin.Context) {
		serviceURL := "http://localhost:8082" + c.Param("action")
		proxyRequest(c, serviceURL)
	})

	// Lancer le serveur de la gateway
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to run gateway server:", err)
	}
}
