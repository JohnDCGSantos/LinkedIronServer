# LinkdIron App

## Description
LinkdIron is an app designed to connect Alumni and staff from Ironhack, providing a platform to share posts about events, job opportunities, and other valuable information.

## User Stories
- **Signup**: As an anonymous user, I can sign up on the platform to create and manage my account.
- **Login**: As a user, I can log in to the platform to access and manage my account.
- **Logout**: As a user, I can log out from the platform to secure my information.
- **404**: As a user, I will see a 404 page if I attempt to access a non-existent page.

### Features
- **Check Posts**: Users can view posts from other users.
- **Create Posts**: Users can add new posts to their account.
- **Edit Posts**: Users can edit their own posts.
- **Delete Posts**: Users can delete their posts.
- **Profile Management**: Users can view and update their profiles.
- **Delete Profile**: Users have the option to delete their profile.
- **Follow Users**: Users can follow and unfollow other users.
- **Search Posts**: Users can search for specific posts and filter by categories.

## Backlog
- **Follow Functionality**: Enhance the follow feature with followers and following lists.
- **Posts Search by Categories**: Implement a search bar to search for posts based on categories.
- **Images and Interaction**: Add the ability to include images, likes, comments, and share posts.
- **User Profile Enhancement**: Users can view and update their own profiles.

## Client / Frontend

### React Router Routes
| Path | Component | Permissions | Behavior |
| ---- | --------- | ----------- | -------- |
| / | HomePage, Navbar | Public Route | Display home page |
| /signup | Signup, Navbar | Public Route | Display signup form, link to login and home page, navigate to login after signup |
| /login | Login, Navbar | Public Route | Display login form, link to signup and home page, navigate to profile after login |
| /logout | N/A | Private Route (User Only) | Navigate to login after logout, expire session |
| /following | NavBar, ElementList | Private Route (User Only) | Display list of following users/followers |
| /feed | NavBar, Feed | Private Route (User Only) | Display all posts |
| /posts/:postId | PostPage, SearchResults | Private Route (User Only) | Display post with specific ID |
| /posts/:postId/edit | EditPostPage | Private Route (User Only) | Edit selected post |
| /profile | Profile | Private Route (User Only) | Display user details |
| /newpost | CreatePostPage | Private Route (User Only) | Create a new post |
| /users | Users List | Private Route (User Only) | Display list of users |

### Pages
- Home Page (Public)
- Signup (Public)
- Login (Public)
- Feed (User)
- Create Post (User)
- Edit Post (User)
- Following Page (User)
- Post Details (User)
- Profile (User)
- Users List (User)
- Error (Public)

### Components
- Actions
- CategorySearch
- CloudinaryUpload
- Comments
- FollowButton
- FollowersList
- FollowingList
- Likes
- Navbar
- Post
- PostForm
- PostItem
- PrivateRoute
- UserCard
- UserImage

## API Endpoints / Backend Routes

### Index Routes
- `GET /api/`: Home page

### Auth Routes
- `GET /auth/verify`
- `POST /auth/signup`: Signup with user details
- `POST /auth/login`: Login with email and password
- `POST /auth/logout`

### Users Routes
- `GET /user/`: Get all users
- `GET /user/:userId`: Get user profile
- `PUT /user/`: Update user data
- `DELETE /user/`: Delete user

### Posts Routes
- `GET /posts/`: Get all posts
- `GET /posts/:postId`: Get post by ID
- `POST /posts/`: Create a new post
- `PUT /posts/:postId`: Update a post
- `DELETE /posts/:postId`: Delete a post

### Likes Routes
- `GET /posts/:postId/like`: Get number of likes
- `POST /posts/:postId/like`: Like a post
- `DELETE /posts/:postId/like`: Unlike a post

### Comments Routes
- `POST /posts/:postId/comment`: Create a comment
- `PUT /posts/:postId/comment/:commentId`: Update a comment
- `DELETE /posts/:postId/comment/:commentId`: Delete a comment

### Follow Routes
- `POST /follow/users/:userId/follow`: Follow a user
- `DELETE /follow/users/:userId/follow`: Unfollow a user
- `GET /follow/following`: Get following users
- `GET /follow/followers`: Get follower users

## Links

- [Trello/Kanban](https://trello.com/b/qNkUhulJ/projet-3-LinkdIron)
- [Backend GitHub Repository](https://github.com/JohnDCGSantos/LinkdIronServer.git)
- [Frontend GitHub Repository](https://github.com/JohnDCGSantos/LinkdIronFront.git)
- [Deployed App](https://linkdiron.netlify.app/)
- [Slides](https://docs.google.com/presentation/d/13SwM5dziE2i1G3xvx3nL_wKXIkY824mOc4ZDYK0NuQ0/edit?usp=sharing)
