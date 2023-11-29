import { useContext } from 'react';
import AppContext from 'data/context/AppContext';

const useAppContext = () => useContext(AppContext)

export default useAppContext
