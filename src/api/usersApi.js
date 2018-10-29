/*
* Get list of all users from API
*/
const Users = {
    getAllUsers: async () => {
        return await fetch('https://reqres.in/api/users?page=1&per_page=10')
            .then((response) => response.json()).then((users) => {
                if (users.length > 0) {
                    return users;
                }
            }).catch((error) => console.log(error))
    },
}

export default Users;