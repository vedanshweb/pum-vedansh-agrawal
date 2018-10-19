import {BASE_URL} from '../common/Config';

const Users = {
    getAllUsers: async () => {
        return await fetch(`${BASE_URL}users?page=1&per_page=10`)
            .then((response) => response.json()).then((users) => {
                if (users.length !== 0) {
                    return users;
                }
            });
    },
}

export default Users;