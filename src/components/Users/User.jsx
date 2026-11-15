
import React from 'react';
import Plus from '../Icons/Plus';
import Minus from '../Icons/Minus';

export const User = ({ id, first_name, last_name, email, avatar, isInvite, onClickInvites }) => (
  <li>
    <div>
      <img className="avatar" src={avatar} alt={first_name} />
      <div>
        <h3>{first_name} {last_name}</h3>
        <p>{email}</p>
      </div>
    </div>
    <div className="action" onClick={() => onClickInvites(id)}>
      {isInvite ? <Minus /> : <Plus />}
    </div>
  </li>
);
