import React from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import { User } from './User';
import Search from '../Icons/Search';

export const Users = ({ items, isLoading, searchValue, onChangeSearchValue, isInvites, onClickInvites, onClickSendInvites }) => {
  console.log(searchValue);
  const searchQuery = searchValue.toLowerCase();

  return (
    <>
      <div className="search">
        <Search />
        <input
          type="text"
          placeholder="Найти пользователя..."
          value={searchValue}
          onChange={onChangeSearchValue}
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter(user => {
              const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
              const email = (user.email || '').toLowerCase();
              return fullName.includes(searchQuery) || email.includes(searchQuery);
            })
            .map(user => (
              <User
                key={user.id}
                {...user}
                isInvite={isInvites.includes(user.id)}
                onClickInvites={onClickInvites}
              />
            ))}
        </ul>
      )}
      <button
        className="send-invite-btn"
        onClick={onClickSendInvites}
        disabled={isInvites.length <= 0}
      >
        Отправить приглашение
      </button>
    </>
  );
};
