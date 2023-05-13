## Meowland

An online discussion forum for the cat community to interact and share experience among them using Django and React.

## Demo App
<img width="1216" alt="landingPage" src="https://github.com/dee-adibah/purrmeowland/assets/115356158/49a61c11-61ed-49a7-98a5-54ddad8d1f92">

![Animated GIF](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmY2MGZlMjNmNGExMzNmZDhmNzBlNWFmOGY[…]bnRlcm5hbF9naWZzX2dpZklkJmN0PWc/GxbL4z9revipEOIAHS/giphy.gif)

## Tech Stack

* Django
* React.JS
* Material UI
* CSS
* Javascript

## API endpoint

| Method| API | Description  |
| --- | --- | --- |
| GET (R) | api/profile/ | View user profile |
| PUT (U) | api/profile/update/<<int:user_id>> | Update own user profile |
| POST (C) | api/user/user/signup/ | User registration |
| GET (R) | api/topics/ | Listing out the topics |
| POST (C) | api/topics/create/ | Creating new topic |
| DELETE (D) | api/topics/delete/<<int:pk>>/ | Deleting topic |
| GET (R) | api/threads/<<str:topic>> | Listing out the threads |
| POST (C) | api/threads/create/ | Creating new thread |
| DELETE (D) | api/threads/delete/<<int:pk>>/ | Deleting thread |
| GET (R) | api/posts/<<int:thread_id>> | Listing out the posts |
| POST (C) | api/posts/create/ | Creating new post |
| DELETE (D) | api/posts/delete/<<int:pk>>/ | Deleting post |

## Getting Started

Clone the repo

    
    git clone https://github.com/dee-adibah/meowland.git
    

For the Frontend

    cd frontend
    
    npm i
    
    npm start
    
    the application will be available on http://localhost:3000/ (or any other if 3000 is in use)

For the Backend

    cd backend
    
    pipenv shell
    
    python manage.py runserver
    
    The application will be available on http://127.0.0.1:8000/

---

## Difficulties

-   User related
-   Understanding how the serializers work
-   Being focus on the plan made

## TODO

-   Tidy up the thread and post page (also add pagination)
-   User able to edit their thread and post
-   Adding like button on the thread and post
-   Search function

## Reference

-   ChatGPT
-   https://www.youtube.com/watch?v=F627pKNUCVQ
-   https://github.com/endiliey/rengorum/tree/master
-   https://github.com/sn0218/Django-React-Discussion-Forum/tree/master

