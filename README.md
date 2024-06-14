![svgviewer-output](https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93)

# Ello Engineering Challenge

👋 Hello,  
We are really excited about you potentially joining the team, so we designed this take home exercise to give you a taste of the challenges you may encounter in the role, and better understand what it would be like to work closely together.

Thanks for taking the time, and we hope to talk with you soon!

## About Ello

Ello is a forward-thinking educational technology company dedicated to revolutionizing the way children learn to read. Our mission is to empower young readers with the tools they need to become proficient and passionate readers. We believe that fostering a love for reading is essential for a child's academic and personal growth.

**Note:** Please don't fork this repository or create a pull request against it. Other applicants may take inspiration from it. You should create another repository for the challenge. Once the coding challenge is completed, email your solution back to our team at [fullstack2024@ello.com](mailto:fullstack2024@ello.com).

## Challenge

As part of our goal to have Ello impact as many children as we can, we offer an Ello web viewer product. [https://books.ello.com](https://books.ello.com/)

We give this to certain schools for free to allow teachers to share our books with children.  
You are building part of the teacher-facing UI for this product,  
namely the book assignment view, where teachers can assign books to students.

The view should have the following features:-

1.  A search bar that allows users to search for books by title.
2.  A list of search results that displays the book title, author, and a button to add the book to the students reading list.
3.  A reading list that displays all the books that the teacher has added.
4.  A button to remove a book from the reading list.

You can build this view without the concept of a "student" and just have a single reading list for the teacher.

### Requirements

- Use React as the frontend framework.
- Showcase the use of React hooks.
- Use [material-ui](https://mui.com/material-ui/) as the component library.
- Write your code in the `src/frontend` directory.
- Create components as you feel is best suited for your solution![Screenshot 2024-05-15 at 19 10 51](https://github.com/ElloTechnology/fullstack-take-home-test/assets/3518127/bc3eb7f7-489f-4304-93f4-032bbbd38c58)

### Data

To get access to data that you will use for this challenge you can switch into the `src/backend` folder and run

```
npm install
```

Then run the following command to start the server

```
npm start
```

This start a Graphql server at the url `http://localhost:4000/`, the server has a single query `books` that returns a list of books.

```
query Books {
  books {
    author
    coverPhotoURL
    readingLevel
    title
  }
}
```

You can use this query to get the list of books to display in your frontend. You may need to adjust the `coverPhotoURL` to be a valid URL. The photos are in the `src/frontend/assets` directory.

### Styling Guidelines

- Use the "Mulish" Google font
- You can use the following colors (You don't have to use all but you can pick and choose from here)![Screenshot 2024-05-14 at 17 36 40](https://github.com/ElloTechnology/fullstack-take-home-test/assets/3518127/15922f8f-a7c7-4033-8405-76988e95afb3)

### You will be evaluated on

- Code quality and organization.
- User experience and design.
- Beautiful and responsive UI.

# Output/Solution

Below is the solution for the challenge. I have provided sample screenshots.

To start the app, while at the root, you can run `npm run start` that will start concurrently both the backend and front end apps on their respective ports.

To access the front end application, you can go to `localhost:9000` if you are running the app locally.

# How it Works

## Searching and adding a book

On the home page, the user is greated by an awesome loader and then  a screen that has a search input field with placeholder `Search books` . Upon clicking into the field, a scrollable book search results pops up. The lists dynamically updates based on matching filters as per user input. Clicking on the `Add` icon on the any of the search result item adds the book to the reading list add a check badge is added to the search result indicating the book has been added to the reading list. At the same time, the user seems a snackbar alert `Book added to reading list`  
The user can click outside or use the escape key `esc`  to close/hide he scrollable search results.

## Access Reading list and Remove Books

When a user adds a book to the reading list, the operation is real time, the user will see the book appear in the reading list section below the search field. The user can scroll through this list of books presented in cards and optionally remove a book from the list by clicking on the `Remove from Reading List` button available on each book card. The presentation is neat, each card has an image of the book, a visible title, details about author and reading level.  
When a user removes a book from the reading list, the operation is real time, the book gets removed and the user sees a snackbar alert `Book removed from reading list`

## Design and Responsiveness 

The UI has been designed using pure material UI components with minor modifications. There are resusble compoennts such as onces that show alerts and loading state. The app is fully responsive with the cards flexing with respect to view port. The UI color shoice avoids bright colors, keeping it simple and using Ello website color to make the application familiar.
