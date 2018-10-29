/*
* Returns full name of user
*/
export const getFullName = (fname, lname) => {
    return fname + ' ' + lname;
};

/*
* Removes duplicate element from the array
* Lodash or Underscore can also be used instead
*/
export const getUniqueArray = (arrArg) => {
    return arrArg.filter((elem, index, self) =>
        index === self.findIndex((t) => (
            t.id === elem.id
        ))
    );
};