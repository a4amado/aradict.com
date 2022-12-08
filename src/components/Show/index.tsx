import { ReactElement } from 'react';

const ConShow = ({ children, condetion }: { condetion: boolean, children: ReactElement}) => {
 if (condetion) return <>{children}</>
}

export default ConShow;