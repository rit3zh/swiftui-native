import type { GroupedContacts, Contact } from "../../constants";

export function groupContactsAlphabetically(
  contacts: Contact[]
): GroupedContacts {
  return contacts.reduce((acc, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {} as GroupedContacts);
}
