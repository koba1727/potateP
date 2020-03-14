package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "log"
    "strings"
	
    //"github.com/gorilla/mux"  
    
    "golang.org/x/net/context"  
    firebase "firebase.google.com/go"
    "google.golang.org/api/option"

    //"google.golang.org/api/iterator"
    
    "firebase.google.com/go/auth"  
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



func createUser(ctx context.Context, client *auth.Client) *auth.UserRecord {
    params := (&auth.UserToCreate{}).
        Email("user2@example.com").
        EmailVerified(false).
        PhoneNumber("+15555550101").
        Password("secretPassword").
        DisplayName("John Doe").
        PhotoURL("http://www.example.com/12345678/photo.png").
        Disabled(false)
    u, err := client.CreateUser(ctx, params)
    if err != nil {
        log.Fatalf("error creating user: %v\n", err)
    }
    log.Printf("Successfully created user: %#v\n", u.UserInfo)

    return u
}

func InitializeFireBase(ctx context.Context)(*firebase.App, error){
    opt := option.WithCredentialsFile("my-potate-dev-firebase-adminsdk-6rbsw-233fe7362e.json")
    app, err := firebase.NewApp(ctx, nil, opt)
    if err != nil {
        return nil, err
    }

    return app, nil

}

func verifyIDToken(ctx context.Context, app *firebase.App, idToken string) *auth.Token {
	// [START verify_id_token_golang]
	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
	}

	token, err := client.VerifyIDToken(ctx, idToken)
	if err != nil {
		log.Fatalf("error verifying ID token: %v\n", err)
	}

	log.Printf("Verified ID token: %v\n", token)
	// [END verify_id_token_golang]

	return token
}


func hello(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("hello!"))
}


func main() {


    // test for firebase
    // initialize
    ctx := context.Background()
    app, err := InitializeFireBase(ctx)
    if err != nil{
        log.Fatalln(err)
    }

    // firestore example
    // client, err := app.Firestore(ctx)
    // if err != nil {
    //     log.Fatalln(err)
    // }
    // defer client.Close()

    // _, _, err = client.Collection("users").Add(ctx, map[string]interface{}{
    //     "first": "Ada",
    //     "last":  "Lovelace",
    //     "born":  1815,
    // })
    // if err != nil {
    //     log.Fatalf("Failed adding alovelace: %v", err)
    // }

    // iter := client.Collection("users").Documents(ctx)
    // for {
    //     doc, err := iter.Next()
    //     if err == iterator.Done {
    //             break
    //     }
    //     if err != nil {
    //             log.Fatalf("Failed to iterate: %v", err)
    //     }
    //     fmt.Println(doc.Data())
    // }

    // auth example
    verifyIDToken(ctx, app, "idToken")
    // client, err := app.Auth(ctx)
    // if err != nil {
    //     log.Fatalf("error getting Auth client: %v\n", err)
    // }
    // token, err := client.VerifyIDToken(ctx, idToken)
    // if err != nil {
    //     log.Fatalf("error verifying ID token: %v\n", err)
    // }
    // log.Printf("Verified ID token: %v\n", token)
    // createUser(ctx, client)


    // http example
    http.HandleFunc("/hello", hello)
    http.HandleFunc("/weather/", func(w http.ResponseWriter, r *http.Request){
        city := strings.SplitN(r.URL.Path, "/", 3)[2]

        data, err := query(city)
        if err != nil{
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }

        w.Header().Set("Content-Type", "application/json; charset=utf-8")
        json.NewEncoder(w).Encode(data)
    })

    // gorilla example(REST like return)
    // r := mux.NewRouter()
    // r.HandleFunc("/", rootHandler)

    // r.HandleFunc("/articles", getArticles).Methods("GET")
    // r.HandleFunc("/articles/{id}", getArticle).Methods("GET")
    // r.HandleFunc("/articles", addArticle).Methods("POST")
    // r.HandleFunc("/articles", updateArticle).Methods("PUT")
    // r.HandleFunc("/articles/{id}", removeArticle).Methods("DELETE")


    // articles = append(articles,
    //     Article{ID: 1, Title: "Article1", Author: "Gopher", PostDate: "2019/1/1"},
    //     Article{ID: 2, Title: "Article2", Author: "Gopher", PostDate: "2019/2/2"},
    //     Article{ID: 3, Title: "Article3", Author: "Gopher", PostDate: "2019/3/3"},
    //     Article{ID: 4, Title: "Article4", Author: "Gopher", PostDate: "2019/4/4"},
    //     Article{ID: 5, Title: "Article5", Author: "Gopher", PostDate: "2019/5/5"},
    // )


    // http.Handle("/", r)
    http.ListenAndServe(":3000", nil)

}



func query(city string) (weatherData, error) {
    resp, err := http.Get("http://api.openweathermap.org/data/2.5/weather?q=" + city)
    if err != nil {
        return weatherData{}, err
    }
 
    defer resp.Body.Close()
 
    var d weatherData
 
    if err := json.NewDecoder(resp.Body).Decode(&d); err != nil {
        return weatherData{}, err
    }
 
    return d, nil
}

type weatherData struct {
    Name string `json:"name"`
    Main struct {
        Kelvin float64 `json:"temp"`
    } `json:"main"`
}