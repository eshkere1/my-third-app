import { Users } from './components/Users/Users';
import { Success } from './components/Success/Success';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isInvites, setIsInvites] = useState([]);
  const [success, setSuccess] = useState(false);

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  const onClickInvites = (id) => {
    setIsInvites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((userId) => userId !== id);
      }

      return [...prev, id];
    });
  };

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
      fetch('https://reqres.in/api/users', {
        headers: {
          'x-api-key': 'reqres-free-v1'
        }
      })
      .then(res => res.json())
      .then(json => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log(isInvites);
  return (
    <div className="App">
      {success ? (
        <Success count={isInvites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          isInvites={isInvites}
          onClickInvites={onClickInvites}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
