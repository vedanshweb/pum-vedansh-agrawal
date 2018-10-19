export const getFullName = (fname, lname) => {
    return fname + ' ' + lname;
};

export const getUniqueArray = (arrArg) => {
    return arrArg.filter((elem, index, self) =>
        index === self.findIndex((t) => (
            t.id === elem.id
        ))
    )
}