package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "log"
	
    "github.com/gorilla/mux"
)

func rootHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Hello world!")
    fmt.Fprintf(w, "hello world!")
}
type Article struct {
    ID       int    `json:id`
    Title    string `json:title`
    Author   string `json:author`
    PostDate string `json:year`
}

// サンプルデータ用
var articles []Article

func getArticles(w http.ResponseWriter, r *http.Request) {
      // strct を json に変換 してwに出力
    json.NewEncoder(w).Encode(articles)
}

func getArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Get article is called")
}

func addArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Add article is called")
}

func updateArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Update article is called")
}

func removeArticle(w http.ResponseWriter, r *http.Request) {
    log.Println("Remove article is called")
}
func main() {

    r := mux.NewRouter()
    r.HandleFunc("/", rootHandler)

    r.HandleFunc("/articles", getArticles).Methods("GET")
    r.HandleFunc("/articles/{id}", getArticle).Methods("GET")
    r.HandleFunc("/articles", addArticle).Methods("POST")
    r.HandleFunc("/articles", updateArticle).Methods("PUT")
    r.HandleFunc("/articles/{id}", removeArticle).Methods("DELETE")


    articles = append(articles,
        Article{ID: 1, Title: "Article1", Author: "Gopher", PostDate: "2019/1/1"},
        Article{ID: 2, Title: "Article2", Author: "Gopher", PostDate: "2019/2/2"},
        Article{ID: 3, Title: "Article3", Author: "Gopher", PostDate: "2019/3/3"},
        Article{ID: 4, Title: "Article4", Author: "Gopher", PostDate: "2019/4/4"},
        Article{ID: 5, Title: "Article5", Author: "Gopher", PostDate: "2019/5/5"},
    )


    http.Handle("/", r)
    http.ListenAndServe(":3000", nil)

}