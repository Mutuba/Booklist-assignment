export const addBookToReadingListMock = jest.fn();
export const removeBookMock = jest.fn();
export const setIsLoadingMock = jest.fn();
export const setShowSnackbarAlertMock = jest.fn();
export const triggerSnackbarAlertMock = jest.fn();

jest.mock("../../contexts/ReadingListContext", () => ({
  useReadingList: () => ({
    readingList: [],
    addBookToReadingList: addBookToReadingListMock,
    removeBookFromReadingList: removeBookMock,
  }),
}));

jest.mock("../../contexts/LoadingContext", () => ({
  useLoading: () => ({
    setIsLoading: setIsLoadingMock,
  }),
}));

jest.mock("../../contexts/SnackbarAlertContext", () => ({
  useSnackbarAlert: () => ({
    showSnackbarAlert: true,
    snackbarAlertMessage: "Test message",
    setShowSnackbarAlert: setShowSnackbarAlertMock,
    triggerSnackbarAlert: triggerSnackbarAlertMock,
  }),
}));

jest.mock("../../../useCoverPhotoURL", () => ({
  useCoverPhotoURL: jest.fn().mockReturnValue("mocked-image-url"),
}));
