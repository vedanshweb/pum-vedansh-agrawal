import React from 'react';
import PropTypes from 'prop-types';

import * as helper from '../../lib/helper';
import Languages from '../../common/Languages';
import '../../assets/styles/css/PearsonUser.css';

/**
 * User component to show the user information
 */
const PearsonUser = (props) => {
    const { first_name, last_name, avatar, onDelete } = props;
    return (
        <div className="pearson-container">
            <img src={ avatar } alt={ first_name } />
            <div className="pearson-content">
                <p>{helper.getFullName(first_name, last_name)}</p>
                <button onClick={ onDelete }>{Languages.Delete}</button>
            </div>
        </div>
    );
}

PearsonUser.propTypes = {
    avatar: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired
};

export default PearsonUser;