import React, {ReactNode} from 'react';
import Navbar from '../Navbar/Navbar';

type Props = { children: ReactNode }
const Layout:React.FC<Props> = ({children}) => {
    
    return (
        <>
        <Navbar/>
        <main>{children}</main>
        </>
    )
}
export default Layout;