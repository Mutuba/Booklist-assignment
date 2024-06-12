export const useCoverPhotoURL = (coverPhotoURL: string): string => {
  return require(`./assets/${coverPhotoURL}`).default;
};
