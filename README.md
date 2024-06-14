![svgviewer-output](https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93)

# Ello Engineering Challenge

# Output/Solution

File Structure

.  
├── src  
│   ├── App.tsx  
│   ├── components  
│   │   ├── BookDetail.tsx  
│   │   ├── BookDetailCard.tsx  
│   │   ├── ReadingList.tsx  
│   │   ├── SearchBar.tsx  
│   │   └── shared  
│   ├── contexts  
│   │   ├── LoadingContext.tsx  
│   │   ├── ReadingListContext.tsx  
│   │   └── SnackbarAlertContext.tsx  
│   ├── graphql  
│   │   └── books  
│   ├── index.css  
│   ├── index.tsx  
│   ├── interfaces  
│   │   └── Book.ts  
│   ├── tests  
│   │   ├── components  
│   │   │   ├── BookDetail.test.jsx  
│   │   │   ├── BookDetailCard.test.jsx  
│   │   │   ├── ReadingList.test.jsx  
│   │   │   └── SearchBar.test.jsx  
│   │   ├── contexts  
│   │   │   ├── LoadingContext.test.jsx  
│   │   │   ├── ReadingListContext.test.jsx  
│   │   │   └── SnackbarAlertContext.test.jsx  
│   │   ├── mocks  
│   │   │   └── MockData.ts  
│   │   └── shared  
│   │       └── SnackbarAlert.test.jsx  
│   └── theme.ts  
├── jest.config.js  
├── jest.setup.ts  
├── package-lock.json  
├── package.json  
├── public  
│   └── index.html  
├── tsconfig.json  
├── useCoverPhotoURL.tsx  
└── webpack.config.js

Below is the solution for the challenge. I have provided sample screenshots.

To start the app, while at the root, you can run `npm run start` that will start concurrently both the backend and front end apps on their respective ports.

To access the front-end application, you can go to `localhost:9000` if you are running the app locally.

## Running Tests

The application has been tested. To run tests, you can cd directory into the frontend directory `cd frontend` and run `npm test`

# How it Works

## Searching and adding a book

On the home page, the user is greeted by an awesome loader and then a screen that has a search input field with the placeholder `Search books`. Upon clicking into the field, a scrollable book search results pop up. The lists dynamically update based on matching filters as per user input. Clicking on the `Add` icon on any of the search result items adds the book to the reading list and a check badge is added to the search result indicating the book has been added to the reading list. At the same time, the user sees a snack bar alert `Book added to the reading list`  
The user can click outside or use the escape key `esc`  to close/hide the scrollable search results.  
![Screenshot 2024-06-14 at 20 33 51](https://github.com/Mutuba/Booklist-assignment/assets/39365725/22a2b6b4-03ee-438a-9e83-ad6f0b0809fa)

## Access the Reading list and Remove Books

When a user adds a book to the reading list, the operation is real-time, the user will see the book appear in the reading list section below the search field. The user can scroll through this list of books presented in cards and optionally remove a book from the list by clicking on the `Remove from Reading List` button available on each book card. The presentation is neat, each card has an image of the book, a visible title, and details about the author and reading level.  
When a user removes a book from the reading list, the operation is real-time, the book gets removed and the user sees a snack bar alert `Book removed from reading list`  
![Screenshot 2024-06-14 at 20 33 30](https://github.com/Mutuba/Booklist-assignment/assets/39365725/05c95450-889d-45a2-8551-50ce805f4f7b)

## Design and Responsiveness

The UI has been designed using pure material UI components with minor modifications. There are reusable components such as ones that show alerts and loading states. The app is fully responsive with the cards flexing to view port. The UI color choice avoids bright colors, keeping it simple and using Ello website color to familiarize the application.

![Screenshot 2024-06-14 at 20 35 06](https://github.com/Mutuba/Booklist-assignment/assets/39365725/29fa7c54-0808-4c19-a0d8-1168ae3e873a) ![Screenshot 2024-06-14 at 20 34 41](https://github.com/Mutuba/Booklist-assignment/assets/39365725/55ac9c2b-660b-4c0d-900c-8c4c88aec9cd)
