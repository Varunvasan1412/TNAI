import { useContext } from 'react';
import RsistoreContext from './RsistoreContext';

const useRsistoreContext = () => {
    const context = useContext(RsistoreContext);
    if (context === null) throw new Error("Context is null please try again and reload the page");

    return context;
};

export default useRsistoreContext;
