import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default() => {
    return(
        <Menu stackable style={{marginTop: '50px'}}>
            <Button className='custom-button-style' color='blue' as={Link} to='/'>Marketplace</Button>
            <Button color='green' as={Link} to='/Admin'>Admin panel</Button>
        </Menu>
    );
}