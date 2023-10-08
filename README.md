# Labeddit

Trabalho realizado com fins acadêmicos. A proposta do projeto é criar endPoints para uso do Front-end.
O projeto foi um requisito do curso de desenvolvimento full-stack da Labenu.

# Link do Deploy do Front-End (Funcionando com o Back)
https://projetolabeddit-renan.surge.sh/posts

# Link para uso dos Paths (Deploy Back-End)
https://projeto-labeddit-back-izjw.onrender.com

# Documentação no Postman
https://documenter.getpostman.com/view/26594293/2s9YJc2NxH

# Projeto Front-end
Link do Front-end do projeto : https://github.com/renanolivex/Projeto-labeddit-front

# Súmario

- <a>PATHS</a>
- <a>EXEMPLOS</a>
- <a>TECNOLOGIAS</a>
- <a>DESENVOLVEDOR</a>
  
# Paths 
Requisições de Posts
- /posts

Requisições de Usuarios
- /users

Requisições de Comentários
- /post_comments

# Exemplos
## Get all Posts 
- Retorna todos os posts cadastrados e suas informações
``` bash
[
  {
    "id": "307157be-6996-4af9-a728-e5d0210ea3b5",
    "content": "Primeiro POST",
    "likes": 0,
    "dislikes": 1,
    "comments": 7,
    "createdAt": "2023-10-02T00:35:29.110Z",
    "updatedAt": "2023-10-02T00:35:29.110Z",
    "creator": {
      "id": "a8e2bce5-ae5c-4c1e-ab15-fff37a409c94",
      "name": "Renan"
    }
  },
   {
    "id": "55a4a96b-e444-4149-afdd-f40dac7f3ba2",
    "content": "teste",
    "likes": 0,
    "dislikes": 1,
    "comments": 1,
    "createdAt": "2023-10-02T00:46:00.736Z",
    "updatedAt": "2023-10-02T00:46:00.736Z",
    "creator": {
      "id": "a8e2bce5-ae5c-4c1e-ab15-fff37a409c94",
      "name": "Renan"
    }
  }
]


```

## SignUp
- Cadastra um novo usuário
````bash
curl --location 'http://localhost:3003/users/signup' \
--data-raw '    {
    "name": "Teste123",
    "email": "teste123@hotmail.com",
    "password": "12345"}'

````
- Resposta

````bash
{
  "message": "Cadastro realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3ZmNkZTMxLTViOTQtNDBiZC1iYTFkLWEyMTZkNWM0MWYyMiIsIm5hbWUiOiJUZXN0ZTEyMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTYyOTM0ODN9.jiqpu3-DMRPY8EUCczmbZ8g-akV4K1SIXNUwBGjKs5E"
}
`````

## Login
- Entra na conta cadastrada e retorna um token 
`````` bash
curl --location 'http://localhost:3003/users/login' \
--data-raw '    {"email": "teste123@hotmail.com",
    "password": "12345"}'

``````
- Resposta
``````bash
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3ZmNkZTMxLTViOTQtNDBiZC1iYTFkLWEyMTZkNWM0MWYyMiIsIm5hbWUiOiJUZXN0ZTEyMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTYyOTM2MDB9.3G-hKwf0_4IC3J4-Pw7ZEH5oiIKF013WjtvvC1gK7LI"
}
``````

## CreatePost
- Cria um Post novo através do token de login. É necessário um token.
``````bash
curl --location 'http://localhost:3003/posts' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3ZmNkZTMxLTViOTQtNDBiZC1iYTFkLWEyMTZkNWM0MWYyMiIsIm5hbWUiOiJUZXN0ZTEyMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTYyOTM0ODN9.jiqpu3-DMRPY8EUCczmbZ8g-akV4K1SIXNUwBGjKs5E' \
--data '{"content":"Post Criado"}'
``````

- Resposta
``````

Post Criado 

``````


## Post like
- Adiciona um like ou dislike em um post.
``````bash
curl --location --request PUT 'http://localhost:3003/posts/:id/like'
``````
- Resposta
```
Reação alterada com sucesso!
```

## Get Comment Post
- Retorna todos os comentários de um post especificado por id.

````bash
curl --location 'http://localhost:3003/post_comments/:id'
````

- Resposta
```bash
 {
        "id": "8397c9d6-4549-42c0-a3c5-1e652fd8eb45",
        "post_id": "307157be-6996-4af9-a728-e5d0210ea3b5",
        "content": "Comentario 1",
        "likes": 0,
        "dislikes": 1,
        "comments": 0,
        "createdAt": "2023-10-02T00:35:44.200Z",
        "updatedAt": "2023-10-02T00:35:44.200Z",
        "creator": {
            "id": "a8e2bce5-ae5c-4c1e-ab15-fff37a409c94",
            "name": "Renan"
        }
```

## CreateComments
- Adiciona um like ou dislike em um comentário de um post.

``` bash
curl --location 'http://localhost:3003/post_comments/:id'
{"content":"Novo Comment Criado"}
```

- Resposta
```
Novo Comment Criado
```


## Comment Like
- Adiciona um like ou dislike em um comentário de um post.

``` bash
curl --location --request PUT 'http://localhost:3003/post_comments/41c0133f-3613-4c1d-9698-33ca52d93982/like' \
--header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM3ZmNkZTMxLTViOTQtNDBiZC1iYTFkLWEyMTZkNWM0MWYyMiIsIm5hbWUiOiJUZXN0ZTEyMyIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2OTYyOTM0ODN9.jiqpu3-DMRPY8EUCczmbZ8g-akV4K1SIXNUwBGjKs5E' \
--data '{"like": true}'
```

- Resposta
```
Reação alterada com sucesso!
```


# Tecnologias 
Para a criação do projeto foram utilizadas as ferramentas:
- Node.js
- SQLite
- Express
- Knex
- Typescript
- UUID 
- HASH

# Desenvolvedor

![DESENVOLVEDOR](./src/assets/Desenvolvedor.jpg) 
<p>Renan N. de Oliveira



