# like-minds-client v1.0

Welcome to Like Minds Client!

LikeMinds is an application where individuals will be able to search RawG.io, (https://rawg.io/apidocs) a third party game API, and add any found game to their saved list. Once a game is saved to thier list a user can rate the game (0-10), give a short review, and mark if the game is their favorite. Once marked as a favorite game, users can navigate to a page where all games marked favorite game can be viewed. Users will be able to add comments on each game.
 
There are 2 full CRUD tables (games and comments). Users will be able to create a game/comment, edit and delete a specific game/comment associated with their account.

The Data Associations are as follows: User has many games and comments, Game belongs to User and has many comments, Comments belongs to User and Game.

Come experience the application Where LikeMinds connect! https://dk-like-minds-client.herokuapp.com/
