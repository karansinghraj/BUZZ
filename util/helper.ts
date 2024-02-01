async function fullname(firstname: string | null, lastname: string | null) {
  if (!firstname && !lastname) {
    return null;
  }
  if (!firstname || !lastname) {
    if (!lastname) {
      return firstname;
    }
    if (!firstname) {
      return lastname;
    }
  }
  return firstname + " " + lastname;
}

const getname = (firstname: string, lastname: string) => {
  return firstname && lastname
    ? firstname + " " + lastname
    : firstname
    ? firstname
    : lastname;
};

function generateRandomUsername(firstname: string, lastname: string): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomUsername = "";

  // Generate a random username of 5 characters
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomUsername += characters.charAt(randomIndex);
  }

  // Combine with firstname and lastname
  const result = `${firstname}${lastname}${randomUsername}`;

  return result;
}

// Example usage:
const firstname = "John";
const lastname = "Doe";

const username = generateRandomUsername(firstname, lastname);
console.log("Generated Username:", username);

export { fullname };
