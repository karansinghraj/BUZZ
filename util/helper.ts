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

export { fullname };
