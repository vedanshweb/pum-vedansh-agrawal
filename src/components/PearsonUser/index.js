import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../lib/helper';
import Languages from '../../common/Languages';

/*
* Renders Users full name with avatar and delete button
*/
const PearsonUser = (props) => {
    const { first_name, last_name, avatar } = props.user;
    return (
        <div className='pearson-user-list-item'>
            <img alt={first_name} src={avatar} />
            <span className='pearson-user-fullname'>{helper.getFullName(first_name, last_name)}</span>
            <button onClick={() => props.deleteUser()}>{Languages.Delete}</button>
        </div>
    );
}

PearsonUser.propTypes = {
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

PearsonUser.defaultProps = {
    first_name: '',
    last_name: '',
    avatar: '',
}

export default PearsonUser;