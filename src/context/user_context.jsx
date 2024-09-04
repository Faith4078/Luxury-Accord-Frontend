import { useUser } from '@clerk/clerk-react';
import { createContext, useContext } from 'react';

const UserContext = createContext();
// const getUserFromLocalStorage = () => {
//   return localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user'))
//     : { username: null, token: null };
// };

// const userState = {
//   user: getUserFromLocalStorage(),
//   userLoading: false,
// };

export const UserProvider = ({ children }) => {
  const { user } = useUser();
  // const [myUser, setMyUser] = useState(null);

  // useEffect(() => {
  //   setMyUser(user);
  // }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
