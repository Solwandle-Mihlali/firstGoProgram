package main

import (
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Todos struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

var todos []Todos

func main() {

	//defining a router

	router := mux.NewRouter();

	todos = append(todos, Todos{ID:1 , Title: "Learn Go" , Completed: false})

	router.HandleFunc("/" , getTodos).Methods("GET")

	//defining cors options

	corsOpts := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := corsOpts.Handler(router)

	http.ListenAndServe(":7000" , handler)
	
}


func getTodos(w http.ResponseWriter , r *http.Request){
	json.NewEncoder(w).Encode(todos)
}
