// RootContext.js
import React from 'react';

export default React.createContext({
    user: {},
    createUser: (user) => {
    },
    deleteUser: () => {
    }
});

// export default ({children}) => {
//     const [user, setUser] = useState({});
//     // const setUser = (user) =>{
//     //     defaultContext.user = user;
//     // };
//
//     const defaultContext = {
//         user,
//         setUser
//     };
//
//     return (
//         <UserContext.Provider value={defaultContext}>
//             {children}
//         </UserContext.Provider>
//     );
// }
