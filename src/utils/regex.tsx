export const cpfRegex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;

export const phoneRegex =
  /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;

export const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export const dateBirthRegex =
  /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-[12][0-9]{3}$/;

export const nameRegex = /^[A-Za-zÀ-ú\s]+$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const uppercaseRegex = /[A-Z]/;
export const numberRegex = /[0-9]/;