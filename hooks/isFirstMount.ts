import React from 'react';

function useFirstMount():boolean {
    const [isFirst, setisFirst] = React.useState(false)

    React.useEffect(() => {
        setisFirst(true)
    }, [])

    
    return isFirst;
}


export default useFirstMount;