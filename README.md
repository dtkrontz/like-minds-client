# like-minds-client v1.0

Welcome to Like Minds!

LikeMinds is an application where individuals will be able to search RawG.io, (https://rawg.io/apidocs) a third party game API, and add any found game to their saved list. Once a game is saved to thier list a user can rate the game (0-10), give a short review, and mark if the game is their favorite. Once marked as a favorite game, users can navigate to a page where all games marked favorite game can be viewed. Users will be able to add comments on each game, even ones they did not personally add as favorite.

This application has 2 types of users, Normal and Admin. Normal users will only be able to edit/delete games/comments associated with their account. Admins will have access rights that will allow them to delete any comment/comments that may be offensive or against community standards. 

The Data Associations are as follows: User has many games and comments, Game belongs to User and has many comments, Comments belongs to User and Game.

Users will NOT be able to see or edit the favorite games/comments unless they are logged into the application.

Come experience the application Where LikeMinds connect! https://dk-like-minds-client.herokuapp.com/


![Favorite Games](https://user-images.githubusercontent.com/36709518/114637878-58942d00-9c98-11eb-9ab2-fa6a55f107a2.png)
![Saved Games](https://user-images.githubusercontent.com/36709518/114637980-95f8ba80-9c98-11eb-83e8-9ae6e1022529.png)
