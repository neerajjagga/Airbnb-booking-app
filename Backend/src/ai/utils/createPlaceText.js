export const createPlaceText = (place) => {
  return `
Title: ${place.title}
Description: ${place.description}
Address: ${place.address}
Price: ₹${place.price}
Perks: ${place.perks?.join(", ")}
Max Guests: ${place.maxGuests}
Extra Info: ${place.extraInfo}
`;
};