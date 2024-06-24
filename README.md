
# How it works

Below is the solution for the challenge. I have provided sample screenshots.

To start the app, while at the root, you can run `npm run start` that will start concurrently both the backend and front end apps on their respective ports.

To access the front-end application, you can go to `localhost:9000` if you run the app locally.

## Running Tests

The application has been tested. To run tests, you can cd directory into the frontend directory `cd frontend` and run `npm test`

# How it Works

## Searching and adding a book

On the home page, the user is greeted by an awesome loader and then a screen with a search input field with the placeholder `Search books`. Upon clicking into the field, a scrollable book search results pop up. The lists dynamically update based on matching filters as per user input. Clicking on the `Add` icon on any of the search result items adds the book to the reading list and a check badge is added to the search result indicating the book has been added to the reading list. At the same time, the user sees a snack bar alert `Book added to the reading list`  
The user can click outside or use the escape key `esc`  to close/hide the scrollable search results. 

Empty State
<img width="1440" alt="Screenshot 2024-06-16 at 17 48 18" src="https://github.com/Mutuba/Booklist-assignment/assets/39365725/6c320ff3-f548-459a-8ce6-355917c8d5b6">

![Screenshot 2024-06-14 at 20 33 51](https://github.com/Mutuba/Booklist-assignment/assets/39365725/22a2b6b4-03ee-438a-9e83-ad6f0b0809fa)

## Access the Reading list and Remove Books

When a user adds a book to the reading list, the operation is real-time, the user will see the book appear in the reading list section below the search field. The user can scroll through this list of books presented in cards and optionally remove a book from the list by clicking on the `Remove from Reading List` button available on each book card. The presentation is neat, each card has an image of the book, a visible title, and details about the author and reading level.  
When a user removes a book from the reading list, the operation is real-time, the book gets removed and the user sees a snack bar alert `Book removed from reading list`  

<img width="1440" alt="Screenshot 2024-06-17 at 08 47 44" src="https://github.com/Mutuba/Booklist-assignment/assets/39365725/a29dea81-0b68-41dd-b151-034c7e5cbd64">

## Design and Responsiveness

The UI has been designed using pure material UI components with minor modifications. There are reusable components such as ones that show alerts and loading states. The app is fully responsive with the cards flexing to view port.

<img width="216" alt="Screenshot 2024-06-16 at 17 51 33" src="https://github.com/Mutuba/Booklist-assignment/assets/39365725/e3b9566b-73a9-4bad-9455-218c479fc334">
<img width="218" alt="Screenshot 2024-06-16 at 17 51 15" src="https://github.com/Mutuba/Booklist-assignment/assets/39365725/716d24af-a2c7-47b7-80f5-56858b4071a0">

<img width="217" alt="Screenshot 2024-06-16 at 17 50 44" src="https://github.com/Mutuba/Booklist-assignment/assets/39365725/304e34e9-f812-443d-8858-2edfc303ed39">
