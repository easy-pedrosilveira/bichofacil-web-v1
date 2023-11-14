import { useContext } from 'react';
import AuthContext from 'data/context/AuthContext';

const useAuthContext = () => useContext(AuthContext)

export default useAuthContext
